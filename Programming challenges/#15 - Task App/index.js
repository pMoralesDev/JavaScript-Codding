const taskInput = document.querySelector(".task-input input")
const filters = document.querySelectorAll(".filters span")
const clearAll = document.querySelector(".clear-btn")
const taskBox = document.querySelector(".task-box")

let editID
let isEditTask = false
let all = JSON.parse(localStorage.getItem("all-list"))

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active")
        btn.classList.add("active")
        showAll(btn.id)
    })
})

function showAll (filter){
    let liTag = ""
    if(all){
        all.forEach((al, id) => {
            let completed = al.status == "completed" ? "checked" : ""
            if(filter == al.status || filter == "all"){
                liTag += `
                <li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}">${al.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id}, "${al.name}")'>
                                <i class = "uil uil-pen"></i>
                                Edit
                            </li>
                            <li onclick='deleteTask(${id}, "${filter}")'>
                                <i class = "uil uil-trash"></i>
                                Delete
                            </li>
                        </ul>
                    </div>
                </li>
                `
            }
        })
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`
    let checkTask = taskBox.querySelectorAll(".task")
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active")
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow")
}
showAll("all")
function showMenu(selectedTask){
    let menuDiv = selectedTask.parentElement.lastElementChild
    menuDiv.classList.add("show")
    document.addEventListener("click", e => {
        if(e.target.tagname !="I" || e.target != e.target != selectedTask) {
            menuDiv.classList.remove("show")
        }
    })
}

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild
    if(selectedTask.checked){
        taskName.classList.add("checked")
        all[selectedTask.id].status = "completed"
    } else {
        taskName.classList.remove("checked")
        all[selectedTask.id].status = "pending"
    }
    localStorage.setItem("all-list", JSON.stringify(all))
}

function editTask(taskID, textName) {
    editID = taskID
    isEditTask = true
    taskInput.value = textName
    taskInput.focus()
    taskInput.classList.add("active")
}

function deleteTask(deleteID, filter){
    isEditTask = false
    all.splice(deleteID,1)
    localStorage.setItem("all-list", JSON.stringify(all))
    showAll(filter)
}

clearAll.addEventListener("click", () => {
    isEditTask = "false"
    all.splice(0, all.length)
    localStorage.setItem("all-list", JSON.stringify(all))
    showAll()
})

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim()
    if(e.key == "Enter" && userTask) {
        if(!isEditTask){
            all = !all ? [] : all
            let taskInfo = {name: userTask, status: "pending"}
            all.push(taskInfo)
        }else{
            isEditTask=false
            all[editID].name = userTask
        }
        taskInput.value = ""
        localStorage.setItem("all-list", JSON.stringify(all))
        showAll(document.querySelector("span.active").id)
    }
})