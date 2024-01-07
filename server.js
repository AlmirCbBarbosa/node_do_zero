import {fastify} from 'fastify';
import fastifyCors from '@fastify/cors';
import fs from 'node:fs';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const port = 3333;
 
server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
});
 
const database = new DatabasePostgres();

//criando rotas
server.get('/',(request, reply)=>{ //raiz
    fs.readFile('./formulario.html','utf-8', (err, data)=>{
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
});

console.log(`Acesse a aplicação através do endereço: http://localhost:${port}`);
