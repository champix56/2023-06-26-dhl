import {REST_ADR, ressourcesPath} from './constantes.js'
class Ressources{
    images
    memes
    constructor(){
        this.images=[]
        this.memes=[]
    }
    loadRessources(callback){
        const primage=this.#getDatas(ressourcesPath.images)
        const prmemes=this.#getDatas(ressourcesPath.memes)
        Promise.all([primage,prmemes]).then(dataArray=>{
            this.images.splice(0);
            this.images=dataArray[0];
            this.memes.splice(0);
            this.memes=dataArray[1];
            if(undefined !==callback)callback(this);
        })
    }
    #getDatas(ressourcePath){
        return fetch(REST_ADR+ressourcePath).then(r=>r.json())
    }
    
 renderMeme(meme,baseSelector) {
    if (undefined === meme) {
      meme = currentMeme;
    }
    let svg = document.querySelector(baseSelector+" svg");
    let textElement = svg.querySelector("text");
    let imgElement = svg.querySelector("image");
    let img = ressources.images.find(function (img) {
      return img.id === meme.imageId;
    });
    if (undefined !== img) {
      imgElement.setAttribute("xlink:href", img.url);
      imgElement.style.display = "block";
      svg.setAttribute("viewBox", `0 0 ${img.w} ${img.h}`);
    } else {
      imgElement.setAttribute("xlink:href", "");
      imgElement.style.display = "none";
      svg.setAttribute("viewBox", `0 0 500 500`);
    }
    textElement.innerHTML = meme.text;
    textElement.style.fill = meme.color;
    textElement.style.textDecoration = meme.underline ? "underline" : "none";
    //textElement.style.fontStyle = meme.italic ? "italic" : "normal";
    textElement.setAttribute("font-style", meme.italic ? "italic" : "normal");
    textElement.setAttribute("font-weight", meme.fontWeight);
    textElement.setAttribute("font-size", meme.fontSize);
    textElement.setAttribute("x", meme.x);
    textElement.setAttribute("y", meme.y);
  }
  
}
const ressources=new Ressources();
ressources.loadRessources();
export default ressources;