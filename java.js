document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la sección de inicio al cargar
    mostrarSeccion('inicio');
    
    // Configurar event listeners para todas las tarjetas
    const tarjetas = document.querySelectorAll('.tarjetas img');
    
    tarjetas.forEach(tarjeta => {
        // Configurar el data-target si no está establecido
        if (!tarjeta.hasAttribute('data-target')) {
            const onclickContent = tarjeta.getAttribute('onclick');
            if (onclickContent) {
                const match = onclickContent.match(/'([^']+)'/);
                if (match && match[1]) {
                    tarjeta.setAttribute('data-target', match[1]);
                    tarjeta.removeAttribute('onclick');
                }
            }
        }
        
        // Obtener el target de la sección
        const targetId = tarjeta.getAttribute('data-target');
        
        if (targetId) {
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
            
            // Feedback visual para móviles
            tarjeta.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            tarjeta.addEventListener('touchend', function() {
                this.style.transform = '';
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
        
        // Comportamiento diferente para desktop vs móvil
        if (window.innerWidth > 768) {
            // Desktop: scroll suave al inicio de la sección
            window.scrollTo({
                top: seccionActiva.offsetTop - 20,
                behavior: 'smooth'
            });
        } else {
            // Móvil: ir al inicio de la página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
