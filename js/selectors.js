document.getElementById("monta").addEventListener("click", showMonta);
document.getElementById("libertador").addEventListener("click", showLibertador);

function showMonta() {
document.querySelector(".select-libertador").classList.add("disactive");
document.querySelector(".select-monta").classList.remove("disactive");
}

function  showLibertador() {
document.querySelector(".select-monta").classList.add("disactive");
document.querySelector(".select-libertador").classList.remove("disactive");
}
