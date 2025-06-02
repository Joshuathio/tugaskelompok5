        let selectedPaymentMethod = null;

        // Side menu functionality
        const menuIcon = document.querySelector('.menu-icon');
        const sideMenu = document.getElementById('sideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.querySelector('.close-menu-btn');

        menuIcon.addEventListener('click', () => {
            sideMenu.classList.add('open');
            menuOverlay.classList.add('open');
        });

        closeMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
        });

        menuOverlay.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
        });

        // Back button functionality
        document.querySelector('.back-btn').addEventListener('click', function() {
            window.location.href = 'product_detail.html';
        });

        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        const paymentError = document.getElementById('paymentError');

        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Remove selected class from all methods
                paymentMethods.forEach(m => m.classList.remove('selected'));
                
                // Add selected class to clicked method
                this.classList.add('selected');
                
                // Store selected payment method
                selectedPaymentMethod = this.getAttribute('data-method');
                
                // Hide error message if shown
                paymentError.classList.remove('show');
                
                // Show toast notification
                const methodName = this.querySelector('img').alt;
                showToast(`Metode pembayaran ${methodName} dipilih`, 'success');
            });
        });

        // Checkout button functionality
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            // Check if payment method is selected
            if (!selectedPaymentMethod) {
                // Show error message
                paymentError.classList.add('show');
                
                // Shake animation for payment section
                const paymentSection = document.querySelector('.payment-section');
                paymentSection.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    paymentSection.style.animation = '';
                }, 500);
                
                // Show toast notification
                showToast('Silakan pilih metode pembayaran terlebih dahulu!', 'error');
                
                // Scroll to payment section
                paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            
            // If payment method is selected, proceed with checkout
            this.innerHTML = 'Memproses...';
            this.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                showToast('Pesanan berhasil dibuat! Terima kasih telah berbelanja.', 'success');
                
                // Redirect to payment page
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1500);
            }, 2000);
        });

        // Voucher button functionality
        document.querySelector('.voucher-btn').addEventListener('click', function() {
            showToast('Fitur voucher akan segera tersedia', 'warning');
        });

        // Customer service button
        document.querySelector('.customer-service').addEventListener('click', function() {
            showToast('Customer service akan segera membantu Anda!', 'success');
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

        // Shake animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);