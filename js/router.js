import { initMemeEditor } from "./memeform.js";
const errorTemplateText =
  '\
<style>\
    #error{padding:20px 10px;}\
    #error h1{color:tomato}\
</style>\
<div id="error">\
    <h1>Error</h1>\
    <p>la page souhaitée repond : </p>\
    <h2>status : <span></span></h2>\
    <h3>status text : <span></span></h3>\
</div>';
const routesConfig = {
  routes: [
    {
      name: "editor",
      path: "/editor",
      htmlTemplateUrl: "/vues/editor.html",
      initFunction: initMemeEditor,
    },
    {
      name: "Thumbnail",
      path: "/thumb",
      // htmlTemplateUrl: "/vues/thumbnail.html",
      templateText: '<div id="thumbnail">thumbnail</div>',
      //initFunction: initMemeEditor,
    },
    {
      name: "breakRoute",
      path: "/b",
      htmlTemplateUrl: "/vues/break.html",
    },
    {
      name: "home",
      path: "/",
      htmlTemplateUrl: "/vues/home.html",
    },
  ],
  fallbackRoute: { templateText: errorTemplateText },
};
/**
 * fonction de gestion de la route courrante passé en parametre
 */
const handleRoute = () => {
  const currentPath = location.pathname;
  //avec array.find
  let routeFound = routesConfig.routes.find(
    (route) => route.path === currentPath
  );

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
  if (undefined !== routeFound) {
    routeTemplateLoader(routeFound, handleNormalRoute);
  } else {
    routeTemplateLoader(routesConfig.fallbackRoute, (route) => {
      handleErrorRoute(route, 404, "not found!!!");
    });
  }
};
/**
 * lazy loader de template (chargement a la demande)
 * @param {Route} routeFound objet de routeConfig.route de la route a loader et afficher 
//  * @param {Function} callback ref. de fonction d'execution du chargement dans le DOM 
 */
const routeTemplateLoader = (routeFound, callback, noContentMount) => {
  if (undefined !== routeFound.templateText) {
    //contenu de route deja present
    callback(routeFound);
  } else {
    //contenu a charger lors du premier usage
    fetch(routeFound.htmlTemplateUrl)
      .then((resp) => {
        if (!resp.ok) {
          routeFound = routesConfig.fallbackRoute;
          callback = (route) => {
            handleErrorRoute(route, resp.status, resp.statusText);
          };
          return { statusCode: resp.status, statusText: resp.statusText };
        }
        return resp.text();
      })
      .then((text) => {
        if (typeof text === "string") {
          routeFound.templateText = text;
        }
        callback(routeFound);
      });
  }
};
const handleNormalRoute = (route) => {
  const article = document.querySelector("article");
  article.innerHTML = route.templateText;
  if (
    undefined !== route.initFunction &&
    typeof route.initFunction === "function"
  )
    route.initFunction();
};
const handleErrorRoute = (route, statusCode, statusText) => {
  handleNormalRoute(route);
  document.querySelector("#error h2 span").innerHTML = statusCode;
  document.querySelector("#error h3 span").innerHTML = statusText;
};
export const initNavbarLink = (navBarSelector) => {
  document.querySelectorAll(navBarSelector + " a").forEach((el) => {
    el.addEventListener("click", (evt) => {
      evt.preventDefault();
      history.pushState(null, null, evt.target.href);
      handleRoute();
    });
  });
};
export default handleRoute;
