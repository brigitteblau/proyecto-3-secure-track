    let text = document.getElementById("text")    
    let params = new URLSearchParams(window.location.search)
    let res = params.get("token")
    let img = document.createElement("img")
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.parse(res).tokenId)}`
    qr.appendChild(img)
    text.innerText = `El slot para el retiro es el ${JSON.parse(res).slot}`
