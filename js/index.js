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
/**
 * changement d'etat de theme
 * @param {boolean} isDark etat du choix de theme dark/clear
 */
function changeTheme(isDark) {
  var nav = document.getElementsByTagName("nav")[0];
  var slider = document.getElementById("theme-swith");
  if (isDark) {
    document.body.className = "dark";
    nav.classList.replace("navbar-light", "navbar-dark");
    nav.classList.replace("bg-light", "bg-dark");
    slider.checked = true;
  } else {
    document.body.className = "";
    nav.classList.replace("navbar-dark", "navbar-light");
    nav.classList.replace("bg-dark", "bg-light");
    slider.checked = false;
  }
}
document.addEventListener("DOMContentLoaded", function (evt) {
  console.log(evt);
  init();
});
