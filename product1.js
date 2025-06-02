document.addEventListener('DOMContentLoaded', function() {
    // Initialize page variables first
    let currentPage = 1;
    const totalPages = 15;

    // Get all necessary elements
    const newestTab = document.getElementById('newest-tab');
    const bestsellerTab = document.getElementById('bestseller-tab');
    const pageInfo = document.getElementById('page-info');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const priceSlider = document.getElementById('price-slider');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    // Menu functionality
    document.querySelector('.top-bar .menu-icon').addEventListener('click', function() {
        openMenu();
    });
    
    document.querySelector('.close-menu-btn').addEventListener('click', function() {
        closeMenu();
    });
    
    document.getElementById('menuOverlay').addEventListener('click', function() {
        closeMenu();
    });

    // Set initial active tab state
    newestTab.classList.add('active');
    
    // Tab click events
    newestTab.addEventListener('click', function() {
        setActiveTab(this);
        currentPage = 1; // Reset to first page
        updatePageInfo();
        loadProducts('newest');
    });
    
    bestsellerTab.addEventListener('click', function() {
        setActiveTab(this);
        currentPage = 1; // Reset to first page
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

    // Update page info function
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
    
    // Price filter functions
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

    // Main product loading function
    function loadProducts(type) {
        const productGrid = document.getElementById('product-grid');
        
        // Clear existing products
        productGrid.innerHTML = '';
        
        // Show loading state (optional)
        productGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #888;">Memuat produk...</div>';
        
        // Simulate small delay to show loading (you can remove this in production)
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
                name: type === 'bestseller' ? `Bestseller Premium Putih ${productNumber}` : `Aquarium LED Putih ${productNumber}`,
                price: type === 'bestseller' ? 250000 : 200000,
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
                <div class="product-price">Rp${formatPrice(product.price)}</div>
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

    // Cart button event
    document.getElementById('cartBtn').addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
    
    // Window resize event
    window.addEventListener('resize', function() {
        loadProducts(getActiveTabType());
    });
    
    // INITIALIZATION - Load products immediately after DOM is ready
    console.log('Initializing page...');
    updatePageInfo();
    
    // Load newest products immediately - this ensures products show up right away
    setTimeout(() => {
        console.log('Loading newest products...');
        loadProducts('newest');
    }, 50); // Very small delay to ensure all elements are ready
});

// Menu functions (outside DOMContentLoaded to be globally available)
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