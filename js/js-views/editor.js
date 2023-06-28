import { router } from "../router.js";
import { Meme } from "../metier/Meme.js";
import { ressources } from "../metier/Ressources.js";
const svgViewerSelector = "#editor-viewer svg";
let currentMeme = undefined;
let currentImage = undefined;
export const initEditor = () => {
  initFormEvent();
  if (ressources.isLoaded) {
    reloadImageSelect();
    initCurrentMemeByRouteParam()
  } else {
    ressources.loadRessources(() => {
      reloadImageSelect();
      initCurrentMemeByRouteParam()
    });
  }
};
const initCurrentMemeByRouteParam=()=>{
    const paramId=router.params.id
    if(undefined!==paramId){
        setCurrentMeme(ressources.memes.find(m=>m.id===Number(paramId)))
    }
}
const initFormEvent = () => {
  var form = document.forms["meme-form"];
  form["titre"].addEventListener("input", function (evt) {
    currentMeme.titre = evt.target.value;
    // Meme.render(currentMeme,svgViewerSelector,currentImage);
  });
  form["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId = Number(evt.target.value);
    currentImage = ressources.images.find(
      (img) => img.id === currentMeme.imageId
    );
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["text"].addEventListener("input", function (evt) {
    currentMeme.text = evt.target.value;
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["x"].addEventListener("input", function (evt) {
    currentMeme.x = Number(evt.target.value);
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["y"].addEventListener("input", function (evt) {
    currentMeme.y = Number(evt.target.value);
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["color"].addEventListener("input", function (evt) {
    currentMeme.color = evt.target.value;
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["fontSize"].addEventListener("input", function (evt) {
    currentMeme.fontSize = Number(evt.target.value);
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["fontWeight"].addEventListener("input", function (evt) {
    currentMeme.fontWeight = evt.target.value;
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["underline"].addEventListener("input", function (evt) {
    currentMeme.underline = evt.target.checked;
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
  form["italic"].addEventListener("input", function (evt) {
    currentMeme.italic = evt.target.checked;
    Meme.render(currentMeme, svgViewerSelector, currentImage);
  });
};
const initFormValues = () => {
  const form = document.forms["meme-form"];
  form["titre"].value = currentMeme.titre;
  form["imageId"].value = currentMeme.imageId;
  form["text"].value = currentMeme.text;
  form["x"].value = currentMeme.x;
  form["y"].value = currentMeme.y;
  form["color"].value = currentMeme.color;
  form["fontSize"].value = currentMeme.fontSize;
  form["fontWeight"].value = currentMeme.fontWeight;
  form["underline"].checked = currentMeme.underline;
  form["italic"].checked = currentMeme.italic;
};
const reloadImageSelect = () => {
    const select=document.querySelector('#editor select')
    select.innerHTML='';
    const opt=document.createElement('option')
    opt.value=-1;
    opt.innerHTML='pas d\'image';
    select.appendChild(opt);
    ressources.images.forEach(img=>{
        const optCloned=opt.cloneNode(true);
        optCloned.value=img.id;
        optCloned.innerHTML=img.titre;
        select.appendChild(optCloned)
    })
};
export const setCurrentMeme = (meme=new Meme()) => {
  currentMeme = meme;
  currentImage = ressources.images.find(
    (img) => img.id === currentMeme.imageId
  );
  initFormValues();
  Meme.render(currentMeme,svgViewerSelector,currentImage);
};
