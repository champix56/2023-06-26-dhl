import { ressource } from "../metier/Ressources.js";
let currentMeme;
const VIEW_EDITOR_CSS_SELECTOR="#editor"
export const initEditor=()=>{

}
const initFormEvent=()=>{

}
const initFormValues=()=>{

}
const setCurrentMeme=()=>{

}
const initSelectImages=()=>{
    var select = document.forms["meme-form"]["imageId"];
     select.innerHTML = "";
  
    var optBase = document.createElement("option");
    optBase.value = "-1";
    optBase.innerHTML = "only text";
    select.appendChild(optBase);

    ressources.images.forEach(function (img) {
      var opt = optBase.cloneNode(true);
      opt.value = img.id;
      opt.innerHTML = img.titre;
      select.appendChild(opt);
    });
}