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
  }
}