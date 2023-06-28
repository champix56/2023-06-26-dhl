import { router } from "./router.js"

document.addEventListener('DOMContentLoaded',(evt)=>{
    router.handleRoute()
    console.log(router.currentRoute)
})

// const f=async()=>{
//     const pr=await fetch('http://localhost:5679/memes')
//     const r=await pr.json();
//     console.log(r)
// }