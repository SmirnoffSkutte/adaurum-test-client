import { renderComment, renderInfoPageAuth } from "./render.js";
import { authedFetchGet,authedFetchPost } from "./fetch.js";
import { APP_API } from "./config.js";
import Toast from "./toast.js";

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
    let isPublic=params.public
    if (isPublic==="true"){
        let company=await getPublicCompany(inn)
        let render=renderInfoPageAuth(company)
        document.getElementById('infoBlock').innerHTML=render
    } else {
        let company=await authedFetchGet(`companies/user/personal/${inn}`)
        let render=renderInfoPageAuth(company)
        document.getElementById('infoBlock').innerHTML=render
    }

    // Comments 
    document.querySelectorAll('.commentButton').forEach(el=>{
        el.setAttribute('data-isopen',"false")
        el.addEventListener('click',function(event){
            let isOpen=event.target.dataset.isopen
            let button=event.target

            let setOpen=!(JSON.parse(isOpen))
            
            button.setAttribute('data-isopen',`${setOpen}`)
            isOpen=event.target.dataset.isopen
            // console.log(isOpen)
            if(isOpen==="true"){
                document.getElementById(`${event.target.id}CommentInput`).classList.remove('hide')
            } else{
                document.getElementById(`${event.target.id}CommentInput`).classList.add('hide')
            }
        })
    })

    document.querySelectorAll('.formInputComment').forEach(el=>{
        el.addEventListener("keypress",async function(event){
            if (event.key === "Enter" && event.target.value!=="") {
                let id=event.target.id
                let commentButtonId=id.slice(0,-12);
                // console.log(commentButtonId)
                let comment=event.target.value
                let urlSearchParams = new URLSearchParams(window.location.search);
                let params = Object.fromEntries(urlSearchParams.entries());
                let inn=params.inn
                let commentField=commentButtonId

                let reqBody={
                    "companyInn":inn,
	                "comment":comment,
	                "commentField":commentField
                }

                authedFetchPost('companies/user/addcomment',reqBody)
                .then(res=>{
                    new Toast({
                        text: "Комментарий добавлен",
                        position: "top-right",
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                      })
                })
                .then(res=>{
                    return authedFetchGet(`companies/user/comments/${inn}`)
                })
                .then(commentsData=>{
                    document.getElementById(`${commentButtonId}`).click()
                    event.target.value=''
                    let userData=localStorage.getItem('user')
                    let userName=JSON.parse(userData).name
                    console.log(userName)

                    document.querySelectorAll('.commentsArea').forEach(el=>{
                        let comments=commentsData.filter(com=>{
                            let currentCommentArea=el.id
                            let currentFilterId=currentCommentArea.slice(0,-8);
                            if(com.commentField===currentFilterId){
                                return true
                            } else {
                                return false
                            }
                        })
                        let renderedComments=comments.map(com=>{
                            let renderedComment=renderComment(com,userName);
                            return renderedComment
                        })
                    el.innerHTML=renderedComments.join('')
                    })
                })


                // document.getElementById(`${commentButtonId}`).click()
                // event.target.value=''
            }
        })
    })

    // Loading comments
    let userData=localStorage.getItem('user')
    let userName=JSON.parse(userData).name
    console.log(userName)

    let commentsData=await authedFetchGet(`companies/user/comments/${inn}`)

    document.querySelectorAll('.commentsArea').forEach(el=>{
        let comments=commentsData.filter(com=>{
            let currentCommentArea=el.id
            let currentFilterId=currentCommentArea.slice(0,-8);
            if(com.commentField===currentFilterId){
                return true
            } else {
                return false
            }
        })
        let renderedComments=comments.map(com=>{
            let renderedComment=renderComment(com,userName);
            return renderedComment
        })
        el.innerHTML=renderedComments.join('')
    })


    // console.log(company)

})