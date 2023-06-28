import { Meme } from "../metier/Meme.js";
import { ressources } from "../metier/Ressources.js"
const newMemeDivSelector='#thumbnail-meme-'
export const initThumbnail=()=>{
    if(ressources.isLoaded){
        initMemeListThumbnail();
    }
    else{
        ressources.loadRessources(()=>{
            initMemeListThumbnail();
        })
    }
}
const initMemeListThumbnail=()=>{
    const newMemeExample=document.querySelector(newMemeDivSelector)
    const listThumbnailContainer=document.querySelector('#thumbnail #thumbnail-container')
    ressources.memes.forEach(m=>{
        const clonedMemeDiv=newMemeExample.cloneNode(true);
        clonedMemeDiv.id+=m.id
        clonedMemeDiv.querySelector('a').href='/editor/'+m.id
        clonedMemeDiv.querySelector('a>div').innerHTML=m.titre;
        listThumbnailContainer.appendChild(clonedMemeDiv);
        Meme.render(m,'#'+clonedMemeDiv.id+' svg',ressources.images.find(im=>im.id===m.imageId));
    })
}