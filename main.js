
document.getElementById('openModal').onclick = modal() {
    document.getElementById('modal').style.display = 'flex';
};

function modal() {
    let openModal = getElementById("OP")
    
}

// Cerrar modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Confirmar selección
document.getElementById('submit').onclick = function() {
    const building = document.getElementById('building').value;
    const floor = document.getElementById('floor').value;

    if (!building || !floor) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    alert(`Has seleccionado retirar un carro en el edificio de ${building} en el piso ${floor}.`);
    document.getElementById('modal').style.display = 'none';
};
