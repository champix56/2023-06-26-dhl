import handleRoute from './router.js';
import ressources from './values.js'
export function initTumbnail(){
   
    if(ressources.memes.length<=0 || ressources.images.length<=0){
        ressources.loadRessources(mountMemeInThumbnail);
    }
    else {
        mountMemeInThumbnail(ressources);
    }
}
const mountMemeInThumbnail=(ressourcesLoaded)=>{
    const article=document.querySelector('article');
    // create svgContext
    const svgContainer=document.createElement('div');
    svgContainer.className='meme';
    const svgContainerA=document.createElement('a');
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('xmlns:xlink',"http://www.w3.org/1999/xlink");
    svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
    svg.setAttribute('height',"100%");
    svg.setAttribute('width',"100%");
    svg.setAttribute("version","1.1");
    const img=document.createElementNS('http://www.w3.org/2000/svg','image');
    img.setAttribute("x",0);
    img.setAttribute("y",0);
    img.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','')
    const txt=document.createElementNS('http://www.w3.org/2000/svg','text');
    svg.appendChild(img);
    svg.appendChild(txt);
    svgContainerA.appendChild(svg);
    svgContainer.appendChild(svgContainerA);
    
    //create all thumbnail container
    const thumbContainer=document.createElement('div');
    thumbContainer.id="thumbnail"
    article.innerHTML="";
    article.appendChild(thumbContainer);
    ressources.memes.forEach((meme,i)=>{
        const svgCurrentContainer=svgContainer.cloneNode(true);
        var currentContainerId='thumb-meme-'+i;
        svgCurrentContainer.id=currentContainerId
        thumbContainer.appendChild(svgCurrentContainer);
        ressources.renderMeme(meme,'#'+currentContainerId);
        svgCurrentContainer.querySelector('a').addEventListener('click',(evt)=>{
            evt.preventDefault();
            history.pushState(null,null,'/editor/'+meme.id)
            handleRoute();
        })
    })
}