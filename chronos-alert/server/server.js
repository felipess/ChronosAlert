import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilita análise de corpo JSON em requisições

app.listen(port, () => {
    console.log(`Servidor rodando...`);
});