// java.js - versión mejorada
document.addEventListener('DOMContentLoaded', function() {
  // Mostrar la sección de inicio por defecto
  mostrarSeccion('inicio');
  
  // Configurar event listeners para todas las tarjetas
  const tarjetas = document.querySelectorAll('.tarjetas img');
  
  tarjetas.forEach(tarjeta => {
    // Funciona para clicks (desktop) y toques (móvil)
    tarjeta.addEventListener('click', function() {
      const targetId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      mostrarSeccion(targetId);
    });
    
    // Mejorar feedback táctil
    tarjeta.addEventListener('touchstart', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    tarjeta.addEventListener('touchend', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

function mostrarSeccion(id) {
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.classList.remove('activa');
  });
  
  // Mostrar la sección activa
  const seccionActiva = document.getElementById(id);
  if (seccionActiva) {
    seccionActiva.classList.add('activa');
    // Scroll suave a la sección
    seccionActiva.scrollIntoView({ behavior: 'smooth' });
  }
}
