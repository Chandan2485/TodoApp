const creat_task_btn = document.querySelector(".creat_task_btn")   //--------------------------popup------------------------
const close = document.querySelector(".close")
const popup = document.querySelector(".popup")

creat_task_btn.addEventListener("click", showPopup)
function showPopup() {
    popup.classList.remove("popup_hidden")
}
close.addEventListener("click", hidePopup)
function hidePopup() {
    popup.classList.add("popup_hidden")
}
// -------------------------------------------------------------------------------------------Add Tasks-----------------------
let i = 0, j = 0
let task_text_arr = [], task_color_arr = [], com_text_arr = [], com_color_arr = []
const task_text = document.querySelector(".task_input_box")
const done = document.querySelector(".done")
const p_color = document.querySelector(".p_color")
const task_list = document.querySelector(".task_list")

done.addEventListener("click", addData)
// done.style.overflow = 'hidden'
function addData(e) {
    e.preventDefault()
    // var final = document.querySelector(.task_list);
    // if()
    if (task_color_arr[i] != undefined) {
        task_text_arr[i] = `${task_text.value}`
        i++
        task_list.innerHTML += ` 
        <div class="tasks">
        <div>
            <div class="color"></div>
            <div class="task_field">${task_text_arr[i - 1]}</div>
        </div>
        <div class="footer">
                <div class="modifiy lock_item">
                   <i class="fa-solid fa-check" id="complete" ></i>
                   <i class="fa-solid fa-trash-can" id="remove"></i>
                   <i class="fa-solid fa-pen-to-square" id="edit"></i>
                   <i class="fa-solid fa-square color1" id="color"></i>
                </div>
                <i class="fa-solid fa-lock" id="lock"></i>
            
        </div>
</div>`
        document.querySelectorAll(".color")[i - 1].style.backgroundColor = `${task_color_arr[i - 1]}`
        document.querySelectorAll(".color1")[i - 1].style.color = `${task_color_arr[i - 1]}`
    }
    task_text.value=""
}
p_color.addEventListener("click", pickColor)
function pickColor(e) {
    if ((e.target.id == "red" || e.target.id == "yellow" || e.target.id == "blue" || e.target.id == "black") && (task_text.value.trim() != "")) {
        task_color_arr[i] = `${e.target.id}`
    }
}
// ------------------------------------------------------------------------------------------------------filter task---------------------

const menubtn = document.querySelector(".menu")
menubtn.addEventListener('click', sortTask)

function sortTask(e) {
    if (e.target.id == `all`) {
        task_list.innerHTML = ''
        for (let j = 0; j < task_color_arr.length; j++) {
            task_list.innerHTML += ` 
            <div class="tasks">
            <div>
                <div class="color"></div>
                <div class="task_field">${task_text_arr[j]}</div>
            </div>
            <div class="footer">
                    <div class="modifiy lock_item">
                       <i class="fa-solid fa-check" id="complete" ></i>
                       <i class="fa-solid fa-trash-can" id="remove"></i>
                       <i class="fa-solid fa-pen-to-square" id="edit"></i>
                       <i class="fa-solid fa-square color1" id="color"></i>
                    </div>
                    <i class="fa-solid fa-lock " id="lock"></i>
                
            </div>
    </div>`

            document.querySelectorAll(".color")[j].style.backgroundColor = `${task_color_arr[j]}`
            document.querySelectorAll(".color1")[j].style.color = `${task_color_arr[j]}`
        }
    }
    else if (e.target.id == `completed`) {
        task_list.innerHTML = ''
        for (let j = 0; j < com_text_arr.length; j++) {
            task_list.innerHTML += ` 
            <div class="tasks"><div>
                <div class="color"></div>
                <div class="task_field">${com_text_arr[j]}</div>
            </div>`
            document.querySelectorAll(".color")[j].style.backgroundColor = `${com_color_arr[j]}`
        }
    }
    else if (e.target.id == `red` || e.target.id == `yellow` || e.target.id == `blue` || e.target.id == `black`) {
        task_list.innerHTML = ''
        let k = 0
        for (let j = 0; j < task_color_arr.length; j++) {
            if (task_color_arr[j] == `${e.target.id}`) {
                task_list.innerHTML += ` 
                <div class="tasks">
                <div>
                    <div class="color"></div>
                    <div class="task_field">${task_text_arr[j]}</div>
                </div>
                <div class="footer">
                        <div class="modifiy lock_item">
                           <i class="fa-solid fa-check" id="complete" ></i>
                           <i class="fa-solid fa-trash-can" id="remove"></i>
                           <i class="fa-solid fa-pen-to-square" id="edit"></i>
                           <i class="fa-solid fa-square color1" id="color"></i>
                        </div>
                        <i class="fa-solid fa-lock" id="lock"></i>
                    
                </div>
        </div>`
                document.querySelectorAll(".color")[k].style.backgroundColor = `${task_color_arr[j]}`
                document.querySelectorAll(".color1")[k].style.color = `${task_color_arr[j]}`
                k++
            }
        }
    }
}
// ------------------------------------------------------------------------------------------------------edit lock remove etc--------------------
task_list.addEventListener("click", lockUnlock)
let rename_index = 0
let z = 0
function lockUnlock(e) {

    if ((e.target.id == "lock") || (e.target.id == "unlock")) {
        if (e.target.id == "lock") {
            if (document.getElementById("unlock")) {
                console.log(document.getElementById("unlock"))
                document.getElementById("unlock").classList.replace("fa-lock-open", "fa-lock")
                document.getElementById("unlock").previousElementSibling.classList.add("lock_item")
                document.getElementById("unlock").setAttribute("id","lock")
            }
            e.target.previousElementSibling.classList.remove("lock_item")
            e.target.classList.replace("fa-lock", "fa-lock-open")
            e.target.setAttribute("id", "unlock")
        }
        else {
            e.target.previousElementSibling.classList.add("lock_item")
            e.target.setAttribute("id", "lock")
            e.target.classList.replace("fa-lock-open", "fa-lock")
        }
    }
    else if (e.target.id == "remove") {
        let remove_ele = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.innerText
        let remove_index = task_text_arr.indexOf(remove_ele)
        task_color_arr.splice(remove_index, 1)
        task_text_arr.splice(remove_index, 1)
        e.target.parentElement.parentElement.parentElement.remove()
    }
    else if (e.target.id == "complete") {
        let com_ele = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.innerText
        let com_index = task_text_arr.indexOf(com_ele)
        com_text_arr.push(task_text_arr.splice(com_index, 1)[0])
        com_color_arr.push(task_color_arr.splice(com_index, 1)[0])
        e.target.parentElement.parentElement.parentElement.remove()
    }
    else if (e.target.id == "edit" || e.target.id == "Save") {
        if (e.target.id == "edit") {
            if (document.getElementById("Save")) {
                document.getElementById("Save").style.color="black"
                let edit_ones = document.getElementById("Save").parentElement.parentElement.previousElementSibling.lastElementChild
                document.getElementById("Save").setAttribute("id", "edit")
                edit_ones.setAttribute("contenteditable", "false")
                
            }
            let rename = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.innerText
            rename_index = task_text_arr.indexOf(rename)
            e.target.parentElement.parentElement.previousElementSibling.lastElementChild.setAttribute("contenteditable", "true")
            e.target.setAttribute("id", "Save")
            e.target.style.color="white"
        }
        else {
            let rename = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.innerText
            task_text_arr[rename_index] = rename
            e.target.parentElement.parentElement.previousElementSibling.lastElementChild.setAttribute("contenteditable", "false")
            e.target.setAttribute("id", "edit")
            e.target.style.color="black"
        }
    }
    else if (e.target.id == "color") {
        let colour_arr = ['red', 'yellow', 'blue', 'black']
        e.target.style.color = colour_arr[z]
        let rename = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.innerText
        let index = task_text_arr.indexOf(rename)
        task_color_arr[index] = colour_arr[z]
        e.target.parentElement.parentElement.previousElementSibling.firstElementChild.style.backgroundColor = `${colour_arr[z]}`
        z++
        z = (z > 3) ? 0 : z
    }
}
// -------------------------------------------------------search---------
const search_text=document.getElementById("search")
const option_text=document.getElementById("option")
const search_btn=document.querySelector(".search_btn")

search_btn.addEventListener("click",searchItem)
function searchItem(){
    let search=search_text.value
    if(option_text.value == "All"){
        task_list.innerHTML = ''
        let item_no=0
        for(let a=0;a<task_text_arr.length;a++){
            if(task_text_arr[a] == search){
                task_list.innerHTML += ` 
                <div class="tasks">
                <div>
                    <div class="color"></div>
                    <div class="task_field">${task_text_arr[a]}</div>
                </div>
                <div class="footer">
                        <div class="modifiy lock_item">
                           <i class="fa-solid fa-check" id="complete" ></i>
                           <i class="fa-solid fa-trash-can" id="remove"></i>
                           <i class="fa-solid fa-pen-to-square" id="edit"></i>
                           <i class="fa-solid fa-square color1" id="color"></i>
                        </div>
                        <i class="fa-solid fa-lock " id="lock"></i>
                    
                </div>
        </div>`
        document.querySelectorAll(".color")[item_no].style.backgroundColor = `${task_color_arr[a]}`
        document.querySelectorAll(".color1")[item_no].style.color = `${task_color_arr[a]}`
        item_no++
            }
        }
    }
    else{
        com_item=0
        task_list.innerHTML = ''
        for(let a=0;a<com_text_arr.length;a++){
            if(com_text_arr[a] == search){
                task_list.innerHTML += ` 
                <div class="tasks">
                <div>
                    <div class="color"></div>
                    <div class="task_field">${com_text_arr[a]}</div>
                </div>
        </div>`
        document.querySelectorAll(".color")[com_item].style.backgroundColor = `${com_color_arr[a]}`
        com_item++
            }
        }
    }
}