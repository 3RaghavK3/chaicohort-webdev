let text=document.getElementById("mainHeading");
let buttons = document.querySelectorAll("button");

buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        text.style.color=window.getComputedStyle(button).backgroundColor;
    })
})

