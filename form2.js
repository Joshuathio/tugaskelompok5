   // Function untuk menampilkan error
        function showError(inputElement, errorMessage) {
            const formGroup = inputElement.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            // Tambahkan class error
            inputElement.classList.add('error');
            formGroup.classList.add('has-error');
            
            // Update pesan error jika diperlukan
            if (errorMessage) {
                errorElement.textContent = errorMessage;
            }
        }

        // Function untuk menghilangkan error
        function clearError(inputElement) {
            const formGroup = inputElement.closest('.form-group');
            
            // Hapus class error
            inputElement.classList.remove('error');
            formGroup.classList.remove('has-error');
        }

        // Function untuk menghilangkan semua error
        function clearAllErrors() {
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('has-error');
            });
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error');
            });
        }

        // Tunggu sampai DOM loaded
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('signupForm');
            
            if (form) {
                // Handle form submission
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Clear semua error sebelumnya
                    clearAllErrors();
                    
                    let isValid = true;
                    
                    // Validasi Name
                    const nameInput = document.getElementById('name');
                    if (nameInput && nameInput.value.trim() === '') {
                        showError(nameInput, 'Name is required');
                        isValid = false;
                    }
                    
                    // Validasi Email
                    const emailInput = document.getElementById('email');
                    if (emailInput) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailInput.value.trim()) {
                            showError(emailInput, 'Email is required');
                            isValid = false;
                        } else if (!emailRegex.test(emailInput.value)) {
                            showError(emailInput, 'Please enter a valid email address');
                            isValid = false;
                        }
                    }
                    
                    // Validasi Password
                    const passwordInput = document.getElementById('password');
                    if (passwordInput) {
                        if (!passwordInput.value) {
                            showError(passwordInput, 'Password is required');
                            isValid = false;
                        } else if (passwordInput.value.length < 6) {
                            showError(passwordInput, 'Password must be at least 6 characters');
                            isValid = false;
                        }
                    }
                    
                    // Jika form valid, submit
                    if (isValid) {
                        console.log('Form is valid! Submitting...');
                        alert('Form submitted successfully!');
                    }
                });
                
                // Clear error saat user mengetik
                document.querySelectorAll('.form-control').forEach(input => {
                    input.addEventListener('input', function() {
                        clearError(this);
                    });
                    
                    // OPTIONAL: Validasi real-time saat user keluar dari input (blur)
                    input.addEventListener('blur', function() {
                        // Validasi Name
                        if (this.id === 'name' && this.value.trim() === '') {
                            showError(this, 'Name is required');
                        }
                        
                        // Validasi Email
                        if (this.id === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!this.value.trim()) {
                                showError(this, 'Email is required');
                            } else if (!emailRegex.test(this.value)) {
                                showError(this, 'Please enter a valid email address');
                            }
                        }
                        
                        // Validasi Password
                        if (this.id === 'password') {
                            if (!this.value) {
                                showError(this, 'Password is required');
                            } else if (this.value.length < 6) {
                                showError(this, 'Password must be at least 6 characters');
                            }
                        }
                    });
                });
            }
        });

        // Function untuk tombol back
        function goBack() {
            // Jika ada history, kembali ke halaman sebelumnya
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Jika tidak ada history, redirect ke halaman home atau login
                window.location.href = 'home.html'; // Ganti dengan URL yang sesuai
            }
        }