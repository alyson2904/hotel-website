// script.js - Funcionalidad para la página web del hotel

document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de imágenes
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Iniciar carrusel automático
    startSlideShow();
    
    // Pausar carrusel cuando el mouse está sobre él
    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', stopSlideShow);
    slideshow.addEventListener('mouseleave', startSlideShow);
    
    // Validación del formulario de reservación
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkin = new Date(document.getElementById('checkin').value);
            const checkout = new Date(document.getElementById('checkout').value);
            
            if (checkin >= checkout) {
                alert('La fecha de salida debe ser posterior a la fecha de entrada');
                return;
            }
            
            // Simular envío del formulario
            alert('¡Reserva enviada con éxito! Nos pondremos en contacto contigo para confirmar la disponibilidad.');
            this.reset();
            
            // Restablecer fechas mínimas
            setMinDates();
        });
    }
    
    // Validación del formulario de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('¡Gracias por suscribirte a nuestro newsletter!');
                this.reset();
            }
        });
    }
    
    // Configurar fechas mínimas en los inputs de fecha
    function setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput) {
            checkinInput.min = today;
            
            // Actualizar fecha mínima de checkout cuando cambia checkin
            checkinInput.addEventListener('change', function() {
                if (checkoutInput) {
                    checkoutInput.min = this.value;
                    
                    // Si checkout es anterior a la nueva fecha de checkin, resetearlo
                    if (checkoutInput.value && checkoutInput.value < this.value) {
                        checkoutInput.value = '';
                    }
                }
            });
        }
        
        if (checkoutInput) {
            checkoutInput.min = today;
        }
    }
    
    // Configurar fechas al cargar la página
    setMinDates();
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de carga inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});