class Producto {
    constructor(id, marca, nombre, precio, imagen) {
        this.id = id,
            this.marca = marca,
            this.nombre = nombre,
            this.precio = precio,
            this.imagen = imagen,
            this.cantidad = 1
    }
    mostrarInfoProducto() {
        console.log(`El nombre del producto es ${this.nombre}, de la marca ${this.marca} y su precio es ${this.precio}`)
    }
    sumarUnidad() {
        this.cantidad += 1
    }
    restarUnidad() {
        this.cantidad += 1
    }
}

const producto1 = new Producto(1, "Cousa", "Aceite", 120, "aceite.jpg")

const producto2 = new Producto(2, "Azucarlito", "Azucar", 55, "azucar.png")

const producto3 = new Producto(3, "Claldy", "Yogurth", 45, "claldy.jpg")

const producto4 = new Producto(4, "Conaprole", "Leche", 50, "leche.jpg")

const producto5 = new Producto(5, "Pagnifique", "Pan", 56, "pan.png")

const producto6 = new Producto(6, "Canarias", "Yerba", 120, "yerba.jpg")

let gondola = []

const cargarGondola = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()
    for (let producto of data) {
        let productoNuevo = new Producto(producto.id, producto.marca, prdoducto, nombre, producto.precio, producto.imagen)
        gondola.push(productoNuevo)
    }
    console.log(gondola)
    localStorage.setItem("gondola", JSON.stringify(gondola))
}
if (localStorage.getItem("gondola")) {
    for (let producto of JSON.parse(localStorage.getItem("gondola"))) {
        let productoStorage = new Producto(producto.id, producto.marca, producto.nombre, producto.precio, producto.imagen)
        gondola.push(productoStorage)
    }
    console.log(gondola)
} else {
    console.log("Seteamos")
    cargarGondola()
}
