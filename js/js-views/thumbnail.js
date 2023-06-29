import { Meme } from "../metier/Meme.js";
import { ressources } from "../metier/Ressources.js";
const baseView = "#thumbnail";
const PREVIEW_CONTAINER = "#thumbnail-container";
export const initTumbnail = () => {
  if (ressources.isLoaded) {
    initPreview();
  } else {
    ressources.loadRessources(() => {
      initPreview();
    });
  }
};
const initPreview = () => {
    const ListContainer=document.querySelector(PREVIEW_CONTAINER)
    const basePreviewer=document.querySelector('#thumbnail-meme-')
    ressources.memes.forEach(m=>{
        const newPreviewer=basePreviewer.cloneNode(true);
        newPreviewer.id+=m.id
        newPreviewer.querySelector('a').href+=m.id
        newPreviewer.querySelector('a>div').innerHTML=m.titre
        ListContainer.appendChild(newPreviewer);
        const img=ressources.images.find(im=>im.id===m.imageId)
        Meme.render(m,'#'+newPreviewer.id,img)
    })
};
