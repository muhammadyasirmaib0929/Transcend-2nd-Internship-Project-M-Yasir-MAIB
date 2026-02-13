document.addEventListener("DOMContentLoaded", () => {
    //Variable Selections
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuItems = document.querySelectorAll(".menu-item");
    const heroElements = document.querySelectorAll(".animate-on-load");
    const menuText = document.getElementById('menuText');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const counters = document.querySelectorAll('.counter-value');

    //Hero Section Animations
    setTimeout(() => {
        heroElements.forEach((el) => {
            el.classList.remove('opacity-0', 'translate-y-10');
            el.classList.add('opacity-100', 'translate-y-0');
        });
    }, 400);

    //Side Menu Open Logic
    if (menuBtn && sideMenu) {
        menuBtn.addEventListener("click", () => {
            sideMenu.classList.remove("translate-x-full");
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove("opacity-0", "translate-y-5");
                    item.classList.add("opacity-100", "translate-y-0");
                }, 100 * (index + 1));
            });
        });
    }

    //Side Menu Close Logic 
    if (closeBtn && sideMenu) {
        closeBtn.addEventListener("click", () => {
            sideMenu.classList.add("translate-x-full");
            setTimeout(() => {
                menuItems.forEach((item) => {
                    item.classList.add("opacity-0", "translate-y-5");
                    item.classList.remove("opacity-100", "translate-y-0");
                });
            }, 500);
        });
    }

    //Scroll Reveal Animation (Intersection Observer)
    const revealObserverOptions = {
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach((el) => scrollObserver.observe(el));

    //Animated Counter Logic
    const speed = 200; 
    const startCounting = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounting(el), 15);
        } else {
            el.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    //Hide/Show MENU Text on Scroll
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        if (menuText) {
            if (scrollValue > 50) {
                menuText.style.opacity = '0';
                menuText.style.transition = 'opacity 0.4s ease';
                menuText.style.pointerEvents = 'none'; 
            } else {
                menuText.style.opacity = '1';
                menuText.style.pointerEvents = 'auto';
            }
        }
    });
});