import { initMemeEditor } from "./memeform.js";

const routesConfig = {
  routes: [
    {
      name: "editor",path: "/editor",
      htmlTemplateUrl: "/vues/editor.html",
      initFunction: initMemeEditor,
    },
    {
        name: "Thumbnail",path: "/thumb",
        // htmlTemplateUrl: "/vues/thumbnail.html",
        templateText:'<div id="thumbnail">thumbnail</div>',
        //initFunction: initMemeEditor,
    },
    
    {
        name: "home",path: "/",
        htmlTemplateUrl: "/vues/home.html",
      },
  ],
  fallbackRoute:{htmlTemplateUrl: "/vues/error.html",}
};
/**
 * fonction de gestion de la route courrante passé en parametre
 */
const handleRoute = () => {
    const currentPath=location.pathname
    //avec array.find
    let routeFound=routesConfig.routes.find(route=>route.path===currentPath)    

    //  -----------------------------
    //avec boucle old school 
    //  -----------------------------
    //  
    //  let routeFound=-1     ;
    //  let routeIndex=0;

    //  do {
    //     if(routesConfig.routes[routeIndex]===routeName){
    //         routeFound=routeIndex;
    //     }
    //     else {
    //         routeIndex++;
    //     }
    //   } while (routeFound===-1 && routeIndex<routesConfig.routes.length );
  if(undefined!==routeFound){routeTemplateLoader(routeFound,handleNormalRoute)}
  else {routeTemplateLoader(routesConfig.fallbackRoute,(route)=>{handleErrorRoute(route,404)})}
};
/**
 * lazy loader de template (chargement a la demande)
 * @param {Route} routeFound objet de routeConfig.route de la route a loader et afficher 
//  * @param {Function} callback ref. de fonction d'execution du chargement dans le DOM 
 */
const routeTemplateLoader=(routeFound, callback)=>{
    if(undefined!==routeFound.templateText){
        //contenu de route deja present
        callback(routeFound)
    }
    else{
        //contenu a charger lors du premier usage
        fetch(routeFound.htmlTemplateUrl).then(resp=>resp.text()).then(text=>{
            routeFound.templateText=text;
            callback(routeFound)
        })
    }
}
const handleNormalRoute=(route)=>{
    const article=document.querySelector('article');
    article.innerHTML=route.templateText;
    if(undefined!==route.initFunction && typeof route.initFunction==='function')route.initFunction();
}
const handleErrorRoute=(route,statusCode)=>{
    handleNormalRoute(route);
    document.querySelector('#error h2').innerHTML=statusCode;
}
export default handleRoute