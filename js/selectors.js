import { getCarros } from "./repository.js";
let libertador = [];
let monta = [];
document.getElementById("monta").addEventListener("click", showMonta);
document.getElementById("libertador").addEventListener("click", showLibertador);

function showMonta() {
    document.querySelector(".select-libertador").classList.add("disactive");
    document.querySelector(".select-monta").classList.remove("disactive");
    document.getElementById("classrooms").classList.add("disactive");
    updateClassroomsMonta(); 
}

function showLibertador() {
    document.querySelector(".select-monta").classList.add("disactive");
    document.querySelector(".select-libertador").classList.remove("disactive");
    document.getElementById("classrooms").classList.add("disactive");
    updateClassroomsLib(); 
}

let selectMonta = document.getElementById("select-monta");
let selectLib = document.getElementById("select-libertador");
let classrooms = document.getElementById("classrooms");

selectMonta.addEventListener("change", updateClassroomsMonta);
selectLib.addEventListener("change", updateClassroomsLib);
classrooms.addEventListener("change", checkAllSelected); 



function updateClassroomsLib() {
    let value = selectLib.value;
    let selector = document.getElementById("classroooms");
    for (let index = 0; index < libertador.length; index++) {
        if (monta[index].ROOM_NUMBER[1] == value) {
            let option = document.createElement("option");
            option.value = monta[index].ID;
            option.innerText = monta[index].ROOM_NUMBER;
            selector.appendChild(option);
        }        
    }

    if (selector.options.length > 0) {
        selector.style.display = "block";
    }
}
function updateClassroomsLib() {
    let value = selectLib.value;
    let selector = document.getElementById("classroooms");
    for (let index = 0; index < libertador.length; index++) {
        if (libertador[index].ROOM_NUMBER[1] == value) {
            let option = document.createElement("option");
            option.value = libertador[index].ID;
            option.innerText = libertador[index].ROOM_NUMBER;
            selector.appendChild(option);
        }        
    }

    if (selector.options.length > 0) {
        selector.style.display = "block";
    }
}

function updateClassroomsMonta() {
    let value = selectLib.value;
    let selector = document.getElementById("classroooms");
    for (let index = 0; index < libertador.length; index++) {
        if (libertador[index].ROOM_NUMBER[1] == value) {
            let option = document.createElement("option");
            option.value = libertador[index].ID;
            option.innerText = libertador[index].ROOM_NUMBER;
            selector.appendChild(option);
        }        
    }

    if (selector.options.length > 0) {
        selector.style.display = "block";
    }
}


async function updateClassroomsOptions(piso, edificio) {

   let data = await getCarros()
   for (let index = 0; index < data.length; index++) {
        if (data[index].ROOM_NUMBER[0] == "M") {
            monta.push(data[index])
        }else{libertador.push(data[index])}    
   }
   
}

function checkAllSelected() {
    let selectMontaValue = selectMonta.value;
    let selectLibValue = selectLib.value;
    let classroomsValue = classrooms.value;

    if ((selectMontaValue || selectLibValue) && classroomsValue && classroomsValue !== "") {
        document.getElementById("confirmButton").style.display = "block";
    } else {
        document.getElementById("confirmButton").style.display = "none";
    }
}

let confirmar = document.getElementById("confirmButton");
confirmar.addEventListener("click", confirm);

function confirm() {
    let result = prompt("¿Estás seguro?");
    if (result === "si") {
    
    } else {
        alert("Ok, te vamos a redirigir");
    }
}