      function toggleMenu() {
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            sideMenu.classList.toggle('open');
            menuOverlay.classList.toggle('open');
        }
        
        // Open menu when clicking menu icon
        document.querySelector('.menu-icon').addEventListener('click', toggleMenu);