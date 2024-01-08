import {fastify} from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import fs from 'node:fs';
import { DatabasePostgres } from './database-postgres.js';
import { fileURLToPath } from 'node:url';

//configurações iniciais
const server = fastify();
const port = 3333;

//CORS
server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
});

//__dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//configurando arquivos estáticos
server.register(fastifyStatic,{
    root: path.join(__dirname, './'),
    wildcard: false //oque é isso?
})


const database = new DatabasePostgres();

//criando rotas
server.get('/',(request, reply)=>{ //raiz
    const filePath = path.join(__dirname, 'formulario.html');

    fs.readFile(filePath,'utf-8', async(err, data)=>{
        reply.header('Content-Type', 'text/html');
        reply.status(200).send(data);
    });
});

server.post('/videos', async(request,reply)=>{ // post cria um registro
    const {title, description, duration} = request.body //pegar os dados de formulario no corpo da requisição
    

    await database.create(
        {
            title: title,
            description: description,
            duration: duration,
        }
    )    
    
    return reply.status(201).send();
});



server.get('/videos', async (request, reply)=>{ // get busca informação de um registro
    const search = request.query.search    

    const videos = await database.list(search);

    return reply.status(200).send(videos);
});

server.put('/videos/:id', async(request, reply)=>{ //put atualiza um registro
    const videoId = request.params.id;
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title: title,
        description: description,
        duration: duration
    })

    return reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply)=>{ //delete apaga um registro
    const videoId = request.params.id;

    await database.delete(videoId);
    return reply.status(204).send();
});

//comandos finais
server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? port,
    pluginTimeout: 10,
});

console.log(`Acesse a aplicação através do endereço: http://localhost:${port}`);
