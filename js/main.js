
const aq1c = document.querySelector('#pagar');

function agregarAlLocalStorage(id, producto, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let encontrado = false;

    // Verificar si el producto ya está en el carrito
    carrito.forEach(item => {
        if (item.id === id) {
            item.cantidad++;
            encontrado = true;
        }

        calcularTotal();
    });

    // Si el producto no está en el carrito, agregarlo
    if (!encontrado) {
        carrito.push({ id, producto, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarToast(mensaje, color) {
    Toastify({
        text: mensaje,
        duration: 3000,
        style: {
            background: color,
        },
    }).showToast();
}

function agregar1() {
  agregarAlLocalStorage(1, 'Milanesa Napolitana', 1900);
  mostrarToast('Agregado al carrito ID: 1', 'linear-gradient(to right, #00b09b, #96c93d)');
  cargarCarritoDesdeLocalStorage();
}

function quitar1() {
    quitarDelLocalStorage(1);
    mostrarToast('Sacado del carrito ID: 1', 'linear-gradient(to right, #ff2301, #fe0000)');
    cargarCarritoDesdeLocalStorage();
}

function agregar2() {
  agregarAlLocalStorage(2, 'Milanesa Vegana', 2700);
  mostrarToast('Agregado al carrito ID: 2', 'linear-gradient(to right, #00b09b, #96c93d)');
  cargarCarritoDesdeLocalStorage();
}

function quitar2() {
  quitarDelLocalStorage(2);
  mostrarToast('Sacado del carrito ID: 2', 'linear-gradient(to right, #ff2301, #fe0000)');
  cargarCarritoDesdeLocalStorage();
}

function agregar3() {
  agregarAlLocalStorage(3, 'Sandwich de milanesa', 2200);
  mostrarToast('Agregado al carrito ID: 3', 'linear-gradient(to right, #00b09b, #96c93d)');
  cargarCarritoDesdeLocalStorage();
}

function quitar3() {
  quitarDelLocalStorage(3);
  mostrarToast('Sacado del carrito ID: 3', 'linear-gradient(to right, #ff2301, #fe0000)');
  cargarCarritoDesdeLocalStorage();
}

function agregar4() {
  agregarAlLocalStorage(4, 'Moustronesa', 3700);
  mostrarToast('Agregado al carrito ID: 4', 'linear-gradient(to right, #00b09b, #96c93d)');
  cargarCarritoDesdeLocalStorage();
}

function quitar4() {
  quitarDelLocalStorage(4);
  mostrarToast('Sacado del carrito ID: 4', 'linear-gradient(to right, #ff2301, #fe0000)');
  cargarCarritoDesdeLocalStorage();
}

function quitarDelLocalStorage(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar el producto con el ID especificado
    carrito = carrito.filter(item => {
        if (item.id === id) {
            item.cantidad--;
            return item.cantidad > 0; // Solo mantener elementos con cantidad mayor a 0
        }
        return true;
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function pagar() {
    Swal.fire({
        title: '¿Pagar todo?',
        text: 'Si haces esto ya no puedes volver atrás',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Comprado',
                text: 'Ya va a llegar a tu casa',
                icon: 'success'
            });

            // Eliminar todo del localStorage
            localStorage.removeItem('carrito');

            // Limpiar el contenedor en la página
            aq1c.innerHTML = '';

            calcularTotal();
        }
    });
}

function calcularTotal() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  let totalElemento = document.getElementById('total');
  totalElemento.textContent = `Total: $${total}`;
}

function cargarCarritoDesdeLocalStorage() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Limpiar el contenedor antes de volver a cargar los elementos
    aq1c.innerHTML = '';

    carrito.forEach(item => {
        let agregar = document.createElement('h5');
        agregar.classList.add('agregado');
        agregar.innerHTML = `- ${item.producto} x${item.cantidad} $${item.precio * item.cantidad}`;
        aq1c.appendChild(agregar);
    });

    calcularTotal();
}

document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);

