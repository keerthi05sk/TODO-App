let form=document.getElementById("form");
let textInput=document.getElementById("textInput");
let dateInput=document.getElementById("dateInput");
let textarea=document.getElementById("textarea");
let msg=document.getElementById("msg");
let tasks=document.getElementById("tasks");
let add=document.getElementById("add");


form.addEventListener("submit",(e)=>{
    e.preventDefault(); 
    formvalidation();
});

 let formvalidation=()=>{
    if (textInput.value==="") {
        console.log("failure");
        msg.innerHTML="Task cannot be Blank";
    }
    else {
        console.log("success");
        msg.innerHTML="";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        /*IIFE(immediately invocked function element)*/
        (()=>{
            add.setAttribute("data-bs-dismiss","");
        })();
    }
};


let data=[];

let acceptData=()=>{
    data.push({
        text:textInput.value,
        date:dateInput.value,
        description:textarea.value,
    });
    
   localStorage.setItem("data" ,JSON.stringify(data));/*stored the data in inside the local storage*/
   console.log(data);
   

    createTasks();
};

let createTasks=()=>{
    tasks.innerHTML=""; /*retrive the data*/
    data.map((x, y)=>{
    return (tasks.innerHTML+=`  
        <div id=${y}>
         <span class="fw-bold">${x.text}</span>
     <span class="small text-secondary">${x.date}</span>
     <p>${x.description}</p>
     <span class="options">
         <i onclick="editTask(this)"  data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
         <i onclick="deleteTask(this);createTasks()" class="fa-solid fa-trash"></i>
     </span>
     </div>`
    );
    });
resetForm();
};

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();/*parentelement are ued for jumbing the parent(div)element*/
    data.splice(e.parentElement.parentElement.id,1);/*what one you remove & how much you can remove*/
    localStorage.setItem("data" ,JSON.stringify(data));
    console.log(data);

};

let editTask=(e)=>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;

    deleteTask(e);

};


let resetForm=()=>{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
};

(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [] ;/* OR used for add data*/;/*retrive the data to store outside*/
    createTasks();
    console.log("data");
})();





