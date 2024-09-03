import { getCarros } from "./repository.js";
let params = new URLSearchParams(window.location.search)
let usuario = params.get("user")

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

async function fetchClassrooms(building) {
    try {
        const response = await fetch(`https://secure-track-db.vercel.app/rooms`);
        if (!response.ok) {
            throw new Error("Error al obtener aulas");
        }
        const data = await response.json();

        // Filtra las aulas según el edificio
        const filteredData = data.filter(room => room.roomNumber.startsWith(building === "monta" ? "M" : "L"));
        return filteredData;
    } catch (error) {
        console.error("Error al realizar el fetch:", error);
        return [];
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
        showModal();
    }
}

selectMonta.addEventListener("change", async () => {
    const selectedFloor = selectMonta.value.slice(1);
    monta[selectedFloor] = await fetchClassrooms("monta");
    updateClassroomsOptions(selectedFloor, "monta");
});

selectLib.addEventListener("change", async () => {
    const selectedFloor = selectLib.value.slice(1);
    libertador[selectedFloor] = await fetchClassrooms("libertador");
    updateClassroomsOptions(selectedFloor, "libertador");
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
confirmButton.addEventListener("click", ()=> requestComputer())
let qr = document.getElementById("qr")
async function requestComputer(){
    console.log(JSON.stringify({
        userId:(JSON.parse(usuario).id),
        cartId:parseInt(classrooms.value),
    }),)
    const response = await fetch(`https://secure-track-db.vercel.app/computers/request`, {
        method: "POST",
        mode:"cors",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            userId:(JSON.parse(usuario).id),
            cartId:parseInt(classrooms.value),
        }),
    });
    const res = await JSON.stringify(response.json());
    if (response.status == 200) {
        location.href = "../qr.html?token=" + res
    }
    
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
            const floor = roomNumber.slice(1, 2); // Extraer solo el primer dígito del piso (e.g., "1", "2", etc.)

            // Asigna las aulas al edificio y piso correctos
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
