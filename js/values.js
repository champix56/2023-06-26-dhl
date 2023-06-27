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
}
const ressources=new Ressources();
ressources.loadRessources();
export default ressources;