const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

loadTask();

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskInput = document.getElementById("task-input");
    const task = taskInput.value;
    console.log(task)

    if(task){
        taskList.append(createTaskElement(task));
        storeTaskInLocalStrorage(task);
        taskInput.value = "";
    }
});

function createTaskElement(task) {
    const li = document.createElement("li");
    li.textContent = task; 
    li.append(createButton("❌", "delete-btn"), createButton("✏️", "edit-btn") )
    return li;
}

function createButton(iconAction, className){
    const btn  = document.createElement("span");
    btn.textContent = iconAction;
    btn.className = className; 
    return btn
}

taskList.addEventListener("click", (event)=>{
    if(event.target.classList.contains("delete-btn")){
        deleteTask(event.target.parentElement)
    }else if(event.target.classList.contains("edit-btn")){
        editTask(event.target.parentElement)
    }
})

function deleteTask (taskItem){
    if(confirm("seguro quieres borrar")){
        taskItem.remove();
        updateLocalStorage()
    }
}

function editTask(taskItem){
    const newTask = prompt("edita la tareas: " , taskItem.firstChild.textContent); 
    if(newTask !== null){
        taskItem.firstChild.textContent = newTask;
        updateLocalStorage();
    }
}

function storeTaskInLocalStrorage(task){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]" ) 

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTask(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]" )
    tasks.forEach((task) => {
       taskList.appendChild(createTaskElement(task));
       console.log(task)        
    });
}

function updateLocalStorage(){
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li)=> li.firstChild.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const themeToggleButton = document.getElementById("toggle-theme-btn")

const currentTheme = localStorage.getItem("theme")

themeToggleButton.addEventListener("click" , ()=>{
    document.body.classList.toggle("dark-theme")
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme)
});

if (currentTheme === "dark") {
    document.body.classList.add("dark-theme")    
}