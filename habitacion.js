document.addEventListener("DOMContentLoaded", function () {
  fetchHabitaciones();
  fetchComodidades();
});

function fetchHabitaciones() {
  fetch("http://localhost:5000/habitaciones")
    .then((response) => response.json())
    .then((data) => {
      const habitacionesContainer = document.getElementById(
        "carousel-habitaciones"
      );
      data.forEach((habitacion) => {
        let imagenes = habitacion.imagenes
          .map(
            (imagen) =>
              `<img src="${imagen}" class="d-block w-100" alt="${habitacion.nombre}">`
          )
          .join("");
        const habitacionItem = `
          <div class="carousel-item active">
            ${imagenes}
            <div class="carousel-caption d-none d-md-block text-white">
              <h5>${habitacion.nombre}</h5>
              <p>${habitacion.descripcion}</p>
              <p class="font-bold">${habitacion.precio}</p>
              <a href="reservas.html?habitacionId=${habitacion.id}" class="btn btn-warning">Reservar</a>
            </div>
          </div>
        `;
        habitacionesContainer.innerHTML += habitacionItem;
      });
    });
}

function fetchComodidades() {
  fetch("http://localhost:5000/comodidades")
    .then((response) => response.json())
    .then((data) => {
      const comodidadesContainer = document.getElementById(
        "comodidades-container"
      );
      data.forEach((comodidad) => {
        const comodidadItem = `
          <div class="card bg-white shadow-lg text-center">
            <img src="${comodidad.icono}" alt="${comodidad.titulo}" class="w-20 mx-auto mb-4">
            <h3 class="text-2xl font-semibold">${comodidad.titulo}</h3>
            <p class="mt-4 text-gray-600">${comodidad.descripcion}</p>
          </div>
        `;
        comodidadesContainer.innerHTML += comodidadItem;
      });
    });
}
const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });