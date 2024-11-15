import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { format, startOfDay, addDays, addMinutes } from 'date-fns';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { MongoClient } from 'mongodb';

// Obter o diretório atual do módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente a partir do arquivo .env
dotenv.config({ path: resolve(__dirname, '../../.env') });

const JFUrl = process.env.JF_URL;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DATABASE;
const result_collection = process.env.COLLECTION_RESULT;

const dataInicio = format(startOfDay(new Date()), 'yyyy-MM-dd');
const dataFim = format(addDays(startOfDay(new Date()), 1), 'yyyy-MM-dd');
const interval = 10;
let emExecucao = false;

async function connectToMongo() {
    if (!global.dbClient) {
        global.dbClient = new MongoClient(mongoUrl);
        await global.dbClient.connect();
        console.log("Conectado ao MongoDB");

        // Cria um índice TTL na coleção de resultados, se ainda não existir
        const db = global.dbClient.db(dbName);
        const collection = db.collection(result_collection);

        // Exclui documentos após 1 dia
        await collection.createIndex({ ultimaConsulta: 1 }, { expireAfterSeconds: 86400 });
        return db;
    }
    return { db: global.dbClient.db(dbName) };
}

// Função para criar uma pausa
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para adicionar minutos a uma data
function addMinutesToDate(date, minutes) {
    return addMinutes(date, minutes);
}

// Função para formatar a data para o formato Puppeteer
function formatDateForPuppeteer(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

async function consultar(dataInicio, dataFim) {

    if (emExecucao) {
        console.log("Consulta já está em execução.");
        return { status: 'Já em execução!' };
    }

    emExecucao = true;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const resultados = [];
    const titulos = ["Data/Hora", "Processo", "Juízo/Competência", "Sala", "Evento/Observação", "Status"];
    const termosIgnorados = ["Classe:", "Autor:", "Réu:", "Observação:"];

    try {
        console.log(`Navegando para o site...`);
        await page.goto(JFUrl);

        const dataInicioFormatada = formatDateForPuppeteer(dataInicio);
        const dataFimFormatada = formatDateForPuppeteer(dataFim);

        try {
            await page.waitForSelector('#selConsultarPor', { visible: true, timeout: 1000 });

            await page.click('.dropdown-toggle');
            await sleep(500);

            await page.waitForSelector('.dropdown-menu.show', { visible: true, timeout: 1000 });

            // Selecione a opção "Intervalo de Data e Competência"
            await page.evaluate(() => {
                const optionToSelect = Array.from(document.querySelectorAll('.dropdown-item'))
                    .find(option => option.textContent.trim() === "Intervalo de Data e Competência");
                if (optionToSelect) {
                    optionToSelect.click();
                }
            });

            await sleep(200);

            await page.waitForSelector('#txtDataInicio', { timeout: 500 });
            await page.$eval('#txtDataInicio', (el, value) => el.value = value, dataInicioFormatada);

            await sleep(1000);

            await page.waitForSelector('#txtDataTermino', { timeout: 500 });
            await page.$eval('#txtDataTermino', (el, value) => el.value = value, dataFimFormatada);

            await sleep(1000);

            await page.click('#btnConsultar');

            console.log("Formulario submetido...");

            const mensagemNenhumResultado = await page.$eval('#divInfraAreaTabela', div => div.textContent.includes('Nenhum resultado encontrado')).catch(() => false);

            if (mensagemNenhumResultado) {
                console.log(`Nenhum resultado encontrado.`);
            }

            const resultadosConsolidados = await page.$$eval('#tblAudienciasEproc tr', (linhas, titulos, termosIgnorados) => {
                return linhas.map(linha => {
                    const textoNormalizado = linha.textContent.toLowerCase();
                    if (['custódia', 'custodia'].some(termo => textoNormalizado.includes(termo))) {
                        const tds = Array.from(linha.querySelectorAll('td'));
                        const conteudoLinha = [];
                        let erroEncontrado = false;

                        tds.forEach(td => {
                            let tdText = td.innerHTML
                                .replace(/<br\s*\/?>/gi, ' ')
                                .replace(/<\/?[^>]+>/gi, ' ')
                                .replace("Sala: ", " ")
                                .replace("Evento: ", " ")
                                .trim();

                            termosIgnorados.forEach(termo => {
                                const pos = tdText.toLowerCase().indexOf(termo.toLowerCase());
                                if (pos !== -1) {
                                    tdText = tdText.slice(0, pos).trim();
                                }
                            });

                            if (tdText.toLowerCase().includes('ocorreu um erro')) {
                                erroEncontrado = true;
                            }
                            conteudoLinha.push(tdText);
                        });

                        if (!erroEncontrado) {
                            const conteudoFiltrado = titulos.map(titulo => conteudoLinha.shift() || '');
                            return conteudoFiltrado;
                        }
                    }
                    return null;
                }).filter(linha => linha !== null);
            }, titulos, termosIgnorados);

            console.log("Busca de dados finalizada, resultados: ", resultadosConsolidados);

            if (resultadosConsolidados.length > 0) {
                resultados.push({
                    dados: resultadosConsolidados
                });
            } else {
                resultados.push({
                    dados: []
                });
            }
        } catch (error) {
            console.error(`Erro:`, error);
        }

        // MongoDB
        const db = await connectToMongo();
        const collection = db.collection(result_collection);

        // Atualizar dados de última e próxima consulta
        const agora = new Date();
        const ultimaConsulta = agora;
        const proximaConsultaDate = addMinutesToDate(agora, interval);
        const proximaConsulta = proximaConsultaDate;
        const documentoAtualizacao = {
            dataInicio,
            dataFim,
            resultados,
            ultimaConsulta,
            proximaConsulta
        };

        //Inserindo resultado
        const resultadoInserido = await collection.insertOne(documentoAtualizacao);
        if (resultadoInserido.acknowledged) {
            console.log("Novo documento inserido com sucesso no MongoDB:", resultadoInserido.insertedId);
        } else {
            console.error("Erro ao inserir novo documento no MongoDB");
        }

        console.log("Conexão com o MongoDB encerrada.");

        return {
            resultados,
            status: 'Concluída',
            ultimaConsulta,
            proximaConsulta,
            dataInicio,
            dataFim
        };

    } catch (error) {
        console.error(`Erro ao acessar o site: ${error.message}`);
        throw new Error(error.message);
    } finally {
        console.log("Busca concluída...");
        await browser.close();
        emExecucao = false;
    }
}

// Função para iniciar a consulta e agendá-la para execução a cada 10 minutos
function iniciarAgendamento() {
    consultar(dataInicio, dataFim).catch(error => {
        console.error(`Erro ao iniciar o agendamento: ${error.message}`);
    });

    setInterval(() => {
        consultar(dataInicio, dataFim).catch(error => {
            console.error(`Erro ao executar a consulta agendada: ${error.message}`);
        });
    }, interval * 60 * 1000);
}

iniciarAgendamento();