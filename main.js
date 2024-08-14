document.addEventListener('DOMContentLoaded', function () {
    JsBarcode("#barcode", "briguu", {
        format: "CODE128", 
        lineColor: "#3C6975", 
        width: 2, 
        height: 100, 
        displayValue: false
    });
});