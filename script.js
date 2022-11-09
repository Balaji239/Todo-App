const inpVal = document.getElementById("input")
const search = document.getElementById("search")
const Todobtn = document.getElementById("todobtn")
const todoList = JSON.parse(localStorage.getItem("todo"))
const container = document.getElementById("todo-Container")
const TaskCount = document.getElementById("Task-count")


if (todoList) {
    todoList.forEach(todo => {
        AddTodo(todo);
    })
}

Todobtn.addEventListener('click', () => {
    if (localStorage.getItem("todo") == null) {
        localStorage.setItem("todo", '[]')
    }
    if (inpVal.value !== "") {
        let data = JSON.parse(localStorage.getItem("todo"));
        data.push(inpVal.value);
        localStorage.setItem("todo", JSON.stringify(data))
        AddTodo(inpVal.value)
        updateTask();
    }
})

function AddTodo(txt) {

    const todoBody = document.createElement('div')
    todoBody.classList.add("tododiv")
    todoBody.innerHTML = `${txt}<i class="far fa-trash-alt delete"></i>`;
    container.appendChild(todoBody);
    inpVal.value = "";

}

function updateTask() {
    const count = document.querySelectorAll('.tododiv').length;
    TaskCount.innerHTML = `${count} Task pending`
}
updateTask();

function filterTodos(term) {
    Array.from(document.querySelectorAll(".tododiv"))
        .forEach(div => {
            content = div.textContent.toLowerCase();
            if (!content.includes(term)) {
                div.classList.add("hide");
            }
        })
    Array.from(document.querySelectorAll(".tododiv"))
        .forEach(div => {
            content = div.textContent.toLowerCase();
            if (content.includes(term)) {
                div.classList.remove("hide");
            }
        })

}
search.addEventListener('keyup', () => {
    const term = search.value.toLowerCase().trim();
    filterTodos(term);
})

const todoBody = document.querySelectorAll('.tododiv')

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const text = e.target.parentElement.textContent;

        deleteLS(text);
        e.target.parentElement.remove();
        updateTask()
    }
})


function deleteLS(text) {
    const todoList = JSON.parse(localStorage.getItem('todo'));
    localStorage.setItem('todo', JSON.stringify(todoList.filter((txt) => txt !== text)))
}


