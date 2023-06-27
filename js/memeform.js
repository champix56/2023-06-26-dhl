import Meme from "./Meme.js";
import { images } from "./values.js";
let currentMeme = new Meme();
//console.log(currentMeme);
export function initMemeEditor() {
  let form = document.forms["meme-form"];
  form["titre"].addEventListener("input", function (evt) {
    currentMeme.titre = evt.target.value;
    // renderMeme();
  });
  form["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId = Number(evt.target.value);
    renderMeme();
  });
  form["text"].addEventListener("input", function (evt) {
    currentMeme.text = evt.target.value;
    renderMeme();
  });
  form["x"].addEventListener("input", function (evt) {
    currentMeme.x = Number(evt.target.value);
    renderMeme();
  });
  form["y"].addEventListener("input", function (evt) {
    currentMeme.y = Number(evt.target.value);
    renderMeme();
  });
  form["color"].addEventListener("input", function (evt) {
    currentMeme.color = evt.target.value;
    renderMeme();
  });
  form["fontSize"].addEventListener("input", function (evt) {
    currentMeme.fontSize = Number(evt.target.value);
    renderMeme();
  });
  form["fontWeight"].addEventListener("input", function (evt) {
    currentMeme.fontWeight = evt.target.value;
    loadSelectImages();
    renderMeme();
  });
  form["underline"].addEventListener("input", function (evt) {
    currentMeme.underline = evt.target.checked;
    renderMeme();
  });
  form["italic"].addEventListener("input", function (evt) {
    currentMeme.italic = evt.target.checked;
    renderMeme();
  });
  initFormValueFromCurrent();
  loadSelectImages(images);
  renderMeme();
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
function renderMeme(meme) {
  if (undefined === meme) {
    meme = currentMeme;
  }
  let svg = document.querySelector("#editor-viewer svg");
  let textElement = svg.querySelector("text");
  let imgElement = svg.querySelector("image");
  let img = images.find(function (img) {
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
