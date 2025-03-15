let inputs=document.querySelectorAll("input","textarea");
let displays=document.querySelectorAll("span");


inputs.forEach((input,index)=>{
    input.addEventListener("input",()=>{
            if (input.value==="") displays[index].innerText="Not Provided"
            else displays[index].innerText=input.value;
            
    })
})