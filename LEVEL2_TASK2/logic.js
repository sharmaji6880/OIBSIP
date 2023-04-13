const icon = document.querySelector('.sidebar .icon i')
const about = document.querySelector('.sidebar .about')
const readMore = document.querySelector('.sidebar a')

icon.addEventListener('click',()=> {
    about.classList.toggle('visible')
    if(icon.classList.contains('bx-chevron-up')) {
        icon.classList.remove('bx-chevron-up')
        icon.classList.add('bx-chevron-down')
        readMore.style.display = 'none'
    }
    else {
        icon.classList.remove('bx-chevron-down')
        icon.classList.add('bx-chevron-up')
        readMore.style.display = 'block'
    }
})