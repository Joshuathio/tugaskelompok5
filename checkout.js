// Checkout button functionality
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            alert('Pesanan berhasil dibuat! Terima kasih telah berbelanja.');
           
            window.location.href = 'payment.html';
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
function goBack() {
    try {
        // Cek apakah history tersedia
        if (window.history && window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback ke halaman default
            window.location.href = 'product_detail.html';
        }
    } catch (error) {
        console.error('Error in goBack function:', error);
        // Fallback jika ada error
        window.location.href = 'product_detail.html';
    }
}
// Hapus onclick dari HTML, gunakan event listener
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
});