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

        let tabLink = document.getElementById('button-' + tabId);
        if (tabLink) {
            tabLink.classList.add("active");
        }
    }

    // Handle tab button clicks
    function handleButtonClick(event) {
        let tabId = event.currentTarget.id.replace('button-', '');
        showTab(tabId);
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        let form = event.target;
        let user = form.querySelector('input[name="username"], input[name="dni"]').value;
        let password = form.querySelector('input[name="password"]').value;
        console.log('Usuario:', user);
        console.log('Contraseña:', password);

        // Save login status
        localStorage.setItem("loggedIn", "true");
        
        // Redirect to the index page
        window.location.href = 'index.html';
    }

    // Add event listeners to tab buttons
    let buttons = document.getElementsByClassName("decision-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handleButtonClick);
    }

    // Add event listeners to forms
    let loginForm = document.getElementById("login-form");
    let registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", handleSubmit);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleSubmit);
    }

    // Handle initial tab display based on URL hash
    let hash = window.location.hash.substring(1);
    if (hash) {
        showTab(hash);
    }

    // Manage section visibility based on login status
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    
    const header = document.querySelector("header");
    const computersSection = document.getElementById("computers");
    const heroSections = document.querySelectorAll(".hero-section");
    const footer = document.querySelector("footer");

    if (isLoggedIn) {
        header.style.display = "block";
        computersSection.style.display = "block";
        footer.style.display = "block";
        heroSections.forEach(section => {
            section.style.display = "none";
        });
    } else {
        header.style.display = "block";
        computersSection.style.display = "none";
        footer.style.display = "block";
        heroSections.forEach(section => {
            section.style.display = "block";
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    JsBarcode("#barcode", "briguu", {
        format: "CODE128", 
        lineColor: "#3C6975", 
        width: 2, 
        height: 100, 
        displayValue: false
    });
});

//ben
// let submit = document.getElementById("submit-login");
// submit.addEventListener("click", check_user);
// async function check_user(){
//     let user= {
//         "USER": document.getElementById("username").value,
//         "PASSWORD": document.getElementById("password").value,
// //    console.log(user),
//     }
//     let response = await fetch(`https://secure-track-db.vercel.app/users/login`, {
//         method:"POST",
//         body:user
//     });
//     let data = await response.json();
//     console.log(data);
//     location.href= "index.html"
// }
