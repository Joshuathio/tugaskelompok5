 document.querySelector('.buy-now').addEventListener('click', function() {
            alert('Pembelian berhasil diproses! Mengarahkan ke halaman checkout...');
           
            window.location.href = '/checkout.html';
        });
        
        // Add to Cart button functionality
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            // Visual feedback animation
            this.style.backgroundColor = '#e63946';
            this.style.color = 'white';
            this.innerHTML = '✓ Berhasil Ditambahkan';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
                this.innerHTML = '🛒 Masukkan Keranjang';
            }, 2000);
            
            // Show feedback to user
            alert('Produk berhasil ditambahkan ke keranjang!');
        });
        
        // Quantity buttons functionality
        const minusBtn = document.querySelector('.quantity-controls .quantity-btn:first-child');
        const plusBtn = document.querySelector('.quantity-controls .quantity-btn:last-child');
        const quantityInput = document.querySelector('.quantity-input');
        
        minusBtn.addEventListener('click', function() {
            let currentVal = parseInt(quantityInput.value);
            if(currentVal > 1) {
                quantityInput.value = currentVal - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let currentVal = parseInt(quantityInput.value);
            if(currentVal < 5) { // 5 is the max based on stock info
                quantityInput.value = currentVal + 1;
            } else {
                alert('Maaf, stok hanya tersisa 5 buah');
            }
        });
        
        // Thumbnail image click functionality
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-image img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const thumbSrc = this.querySelector('img').src;
                mainImage.src = thumbSrc;
                
                // Add active state to clicked thumbnail
                thumbnails.forEach(t => t.style.border = '1px solid #eee');
                this.style.border = '2px solid #e63946';
            });
        });