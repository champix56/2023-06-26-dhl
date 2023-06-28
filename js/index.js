import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", (evt) => {
  document
    .querySelector("#theme-swith")
    .addEventListener("change", function (evt) {
      changeTheme(evt.target.checked);
    });

  router.handleRoute();
  const isDarkOnLoad = loadThemeToLocalStorage();
  if (isDarkOnLoad !== undefined) {
    changeTheme(isDarkOnLoad);
  }
  console.log(router.currentRoute);
});
/**
 * changement d'etat de theme
 * @param {boolean} isDark etat du choix de theme dark/clear
 */
function changeTheme(isDark) {
  var nav = document.getElementsByTagName("nav")[0];
  var slider = document.getElementById("theme-swith");
  var lbl = document.querySelector("#theme label");
  if (isDark) {
    document.body.className = "dark";
    nav.classList.replace("navbar-light", "navbar-dark");
    nav.classList.replace("bg-light", "bg-dark");
    slider.checked = true;
    lbl.innerHTML = "dark";
  } else {
    document.body.className = "";
    nav.classList.replace("navbar-dark", "navbar-light");
    nav.classList.replace("bg-dark", "bg-light");
    slider.checked = false;
    lbl.innerHTML = "clear";
  }
  saveThemeToLocalStorage(isDark);
}
function saveThemeToLocalStorage(isDark) {
  localStorage.setItem("darkTheme", isDark);
}
function loadThemeToLocalStorage() {
  return localStorage.getItem("darkTheme");
}
// const f=async()=>{
//     const pr=await fetch('http://localhost:5679/memes')
//     const r=await pr.json();
//     console.log(r)
// }
