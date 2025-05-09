// Versión simplificada a prueba de fallos
function mostrarSeccion(id) {
    try {
        // Oculta todo
        document.querySelectorAll('.seccion').forEach(s => {
            s.classList.remove('activa');
            s.style.display = 'none';
        });
        
        // Muestra la seleccionada
        const sec = document.getElementById(id);
        if (sec) {
            sec.style.display = 'block';
            setTimeout(() => sec.classList.add('activa'), 50);
        }
    } catch (e) {
        console.error("Error al cambiar sección:", e);
    }
}

// Asignar eventos después de cargar todo
window.addEventListener('load', function() {
    document.querySelectorAll('.tarjetas img').forEach(img => {
        const target = img.getAttribute('data-target');
        if (target) {
            img.onclick = function(e) {
                e.preventDefault();
                mostrarSeccion(target);
            };
        }
    });
    
    // Mostrar inicio por defecto
    mostrarSeccion('inicio');
});
