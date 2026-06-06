document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            toggleBtn.classList.toggle('open');
            const expanded = sidebar.classList.contains('active') ? 'true' : 'false';
            toggleBtn.setAttribute('aria-expanded', expanded);
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    }

    // Close sidebar when a menu link is clicked (mobile)
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!window.matchMedia('(min-width: 768px)').matches) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                toggleBtn.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Note: keeping transitions enabled during resize for animated behavior

    // Ensure sidebar is closed by default on mobile and open on desktop
    let prevIsDesktop = window.matchMedia('(min-width: 768px)').matches;

    const applyInitialSidebarState = () => {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        if (!toggleBtn || !sidebar || !overlay) return;

        if (isDesktop) {
            sidebar.classList.add('active');
            overlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
        prevIsDesktop = isDesktop;
    };

    // Apply on load
    applyInitialSidebarState();

    // Update when crossing breakpoint, debounce to avoid flicker
    let bpTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(bpTimer);
        bpTimer = setTimeout(() => {
            const isDesktop = window.matchMedia('(min-width: 768px)').matches;
            if (isDesktop !== prevIsDesktop) applyInitialSidebarState();
        }, 120);
    });
});