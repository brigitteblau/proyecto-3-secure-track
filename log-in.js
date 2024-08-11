function showTab(tabName) {
   var i, tabContent, tabLinks;

    // Ocultar todos los contenidos de las pestañas
    tabContent = document.getElementsByClassName("content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }

    // Eliminar la clase "active" de todos los botones de las pestañas
    tabLinks = document.getElementsByClassName("decision-button");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Mostrar el contenido actual de la pestaña y agregar una clase "active" al botón que abrió la pestaña
    document.getElementById(tabName).classList.add("active");
    document.querySelector(`.decision-button[onclick="showTab('${tabName}')"]`).classList.add("active");
}


//backk 
let submit = document.getElementById("submit");
submit.addEventListener("click", check_user);
let password = document.getElementById("password");
let user = document.getElementById("username");
async function check_user(){
    console.log("Hola");
    console.log(user, password);
    let response = await fetch(`https://secure-track-db.vercel.app/userLogin?USER=${user.value}&PASSWORD=${password.value}`, {});
    let data = await response.json();
    console.log(data);
}
