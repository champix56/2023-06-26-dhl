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
  }
  /**
   * navigate to
   * @param {string} pathName chemin commencant par /
   */
  changeRoute(pathName) {}
}
export const router = new Router();
