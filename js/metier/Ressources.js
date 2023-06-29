import REST_ADR, { RESSOUORCE_PATH } from "../constantes.js";

export class Ressources {
  #isLoaded = false;
  #images = [];
  #memes = [];
  get memes() {
    return this.#memes;
  }
  get images() {
    return this.#images;
  }
  get isLoaded() {
    return this.#isLoaded;
  }
  /**
   * chargement de ressources
   * @param {Function} callback 
   */
  loadRessources(callback) {
    const promiseImages = fetch(REST_ADR + RESSOUORCE_PATH.images).then(
      (resp) => resp.json()
    );
    const promiseMemes = fetch(REST_ADR + RESSOUORCE_PATH.memes).then((resp) =>
      resp.json()
    );
    Promise.all([promiseImages, promiseMemes]).then((array) => {
      console.log(array);
      this.#images.splice(0);
      this.#images.push(...array[0]);
      this.#memes.splice(0);
      this.#memes.push(...array[1]);
      this.#isLoaded=true;
      //&& typeof callback ==='function'
      if(undefined!==callback ){callback(this)}
    });
  }
}
export const ressources = new Ressources();
