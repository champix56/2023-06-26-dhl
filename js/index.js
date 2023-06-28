import { router } from "./router.js"

document.addEventListener('DOMContentLoaded',(evt)=>{
    router.handleRoute()
    console.log(router.currentRoute)
})