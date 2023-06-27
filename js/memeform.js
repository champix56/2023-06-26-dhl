var currentMeme = new Meme();
//console.log(currentMeme);
function initMemeEditor() {
  var form = document.forms["meme-form"];
  form["titre"].addEventListener("input", function (evt) {
    currentMeme.titre = evt.target.value;
  });

  form["imageId"].addEventListener("change", function (evt) {
    currentMeme.imageId = evt.target.value;
  });
  form["text"].addEventListener("input", function (evt) {
    currentMeme.text = evt.target.value;
  });
  form["x"].addEventListener("input", function (evt) {
    currentMeme.x = Number(evt.target.value);
  });
  form["y"].addEventListener("input", function (evt) {
    currentMeme.y =Number(evt.target.value);
  });
  form["color"].addEventListener("input", function (evt) {
    currentMeme.color = evt.target.value;
  });
  form["fontSize"].addEventListener("input", function (evt) {
    currentMeme.fontSize = Number(evt.target.value);
  });
  form["fontWeight"].addEventListener("input", function (evt) {
    currentMeme.fontWeight = evt.target.value;
  });
  form["underline"].addEventListener("input", function (evt) {
    currentMeme.underline = evt.target.checked;
  });
  form["italic"].addEventListener("input", function (evt) {
    currentMeme.italic = evt.target.checked;
  });
}
