let addbutton=document.getElementById("addButton");
let taskInput=document.getElementById("taskInput");
let display=document.getElementById("taskList")
let totaltasks=document.getElementById("totalTasks")
let completedtasks=document.getElementById("completedTasks")
let size=0//this is size of actual task excluding (empty list); 
let completed=0;

function checkempty(){
        let emptyli=document.createElement("li");
        emptyli.classList.add("empty-list");
        emptyli.innerText="No tasks yet. Add one above!";
        display.appendChild(emptyli);
}


addbutton.addEventListener("click",()=>{
    if(taskInput.value.trim().length>0){
        size++;
        totaltasks.innerText=`Total tasks: ${size}`
        //now it means there will be one task added 
        if (size==1){
            //if size ==1 then this means (the first actual task will be added)
            //so we remove the empty list for now
            display.innerHTML="";
        }

        let taskcontainer=document.createElement("li");
        taskcontainer.classList.add("task-item");

        let tasktext=document.createElement("div");
        tasktext.classList.add("task-text")
        tasktext.innerText+=taskInput.value.trim();
        taskInput.value="";

        let checkbox=document.createElement("div");
        checkbox.classList.add("complete-checkbox");
        

        let dlt=document.createElement("div");
        dlt.classList.add("delete-button");

        dlt.addEventListener("click",()=>{
            if (taskcontainer.classList.contains("completed")){
                completed --;
                completedtasks.innerText=`Completed: ${completed}`
            }
            taskcontainer.remove();
            size--;
            totaltasks.innerText=`Total tasks: ${size}`
            //only if the size of actual task goes to 0, add empty list
            if(size===0) checkempty();
        })

        checkbox.addEventListener("click",()=>{
            
            if (taskcontainer.classList.contains("completed")) {
                taskcontainer.classList.remove("completed")
                completed--; 
            } else {
                taskcontainer.classList.add("completed")
                completed++;
                
            }
            completedtasks.innerText=`Completed: ${completed}`
        })
    
        display.appendChild(taskcontainer);
        taskcontainer.appendChild(tasktext);
        taskcontainer.appendChild(checkbox);
        taskcontainer.appendChild(dlt);
       
       
    }
})


