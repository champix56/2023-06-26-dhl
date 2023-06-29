import { initEditor } from "./js-views/editor.js";
import { initHome } from "./js-views/home.js";
/**
 * variable de config des routes
 */
const routeConfig = {
  routes: [
    {
      path: "/thumbnail",
      initialisation: undefined,
      templateUrl: "/view/thumbnail.html",
    },
    {
      path: "/editor",
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
    this.#curentRoute = routeConfig.routes.find(
      (route) => route.path === pathName
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
