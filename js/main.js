document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn ? menuBtn.querySelector('span') : null;
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    const headerEl = document.querySelector('header');

    // --- MENÚ MÓVIL ---
    function toggleMenu() {
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (menuIcon) {
            menuIcon.textContent = isHidden ? 'menu_open' : 'close';
        }
        menuBtn.setAttribute('aria-expanded', String(!isHidden));
    }

    function closeMenu() {
        if (!mobileMenu || !menuIcon) return;
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = 'menu_open';
        menuBtn.setAttribute('aria-expanded', 'false');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- HEADER AUTO-HIDE ---
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const current = window.pageYOffset || document.documentElement.scrollTop;
        if (!headerEl) return;
        
        if (current > lastScroll && current > 100) {
            headerEl.classList.add('header-hidden');
        } else {
            headerEl.classList.remove('header-hidden');
        }
        lastScroll = current <= 0 ? 0 : current;
    }, { passive: true });

    // --- SMOOTH SCROLL (Soporte mejorado) ---
    function smoothScrollTo(endY, duration = 650) {
        const startY = window.pageYOffset;
        const distance = endY - startY;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const time = Math.min(1, (timestamp - startTime) / duration);
            const eased = easeInOutCubic(time);
            window.scrollTo(0, Math.round(startY + distance * eased));
            if (time < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    function handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || !href.startsWith('#') || href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        const headerHeight = headerEl ? headerEl.offsetHeight : 0;
        // Ajuste de 12px extra para respiro visual
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        
        smoothScrollTo(top, 650);
        
        // Actualizar URL sin saltar
        try { history.pushState(null, '', href); } catch (err) { /* ignore */ }
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', handleAnchorClick);
    });
});