// Versión mejorada para móviles y desktop
document.addEventListener('DOMContentLoaded', function() {
  // Mostrar la sección de inicio al cargar
  mostrarSeccion('inicio');
  
  // Configurar event listeners para todas las tarjetas
  const tarjetas = document.querySelectorAll('.tarjetas img');
  
  tarjetas.forEach(tarjeta => {
    // Elimina el atributo onclick del HTML y manejamos todo con JS
    const targetId = tarjeta.getAttribute('data-target') || 
                    tarjeta.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    
    if (targetId) {
      tarjeta.removeAttribute('onclick');
      tarjeta.setAttribute('data-target', targetId);
      
      // Evento para desktop y móvil
      tarjeta.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarSeccion(targetId);
      });
      
      // Evento táctil adicional para móviles
      tarjeta.addEventListener('touchend', function(e) {
        e.preventDefault();
        mostrarSeccion(targetId);
      });
    }
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
    
    // Scroll suave solo en desktop
    if (window.innerWidth > 768) {
      seccionActiva.scrollIntoView({ behavior: 'smooth' });
    } else {
      // En móvil, vamos al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
