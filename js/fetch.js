import { APP_API } from "./config.js";
import Toast from "./toast.js";

function saveTokens(accessToken,refreshToken){
    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("refreshToken",refreshToken);
}

function getTokensFromStorage(){
    let accessToken=localStorage.getItem('accessToken');
    let refreshToken=localStorage.getItem('refreshToken');
    if(!accessToken || !refreshToken){
        return null;
    }
    return {accessToken,refreshToken}
}

function getUserStorageData(){
    let userData=localStorage.getItem('user')
    if(!userData){
        return null;
    }
    return JSON.parse(userData)
}

async function authedFetchPost(url,body){
    let accessToken=localStorage.getItem('accessToken');
    let refreshToken=localStorage.getItem('refreshToken');
    if(!accessToken || !refreshToken){
        alert('Нет какого-то токена в localstorage')
        return false;
    }
    let responce=await fetch(`${APP_API}/${url}`,{
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization':`Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    .then(res=>{
        let refreshBody={
            "refreshToken":refreshToken
        }
        if(res.status===402){
            // NEW TOKENS 
            fetch(`${APP_API}/refresh`,{
                method: 'POST',
                credentials:'include',
                headers: {
                  'Content-Type': 'text/plain',
                },
                body: JSON.stringify(refreshBody)
            }) 
            .then(tokens=>{
                return tokens.json()
            })
            .then(res2=>{
                console.log('refetching...')
                let newAccessToken=res2.accessToken;
                let newRefreshToken=res2.refreshToken;
                return fetch(`${APP_API}/${url}`,{
                    method: 'POST',
                    credentials:'include',
                    headers: {
                      'Content-Type': 'text/plain',
                      'Authorization':`Bearer ${newAccessToken}`
                    },
                    body: JSON.stringify(body)
                })
                .then(res3=>{
                    return res3.json()
                })
                .then(res4=>{
                    saveTokens(newAccessToken,newRefreshToken)
                    return res4;
                })
                .catch(err=>console.log(err))
            })
        }
        if(res.status===406){
            new Toast({
                text: "У данного пользователя уже есть компания с таким ИНН",
                position: "top-right",
                pauseOnHover: true,
                pauseOnFocusLoss: true,
              })
        }
        if(res.status===409){
            new Toast({
                text: "Компания с таким ИНН уже есть в общей базе",
                position: "top-right",
                pauseOnHover: true,
                pauseOnFocusLoss: true,
              })
        }
        return res.json();
    })
    .catch(err=>console.log(err))
    return responce;
};

async function authedFetchGet(url){
    let accessToken=localStorage.getItem('accessToken');
    let refreshToken=localStorage.getItem('refreshToken');
    if(!accessToken || !refreshToken){
        alert('Нет какого-то токена в localstorage')
        return false;
    }
    let responce=await fetch(`${APP_API}/${url}`,{
        method: 'GET',
        credentials:'include',
        headers: {
          'Authorization':`Bearer ${accessToken}`,
        },
    })
    .then(res=>{
        let refreshBody={
            "refreshToken":refreshToken
        }
        if(res.status===402){
            // NEW TOKENS 
            let responce=fetch(`${APP_API}/refresh`,{
                method: 'POST',
                credentials:'include',
                headers: {
                  'Content-Type': 'text/plain',
                },
                body: JSON.stringify(refreshBody)
            }) 
            .then(tokens=>{
                return tokens.json()
            })
            .then(res2=>{
                console.log('refetching...')
                let newAccessToken=res2.accessToken;
                let newRefreshToken=res2.refreshToken;
                return fetch(`${APP_API}/${url}`,{
                    method: 'GET',
                    credentials:'include',
                    headers: {
                      'Content-Type': 'text/plain',
                      'Authorization':`Bearer ${newAccessToken}`
                    },
                })
                .then(res3=>{
                    return res3.json()
                })
                .then(res4=>{
                    saveTokens(newAccessToken,newRefreshToken)
                    return res4;
                })
                .catch(err=>console.log(err))
            })
            return responce.json();
        }
        return res.json();
    })
    .catch(err=>console.log(err))
    return responce;
};

async function authedFetchDelete(url){
    let accessToken=localStorage.getItem('accessToken');
    let refreshToken=localStorage.getItem('refreshToken');
    if(!accessToken || !refreshToken){
        alert('Нет какого-то токена в localstorage')
        return false;
    }
    let responce=await fetch(`${APP_API}/${url}`,{
        method: 'DELETE',
        credentials:'include',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization':`Bearer ${accessToken}`
        },
    })
    .then(res=>{
        let refreshBody={
            "refreshToken":refreshToken
        }
        if(res.status===402){
            // NEW TOKENS 
            fetch(`${APP_API}/refresh`,{
                method: 'POST',
                credentials:'include',
                headers: {
                  'Content-Type': 'text/plain',
                },
                body: JSON.stringify(refreshBody)
            }) 
            .then(tokens=>{
                return tokens.json()
            })
            .then(res2=>{
                console.log('refetching...')
                let newAccessToken=res2.accessToken;
                let newRefreshToken=res2.refreshToken;
                return fetch(`${APP_API}/${url}`,{
                    method: 'DELETE',
                    credentials:'include',
                    headers: {
                      'Content-Type': 'text/plain',
                      'Authorization':`Bearer ${newAccessToken}`
                    },
                })
                .then(res3=>{
                    return res3.json()
                })
                .then(res4=>{
                    saveTokens(newAccessToken,newRefreshToken)
                    return res4;
                })
                .catch(err=>console.log(err))
            })
        }
        return res.json();
    })
    .catch(err=>console.log(err))
    return responce;
};

export {authedFetchGet,authedFetchPost,authedFetchDelete,getTokensFromStorage,getUserStorageData};