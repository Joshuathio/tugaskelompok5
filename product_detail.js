 const menuIcon = document.querySelector('.menu-icon');
        const sideMenu = document.getElementById('sideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.querySelector('.close-menu-btn');

        menuIcon.addEventListener('click', () => {
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        menuOverlay.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        // Buy Now button functionality
        document.querySelector('.buy-now').addEventListener('click', function() {
            // Add loading state
            this.innerHTML = 'Memproses...';
            this.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                alert('Pembelian berhasil diproses! Mengarahkan ke halaman checkout...');
                window.location.href = 'checkout.html';
            }, 1000);
        });

        // Add to Cart button functionality
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            const originalContent = this.innerHTML;
            const originalBg = this.style.backgroundColor;
            const originalColor = this.style.color;
            
            // Visual feedback animation
            this.style.backgroundColor = '#e63946';
            this.style.color = 'white';
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Berhasil Ditambahkan';
            
            // Add cart count update
            const cartBtn = document.querySelector('.cart-btn');
            const currentCount = parseInt(cartBtn.getAttribute('data-count') || '0');
            cartBtn.setAttribute('data-count', currentCount + 1);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.style.backgroundColor = originalBg;
                this.style.color = originalColor;
                this.innerHTML = originalContent;
            }, 2000);
            
            // Show toast notification instead of alert
            showToast('Produk berhasil ditambahkan ke keranjang!');
        });

        // Quantity buttons functionality
        const minusBtn = document.querySelector('.quantity-controls .quantity-btn:first-child');
        const plusBtn = document.querySelector('.quantity-controls .quantity-btn:last-child');
        const quantityInput = document.querySelector('.quantity-input');
        const stockInfo = document.querySelector('.stock-info');

        // Parse max stock from the stock info text
        const maxStock = parseInt(stockInfo.textContent.match(/\d+/)[0]);

        minusBtn.addEventListener('click', function() {
            let currentVal = parseInt(quantityInput.value);
            if(currentVal > 1) {
                quantityInput.value = currentVal - 1;
                updateStockInfo(currentVal - 1);
            }
        });

        plusBtn.addEventListener('click', function() {
            let currentVal = parseInt(quantityInput.value);
            if(currentVal < maxStock) {
                quantityInput.value = currentVal + 1;
                updateStockInfo(currentVal + 1);
            } else {
                showToast(`Maaf, stok hanya tersisa ${maxStock} buah`, 'warning');
            }
        });

        // Update stock info based on quantity
        function updateStockInfo(quantity) {
            const remaining = maxStock - quantity;
            stockInfo.textContent = `Tersisa ${remaining} buah`;
        }

        // Thumbnail image click functionality
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-image img');

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                const thumbImg = this.querySelector('img');
                const thumbSrc = thumbImg.src;
                
                // Fade transition effect
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = thumbSrc;
                    mainImage.style.opacity = '1';
                }, 200);
                
                // Add active state to clicked thumbnail
                thumbnails.forEach(t => {
                    t.style.border = '1px solid #eee';
                    t.style.transform = 'scale(1)';
                });
                this.style.border = '2px solid #e63946';
                this.style.transform = 'scale(1.05)';
            });
            
            // Set first thumbnail as active by default
            if(index === 0) {
                thumb.style.border = '2px solid #e63946';
                thumb.style.transform = 'scale(1.05)';
            }
        });

        // Star rating functionality
        const ratingStars = document.querySelectorAll('.rating-input .rating-star');
        let selectedRating = 3; // Default rating

        ratingStars.forEach((star, index) => {
            star.addEventListener('click', function() {
                selectedRating = index + 1;
                updateRatingDisplay(selectedRating);
            });
            
            star.addEventListener('mouseenter', function() {
                updateRatingDisplay(index + 1);
            });
        });

        document.querySelector('.rating-input').addEventListener('mouseleave', function() {
            updateRatingDisplay(selectedRating);
        });

        function updateRatingDisplay(rating) {
            ratingStars.forEach((star, index) => {
                if(index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }

        // Review submit functionality
        document.querySelector('.submit-review').addEventListener('click', function() {
            const reviewText = document.querySelector('.review-textarea').value;
            
            if(reviewText.trim() === '') {
                showToast('Silakan tulis review Anda terlebih dahulu', 'warning');
                return;
            }
            
            // Simulate review submission
            this.textContent = 'Mengirim...';
            this.disabled = true;
            
            setTimeout(() => {
                showToast('Review berhasil dikirim! Terima kasih atas feedback Anda.', 'success');
                document.querySelector('.review-textarea').value = '';
                this.textContent = 'Submit';
                this.disabled = false;
                selectedRating = 3;
                updateRatingDisplay(3);
            }, 1500);
        });

        // Toast notification function
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

        // Filter functionality
        const filterOptions = document.querySelectorAll('.filter-option, .filter-all');

        filterOptions.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                filterOptions.forEach(f => {
                    f.style.backgroundColor = '';
                    f.style.color = '';
                    f.style.borderColor = '';
                });
                
                // Add active class to clicked filter
                if(this.classList.contains('filter-all')) {
                    this.style.backgroundColor = '#e63946';
                    this.style.color = 'white';
                } else {
                    this.style.backgroundColor = '#e63946';
                    this.style.color = 'white';
                    this.style.borderColor = '#e63946';
                }
                
                // Here you would implement the actual filtering logic
                console.log('Filter by:', this.textContent);
            });
        });

        // Customer service button
        document.querySelector('.customer-service').addEventListener('click', function() {
            showToast('Customer service akan segera membantu Anda!', 'success');
        });

        // Share buttons functionality
        document.querySelectorAll('.share-icon').forEach((icon, index) => {
            icon.addEventListener('click', function() {
                const shareTypes = ['WhatsApp', 'Email', 'Pinterest'];
                showToast(`Berbagi via ${shareTypes[index]}`, 'success');
            });
        });