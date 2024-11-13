import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { format, startOfDay, addDays } from 'date-fns';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const interval = 10;

// Obter o diretório atual do módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente a partir do arquivo .env
dotenv.config({ path: resolve(__dirname, '../../.env') });

const JFUrl = process.env.JF_URL;

const dataInicio = format(startOfDay(new Date()), 'yyyy-MM-dd');
const dataFim = format(addDays(startOfDay(new Date()), 1), 'yyyy-MM-dd');
