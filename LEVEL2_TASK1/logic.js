const inputBtns = document.querySelectorAll(".input-btn")
const input = document.querySelector(".screen input")
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')

inputBtns.forEach((button)=> {
    button.addEventListener('click',()=> {
        input.value += button.textContent
    })
})
equal.addEventListener('click',()=> {
    if(input.value.trim()=="") {
        return
    }
    try {
        input.value = eval(input.value)
    }catch(err) {
        alert("(-_-)  Please check your syntax")
    }
    
})
clear.addEventListener('click',()=> {
    input.value = ""
})
deleteBtn.addEventListener('click',()=> {
    input.value = input.value.substr(0,input.value.length-1)
})