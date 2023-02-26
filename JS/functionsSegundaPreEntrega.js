
function agregarProducto(array) {
    let marcaIngresada = prompt("Ingrese el nombre del producto")
    let nombreIngresado = prompt("Ingrese la marca del producto")
    let precioIngresado = parseInt(prompt("Ingrese el precio del producto"))


    const nuevoProducto = new Producto(array.length + 1, marcaIngresada, nombreIngresado, precioIngresado)
    console.log(nuevoProducto)
    array.push(nuevoProducto)
    mostrarCatalogo(array)
}
function mostrarCatalogo(array) {
    console.log("Los productos disponibles en stock son:")
    for (let elemento of array) {
        console.log(elemento.id, elemento.nombre, elemento.marca, elemento.precio)
    }
}
function mostrarCatalogoForEach(arr) {
    console.log("Nuestro catalogo es con forEach")
    arr.forEach(
        (producto) => {
            console.log(`${producto.id} - ${producto.nombre} de la marca ${producto.marca} que vale ${producto.precio}`)
        }
    )
}
function buscarPorNombre(array) {
    let nombreBuscado = prompt("Ingrese el nombre del producto que desea buscar")
    let nombreEncontrado = array.find(
        (item) => item.nombre.toLowerCase() == nombreBuscado.toLowerCase()
    )
    if (nombreEncontrado == undefined) {
        console.log(`${nombreBuscado} no se encuentra en nuestro stock`)
    } else {
        console.log(nombreEncontrado)
    }
}
function buscarPorMarca(ar) {
    let marcaBuscada = prompt("Ingrese el nombre de la marca que está buscando")
    let busqueda = ar.filter(
        (producto) => producto.marca.toLowerCase() == marcaBuscada.toLowerCase()
    )
    if (busqueda.length == 0) {
        console.log(`Para ${marcaBuscada} no hay productos en stock`)
    } else {
        mostrarCatalogo(busqueda)
    }
}
function ordenarMenorMayor(array) {

    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2) => param1.precio - param2.precio)
    mostrarCatalogo(menorMayor)
}
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    mostrarCatalogo(mayorMenor)
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
    mostrarCatalogo(ordenadoAlfabeticamente)
}
function ordenar(array) {
    let opcion = parseInt(prompt(`
            1 - Ordenar de menor a mayor:
            2 - Ordenar de mayor a menor:
            3 - Ordenar alfabeticamente por nombre de producto:`))
    switch (opcion) {
        case 1:
            ordenarMenorMayor(array)
            break
        case 2:
            ordenarMayorMenor(array)
            break
        case 3:
            ordenarAlfabeticamenteNombre(array)
            break
        default:
            console.log(`${opcion} no es válido para ordenar`)
            break
    }
}
function borrarProducto(array) {
    console.log(`A partir nuestro catalogo ingrese el id del producto que desea eliminar:`)
    for (let elem of array) {
        console.log(`${elem.id} - ${elem.nombre} de la marca ${elem.marca}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))
    let arrayID = array.map(item => item.id)
    let indice = arrayID.indexOf(idEliminar)
    array.splice(indice, 1)
    mostrarCatalogo(array)
}
function menu() {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion(salirMenu)
    } while (!salirMenu)
}
function preguntarOpcion(salir) {
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
            1 - Agregar producto
            2 - Borrar producto
            3 - Consultar catálogo
            4 - Encontrar por nombre:
            5 - Buscar producto de la misma marca:
            6 - Ordenar productos:
            0 - Salir del menu`))
    switch (opcionIngresada) {
        case 1:
            agregarProducto(gondola)
            break
        case 2:
            borrarProducto(gondola)
            break
        case 3:
            mostrarCatalogo(gondola)
            break
        case 4:
            buscarPorNombre(gondola)
            break
        case 5:
            buscarPorMarca(gondola)
            break
        case 6:
            ordenar(gondola)
            break
        case 0:
            console.log("gracias por preferirnos")
            salir = true
            return salir
            break
        default:
            console.log("Ingrese una opción correcta")
            break
    }
}

