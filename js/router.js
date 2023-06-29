import { initEditor } from "./js-views/editor.js";
import { initHome } from "./js-views/home.js";
import { initTumbnail } from "./js-views/thumbnail.js";
/**
 * variable de config des routes
 */
const routeConfig = {
  routes: [
    {
      path: "/thumbnail",
      initialisation: initTumbnail,
      templateUrl: "/view/thumbnail.html",
    },
    {
      path: /\/editor(\/(?<id>\d*))?/,
      initialisation: initEditor,
      templateUrl: "/view/editor.html",
    },
    {
      path: "/",
      initialisation: initHome,
      templateUrl: "/view/home.html",
    },
    {
      path: "/break",
      initialisation: undefined,
      templateUrl: "/view/templateQuiExistePasSurLeServeur.html",
    },
  ],
};

class Router {
  #curentRoute;
  #params={};
  get params(){return this.#params;}
  get currentRoute() {
    return this.#curentRoute;
  }
  constructor() {
    document.addEventListener("DOMContentLoaded", (evt) => {
      this.#initRouterLinks();
    });
  }
  //set currentRoute(value){this.#curentRoute=value}
  /**
   * manage la route en cours
   */
  handleRoute() {
    const pathName = location.pathname;
    console.log(pathName);
    this.#params={};
    this.#curentRoute = routeConfig.routes.find(
      (route) =>{
        if(route.path instanceof RegExp){
          //c'est une regex
          const regReturn=route.path.exec(pathName)
          if(null!==regReturn){
            //ca a match
            this.#params={...regReturn.groups}
            return true;
          }
          else return false
        }
        else{
          //c'est une chaine
        return route.path === pathName
      }
      
      }
    );
    this.#instanciateCurrentRouteTemplate();
  }
  /**
   * navigate to
   * @param {string} pathName chemin commencant par /
   */
  changeRoute(pathName) {
    history.pushState(undefined, undefined, pathName);
    this.handleRoute();
  }
  /**
   * initialise le contenu de templateText si non present
   * et declenche le chargement DOM du contenu
   */
  #instanciateCurrentRouteTemplate() {
    if (undefined !== this.#curentRoute.templateText) {
      this.#loadCurrentDOMContent();
    } else {
      fetch(this.#curentRoute.templateUrl)
        .then((resp) => resp.text())
        .then((t) => {
          this.#curentRoute.templateText = t;
          this.#loadCurrentDOMContent();
        });
    }
  }
  /**
   * chargement du contenu text/html de la vue dans le noeuds du selecteur en parametre
   * @param {string} domContainerSelector css selecteur du noeud a charger pour la vue
   */
  #loadCurrentDOMContent(domContainerSelector = "article") {
    document.querySelector(domContainerSelector).innerHTML =
      this.#curentRoute.templateText;
    this.#initRouterLinks(domContainerSelector);
    if (undefined !== this.#curentRoute.initialisation) {
      this.#curentRoute.initialisation();
    }
  }
  #initRouterLinks(baseSelector = "body") {
    const links = document.querySelectorAll(baseSelector + " a");
    links.forEach((link) => {
      link.removeEventListener("click", this.#handleLinkEvent);
      link.addEventListener("click", this.#handleLinkEvent);
    });
  }
  #handleLinkEvent=(evt)=> {
    evt.preventDefault();
    this.changeRoute(evt.target.href);
  }
}
/**
 * shared router instance for navigation in app
 */
export const router = new Router();
