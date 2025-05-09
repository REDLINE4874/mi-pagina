// Versión optimizada - Funcionamiento confiable en todos los dispositivos
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la sección de inicio al cargar
    setTimeout(() => {
        mostrarSeccion('inicio');
    }, 100);
    
    // Configurar event listeners para todas las tarjetas
    const tarjetas = document.querySelectorAll('.tarjetas img');
    
    // Función para manejar la selección de tarjeta
    const manejarSeleccionTarjeta = (targetId, elemento) => {
        if (!targetId) return;
        
        // Feedback visual
        if (elemento) {
            elemento.style.transform = 'scale(1.1)';
            setTimeout(() => {
                elemento.style.transform = '';
            }, 200);
        }
        
        // Mostrar la sección correspondiente
        mostrarSeccion(targetId);
    };
    
    tarjetas.forEach(tarjeta => {
        // Obtener el target de la sección
        let targetId = tarjeta.getAttribute('data-target') || 
                      (tarjeta.getAttribute('onclick') ? 
                       tarjeta.getAttribute('onclick').match(/'([^']+)'/)[1] : 
                       null);
        
        if (!targetId) return;
        
        // Eliminar atributo onclick si existe
        if (tarjeta.hasAttribute('onclick')) {
            tarjeta.removeAttribute('onclick');
        }
        
        // Establecer data-target si no existe
        if (!tarjeta.hasAttribute('data-target')) {
            tarjeta.setAttribute('data-target', targetId);
        }
        
        // Evento único para todos los dispositivos
        tarjeta.addEventListener('click', function(e) {
            e.preventDefault();
            manejarSeleccionTarjeta(targetId, this);
        });
    });
});

// Función mejorada para mostrar secciones
function mostrarSeccion(id) {
    if (!id) return;
    
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion');
    let seccionEncontrada = false;
    
    secciones.forEach(seccion => {
        if (seccion.id === id) {
            seccion.classList.add('activa');
            seccionEncontrada = true;
            
            // Scroll después de un breve retraso para permitir renderizado
            setTimeout(() => {
                const esMovil = window.innerWidth <= 768;
                const posicionScroll = esMovil ? 0 : seccion.offsetTop - 20;
                
                window.scrollTo({
                    top: posicionScroll,
                    behavior: 'smooth'
                });
            }, 50);
        } else {
            seccion.classList.remove('activa');
        }
    });
    
    // Si no se encontró la sección, mostrar inicio
    if (!seccionEncontrada && id !== 'inicio') {
        setTimeout(() => {
            mostrarSeccion('inicio');
        }, 100);
    }
}

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    const seccionActiva = document.querySelector('.seccion.activa');
    if (seccionActiva) {
        setTimeout(() => {
            const esMovil = window.innerWidth <= 768;
            const posicionScroll = esMovil ? 0 : seccionActiva.offsetTop - 20;
            
            window.scrollTo({
                top: posicionScroll,
                behavior: 'auto'
            });
        }, 100);
    }
});
