let form = document.getElementById('form');
let taskTitle =document.getElementById('textInput');
let taskTitleMsg=document.getElementById("task-title-msg");
let date=document.getElementById('dateInput');
let description =document.getElementById('textarea');
let taskScreen =document.getElementById('tasks');
let add =document.getElementById('add');



form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    
    if(taskTitle.value===''){
        console.log('Failure');
        taskTitleMsg.innerText="Ce champs ne peut rester vide !" 
          
    }
    else{
        console.log('Task title Success');
        taskTitleMsg.innerText =""
        acceptData();
        add.setAttribute("data-bs-dismiss","modal"); 
        add.click();
        (() =>{
            add.setAttribute("data-bs-dismiss","");
        })()

    }    
};

let data =[{}];
let acceptData = () =>{
    data.push({
    title:taskTitle.value,
    date:date.value,
    description:description.value,
    });
    localStorage.setItem("data",JSON.stringify(data));
    //console.log(data);
    createTasks();
    
}

let createTasks = () =>{
    taskScreen.innerHTML = "";
    data.map((x,y) =>{
        return (taskScreen.innerHTML +=
        `
        <div id=${y}>
            <span class="task-title"> ${x.title}</span>
            <span class="date">${x.date}</span>
            <p>${x.description}</p>
            <span class="options">
                <i data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit " id="edit" onClick="editTask(this)"></i>
                <i class="fas fa-trash" id="delete" onClick="deleteTask(this);createTasks"></i>
            </span>
            
        </div>
        
        `
        );
    });
    
    resetTask();
};

let deleteTask =(e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data",JSON.stringify(data));
   console.log(data);
};

let editTask = (a)=>{
   let selectedTask = a.parentElement.parentElement;
   
    taskTitle.value = selectedTask.children[0].textContent;
   date.value = selectedTask.children[1].textContent;
   description.value =  selectedTask.children[2].textContent ;   

    deleteTask(e);
}   


let resetTask = () =>{
    taskTitle.value='';
    date.value='';
    description.value=''; 
};


(() =>{
 data=JSON.parse(localStorage.getItem("data",data)) || [];
 console.log(data);
 createTasks();
})();







