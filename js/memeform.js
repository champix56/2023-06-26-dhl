import Meme from "./Meme.js";
import ressources from "./values.js";
let currentMeme = new Meme();
//console.log(currentMeme);
export function initMemeEditor() {
  let form = document.forms["meme-form"];
  form["titre"].addEventListener("input", function (evt) {
    currentMeme.titre = evt.target.value;
    // renderMeme(currentMeme,'#editor-viewer');
  });
  form["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId = Number(evt.target.value);
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["text"].addEventListener("input", function (evt) {
    currentMeme.text = evt.target.value;
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["x"].addEventListener("input", function (evt) {
    currentMeme.x = Number(evt.target.value);
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["y"].addEventListener("input", function (evt) {
    currentMeme.y = Number(evt.target.value);
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["color"].addEventListener("input", function (evt) {
    currentMeme.color = evt.target.value;
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["fontSize"].addEventListener("input", function (evt) {
    currentMeme.fontSize = Number(evt.target.value);
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["fontWeight"].addEventListener("input", function (evt) {
    currentMeme.fontWeight = evt.target.value;
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["underline"].addEventListener("input", function (evt) {
    currentMeme.underline = evt.target.checked;
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  form["italic"].addEventListener("input", function (evt) {
    currentMeme.italic = evt.target.checked;
    ressources.renderMeme(currentMeme,'#editor-viewer');
  });
  initFormValueFromCurrent();
  if (ressources.images.length > 0) {
    loadSelectImages(ressources.images);
  } else {
    ressources.loadRessources((ress) => {
      loadSelectImages(ress.images);
    });
  }
  ressources.renderMeme(currentMeme,"#editor-viewer");
}
/**
 * init values form current meme to form
 */
function initFormValueFromCurrent() {
  let form = document.forms["meme-form"];
  form["titre"].value = currentMeme.titre;
  form["imageId"].value = currentMeme.imageId;
  form["text"].value = currentMeme.titre;
  form["x"].value = currentMeme.x;
  form["y"].value = currentMeme.y;
  form["color"].value = currentMeme.color;
  form["fontSize"].value = currentMeme.fontSize;
  form["fontWeight"].value = currentMeme.fontWeight;
  form["underline"].checked = currentMeme.underline;
  form["italic"].checked = currentMeme.italic;
}
function loadSelectImages(images) {
  let select = document.forms["meme-form"]["imageId"];
  //vidange du select
  let childrenNoImage = select.children[0].cloneNode(true);
  select.innerHTML = "";
  select.appendChild(childrenNoImage);

  let optBase = document.createElement("option");

  // for(let i=0;i<images.length;i++){
  //     console.log(images[i]);
  // }
  images.forEach(function (img) {
    let opt = optBase.cloneNode(true);
    opt.value = img.id;
    opt.innerHTML = img.titre;
    select.appendChild(opt);
  });
}
