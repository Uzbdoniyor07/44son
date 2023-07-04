let input=document.getElementById('input');
let addBtn=document.getElementById('addBtn');
let deleteAll=document.getElementById('deleteAll');
let ulContainer=document.getElementById('ulContainer');
let form=document.getElementById('form')
let message_error=document.getElementById('message_error')
let editStatus=false
let editElementId=0;

window.addEventListener('DOMContentLoaded',()=>{
    check()
})

let tasks=JSON.parse(localStorage.getItem('lists'))?JSON.parse(localStorage.getItem('lists')):[]



///////////////////// localstorageni tekshirish
function check(){
    if(tasks.length){
        showTasks();
    }else{
        ulContainer.innerHTML='<span class="text-danger fs-4 text-center">Hozircha xech qanday topshiriq yo\'q</span>'
    }
}
function setTime(){
    let date=new Date();
    let time=date.toLocaleTimeString();
    let day=date.toLocaleDateString()
    return `${time}, ${day}`
}
// /////////////////////// localstoraga saqlash
function setTask(){
    localStorage.setItem('lists',JSON.stringify(tasks));
}


///////////////////// localstoragdagi malumotni ekranga chiqarish
function showTasks(){
    ulContainer.innerHTML=''
    Array.from(tasks).forEach((item,index)=>{
        ulContainer.innerHTML+=`
                        <li class="list-group-item d-flex justify-content-between 
                        ${item.completed?'text-decoration-line-through text-danger':''}">
                            <div>
                                <span class="fw-bold">${index+1})</span>
                                <span>${item.text}</span>
                            </div>
                            <div>
                                <span>${item.time}</span>
                            </div>
                            <div>
                                <i onclick="completeTask(${index})" class="fa-solid fa-circle-check text-success"></i>
                                <i onclick="editTask(${index})" class="fa-solid fa-pen-to-square text-warning"></i>  
                                <i onclick="deleteTask(${index})" class="fa-regular fa-trash-can text-danger"></i>
                            </div>
                        </li>
        `
    })
}

//////////////////////////////////////////////////// localstoraga malumot saqlash
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let input_value=input.value.trim()
    form.reset()
    if(editStatus){
        if(input_value.length){
            tasks.splice(editElementId,1,{text:input_value,time:setTime(),completed:false})
            addBtn.textContent='Add Task'
            editStatus=false;
            setTask();
            showTasks();
            check();
        }else{
            message_error.innerHTML='Iltimos text kiriting'
            setTimeout(()=>{
                message_error.textContent=''
            },2000)
        }
    }else{
        if(input_value.length){
            tasks.push({text:input_value,time:setTime(),completed:false})
            setTask()
            check();
        }else{
            message_error.innerHTML='Iltimos text kiriting'
            setTimeout(()=>{
                message_error.textContent=''
            },2000)
        }
    }
})


///// DELETE ONE ITEM
function deleteTask(index){
    let deletedTask=tasks.filter((item,id)=>{
        return index!==id
    })
    tasks=deletedTask
    setTask()
    showTasks()
}


//////DELETE ALL
deleteAll.addEventListener('click',()=>{
    tasks=[]
    setTask()
    showTasks()
})

function editTask(id){
    editElementId=id;
    editStatus=true;
    let editElementValue=tasks.filter((task,i)=>i==id)[0].text
    input.value=editElementValue
    addBtn.textContent='Save Task'
}


function completeTask(id){
    let completedTask=tasks.map((task,i)=>{
        if(id==i){
            return {...task,completed:!task.completed}
        }else{
            return {...task}
        }
    })
    tasks=completedTask
    setTask()
    showTasks();
    check();
}