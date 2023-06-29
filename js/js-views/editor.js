import { Meme } from "../metier/Meme.js";
import { ressources } from "../metier/Ressources.js";
let currentMeme;
let currentImage;
const VIEW_EDITOR_CSS_SELECTOR = "#editor";
export const initEditor = () => {
  initFormEvent();
  if (ressources.isLoaded) {
    initSelectImages();
    setCurrentMeme(new Meme());
  } else {
    ressources.loadRessources((res) => {
      initSelectImages();
      setCurrentMeme(new Meme());
    });
  }
};
const initFormEvent = () => {
  var form = document.forms["meme-form"];
  form["titre"].addEventListener("input", function (evt) {
    currentMeme.titre = evt.target.value;
    //  Meme.render(currentMeme,VIEW_EDITOR_CSS_SELECTOR,currentImage);
  });

  form["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId = Number(evt.target.value);
    currentImage = ressources.images.find(
      (img) => img.id === currentMeme.imageId
    );
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["text"].addEventListener("input", function (evt) {
    currentMeme.text = evt.target.value;
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["x"].addEventListener("input", function (evt) {
    currentMeme.x = Number(evt.target.value);
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["y"].addEventListener("input", function (evt) {
    currentMeme.y = Number(evt.target.value);
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["color"].addEventListener("input", function (evt) {
    currentMeme.color = evt.target.value;
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["fontSize"].addEventListener("input", function (evt) {
    currentMeme.fontSize = Number(evt.target.value);
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["fontWeight"].addEventListener("input", function (evt) {
    currentMeme.fontWeight = evt.target.value;
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["underline"].addEventListener("input", function (evt) {
    currentMeme.underline = evt.target.checked;
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
  form["italic"].addEventListener("input", function (evt) {
    currentMeme.italic = evt.target.checked;
    Meme.render(currentMeme, VIEW_EDITOR_CSS_SELECTOR, currentImage);
  });
};
const initFormValues = () => {
  const form = document.forms["meme-form"];
  form["titre"].value = current.titre;
  form["text"].value = current.text;
  form["x"].value = current.x;
  form["y"].value = current.y;
  form["imageId"].value = current.imageId;
  form["fontSize"].value = current.fontSize;
  form["fontWeight"].value = current.fontWeight;
  form["color"].value = current.color;
  form["underline"].checked = current.underline;
  form["italic"].checked = current.italic;
};
const setCurrentMeme = (meme) => {
  currentMeme = meme;
  initFormValues();
  const img = ressources.images.find((im) => im.id === meme.imageId);
  Meme.render(meme, VIEW_EDITOR_CSS_SELECTOR, img);
};
const initSelectImages = () => {
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
};
