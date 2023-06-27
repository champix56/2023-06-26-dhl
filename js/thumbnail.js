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
    const img=document.createElementNS('http://www.w3.org/2000/svg','image');
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
    })
}