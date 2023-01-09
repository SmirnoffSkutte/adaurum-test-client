import { APP_URL } from './config.js';
import { getTokensFromStorage } from './fetch.js';

window.addEventListener('load',function(){
    let fontSize=1.5
    if (window.screen.width<=650){
        fontSize=0.5
    }
    let tokens=getTokensFromStorage();
    if (!tokens){
        document.getElementById('authArea').innerHTML=`
            <div class='nav-h'>
                <a href='${APP_URL}'>
                Компании
                </a>
            </div>
            <div class='nav-h-icon'>
                <a href='${APP_URL}/login'>
                <div class="authLink">
                Войти
                <i class='bi-box-arrow-in-right' style='font-size: ${fontSize}rem; color: rgb(255, 255, 255);'></i>
                </div>
                </a>
            </div>
            <div class='nav-h-icon'>
                <a href='${APP_URL}/registration'>
                <div class="authLink">
                Регистрация
                <i class='bi-person-fill-add' style='font-size: ${fontSize}rem; color: rgb(255, 255, 255);'></i>
                </div>
                </a>
            </div>
        `
    } else {
        document.getElementById('authArea').innerHTML=`
            <div class='nav-h'>
                <a href="${APP_URL}">
                Компании
                </a>
            </div>
            <div class='nav-h-icon'>
                <div id='logoutButton' class='clickable'>
                    <div class="authLink">
                        Выйти
                        <i class='bi-box-arrow-in-right' style='font-size: ${fontSize}rem; color: rgb(255, 255, 255);'></i>
                    </div>
            </div>
        `;
        document.getElementById('logoutButton').addEventListener('click',function(){
            localStorage.clear()
            location.reload()
        })
    }
})
