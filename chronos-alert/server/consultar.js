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
//teste de importação do valor de variavéis do .env
console.log("JFUrl:", JFUrl);

//teste date-fns
const dataInicio = format(startOfDay(new Date()), 'yyyy-MM-dd');
const dataFim = format(addDays(startOfDay(new Date()), 1), 'yyyy-MM-dd');
console.log("dataInicio", dataInicio);
console.log("dataFim", dataFim);

(async () => {
    try {
        // Inicia o navegador
        const browser = await puppeteer.launch({ headless: true }); // O 'headless: true' significa que o navegador será invisível.
        const page = await browser.newPage();

        // Navega para uma página
        await page.goto('https://www.google.com');

        // Extrai o título da página para verificar se o Puppeteer conseguiu acessar corretamente
        const pageTitle = await page.title();
        console.log('Título da página:', pageTitle);

        // Fecha o navegador
        await browser.close();
    } catch (error) {
        console.error('Erro ao rodar o Puppeteer:', error);
    }
})();
