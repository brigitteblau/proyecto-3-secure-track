document.getElementById("monta").addEventListener("click", showMonta);
document.getElementById("libertador").addEventListener("click", showLibertador);

function showMonta() {
    document.querySelector(".select-libertador").classList.add("disactive");
    document.querySelector(".select-monta").classList.remove("disactive");
    document.getElementById("classrooms").classList.add("disactive");
    checkAllSelected(); 
}

function showLibertador() {
    document.querySelector(".select-monta").classList.add("disactive");
    document.querySelector(".select-libertador").classList.remove("disactive");
    document.getElementById("classrooms").classList.add("disactive");
    checkAllSelected(); 
}

let selectMonta = document.getElementById("select-monta");
let selectLib = document.getElementById("select-libertador");
let classrooms = document.getElementById("classrooms");

selectMonta.addEventListener("change", updateClassroomsMonta);
selectLib.addEventListener("change", updateClassroomsLib);
classrooms.addEventListener("change", checkAllSelected); 

function updateClassroomsMonta() {
    let value = selectMonta.value;
    updateClassroomsOptions(value, "monta");
}

function updateClassroomsLib() {
    let value = selectLib.value;
    updateClassroomsOptions(value, "libertador");
}

function updateClassroomsOptions(piso, edificio) {
    let options = [];

    if (edificio === "monta") {
        switch (piso) {
            case "M1":
                options = ["101", "102", "103"];
                break;
            case "M2":
                options = ["201", "202", "203"];
                break;
            case "M3":
                options = ["301", "302", "303"];
                break;
            case "M4":
                options = ["401", "402", "403"];
                break;
            case "M5":
                options = ["501", "502", "503"];
                break;
        }
    } else if (edificio === "libertador") {
        switch (piso) {
            case "L0":
                options = ["04", "05"];
                break;
            case "L1":
                options = ["104", "105"];
                break;
            case "L2":
                options = ["204", "205"];
                break;
            case "L3":
                options = ["304", "305"];
                break;
        }
    }
    classrooms.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un aula";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    classrooms.appendChild(defaultOption);

    options.forEach(option => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        classrooms.appendChild(opt);
    });

    classrooms.classList.remove("disactive");
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
        alert("Código // QR");
        // let user = 
    } else {
        alert("Ok, te vamos a redirigir");
    }
}
