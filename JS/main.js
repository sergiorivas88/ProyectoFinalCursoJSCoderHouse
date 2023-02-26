let productosDiv = document.getElementById("productos")
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let inputBuscador = document.querySelector("#buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let precioTotal = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let reloj = document.getElementById("reloj")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`

let productosEnCarrito
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}
function verCatalogo(array) {
    productosDiv.innerHTML = ""
    for (let producto of array) {
        let nuevoProductoDiv = document.createElement("div")
        nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoProductoDiv.innerHTML = `
        <div id="${producto.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${producto.imagen}" alt="${producto.nombre} de ${producto.marca}">
            <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <p>Marca: ${producto.marca}</p>
                <p class="${producto.precio <= 2300 && "ofertaProducto"}">Precio: ${producto.precio}</p>
                <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        productosDiv.appendChild(nuevoProductoDiv)
        let agregarBtn = document.getElementById(`agregarBtn${producto.id}`)
        agregarBtn.onclick = () => {
            agregarAlCarrito(producto)
        }
    }
}
function agregarAlCarrito(producto) {
    console.log(`El producto ${producto.nombre} de ${producto.marca} ha sido agregado al carrito y vale ${producto.precio}`)
    productosEnCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    console.log(productosEnCarrito)
}
function cargarProducto(array) {
    let inputMarca = document.getElementById("marcaInput")
    let inputNombre = document.getElementById("nombreInput")
    let inputPrecio = document.getElementById("precioInput")
    const nuevoProducto = new Producto(array.length + 1, inputMarca.value, inputNombre.value, parseInt(inputPrecio.value), "nuevo.jpg")
    console.log(nuevoProducto)
    array.push(nuevoProducto)
    localStorage.setItem("gondola", JSON.stringify(array))
    verCatalogo(array)
    let formAgregarProducto = document.getElementById("formAgregarProducto")
    formAgregarProducto.reset()
    Toastify({
        text: `El producto ${nuevoProducto.nombre} de la marca ${nuevoProducto.marca} ha sido agregado al stock`,
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
        }
    }).showToast()
}
function buscarInfo(buscado, array) {
    let busquedaArray = array.filter(
        (producto) => producto.marca.toLowerCase().includes(buscado.toLowerCase()) || producto.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    busquedaArray.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, verCatalogo(busquedaArray))
        : (coincidencia.innerHTML = "", verCatalogo(busquedaArray))
}
function cargarProductosCarrito(array) {
    console.log("Funciona btn render carrito")
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombre}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.nombre}</h4>
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `
    })
    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            let productoEliminar = array.find(producto => producto.id == productoCarrito.id)
            console.log(productoEliminar)
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            array.splice(posicion, 1)
            console.log(array)
            localStorage.setItem("carrito", JSON.stringify(array))
            compraTotal(array)
        })
    })
    compraTotal(array)
}
function agregarAlCarrito(producto) {
    console.log(producto)
    let productoAgregado = productosEnCarrito.find((elem) => elem.id == producto.id)
    if (productoAgregado == undefined) {
        console.log(`El producto ${producto.nombre} de ${producto.marca} ha sido agregado al carrito y vale ${producto.precio}`)
        productosEnCarrito.push(producto)

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

        Swal.fire({
            title: 'Ha agregado un producto',
            text: `El producto ${producto.nombre} de ${producto.marca} ha sido agregado`,
            icon: "info",
            confirmButtonText: "Muchas Gracias",
            confirmButtonColor: "green",
            timer: 3000,
            imageUrl: `assets/${producto.imagen}`,
            imageHeight: 200
        })
    } else {
        console.log(`El producto ${producto.nombre} de ${producto.marca} ya se encuentra en el carrito`)
        Swal.fire({
            text: `El producto ${producto.nombre} de ${producto.marca} ya existe en el carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        })
    }
}
function compraTotal(array) {
    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)
    console.log("Acc con reduce " + total)
    total == 0 ?
        precioTotal.innerHTML = `No hay productos agregados` :
        precioTotal.innerHTML = `El total del carrito es $ <strong>${total}</strong>`
    return total
}
function finalizarComprar(array) {
    Swal.fire({
        title: '¿Desea Finalizar la Compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        if (result.isConfirmed) {
            let totalFinalizar = compraTotal(array)
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra. El total de la compra fue de $ ${totalFinalizar}`,
            })
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        } else {
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito: `,
                confirmButtonColor: 'green',
                timer: 3500
            })
        }
    })
}
function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2) => param1.precio - param2.precio)
    verCatalogo(menorMayor)
}
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    verCatalogo(mayorMenor)
}
function ordenarAlfabeticamenteNombre(array) {
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })
    verCatalogo(ordenadoAlfabeticamente)
}
guardarProductoBtn.addEventListener("click", () => {
    cargarProducto(gondola)
})
inputBuscador.addEventListener("input", () => {
    buscarInfo(inputBuscador.value.toLowerCase(), gondola)
})
selectOrden.addEventListener("change", () => {
    if (selectOrden.value == "1") {
        ordenarMayorMenor(gondola)
    } else if (selectOrden.value == "2") {
        ordenarMenorMayor(gondola)
    } else if (selectOrden.value == "3") {
        ordenarAlfabeticamenteNombre(gondola)
    } else {
        verCatalogo(gondola)
    }
})
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})
botonFinalizarCompra.addEventListener("click", () => {
    finalizarComprar(productosEnCarrito)
})
setTimeout(() => {
    loaderTexto.innerText = ""
    loader.remove()
    verCatalogo(gondola)
}, 2000)
setInterval(() => {
    let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    reloj.innerHTML = `${horaActual}`
}, 1000)
