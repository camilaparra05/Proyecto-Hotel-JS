document.addEventListener("DOMContentLoaded", () => {
  
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const newUser = { nombre, email, password };

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("¡Usuario registrado correctamente!");
        window.location.href = "login.html"; 
      } else {
        alert("Error al registrar el usuario.");
      }
    });
  }
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email-login").value;
      const password = document.getElementById("password-login").value;

      const response = await fetch("http://localhost:3000/usuarios");
      const usuarios = await response.json();

      const user = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        alert("¡Bienvenido!");
        window.location.href = "index.html"; 
      } else {
        alert("Credenciales incorrectas.");
      }
    });
  }
});
