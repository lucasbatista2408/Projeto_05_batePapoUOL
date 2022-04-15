const elemento = document.querySelector(".menu")
elemento.addEventListener("click", sideBar)

const camada = document.querySelector(".layer")
camada.addEventListener("click", layer)

function sideBar(){
  let elem = document.querySelector('.sidebar')
  elem.classList.remove('hidden')
  let elem2 = document.querySelector(".layer")
  elem2.classList.remove('hidden')
}

function layer(){
  let el = document.querySelector(".layer")
  el.classList.add('hidden')
  let el2 = document.querySelector('.sidebar')
  el2.classList.add('hidden')
}