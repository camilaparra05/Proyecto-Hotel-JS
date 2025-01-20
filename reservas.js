document
  .getElementById("busqueda-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const checkIn = document.getElementById("checkin").value;
    const checkOut = document.getElementById("checkout").value;
    const guests = parseInt(document.getElementById("num-personas").value);

    if (!checkIn || !checkOut || isNaN(guests) || guests <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    fetch("http://localhost:3000/rooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((rooms) => {
      
        const availableRooms = rooms.filter((room) => {
          return (
            room.capacity >= guests &&
            new Date(room.availableFrom) <= new Date(checkIn) &&
            new Date(room.availableTo) >= new Date(checkOut)
          );
        });

        const habitacionesContainer = document.getElementById(
          "habitaciones-container"
        );
        habitacionesContainer.innerHTML = ""; 

        if (availableRooms.length === 0) {
          habitacionesContainer.innerHTML = `<p class="text-xl text-gray-600">No hay habitaciones disponibles para los criterios seleccionados.</p>`;
          return;
        }

        availableRooms.forEach((room) => {
          const roomElement = document.createElement("div");
          roomElement.className = "bg-white p-6 shadow-lg rounded-lg";

          roomElement.innerHTML = `
                    <h3 class="text-2xl font-semibold mb-4">${room.name}</h3>
                    <p class="mb-2">Capacidad: ${room.capacity} personas</p>
                    <p class="mb-2">Precio: $${room.price} por noche</p>
                    <p class="mb-2">Servicios: ${room.services.join(", ")}</p>
                    <p class="mb-2">Disponible del ${room.availableFrom} al ${
            room.availableTo
          }</p>
                    <button class="bg-orange-500 text-white py-2 px-4 rounded-md reservar-btn" data-room-id="${
                      room.id
                    }" 
                        data-room-name="${room.name}">Reservar</button>
                `;

          habitacionesContainer.appendChild(roomElement);
        });

        document.querySelectorAll(".reservar-btn").forEach((button) => {
          button.addEventListener("click", function () {
            const roomId = this.getAttribute("data-room-id");
            const roomName = this.getAttribute("data-room-name");

            const reserva = {
              roomId: roomId,
              roomName: roomName,
              checkIn: checkIn,
              checkOut: checkOut,
              guests: guests,
            };

            fetch("http://localhost:3000/reservas", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reserva),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                alert(
                  `Reserva realizada exitosamente para la habitación: ${roomName}`
                );
                console.log("Reserva guardada:", data);
              })
              .catch((error) => {
                console.error("Error al guardar la reserva:", error);
                alert(
                  "Hubo un error al guardar la reserva. Por favor, intenta nuevamente más tarde."
                );
              });
          });
        });
      })
      .catch((error) => {
        console.error("Error al cargar las habitaciones:", error);
        alert(
          "Hubo un error al cargar las habitaciones. Por favor, intenta nuevamente más tarde."
        );
      });
  });
