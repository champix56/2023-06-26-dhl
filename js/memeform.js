var currentMeme = new Meme();
//console.log(currentMeme);
function initMemeEditor() {
  var form = document.forms["meme-form"];
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
}
function renderMeme(meme) {
  if (undefined === meme) {
    meme = currentMeme;
  }
  var svg = document.querySelector("#editor-viewer svg");
  var textElement = svg.querySelector("text");
  var imgElement = svg.querySelector("image");
  var img=images.find(function(img){return img.id===meme.imageId})
  ;
  imgElement.setAttribute("xlink:href", img.url);

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
  var select = document.forms["meme-form"]["imageId"];
  //vidange du select
  var children0 = select.children[0].cloneNode(true);
  select.innerHTML = "";

  var optBase = document.createElement("option");
  optBase.value = "erty";
  optBase.innerHTML = "text visuel";
  select.appendChild(optBase);
  // for(var i=0;i<images.length;i++){
  //     console.log(images[i]);
  // }
  images.forEach(function (img) {
    var opt = optBase.cloneNode(true);
    opt.value = img.id;
    opt.innerHTML = img.titre;
    select.appendChild(opt);
  });
}
