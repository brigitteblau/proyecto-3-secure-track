import { getCarros } from "./repository.js";

let libertador = { "0": [], "1": [], "2": [], "3": [] };
let monta = { "1": [], "2": [], "3": [], "4": [], "5": [] };

function showModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("closeModal").addEventListener("click", closeModal);

const selectMonta = document.getElementById("select-monta");
const selectLib = document.getElementById("select-libertador");
const classrooms = document.getElementById("classrooms"); 
const confirmButton = document.getElementById("confirmButton");

document.getElementById("monta").addEventListener("click", showMonta);
document.getElementById("libertador").addEventListener("click", showLibertador);

function showMonta() {
    document.querySelector(".select-libertador").classList.add("disactive");
    document.querySelector(".select-monta").classList.remove("disactive");
    classrooms.classList.add("disactive");
    confirmButton.style.display = "none";
    classrooms.innerHTML = ""; 
}

function showLibertador() {
    document.querySelector(".select-monta").classList.add("disactive");
    document.querySelector(".select-libertador").classList.remove("disactive");
    classrooms.classList.add("disactive");
    confirmButton.style.display = "none";
    classrooms.innerHTML = ""; 
}

async function initializeClassrooms() {
    try {
        const data = await getCarros();
        console.log("Datos recibidos del backend:", data);

        // Limpia las estructuras antes de poblarlas
        for (let key in libertador) libertador[key] = [];
        for (let key in monta) monta[key] = [];

        data.forEach((item) => {
            const roomNumber = item.roomNumber; // Ej: "L001", "M002"
            const building = roomNumber[0]; // "L" o "M"
            const floor = roomNumber.slice(1); // Extraer el piso completo (e.g., "001", "002", etc.)

            // Asegúrate de que las claves existen
            if (building === "M" && monta[floor] !== undefined) {
                monta[floor].push(item);
            } else if (building === "L" && libertador[floor] !== undefined) {
                libertador[floor].push(item);
            } else {
                console.warn(`Piso no esperado: ${floor} para el edificio ${building}`);
            }
        });

        console.log("Aulas de Montañeses:", monta);
        console.log("Aulas de Libertador:", libertador);

    } catch (error) {
        console.error("Error al inicializar las aulas:", error);
    }
}

async function updateClassroomsOptions(piso, edificio) {
    let options = [];

    if (edificio === "monta") {
        options = monta[piso] || [];
    } else if (edificio === "libertador") {
        options = libertador[piso] || [];
    }

    classrooms.innerHTML = ""; 

    let classroomOption = document.createElement("option");
    classroomOption.textContent = "Selecciona un aula";
    classroomOption.disabled = true;
    classroomOption.selected = true;
    classrooms.appendChild(classroomOption); 

    options.forEach(room => {
        let opt = document.createElement("option");
        opt.value = room.id;
        opt.textContent = room.roomNumber;
        classrooms.appendChild(opt);
    });

    if (options.length > 0) {
        classrooms.classList.remove("disactive");
        confirmButton.style.display = "block";
    } else {
        classrooms.classList.add("disactive");
        confirmButton.style.display = "none";
    }
}

selectMonta.addEventListener("change", () => {
    updateClassroomsOptions(selectMonta.value.slice(1), "monta");
});

selectLib.addEventListener("change", () => {
    updateClassroomsOptions(selectLib.value.slice(1), "libertador");
});

classrooms.addEventListener("change", checkAllSelected);

function checkAllSelected() {
    const selectedClassroom = classrooms.value;
    if (selectedClassroom) {
        confirmButton.style.display = "block";
    } else {
        confirmButton.style.display = "none";
    }
}

initializeClassrooms();
