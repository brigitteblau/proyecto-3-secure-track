document.addEventListener("DOMContentLoaded", function() {
    function showTab(tabId) {

        let tabContent = document.getElementsByClassName("content");
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.remove("active");
        }
        let tab = document.getElementById(tabId);
        if (tab) {
            tab.classList.add("active");}

        let tabLinks = document.getElementsByClassName("welcome-button");
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].classList.remove("active"); }
        let tabLink = document.querySelector(`.welcome-button[href$='#${tabId}']`);
        if (tabLink) {
            tabLink.classList.add("active");
        }
    }
  let hash = window.location.hash.substring(1); 
    if (hash) {
        showTab(hash);
    }
});

  
function brigu(params) {
    let login= getElementById("login")
}

  
//   document.getElementById("btn").addEventListener("click", brigitte)
//   document.getElementById("btn").addEventListener("mouseleave", onLeave);
//   document.getElementById("btn").addEventListener("mouseenter", onEnter);() {
//     document.getElementById("presencia").innerHTML = "Mouse afuera";
//   }
  
//   function onEnter() {
//     document.getElementById("presencia").innerHTML = "Mouse adentro";
//   }
  
//   document.getElementById("btn").addEventListener("click", brigitte)
//   document.getElementById("btn").addEventListener("mouseleave", onLeave);
//   document.getElementById("btn").addEventListener("mouseenter", onEnter);


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
