import {REST_ADR, ressourcesPaths} from '../constantes.js'
export class Ressources{
    #images=[]
    #memes=[]
    #isLoaded=false;
    get memes(){return this.#memes}
    get images(){return this.#images}
    get isLoaded(){return this.#isLoaded}
    loadRessources(callback){
        const pri=fetch(`${REST_ADR}${ressourcesPaths.images}`).then(rsp=>Response.json())
        const prm=fetch(`${REST_ADR}${ressourcesPaths.memes}`).then(rsp=>Response.json())
        Promise.all([pri,prm]).then(arr=>{
            this.#images.splice(0);
            this.#images.push(...arr[0]);
            this.#memes.splice(0);
            this.#memes.push(...arr[1]);
            this.#isLoaded=true;
            callback(this);
        })
    }
}
export const ressources=new Ressources();