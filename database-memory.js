//banco de dados em memória para testar a aplicação
import { randomUUID} from "node:crypto"; //funçao para gerar um chave aleatorio

export class DatabaseMemory{
    #videos = new Map()

    list(search){
        return Array.from(this.#videos.entries())
        .map((videoArray)=>{
            const id = videoArray[0];
            const data  = videoArray[1];

            return {
                id: id,
                ...data 
                
            }
        })
        .filter(video=>{ // filtrando pelo query params
            if(search){
                return video.title.includes(search);
            }
            return true
        })
    }

    create(video){
        const videoId = randomUUID();
        this.#videos.set(videoId, video);
   }

   update(id, video){
        this.#videos.set(id, video);
   }

   delete(id){
    this.#videos.delete(id);
   }

}