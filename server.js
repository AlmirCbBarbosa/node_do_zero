import {fastify} from 'fastify';
import {DatabaseMemory} from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const port = 3333;

const database = new DatabasePostgres();

//criando rotas
server.get('/',()=>{ //raiz
    return 'Gerenciar videos';
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
