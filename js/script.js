// FETCH

fetch('js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })

// VARIABLES

const containerDestacados = document.querySelector('#container-destacados');
const containerVelas = document.querySelector('#container-velas');
const containerDifusores = document.querySelector('#container-difusores');
const containerProductos = document.querySelector('#container-productos');
const containerCarrito = document.querySelector('#container-carrito');
let botonesAgregar = document.querySelectorAll('.agregar-carrito');
let botonesEliminar = document.querySelectorAll('.eliminar-carrito');
const cantidadCarrito = document.querySelector('#cantidad-carrito');
const botonVaciar = document.querySelector('#vaciar-carrito');
const subTotal = document.querySelector('#subTotal');
const botonComprar = document.querySelector('#comprar-carrito');

// CARGAR PRODUCTOS

function cargarProductos(productos) {

    const destacados = productos.filter(p => p.destacado === true)
    const velas_aromaticas = productos.filter(p => p.categoria === "Velas Aromaticas")
    const difusores_aromaticos = productos.filter(p => p.categoria === "Difusores Aromaticos")

    if (containerProductos) {
        productos.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('product-card', 'col-6', 'col-md-3', 'agregar-carrito')
            div.setAttribute('id', producto.id)

            div.innerHTML = `
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">
                            <p class="fw-medium m-0">${producto.nombre}</p>
                            <p class="fw-semibold m-0">$${producto.precio}</p>
                    `;

            containerProductos.append(div);
        })

    }

    if (containerDestacados) {
        destacados.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('product-card', 'col-6', 'col-md-3', 'agregar-carrito')
            div.setAttribute('id', producto.id)

            div.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">
                        <p class="fw-medium m-0">${producto.nombre}</p>
                        <p class="fw-semibold m-0">$${producto.precio}</p>
                `;

            containerDestacados.append(div);
        })
    }

    if (containerVelas) {
        velas_aromaticas.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('product-card', 'col-6', 'col-md-3', 'col-lg-2', 'agregar-carrito')
            div.setAttribute('id', producto.id)

            div.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">
                        <p class="fw-medium m-0">${producto.nombre}</p>
                        <p class="fw-semibold m-0">$${producto.precio}</p>
                `;

            containerVelas.append(div);
        })
    }

    if (containerDifusores) {
        difusores_aromaticos.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('product-card', 'col-6', 'col-md-3', 'col-lg-2', 'agregar-carrito')
            div.setAttribute('id', producto.id)

            div.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">
                        <p class="fw-medium m-0">${producto.nombre}</p>
                        <p class="fw-semibold m-0">$${producto.precio}</p>
                `;

            containerDifusores.append(div);
        })
    }

    actualizarBotonesAgregar()

}

function actualizarBotonesAgregar() {

    botonesAgregar = document.querySelectorAll('.agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    })

}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem('carrito');

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarCantidadCarrito()
} else {
    productosEnCarrito = [];
    cargarProductosCarrito();

}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto Agregado",
        duration: 1000,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            padding: "1rem 2rem",
            background: "#000000",
            borderRadius: "2rem",
            color: "#FFFFFF",
            fontWeight: "600"
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarCantidadCarrito();
    cargarProductosCarrito();

    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

}

function actualizarCantidadCarrito() {

    nuevaCantidadCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadCarrito.innerText = nuevaCantidadCarrito;

}

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        containerCarrito.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('col-12', 'producto-carrito')

            div.innerHTML = `
                    <span class="producto-carrito-cantidad">${producto.cantidad}</span>
                    <img src="${producto.imagen}" class="producto-carrito-img" alt='${producto.nombre}'>
                    <h3 class="producto-carrito-nombre">${producto.nombre}</h3>
                    <h4 class="producto-precio">${producto.precio}</h4>
                    <i class="fa-solid fa-circle-xmark fa-xl eliminar-carrito" id=${producto.id}></i>
        `;

            containerCarrito.append(div);
        })

        actualizarBotonesEliminar()
        actualizarTotal()

    } else {

        containerCarrito.innerHTML = "";
        actualizarTotal()

    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {

    botonesAgregar = document.querySelectorAll('.eliminar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito);
    })

}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto Eliminado",
        duration: 1000,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            padding: "1rem 2rem",
            background: "#000000",
            borderRadius: "2rem",
            color: "#FFFFFF",
            fontWeight: "600"
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);


    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();
    actualizarCantidadCarrito();

    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Se van a borrar ${productosEnCarrito.length} productos`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Si, Vaciar',
            iconColor: '#d33',
            color: '#121212'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Tu carrito fue eliminado.',
                    'success',
                )
                productosEnCarrito.length = 0;
                localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
                cargarProductosCarrito()
                actualizarCantidadCarrito();

            }
        })

    } else {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Tu carrito esta vacío!',
        })
    }
}

function actualizarTotal() {
    totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    subTotal.innerText = `Subtotal : $${totalCalculado}`;
}

botonComprar.addEventListener('click', comprarCarrito);

function comprarCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        let timerInterval
        Swal.fire({
            title: '¡Muchas gracias por tu compra!',
            html: 'Tu pedido ha sido realizado y está siendo procesado. Recibirás un correo electrónico con los detalles del pedido.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })

        productosEnCarrito.length = 0;
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
        cargarProductosCarrito()
        actualizarCantidadCarrito();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Tu carrito esta vacío!',
        })
    }
}

