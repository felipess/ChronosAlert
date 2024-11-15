import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;
const result_collection = process.env.COLLECTION_RESULT;
const notif_collection = process.env.COLLECTION_NOTIF;
const dbName = process.env.DATABASE;

if (!mongoUrl) {
    console.error('A variável de ambiente MONGO_URL não está definida no server.');
    process.exit(1);
}

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilita análise de corpo JSON em requisições

let db, client;

// Função para conectar ao MongoDB e armazenar conexão
async function connectToMongo() {
    if (!db || !client) {
        client = new MongoClient(mongoUrl);
        try {
            await client.connect();
            console.log("Conectado ao MongoDB");
            db = client.db(dbName);
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            throw new Error('Erro ao conectar ao MongoDB');
        }
    }
    return { db, client };
}

// Endpoint para obter os resultados
app.get('/api/resultados', async (req, res) => {
    try {
        const { db } = await connectToMongo();
        const collectionResultados = db.collection(result_collection);
        const ultimoResultado = await collectionResultados.findOne({}, { sort: { _id: -1 } }); // Ordena por _id decrescente
        res.json(ultimoResultado);

    } catch (error) {
        console.error('Erro ao obter resultados:', error);
        res.status(500).send('Erro ao obter resultados');
    }
});

// Endpoint para obter notificações
app.get('/api/notificacoes', async (req, res) => {
    try {
        const { db } = await connectToMongo();
        const collection = db.collection(notif_collection);
        const resultados = await collection.find({}).toArray();
        res.json(resultados);

    } catch (error) {
        console.error('Erro ao obter resultados:', error);
        res.status(500).send('Erro ao obter resultados');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando...`);
});

