document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SCROLL PROGRESS BAR
    const progressBar = document.getElementById("progressBar");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if(progressBar) {
            progressBar.style.width = scrollPercent + "%";
        }
    });

    // 2. FADE-IN ANIMATIONS ON SCROLL
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once revealed
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targets to animate
    const animateTargets = document.querySelectorAll('.fade-up');
    animateTargets.forEach(el => revealOnScroll.observe(el));

    // 3. MAGNETIC BUTTON EFFECT
    // Adds a subtle pull effect to buttons when hovering
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Limit the movement strength
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 4. MOBILE MENU TOGGLE (Simple implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.right = '0';
                navLinks.style.background = '#020617';
                navLinks.style.width = '200px';
                navLinks.style.padding = '2rem';
                navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }
});