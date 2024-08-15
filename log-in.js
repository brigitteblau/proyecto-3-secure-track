
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
        let tabLinks = document.getElementsByClassName("welcome-button");
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].classList.remove("active");
        }

        let tabLink = document.querySelector(`.welcome-button[href$='#${tabId}']`);
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
    }
});


let submit = document.getElementById("submit-login");
submit.addEventListener("click", check_user);
async function check_user(){
    let user= {
        "USER": document.getElementById("username").value,
        "PASSWORD": document.getElementById("password").value,
//    console.log(user),
    }
    let response = await fetch(`https://secure-track-db.vercel.app/users/login`, {
        method:"POST",
        body:user
    });
    let data = await response.json();
    console.log(data);
    location.href= "index.html"
}
