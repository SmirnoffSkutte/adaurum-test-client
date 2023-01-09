import { APP_API } from "./config.js";
import {authedFetchDelete, authedFetchGet,authedFetchPost,getTokensFromStorage, getUserStorageData } from "./fetch.js";
import { notauthedListForRender,authedListForRender } from "./render.js";

async function getPublicCompanies(){
    
    let companies=await fetch(`${APP_API}/companies/public`)
    .then(res=>res.json())
    // console.log(APP_API)

    return companies;
};

async function getPublicCompany(inn){
    
    let company=await fetch(`${APP_API}/companies/public/${inn}`)
    .then(res=>res.json())
    // console.log(APP_API)

    return company;
};


window.addEventListener('load',async function(){
    let tokens=getTokensFromStorage();
    if(!tokens){
        let publicCompanies=await getPublicCompanies();
        let data=notauthedListForRender(publicCompanies);
        document.getElementById('companiesList').innerHTML=data.join('')
    } else {
        let userCompanies=await authedFetchGet('companies/user/public/unhidden');
        console.log(userCompanies)
        let companies=authedListForRender(userCompanies);
        document.getElementById('companiesList').innerHTML=companies.join('')
        document.querySelectorAll('.bi-trash-fill').forEach(element => {
            element.addEventListener('click',async function(event){
                let companyInn=event.target.id
                let dataId=event.target.dataset.ispublic
                // alert(dataId)
                if (dataId==="true"){
                    authedFetchPost(`companies/user/hide/${companyInn}`)
                    document.querySelector(`[data-listid="${companyInn}"]`).classList.add('hide');
                    // alert('вы скрыли компанию')
                }
                if (dataId==="false"){
                    authedFetchDelete(`companies/user/personal/delete/${companyInn}`)
                    document.querySelector(`[data-listid="${companyInn}"]`).classList.add('hide');
                    // alert('вы удалили компанию')
                }
            })
        });

        document.querySelector('.addButton').classList.remove('hide')
        
    }
})
