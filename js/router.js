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
      path: "/",
      templateUrl: "/view/home.html",
      templateText:
        '\
      <div id="home">\
        <button>benjamin</button>\
      </div>',
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
    this.#loadCurrentDOMContent();
  }
  /**
   * navigate to
   * @param {string} pathName chemin commencant par /
   */
  changeRoute(pathName) {}
  /**
   * chargement du contenu text/html de la vue dans le noeuds du selecteur en parametre
   * @param {string} domContainerSelector css selecteur du noeud a charger pour la vue
   */
  #loadCurrentDOMContent(domContainerSelector = "article") {
    document.querySelector(domContainerSelector).innerHTML =
      this.#curentRoute.templateText;
  }
}
export const router = new Router();
