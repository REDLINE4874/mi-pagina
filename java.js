// Versión definitiva - Solución robusta para todos los dispositivos
document.addEventListener('DOMContentLoaded', function() {
    // Sistema de gestión de secciones
    const gestionarSecciones = {
        // Mostrar sección con verificación completa
        mostrar: function(id) {
            if (!id) return;
            
            // Ocultar todas las secciones primero
            document.querySelectorAll('.seccion').forEach(sec => {
                sec.classList.remove('activa');
                sec.style.display = 'none';
            });
            
            // Mostrar la sección solicitada
            const seccion = document.getElementById(id);
            if (seccion) {
                seccion.style.display = 'block';
                setTimeout(() => {
                    seccion.classList.add('activa');
                    this.ajustarScroll(seccion);
                }, 10);
            } else {
                // Fallback a la sección de inicio
                this.mostrar('inicio');
            }
        },
        
        // Ajustar scroll según dispositivo
        ajustarScroll: function(seccion) {
            const esMovil = window.innerWidth <= 768;
            const posicion = esMovil ? 0 : seccion.offsetTop - 20;
            
            // Scroll suave con polyfill si es necesario
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: posicion,
                    behavior: 'smooth'
                });
            } else {
                // Fallback para navegadores antiguos
                window.scrollTo(0, posicion);
            }
        },
        
        // Inicializar sistema de tarjetas
        iniciarTarjetas: function() {
            const tarjetas = document.querySelectorAll('.tarjetas img');
            
            tarjetas.forEach(tarjeta => {
                // Obtener ID de sección de forma segura
                const targetId = tarjeta.dataset.target || 
                               (tarjeta.onclick ? 
                                tarjeta.onclick.toString().match(/'([^']+)'/)[1] : 
                                null);
                
                if (!targetId) return;
                
                // Limpiar eventos anteriores
                tarjeta.onclick = null;
                tarjeta.ontouchend = null;
                
                // Establecer atributo data-target
                tarjeta.dataset.target = targetId;
                
                // Single event listener para todos los dispositivos
                tarjeta.addEventListener('pointerdown', (e) => {
                    e.preventDefault();
                    this.mostrar(targetId);
                    
                    // Feedback visual
                    tarjeta.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        tarjeta.style.transform = '';
                    }, 200);
                });
            });
        }
    };
    
    // Inicialización completa
    setTimeout(() => {
        gestionarSecciones.mostrar('inicio');
        gestionarSecciones.iniciarTarjetas();
    }, 50);
    
    // Manejar cambios de tamaño
    window.addEventListener('resize', function() {
        const activa = document.querySelector('.seccion.activa');
        if (activa) {
            setTimeout(() => {
                gestionarSecciones.ajustarScroll(activa);
            }, 100);
        }
    });
});
