import { APP_API, APP_URL } from "./config.js";
import Toast from "./toast.js";

async function authRegistration(){
    let userEmail=document.getElementById('email').value;
    let userPassword=document.getElementById('password').value;
    let userName=document.getElementById('name').value;

    let user = {
        "email": userEmail,
        "password": userPassword,
        "name":userName
    };
      
    fetch(`${APP_API}/registration`,{
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        if(res.status===400){
            new Toast({
                text: `Email занят или пароль короче 5 символов`,
                position: "top-right",
                pauseOnHover: true,
                pauseOnFocusLoss: true,
              })
              return null;
        }
        return res.json();
    })
    .then(responceData=>{
        localStorage.setItem("accessToken",responceData.tokens.accessToken);
        localStorage.setItem("refreshToken",responceData.tokens.refreshToken);

         let userData=JSON.stringify(responceData.user)
         localStorage.setItem("user",userData)

        window.location.replace(`${APP_URL}`)
    })
    .catch(err=>console.log(err));
    
};

window.addEventListener('load',function(){
    document.getElementById('regButton').onclick=authRegistration;
})