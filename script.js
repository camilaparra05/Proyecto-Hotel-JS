document.addEventListener("DOMContentLoaded", function () {
 
  const carruseles = document.querySelectorAll(".carousel");
  carruseles.forEach((carrusel) => {
    new bootstrap.Carousel(carrusel, {
      interval: 2000, 
      ride: "carousel",
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  
  const botonDeluxe = document.getElementById("detalles-deluxe");
  const botonStandard = document.getElementById("detalles-standard");
  const botonPremium = document.getElementById("detalles-premium");

  botonDeluxe.addEventListener("click", function () {
    window.location.href = "habitaciones.html?tipo=deluxe";
  });

  botonStandard.addEventListener("click", function () {
    window.location.href = "habitaciones.html?tipo=standard";
  });

  botonPremium.addEventListener("click", function () {
    window.location.href = "habitaciones.html?tipo=premium";
  });
});

