//toma como parametro el onclick="showTab (). en vez de usar addEventlistener usas la propiedad de oneclick en el html
        function showTab(tabName) {
            document.querySelectorAll('.content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
        }

        document.addEventListener('DOMContentLoaded', () => {
            showTab('register'); 
        });

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
