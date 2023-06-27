import { REST_ADR, ressourcesPath } from "./constantes.js";

export default function Meme() {
    this.titre='';
    this.text='';
    this.x=0;
    this.y=20;
    this.imageId=-1;
    this.fontSize=20;
    this.fontWeight='500';
    this.underline=false;
    this.italic=false;
    this.color='#000000'
    this.save=(callback)=>{
        fetch(`${REST_ADR}${ressourcesPath.memes}/${undefined!==this.id?this.id:''}`,
        {
            method:undefined!==this.id?'PUT':'POST',
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify(this)
        }).then(resp=>resp.json()).then(m=>callback(m))
    }
}
