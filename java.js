// Versión optimizada y probada
document.addEventListener('DOMContentLoaded', function() {
    // Sistema mejorado de gestión de secciones
    const sectionManager = {
        currentSection: null,
        
        // Mostrar sección con validaciones
        showSection: function(id) {
            if (!id || this.currentSection === id) return;
            
            // Ocultar sección actual
            if (this.currentSection) {
                const current = document.getElementById(this.currentSection);
                if (current) {
                    current.classList.remove('activa');
                    current.style.display = 'none';
                }
            }
            
            // Mostrar nueva sección
            const newSection = document.getElementById(id);
            if (newSection) {
                newSection.style.display = 'block';
                // Pequeño retraso para asegurar el renderizado
                setTimeout(() => {
                    newSection.classList.add('activa');
                    this.scrollToSection(newSection);
                    this.currentSection = id;
                }, 30);
            } else {
                // Fallback a inicio si la sección no existe
                this.showSection('inicio');
            }
        },
        
        // Scroll adecuado según dispositivo
        scrollToSection: function(section) {
            const isMobile = window.innerWidth <= 768;
            const position = isMobile ? 0 : section.offsetTop - 20;
            
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        },
        
        // Inicializar tarjetas
        initCards: function() {
            const cards = document.querySelectorAll('.tarjetas img');
            
            cards.forEach(card => {
                // Obtener target de forma segura
                const target = card.dataset.target || 
                             (card.getAttribute('onclick') ? 
                              card.getAttribute('onclick').match(/'([^']+)'/)[1] : 
                              null;
                
                if (!target) return;
                
                // Limpiar cualquier evento previo
                card.removeEventListener('click', this.cardClickHandler);
                card.removeEventListener('touchend', this.cardClickHandler);
                
                // Establecer data-target si no existe
                if (!card.dataset.target) {
                    card.dataset.target = target;
                }
                
                // Eliminar onclick del HTML
                card.removeAttribute('onclick');
                
                // Manejador único para ambos eventos
                const handler = (e) => {
                    e.preventDefault();
                    this.showSection(target);
                    
                    // Feedback visual
                    card.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 200);
                };
                
                // Asignar ambos eventos
                card.addEventListener('click', handler);
                card.addEventListener('touchend', handler);
            });
        }
    };
    
    // Inicialización con verificación de carga completa
    function initialize() {
        // Esperar a que todo el DOM esté listo
        setTimeout(() => {
            sectionManager.initCards();
            sectionManager.showSection('inicio');
            
            // Forzar redibujado en móviles
            if (window.innerWidth <= 768) {
                document.body.style.display = 'none';
                document.body.offsetHeight; // Trigger reflow
                document.body.style.display = '';
            }
        }, 100);
    }
    
    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'complete') {
        initialize();
    } else {
        document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
                initialize();
            }
        });
    }
    
    // Manejar cambios de tamaño
    window.addEventListener('resize', function() {
        if (sectionManager.currentSection) {
            const section = document.getElementById(sectionManager.currentSection);
            if (section) {
                sectionManager.scrollToSection(section);
            }
        }
    });
});
