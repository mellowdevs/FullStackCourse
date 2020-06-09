var xField = document.getElementById("inputX");
var yField = document.getElementById("inputY");
var outputResult = document.getElementById("outputResult");

var form = document.getElementById("percCalculatorForm");

form.addEventListener('submit', function(event) {
    /* If empty or undefined */
    if(!xField.value || !yField.value ){ 
        alert("Please enter values.");
    } else {        
        var x = parseFloat(xField.value);
        var y = parseFloat(yField.value);
        var result = (x / y)*100;
        outputResult.innerText = `Result: ${result}%`;
        event.preventDefault();
    }
});
