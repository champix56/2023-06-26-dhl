import { Meme } from "../metier/Meme.js";
import { ressources } from "../metier/Ressources.js";
import { router } from "../router.js";
let currentMeme;
let currentImage;
const VIEW_EDITOR_CSS_SELECTOR = "#editor";
export const initEditor = () => {
  console.log(router.params);
  initFormEvent();
  if (ressources.isLoaded) {
    initSelectImages();
    setCurrentMeme();
    if (undefined !== router.params.id) {
      currentMeme = ressources.meme.find(
        (m) => m.id === Number(router.params.id)
      );
    } else {
      currentMeme = new Meme();
    }
  } else {
    ressources.loadRessources((res) => {
      initSelectImages();
   
      if (undefined !== router.params.id) {
        currentMeme = ressources.meme.find(
          (m) => m.id === Number(router.params.id)
        );
      } else {
        currentMeme = new Meme();
      }   
      setCurrentMeme();
    });
  }
};
const initFormEvent = () => {
  var form = document.forms["meme-form"];
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    currentMeme.save((memeSaved) => {
      ressources.memes.push(memeSaved);
      router.changeRoute("/thumbnail");
    });
  });
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
  form["titre"].value = currentMeme.titre;
  form["text"].value = currentMeme.text;
  form["x"].value = currentMeme.x;
  form["y"].value = currentMeme.y;
  form["imageId"].value = currentMeme.imageId;
  form["fontSize"].value = currentMeme.fontSize;
  form["fontWeight"].value = currentMeme.fontWeight;
  form["color"].value = currentMeme.color;
  form["underline"].checked = currentMeme.underline;
  form["italic"].checked = currentMeme.italic;
};
const setCurrentMeme = (meme = currentMeme) => {
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
