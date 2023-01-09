function authedListForRender(userCompanies){
    let companies=userCompanies.map((c=>{
        if(c.userId){
        return `
        <div class='userAllowedCompany' data-listid="${c.companyInn}">
        <div class='companyInfoBlock'>
            <a href=${"companyauth?inn="+c.companyInn+"&"+"public=false"}>
            <div class="companyBlock">
                <h2 class="companyHeader">${c.companyName}</h2>
                <p>${c.address}</p>
                <p>Телефон: ${c.phone}</p>
                <p>${c.genDirector}</p>
            </div>
            </a>
        </div>
        <div class="companyInfoBlockDelete">
            <i id="${c.companyInn}" data-ispublic="false" class='bi-trash-fill clickable' style='font-size: 1.5rem; color: #ff4c5b;'></i>
        </div>
           
        </div>
        `
        } else {
        return `
        <div class='userAllowedCompany' data-listid="${c.companyInn}">
        <div class='companyInfoBlock'>
            <a href=${"companyauth?inn="+c.companyInn+"&"+"public=true"}>
            <div class="companyBlock">
                <h2 class="companyHeader">${c.companyName}</h2>
                <p>${c.address}</p>
                <p>Телефон: ${c.phone}</p>
                <p>${c.genDirector}</p>
            </div>
            </a>
        </div>
        <div class="companyInfoBlockDelete">
            <i id="${c.companyInn}" data-ispublic="true" class='bi-trash-fill clickable' style='font-size: 1.5rem; color: #ff4c5b;'></i>
        </div>
           
        </div>
        `
        }
    }))
    return companies
}

function notauthedListForRender(publicCompanies){
    let data=publicCompanies.map((c=>{
        return `<a href=${"company?inn="+c.companyInn}>
        <div class="companyBlock">
        <h2 class="companyHeader">${c.companyName}</h2>
        <p>${c.address}</p>
        <p>Телефон: ${c.phone}</p>
        <p>${c.genDirector}</p>
        </div>
        </a>`
    }))
    return data;
}

function renderInfoPagePublic(company){
    let data=company.map((c=>{
        return `
        <div class="companyBlock">
        <h2 class="companyHeader">Название</h2>
        <p>${c.companyName}</p>
        <h2 class="companyHeader">ИНН</h2>
        <p>${c.companyInn}</p>
        <h2 class="companyHeader">Общая информация</h2>
        <p>${c.info}</p>
        <h2 class="companyHeader">Генеральный директор</h2>
        <p>${c.genDirector}</p>
        <h2 class="companyHeader">Адрес</h2>
        <p>${c.address}</p>
        <h2 class="companyHeader">Телефон</h2>
        <p>${c.phone}</p>
        </div>
        `
    }))
    return data[0];
}

function renderInfoPageAuth(company){
    let data=company.map((c=>{
        return `
        <div class="companyBlock">

        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            Название 
            <div id="name" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <p>${c.companyName}</p>
        <input id="nameCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id='nameComments' class='commentsArea'></div>
        </div>


        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            ИНН
            <div id="inn" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <p>${c.companyInn}</p>
        <input id="innCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id='innComments' class='commentsArea'></div>
        </div>


        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            Общая информация
            <div id="info" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <p>${c.info}</p>
        <input id="infoCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id='infoComments' class='commentsArea'></div>
        </div>


        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            Генеральный директор
            <div id="genDirector" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <p>${c.genDirector}</p>
        <input id="genDirectorCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id='genDirectorComments' class='commentsArea'></div>
        </div>


        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            Адрес
            <div id="address" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <p>${c.address}</p>
        <input id="addressCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id='addressComments' class='commentsArea'></div>
        </div>


        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            Телефон
            <div id="phone" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <p>${c.phone}</p>
        <input id="phoneCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id='phoneComments' class='commentsArea'></div>
        </div>


        <div class="authedInfoBlock">
        <h2 class="companyHeader">
            <div></div>
            <div id="main" class="commentButton">
                    <div class="commentWord">
                    Прокомментировать компанию
                    </div>
                    <i id="comIcon" class="bi-chat-fill" style="font-size: 1.5rem; color: rgb(220,220,220,0.5);"></i>       
            </div>
        </h2>
        <input id="mainCommentInput" placeholder="Добавить-enter" class="formInputComment hide"></input>
        <div id="mainComments" class="commentsArea"></div>
        </div>

        </div>
        `
    }))
    return data[0]; 
}

function renderComment(comment,name){
    name==="" ? name="Без имени" : name=name
    let data=`
    <div data-field="${comment.commentField}" class='commentString'>
        <div class='commentStringTime'>
        ${comment.date}
        </div>
        <div class='commentStringUser'>
        ${name}:
        </div>
        <div class="commentStringValue">
        ${comment.comment}
        </div>
    </div>
    `
    return data;
}

export {notauthedListForRender,authedListForRender,renderInfoPagePublic,renderInfoPageAuth,renderComment}