document.addEventListener('DOMContentLoaded', function() {
            // ===== INITIALIZE VARIABLES =====
            let currentPage = 1;
            const totalPages = 15;

            // ===== GET DOM ELEMENTS =====
            const newestTab = document.getElementById('newest-tab');
            const bestsellerTab = document.getElementById('bestseller-tab');
            const pageInfo = document.getElementById('page-info');
            const prevPageBtn = document.getElementById('prev-page');
            const nextPageBtn = document.getElementById('next-page');
            const priceSlider = document.getElementById('price-slider');
            const minPriceInput = document.getElementById('min-price');
            const maxPriceInput = document.getElementById('max-price');

            // ===== MENU FUNCTIONALITY =====
            document.querySelector('.top-bar .menu-icon').addEventListener('click', function() {
                openMenu();
            });
            
            document.querySelector('.close-menu-btn').addEventListener('click', function() {
                closeMenu();
            });
            
            document.getElementById('menuOverlay').addEventListener('click', function() {
                closeMenu();
            });

            // ===== TAB FUNCTIONALITY =====
            // Set initial active tab
            newestTab.classList.add('active');
            
            // Tab click events
            newestTab.addEventListener('click', function() {
                setActiveTab(this);
                currentPage = 1;
                updatePageInfo();
                loadProducts('newest');
            });
            
            bestsellerTab.addEventListener('click', function() {
                setActiveTab(this);
                currentPage = 1;
                updatePageInfo();
                loadProducts('bestseller');
            });
            
            // Function to set active tab
            function setActiveTab(clickedTab) {
                document.querySelectorAll('.product-tab.btn').forEach(tab => {
                    tab.classList.remove('active');
                });
                clickedTab.classList.add('active');
            }

            // ===== PAGINATION FUNCTIONALITY =====
            function updatePageInfo() {
                pageInfo.textContent = `${currentPage}/${totalPages}`;
                
                if (currentPage <= 1) {
                    prevPageBtn.classList.add('disabled');
                } else {
                    prevPageBtn.classList.remove('disabled');
                }
                
                if (currentPage >= totalPages) {
                    nextPageBtn.classList.add('disabled');
                } else {
                    nextPageBtn.classList.remove('disabled');
                }
            }

            // Pagination events
            prevPageBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePageInfo();
                    loadProducts(getActiveTabType());
                }
            });
            
            nextPageBtn.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePageInfo();
                    loadProducts(getActiveTabType());
                }
            });

            function getActiveTabType() {
                if (newestTab.classList.contains('active')) {
                    return 'newest';
                } else if (bestsellerTab.classList.contains('active')) {
                    return 'bestseller';
                }
                return 'newest';
            }
            
            // ===== PRICE FILTER FUNCTIONALITY =====
            function formatPrice(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
            
            function parsePrice(priceStr) {
                return parseInt(priceStr.replace(/\./g, '')) || 0;
            }
            
            // Initialize price inputs
            minPriceInput.value = "0";
            maxPriceInput.value = formatPrice(5000000);
            
            // Price filter events
            priceSlider.addEventListener('input', function() {
                const value = parseInt(this.value);
                maxPriceInput.value = formatPrice(value);
            });
            
            minPriceInput.addEventListener('input', function() {
                this.value = formatPrice(parsePrice(this.value));
            });
            
            maxPriceInput.addEventListener('input', function() {
                const value = parsePrice(this.value);
                this.value = formatPrice(value);
                priceSlider.value = value;
            });
            
            // Apply filter event
            document.getElementById('apply-filter').addEventListener('click', function() {
                alert('Filter diterapkan!');
                loadProducts(getActiveTabType());
            });
            document.querySelector('.customer-service').addEventListener('click', function() {
            showToast('Customer service akan segera membantu Anda!', 'success');
        });
        function showToast(message, type = 'success') {
            // Remove existing toast if any
            const existingToast = document.querySelector('.toast-notification');
            if(existingToast) {
                existingToast.remove();
            }
            
            // Create toast element
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.classList.add(type);
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            // Remove toast after animation
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }


            // ===== PRODUCT LOADING FUNCTIONALITY =====
            function loadProducts(type) {
                const productGrid = document.getElementById('product-grid');
                
                // Clear existing products
                productGrid.innerHTML = '';
                
                // Show loading state
                productGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #888;">Memuat produk...</div>';
                
                // Simulate loading delay
                setTimeout(() => {
                    const productsPerPage = getResponsiveProductCount();
                    const products = generateProducts(type, currentPage, productsPerPage);
                    
                    // Clear loading message
                    productGrid.innerHTML = '';
                    
                    // Add products
                    products.forEach(product => {
                        const productCard = createProductCard(product);
                        productGrid.appendChild(productCard);
                    });
                }, 100);
            }

            function getResponsiveProductCount() {
                const viewportWidth = window.innerWidth;
                
                if (viewportWidth >= 1600) {
                    return 15;
                } else if (viewportWidth >= 1200) {
                    return 12;
                } else if (viewportWidth >= 992) {
                    return 9;
                } else if (viewportWidth >= 768) {
                    return 6;
                } else {
                    return 3;
                }
            }
            
            function generateProducts(type, page, count) {
                const products = [];
                const startIndex = (page - 1) * count;
                
                for (let i = 0; i < count; i++) {
                    const productNumber = startIndex + i + 1;
                    const product = {
                        id: productNumber,
                        image: 'image 46.png',
                        name: type === 'bestseller' ? 
                            `Bestseller Premium Putih ${productNumber}` : 
                            `Aquarium LED Putih ${productNumber}`,
                        price: 150000,
                        discount: type === 'bestseller' ? '30%' : '50%'
                    };
                    
                    products.push(product);
                }
                
                return products;
            }
            
            function createProductCard(product) {
                const card = document.createElement('div');
                card.className = 'product-card';
                
                card.innerHTML = `
                    <div class="product-img-container">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <div class="discount-tag">${product.discount}</div>
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">Rp ${formatPrice(product.price)}</div>
                        <a href="#" class="cart-link">Cart</a>
                    </div>
                `;
                
                // Product image click event
                const productImage = card.querySelector('.product-img');
                productImage.style.cursor = 'pointer';
                
                productImage.addEventListener('click', function() {
                    window.location.href = `product_detail.html?id=${product.id}`;
                });
                
                // Cart link click event
                const cartLink = card.querySelector('.cart-link');
                cartLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    alert(`Produk "${product.name}" ditambahkan ke keranjang!`);
                });
                
                return card;
            }

            // ===== CART BUTTON EVENT =====
            document.getElementById('cartBtn').addEventListener('click', function() {
                window.location.href = 'checkout.html';
            });
            
            // ===== WINDOW RESIZE EVENT =====
            window.addEventListener('resize', function() {
                loadProducts(getActiveTabType());
            });
            
            // ===== INITIALIZATION =====
            console.log('Initializing page...');
            updatePageInfo();
            
            // Load products on page load
            setTimeout(() => {
                console.log('Loading newest products...');
                loadProducts('newest');
            }, 50);
        });

        // ===== GLOBAL MENU FUNCTIONS =====
        function openMenu() {
            document.getElementById('sideMenu').classList.add('open');
            document.getElementById('menuOverlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            document.getElementById('sideMenu').classList.remove('open');
            document.getElementById('menuOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }