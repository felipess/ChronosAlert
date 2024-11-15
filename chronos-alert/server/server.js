import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;
const result_collection = process.env.COLLECTION_RESULT;
const notif_collection = process.env.COLLECTION_NOTIF;
const postit_collection = process.env.COLLECTION_POSTIT;
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

// Endpoint para criar um novo post-it
app.post('/api/postits', async (req, res) => {
    try {
        const { db } = await connectToMongo();
        const collection = db.collection(postit_collection);

        await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 172800 }); // Exclui documentos após 2 dias
        const newPostIt = req.body;

        // Adiciona o campo 'createdAt' e as informações do 'usuario'
        const postItWithDate = {
            ...newPostIt,
            createdAt: new Date(),
            usuario: newPostIt.usuario,
        };

        // Insira o novo post-it na coleção
        const result = await collection.insertOne(postItWithDate);

        // Se a inserção ok, retorna o novo post-it e ID
        if (result.acknowledged) {
            const insertedPostIt = { _id: result.insertedId, ...postItWithDate };
            res.status(201).json(insertedPostIt);
        } else {
            res.status(500).send('Erro ao criar post-it');
        }
    } catch (error) {
        console.error('Erro ao criar post-it:', error);
        res.status(500).send('Erro ao criar post-it');
    }
});

// Endpoint para obter todos os post-its
app.get('/api/postits', async (req, res) => {
    try {
        const { db } = await connectToMongo();
        const collection = db.collection(postit_collection);
        const postIts = await collection.find({}).toArray();
        res.json(postIts);
    } catch (error) {
        console.error('Erro ao obter post-its:', error);
        res.status(500).send('Erro ao obter post-its');
    }
});

/* Endpoint para atualizar um post-it */
app.put('/api/postits/:id', async (req, res) => {
    try {
        const { db } = await connectToMongo();
        const collection = db.collection(postit_collection);

        const updatedPostIt = { text: req.body.text };

        // Se o usuário for passado, incluir o campo usuario na atualização
        if (req.body.usuario) {
            updatedPostIt.usuario = req.body.usuario;
        }

        // Atualize o 'createdAt' para a data atual
        updatedPostIt.createdAt = new Date();

        // Operação de atualização
        const updateFields = {
            $set: updatedPostIt
        };

        // Primeiro, tenta encontrar o post-it para garantir que 'createdAt' seja configurado apenas quando necessário
        const postIt = await collection.findOne({ _id: new ObjectId(req.params.id) });

        // Realiza a atualização do post-it
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            updateFields,
            { returnDocument: 'after' }
        );

        if (!result.text) {
            return res.status(404).send('Post-it não encontrado');
        }

        res.json(result);

    } catch (error) {
        console.error('Erro ao atualizar post-it:', error);
        res.status(500).send('Erro ao atualizar post-it');
    }
});

// Endpoint para excluir um post-it
app.delete('/api/postits/:id', async (req, res) => {
    try {
        const { db } = await connectToMongo();
        const collection = db.collection(postit_collection);
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).send('Post-it não encontrado');
        }
    } catch (error) {
        console.error('Erro ao excluir post-it:', error);
        res.status(500).send('Erro ao excluir post-it');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando...`);
});