/**
 * fonction d'initialisation
 * @returns {undefined} aucun retour
 */
function init() {
    var currentDate=new Date();
    console.log(currentDate.toISOString());
    var footer=document.getElementsByTagName('footer')[0];
    footer.innerHTML=currentDate.toISOString();
}

init();