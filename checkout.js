// Checkout button functionality
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            alert('Pesanan berhasil dibuat! Terima kasih telah berbelanja.');
           
            window.location.href = '/payment.html';
        });
        
        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Remove active class from all methods
                paymentMethods.forEach(m => m.style.border = '1px solid #ddd');
                // Add active class to selected method
                this.style.border = '2px solid #e63946';
            });
        });