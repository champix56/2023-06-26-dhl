import { router } from "../router.js";

export const initHome = () => {
  document.querySelector("#home button").addEventListener("click", () => {
    router.changeRoute('/thumbnail')
  });
};
