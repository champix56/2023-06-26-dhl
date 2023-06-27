var currentMeme = new Meme();
//console.log(currentMeme);
function initMemeEditor() {
  var form = document.forms["meme-form"];
  form["titre"].addEventListener("input", function (evt) {
    currentMeme.titre = evt.target.value;
    // renderMeme();
  });

  form["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId = evt.target.value;
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
