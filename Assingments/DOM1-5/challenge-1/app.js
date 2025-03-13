let button = document.getElementById("toggleButton");
let ledbulb = document.getElementById("bulb");
let text = document.getElementById("status"); 

button.addEventListener("click", () => {    
    ledbulb.classList.toggle("off");
    body.classList.toggle("dark-mode");
    text.innerText = ledbulb.classList.contains("off") ? "Status: Off" : "Status: On";
});
