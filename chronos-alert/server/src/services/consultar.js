import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { format, startOfDay, addDays } from 'date-fns';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Obter o diretório atual do módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente a partir do arquivo .env
dotenv.config({ path: resolve(__dirname, '../../.env') });

const JFUrl = process.env.JF_URL;

const dataInicio = format(startOfDay(new Date()), 'yyyy-MM-dd');
const dataFim = format(addDays(startOfDay(new Date()), 1), 'yyyy-MM-dd');
const interval = 10;

// Função para criar uma pausa
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para formatar a data para o formato Puppeteer
function formatDateForPuppeteer(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

async function consultar(dataInicio, dataFim) {
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

    } catch (error) {
        console.error(`Erro ao acessar o site: ${error.message}`);
        throw new Error(error.message);
    } finally {
        console.log("Busca concluída...");
        await browser.close();
    }

    return resultados;
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