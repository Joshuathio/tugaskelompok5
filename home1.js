document.addEventListener('DOMContentLoaded', function() {
            // Banner Slider functionality
            let currentSlide = 0;
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            let autoSlideInterval;
            
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                slider.style.transform = `translateX(-${slideIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === slideIndex);
                });
            }
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                goToSlide(currentSlide);
            }
            
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
            
            function stopAutoSlide() {
                clearInterval(autoSlideInterval);
            }
            
            // Add click events to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    stopAutoSlide();
                    goToSlide(index);
                    startAutoSlide();
                });
            });
            
            // Start auto-slide
            startAutoSlide();
            
            // Product slider functionality with indicators
            function initProductSlider(sectionId) {
                const section = document.getElementById(sectionId);
                if (!section) return;
                
                const slider = section.querySelector('.products-slider');
                const prevBtn = document.getElementById(`${sectionId}-prev`);
                const nextBtn = document.getElementById(`${sectionId}-next`);
                const indicatorsContainer = document.getElementById(`${sectionId}-indicators`);
                
                if (!slider || !prevBtn || !nextBtn) return;
                
                const container = section.querySelector('.products-container');
                const containerWidth = container.clientWidth;
                const productCard = slider.querySelector('.product-card');
                
                if (!productCard) return;
                
                const cardWidth = productCard.offsetWidth + 10;
                const visibleProducts = Math.floor(containerWidth / cardWidth);
                const totalProducts = slider.querySelectorAll('.product-card').length;
                const totalPages = Math.ceil(totalProducts / visibleProducts);
                let currentPage = 0;
                
                // Create indicators
                for (let i = 0; i < totalPages; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    if (i === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => goToPage(i));
                    indicatorsContainer.appendChild(indicator);
                }
                
                const indicators = indicatorsContainer.querySelectorAll('.indicator');
                
                function goToPage(pageIndex) {
                    currentPage = pageIndex;
                    const position = pageIndex * visibleProducts * cardWidth;
                    slider.style.transform = `translateX(-${position}px)`;
                    updateIndicators();
                    updateArrows();
                }
                
                function updateIndicators() {
                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === currentPage);
                    });
                }
                
                function updateArrows() {
                    prevBtn.classList.toggle('disabled', currentPage === 0);
                    nextBtn.classList.toggle('disabled', currentPage === totalPages - 1);
                }
                
                prevBtn.addEventListener('click', function() {
                    if (currentPage > 0) {
                        goToPage(currentPage - 1);
                    } else {
                        goToPage(totalPages - 1); // Loop to last page
                    }
                });
                
                nextBtn.addEventListener('click', function() {
                    if (currentPage < totalPages - 1) {
                        goToPage(currentPage + 1);
                    } else {
                        goToPage(0); // Loop to first page
                    }
                });
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    const newContainerWidth = container.clientWidth;
                    const newVisibleProducts = Math.floor(newContainerWidth / cardWidth);
                    const newTotalPages = Math.ceil(totalProducts / newVisibleProducts);
                    
                    if (newTotalPages !== totalPages) {
                        // Recreate indicators
                        indicatorsContainer.innerHTML = '';
                        for (let i = 0; i < newTotalPages; i++) {
                            const indicator = document.createElement('div');
                            indicator.className = 'indicator';
                            if (i === 0) indicator.classList.add('active');
                            indicator.addEventListener('click', () => goToPage(i));
                            indicatorsContainer.appendChild(indicator);
                        }
                        currentPage = 0;
                        goToPage(0);
                    }
                });
                
                // Initial setup
                updateArrows();
            }
            
            // Initialize all product sliders
            setTimeout(function() {
                initProductSlider('new-arrivals');
                initProductSlider('recommended');
                initProductSlider('best-selling');
            }, 100);
            
            // Menu functionality
            const menuIcon = document.querySelector('.top-bar .menu-icon');
            const closeMenuBtn = document.querySelector('.close-menu-btn');
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            function openMenu() {
                sideMenu.classList.add('open');
                menuOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
            
            function closeMenu() {
                sideMenu.classList.remove('open');
                menuOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
            
            menuIcon.addEventListener('click', openMenu);
            closeMenuBtn.addEventListener('click', closeMenu);
            menuOverlay.addEventListener('click', closeMenu);
        });