
document.addEventListener("DOMContentLoaded", function() {
    function showTab(tabId) {
        let tabContent = document.getElementsByClassName("content");
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.remove("active");
        }
        let tab = document.getElementById(tabId);
        if (tab) {
            tab.classList.add("active");
        }
        
        let tabLinks = document.getElementsByClassName("decision-button");
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].classList.remove("active");
        }

        let tabLink = document.getElementById("button-" + tabId);
        if (tabLink) {
            tabLink.classList.add("active");
        }
    }

    function handleButtonClick(event) {
        let tabId = event.currentTarget.id.replace('button-', '');
        showTab(tabId);
    }

    let buttons = document.getElementsByClassName("decision-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handleButtonClick);
    }

    let hash = window.location.hash.substring(1);
    if (hash) {
        showTab(hash);
    } else {
        showTab("login");  
    }
});



let submit = document.getElementById("submit-register");
submit.addEventListener("click", ()=>register_user({
    USER: document.getElementById("dni").value,
    PASSWORD: document.getElementById("register-password").value,
}));

let hola = document.getElementById("submit-login");
hola.addEventListener("click", ()=>logueo_user({
    USER: document.getElementById("username").value,
    PASSWORD: document.getElementById("password").value,
}));



 async function register_user (user){
    console.log(user);

   try {
    let response = await fetch(`https://secure-track-db.vercel.app/users/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user),
        
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 201) {
        location.href = "estudiante.html"
    }
   } catch (error) {
    console.log(error)
   }
}

async function logueo_user (user){
    console.log(user);

   try {
    let response = await fetch(`https://secure-track-db.vercel.app/users/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user),
        
    });
    let data = await response.json();
    console.log(data);
    if (data.OCUPACION === "Estudiante") {
        location.href = "estudiante.html"
        localStorage.setItem("estudio-Key", "user-log");

    }else if(data.OCUPACION === "Asistente"){
        location.href = "asistente.html"
        localStorage.setItem("asist-Key", "asist-log");


    }else{
        location.href = "profesor.html"
        localStorage.setItem("Prof-Key", "profe-log");

    }
   } catch (error) {
    console.log(error)
   }
}
