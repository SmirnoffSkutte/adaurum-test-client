
import { APP_API } from "./config.js";
import { renderInfoPagePublic } from "./render.js";

async function getPublicCompany(inn){
    
    let company=await fetch(`${APP_API}/companies/public/${inn}`)
    .then(res=>res.json())
    // console.log(APP_API)

    return company;
};

window.addEventListener('load',async function(){
    let urlSearchParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlSearchParams.entries());
    let inn=params.inn
    let company=await getPublicCompany(inn)
    console.log(company)
    let info=renderInfoPagePublic(company)
    document.getElementById('infoBlock').innerHTML=info
});
