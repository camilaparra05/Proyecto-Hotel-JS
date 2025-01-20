const reservasList = document.getElementById("reservasList");

function cargarReservas() {
  fetch("http://localhost:3000/reservas")
    .then((response) => response.json())
    .then((data) => {
      reservasList.innerHTML = "";
      data.forEach((reserva, index) => {
        const reservaElement = document.createElement("div");
        reservaElement.classList.add("reserva");
        reservaElement.innerHTML = `
          <p><strong>Reserva ${index + 1}:</strong> ${reserva.nombre} - ${
          reserva.fecha
        }</p>
          <button onclick="eliminarReserva(${reserva.id})">Eliminar</button>
        `;
        reservasList.appendChild(reservaElement);
      });
    })
    .catch((error) => {
      reservasList.innerHTML = "<p>Error al cargar las reservas.</p>";
      console.error(error);
    });
}

function eliminarReserva(id) {
  fetch(`http://localhost:3000/reservas/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      cargarReservas(); 
    })
    .catch((error) => {
      console.error("Error al eliminar la reserva:", error);
    });
}
