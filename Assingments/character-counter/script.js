let currentcount=document.querySelector("#currentcount")
let maxcount=parseInt(document.querySelector("#maxcount").innerText)
console.log(maxcount);
let input=document.querySelector(".inputarea")
let limitdiv=document.querySelector(".limit")



const changecolor=()=>{
    if(input.value.length==maxcount){
        limitdiv.classList.add("add-red")}
    else{limitdiv.classList.remove("add-red")} 
}

const alert=()=>{
    window.alert(`Maximum ${maxcount} characters reached`)
}

const updatecouter=()=>{
    currentcount.innerText=input.value.length
}


input.addEventListener("input",()=>{
    updatecouter()
    changecolor()
})

input.addEventListener("keydown",(event)=>{
    if(input.value.length==maxcount && event.key!=="Backspace")
    { 
    setTimeout(()=>{alert()},0)
    event.preventDefault();
    }

})


input.addEventListener("paste",(event)=>{
    let pastedtext=event.clipboardData.getData("text")
    if(pastedtext.length+input.value.length>maxcount){

        event.preventDefault();
       
        let available=maxcount-input.value.length
        let texttoinsert=pastedtext.slice(0,available)
        input.value+=texttoinsert
        
        updatecouter()
        changecolor()

        setTimeout(()=>{alert()},0)
    

    }



})