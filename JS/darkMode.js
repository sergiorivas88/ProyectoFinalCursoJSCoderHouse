
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let eliminarMode = document.getElementById("eliminarMode")
let modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
console.log(modoOscuro)

if (modoOscuro == true) {
    document.body.classList.add("darkMode")
}
botonDarkMode.addEventListener("click", () => {
    console.log("Btn oscuro funciona")
    document.body.classList.add("darkMode")
    localStorage.setItem("modoOscuro", true)
})
botonLightMode.addEventListener("click", () => {
    console.log("Btn claro funciona")
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})
eliminarMode.addEventListener("click", () => {
    localStorage.removeItem("modoOscuro")
})