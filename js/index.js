/**
 * fonction d'initialisation
 * @returns {undefined} aucun retour
 */
function init() {
  var currentDate = new Date();
  console.log(currentDate.toISOString());
  var footer = document.getElementsByTagName("footer")[0];
  footer.innerHTML = currentDate.toISOString();
  footer.style.backgroundColor = "rgba(128,128,100,0.3)";
  footer.style.color = "white";
  footer.style.fontStyle = "italic";
  footer.style.fontWeight = "900";
  footer.style.textDecoration = "underline";
}

document.addEventListener("DOMContentLoaded", function (evt) {
  console.log(evt);
  init();
});
