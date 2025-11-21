// Interactividad mínima: CTA y manejo del formulario
document.addEventListener('DOMContentLoaded', ()=> {
    const demoBtn = document.getElementById('demoBtn');
    const demoBtn2 = document.getElementById('demoBtn2');
    function openDemo(){
      // Aquí podrías abrir un modal o redirigir a la demo real
      alert('Abrir demo — aquí iría la vista de productos sincronizados con Shopify.');
    }
    if(demoBtn) demoBtn.addEventListener('click', openDemo);
    if(demoBtn2) demoBtn2.addEventListener('click', openDemo);
  
    // Form handling (simulado)
    const form = document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const data = new FormData(form);
        const payload = Object.fromEntries(data);
        // Simulación: mostrar en consola. Reemplaza con fetch('/api/contact', {method:'POST', body: JSON...})
        console.log('Contacto enviado', payload);
        // Mensaje de feedback sencillo
        alert('Gracias — tu mensaje fue enviado. Te contactaremos pronto.');
        form.reset();
      });
    }
  });
  