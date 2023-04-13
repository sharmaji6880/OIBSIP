const textArea = document.querySelector(".addtodos textarea");
const app = document.querySelector(".app")
const todos = document.querySelector(".todos")
const filter = document.querySelector(".filter")
const updateBox = document.querySelector(".updatebox")
const updateBtn = document.querySelector(".update_btn")
const cancelBtn = document.querySelector(".cancel_btn")
let delTodos = document.getElementsByClassName("deltodo")
let updTodos = document.getElementsByClassName("updatetodo")
let markAsCompleteBtn = document.getElementsByClassName("complete")

let toBeUpdated



const todosList = localStorage.getItem("todosList")?JSON.parse(localStorage.getItem("todosList")):[]
const completedTodosList = localStorage.getItem("completedTodosList")?JSON.parse(localStorage.getItem("completedTodosList")):[]


const showUpdateBox = (e)=> {
  updateBox.style.display = "block"
  app.style.filter = "blur(4px)"
  toBeUpdated = e.target.closest(".todo")
  updateBox.children[1].value = toBeUpdated.children[0].textContent
}

//Function which is used to delete the todos and is invoked whenever the delete icon is pressed
const deleteTodos = (e)=> {
  let value = e.target.parentElement.parentElement.parentElement.children[0].textContent
  e.target.closest(".todo").remove()
  let index = -1;
  for(let i=0;i<todosList.length;i++){
    if(todosList[i]===value) {
      index = i;
      break;
    }
  }
  todosList.splice(index,1)
  completedTodosList.splice(completedTodosList.indexOf(value),1)
  localStorage.setItem("todosList",JSON.stringify(todosList))
  localStorage.setItem("completedTodosList",JSON.stringify(completedTodosList))
}

const markAsComplete = (e)=> {
  e.target.closest(".todo").classList.add("completed")
  completedTodosList.push(e.target.closest(".todo").children[0].textContent.toString())
  localStorage.setItem("completedTodosList",JSON.stringify(completedTodosList))
}



// Function which is called whenever the AddTodo button is clicked
const addTodos = ()=> {
  let value = textArea.value;
  if(value.trim()==="") {
    alert("You cannot add an empty todo")
    return false
  }
  const div = document.createElement("div")
  div.classList.add("todo")
  
  let item = `
                <p class="text">${textArea.value}</p>
                <div class="icon-container">
                  <button class="complete"><i class="bx bx-check"></i></button>
                  <button class="deltodo"><i class="bx bx-x"></i></button>
                  <button class="updatetodo"><i class="bx bx-edit-alt"></i></button>
                </div>
              `
  div.innerHTML = item
  todos.appendChild(div)
  textArea.value=""
  todosList.push(value)
  localStorage.setItem("todosList",JSON.stringify(todosList))

  Array.from(delTodos).forEach((item)=> {
    item.addEventListener('click',deleteTodos)
  })
  Array.from(markAsCompleteBtn).forEach((item)=> {
    item.addEventListener('click',markAsComplete)
  })
  Array.from(updTodos).forEach((item)=> {
    item.addEventListener('click',showUpdateBox)
  })
}


//Function which is called whenever the page reloads. It basically renders all the todos after a reload by taking the values from localStorage
const showTodos = ()=> {
  for(let i=0;i<todosList.length;i++) {
    let item = ``;
    if(completedTodosList.indexOf(todosList[i]) === -1) {
      item = `<div class="todo">
              <p class="text">${todosList[i]}</p>
              <div class="icon-container">
                <button class="complete"><i class="bx bx-check"></i></button>
                <button class="deltodo"><i class="bx bx-x"></i></button>
                <button class="updatetodo"><i class="bx bx-edit-alt"></i></button>
              </div>
            </div>`
    }
    else {
      item = `<div class="todo completed">
              <p class="text">${todosList[i]}</p>
              <div class="icon-container">
                <button class="complete"><i class="bx bx-check"></i></button>
                <button class="deltodo"><i class="bx bx-x"></i></button>
                <button class="updatetodo"><i class="bx bx-edit-alt"></i></button>
              </div>
            </div>`
    }
    
    todos.innerHTML += item

  }
  
  Array.from(delTodos).forEach((item)=> {
    item.addEventListener('click',deleteTodos)
  })
  Array.from(markAsCompleteBtn).forEach((item)=> {
    item.addEventListener('click',markAsComplete)
  })
  Array.from(updTodos).forEach((item)=> {
    item.addEventListener('click',showUpdateBox)
  })
}





document.querySelector(".addtodo").addEventListener('click',addTodos)
window.addEventListener('load',showTodos)

filter.addEventListener('change',()=> {
  switch(filter.value) {
    case "All":
      Array.from(document.querySelectorAll(".todo")).forEach((todo)=> {
        todo.style.display = "block"
      })
      break

    case "Complete":
      Array.from(document.querySelectorAll(".todo")).forEach((todo)=> {
        if(todo.classList.contains("completed")) {
          todo.style.display = "block"
        }
        else {
          todo.style.display = "none"
        }
      })
      break

    case "Incomplete":
      Array.from(document.querySelectorAll(".todo")).forEach((todo)=> {
        if(todo.classList.contains("completed")) {
          todo.style.display = "none"
        }
        else {
          todo.style.display = "block"
        }
      })
      break

  }
})

cancelBtn.addEventListener('click',()=> {
  updateBox.style.display = 'none'
  app.style.filter = "none"
})
updateBtn.addEventListener('click',()=> {
  let value = updateBox.children[1].value
  if(value.trim()==="") {
    return alert("cannot add an empty todo")
  }
  todosList[todosList.indexOf(toBeUpdated.children[0].textContent)] = value
  toBeUpdated.children[0].textContent = value
  updateBox.style.display = 'none'
  app.style.filter = 'none'
  localStorage.setItem("todosList",JSON.stringify(todosList))
})



