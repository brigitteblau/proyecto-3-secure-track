import { getCarros } from "./repository.js";

let libertador = {};
let monta = {};

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
    updateClassroomsOptions(selectMonta.value, "monta");
}

function showLibertador() {
    document.querySelector(".select-monta").classList.add("disactive");
    document.querySelector(".select-libertador").classList.remove("disactive");
    classrooms.classList.add("disactive");
    confirmButton.style.display = "none";
    updateClassroomsOptions(selectLib.value, "libertador");
}

async function initializeClassrooms() {
    try {
        const data = await getCarros();
        console.log("Datos recibidos del backend:", data);

        libertador = { "0": [], "1": [], "2": [], "3": [] };
        monta = { "1": [], "2": [], "3": [], "4": [], "5": [] };

        data.forEach((item) => {
            const roomNumber = item.roomNumber;
            const building = roomNumber[0];
            const floor = roomNumber.slice(1);

            if (building === "M") {
                if (!monta[floor]) monta[floor] = [];
                monta[floor].push(item);
            } else if (building === "L") {
                if (!libertador[floor]) libertador[floor] = [];
                libertador[floor].push(item);
            }
        });

        console.log("Aulas de Montañeses:", monta);
        console.log("Aulas de Libertador:", libertador);

        // Actualizar las opciones de los classrooms si hay una selección previa
        if (selectMonta.value) {
            updateClassroomsOptions(selectMonta.value, "monta");
        } else if (selectLib.value) {
            updateClassroomsOptions(selectLib.value, "libertador");
        }

    } catch (error) {
        console.error("Error al obtener datos del backend:", error);
        showModal();
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

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un aula";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    classrooms.appendChild(defaultOption);

    options.forEach(room => {
        let opt = document.createElement("option");
        opt.value = room.id;
        opt.textContent = room.roomNumber;
        classrooms.appendChild(opt);
    });

    classrooms.style.display = options.length > 0 ? "block" : "none";
    confirmButton.style.display = options.length > 0 ? "block" : "none";
    if (options.length === 0) showModal();
}

selectMonta.addEventListener("change", () => {
    updateClassroomsOptions(selectMonta.value, "monta");
});

selectLib.addEventListener("change", () => {
    updateClassroomsOptions(selectLib.value, "libertador");
});

classrooms.addEventListener("change", checkAllSelected);

function checkAllSelected() {
    const selectedClassroom = classrooms.value;
    if (selectedClassroom) {
        confirmButton.style.display = "block";
        // Aquí puedes implementar la lógica para manejar la selección de aulas
    }
}

// Inicializar las opciones de las aulas al cargar la página
initializeClassrooms();
