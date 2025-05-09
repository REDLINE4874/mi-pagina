document.addEventListener('DOMContentLoaded', function() {
  const tarjetas = document.querySelectorAll('.tarjetas img');
  
  // Para dispositivos táctiles
  tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('touchstart', function() {
      this.classList.add('touched');
    });
    
    tarjeta.addEventListener('touchend', function() {
      setTimeout(() => this.classList.remove('touched'), 300);
    });
  });
});
