    let selector_libertador = document.getElementById("select-libertador");
    let classroomsLib = document.getElementById("classrooms");


    selector_libertador = document.addEventListener("change", ()=>selectCarros());

    function selectCarros(){
        for (let index = 0; index < classroomsLib.children.length; index++) {
            classroomsLib.children[index].remove();           
        }
        for (let i = 0; i < firstFloor.length; i++) {
            let selector = document.createElement("option");
            selector.value = firstFloor[i].ROOM_ID;
            selector.innerHTML = firstFloor[i].ROOM_ID;
            classrooms.appendChild(selector);
        } }

    let selector_monta = document.getElementById("select-monta");
    let classroomsMonta = document.getElementById("classrooms");

    selector_libertador = document.addEventListener("change", ()=>selectCarros());

    


     const firstFloor = [
        {
            "id":3,
            "ROOM_ID": "L101",
            
    
        },
        {
            "id":20,
            "ROOM_ID": "L118",
            
    
        },{
            "id":101,
            "ROOM_ID": "L116",
            
    
        },
        {
            "id":12,
            "ROOM_ID": "L109",
            
    
        },{
            "id":300,
            "ROOM_ID": "L103",
            
    
        },
        {
            "id":7,
            "ROOM_ID": "L105",
            
    
        },
        {
            "id":2,
            "ROOM_ID": "L101",
            
    
        }
    ]

    function qr() {
        JsBarcode("#barcode", "1234", {
            format: "pharmacode",
            lineColor: "#0aa",
            width: 4,
            height: 40,
            displayValue: false
        });
    }

 
    qr();