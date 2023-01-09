import { authedFetchPost, getUserStorageData } from "./fetch.js";
import Toast from "./toast.js";

window.addEventListener('load',async function(){
    let addButton=document.getElementById('addButtonForm')
    
    let form = document.getElementById('createForm');
    let formSubmit = document.getElementById('addButtonForm');

    function changeFormHandler() {
        console.log(form.checkValidity());
        if (form.checkValidity()) {
            formSubmit.removeAttribute('disabled');
            addButton.classList.remove('addButtonDisabled');
            addButton.classList.add('addButtonForm');
            addButton.textContent='Добавить';
        }
        if (form.checkValidity()===false) {
            formSubmit.setAttribute('disabled',"true");
            addButton.classList.remove('addButtonForm');
            addButton.classList.add('addButtonDisabled');
            addButton.textContent='Введите нужные поля';
        }
    }

    form.addEventListener('change',function(){
        changeFormHandler()
    });

    document.querySelectorAll('.formInput').forEach(el=>{
        el.addEventListener('input',function(e){
            changeFormHandler()
            // console.log(el.value)
        })
    })

    addButton.disabled ? (addButton.classList.add('addButtonDisabled'),addButton.classList.remove('addButtonForm'),addButton.textContent='Введите нужные поля')
    : ((addButton.classList.remove('addButtonDisabled'),addButton.classList.add('addButtonForm'),addButton.textContent='Добавить'))

    form.addEventListener("submit",async function(e){
        e.preventDefault();
        let name=document.getElementById('name').value;

        let inn=document.getElementById('inn').value;

        let info=document.getElementById('info').value;

        let genDirector=document.getElementById('genDirector').value;

        let adress=document.getElementById('adress').value;

        let phone=document.getElementById('phone').value;
        let reqBody={
            "companyInn":inn,
	        "companyName":name,
	        "info":info,
	        "genDirector":genDirector,
	        "address":adress,
	        "phone":phone
        }
        // console.log(reqBody);
        authedFetchPost('companies/user/personal/add',reqBody)
        .then(res=>{
            new Toast({
                text: "Компания добавлена",
                position: "top-right",
                pauseOnHover: true,
                pauseOnFocusLoss: true,
              })
        })
        document.querySelectorAll('.formInput').forEach(el=>{
            el.value='';
        });
        formSubmit.setAttribute('disabled',"true");
        changeFormHandler();
    });
})