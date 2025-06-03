        function toggleMenu() {
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            sideMenu.classList.toggle('open');
            menuOverlay.classList.toggle('open');
        }

        // Navigation click handler
        function handleNavClick(element, type) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            element.classList.add('active');
            
            // Show appropriate content based on type
            const messages = {
                'all': 'Menampilkan semua pesanan',
                'unpaid': 'Menampilkan pesanan belum dibayar',
                'packed': 'Menampilkan pesanan sedang dikemas',
                'shipped': 'Menampilkan pesanan sedang dikirim',
                'completed': 'Menampilkan pesanan selesai',
                'cancelled': 'Menampilkan pesanan dibatalkan'
            };
            
            showToast(messages[type], 'info');
            
            // Here you would typically load different content based on the type
            // For demo purposes, we'll just show the toast
        }

        // Sidebar click handler
        function handleSidebarClick(type) {
            const messages = {
                'account': 'Menuju halaman Akun Saya',
                'orders': 'Menuju halaman Pesanan Saya',
                'notifications': 'Menuju halaman Notifikasi',
                'vouchers': 'Menuju halaman Voucher'
            };
            
            showToast(messages[type], 'info');
            
            // Simulate navigation
            setTimeout(() => {
                console.log('Navigating to:', type);
            }, 1000);
        }

        // Payment details handler
        function handlePaymentDetails() {
            const btn = event.target;
            btn.innerHTML = 'Memuat...';
            btn.disabled = true;
            
            setTimeout(() => {
                showToast('Rincian pembayaran telah ditampilkan', 'success');
                btn.innerHTML = 'Rincian Pembayaran';
                btn.disabled = false;
                
                // Here you would show a modal or navigate to payment details
                console.log('Showing payment details');
            }, 1500);
        }

        // Track shipping handler
        function handleTrackShipping() {
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Melacak... <span class="loading"></span>';
            btn.disabled = true;
            
            setTimeout(() => {
                showToast('Paket Anda sedang dalam perjalanan ke alamat tujuan', 'success');
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Here you would show tracking information
                console.log('Tracking shipment');
            }, 2000);
        }

        // Search handler
        function handleSearch() {
            const searchInput = document.querySelector('.search-input');
            const searchValue = searchInput.value.trim();
            
            if (searchValue) {
                showToast(`Mencari: "${searchValue}"`, 'info');
                // Here you would perform the search
                console.log('Searching for:', searchValue);
            } else {
                showToast('Silakan masukkan kata kunci pencarian', 'warning');
            }
        }

        // Cart handler
        function handleCart() {
            showToast('Menuju halaman keranjang', 'info');
            setTimeout(() => {
                console.log('Navigating to cart');
            }, 1000);
        }

        // Profile handler
        function handleProfile() {
            showToast('Menuju halaman profil', 'info');
            setTimeout(() => {
                console.log('Navigating to profile');
            }, 1000);
        }

        // Menu click handler
        function handleMenuClick(page) {
            const pageUrls = {
                'home': 'index.html',
                'product': 'product.html',
                'order': 'order_status.html'
            };
            
            showToast(`Menuju halaman ${page}`, 'info');
            toggleMenu(); // Close menu
            
            setTimeout(() => {
                window.location.href = pageUrls[page] || '#';
            }, 1000);
        }

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

        // Search on Enter key
        document.querySelector('.search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            showToast('Halaman Order Status berhasil dimuat', 'success');
        });