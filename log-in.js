let submit = document.getElementById("submit");
submit.addEventListener("click", check_user);
let password = document.getElementById("password")
let user = document.getElementById("username")

async function check_user(){
    console.log("HOla");
    console.log(user,password)
 let response =  await fetch(`https://secure-track-db.vercel.app/userLogin?USER=${user.value}&PASSWORD=${password.value}`,{});
 let data = await response.json()
 console.log(data)
}