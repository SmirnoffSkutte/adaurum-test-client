import { APP_API, APP_URL } from "./config.js";
import Toast from "./toast.js";

async function authLogin(){
    let userEmail=document.getElementById('email').value;
    let userPassword=document.getElementById('password').value;

    let user = {
        "email": userEmail,
        "password": userPassword
    };
      
    let responce=await fetch(`${APP_API}/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        if(res.status===400 || res.status===406 || res.status===404){
            new Toast({
                text: `Неверен email или пароль`,
                position: "top-right",
                pauseOnHover: true,
                pauseOnFocusLoss: true,
              })
              return null;
        }
        return res.json()
    })
    .then(res=>{
        localStorage.setItem("accessToken",res.tokens.accessToken);
         localStorage.setItem("refreshToken",res.tokens.refreshToken);

         let userData=JSON.stringify(res.user)
         localStorage.setItem("user",userData)

        window.location.replace(`${APP_URL}`)
    })
    .catch(err=>console.log(err));

    console.log(responce);

    
};

window.addEventListener('load',function(){
    document.getElementById('logButton').onclick=authLogin;
})

