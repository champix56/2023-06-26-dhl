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
      initialisation: () => {
        document.querySelector("#home button").addEventListener("click", () => {
          alert("clické");
        });
      },
      templateUrl: "/view/home.html",
      templateText:
        '<div id="home">\
            <h2>Bienvenue sur le createur de meme</h2>\
            pour creer u nnouveau meme cliquez ici -><button class="btn btn-primary">Nouveau meme</button>\
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
    if (undefined !== this.#curentRoute.initialisation) {
      this.#curentRoute.initialisation();
    }
  }
}
/**
 * shared router instance for navigation in app
 */
export const router = new Router();
