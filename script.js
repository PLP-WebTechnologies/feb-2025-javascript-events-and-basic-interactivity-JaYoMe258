document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling Section ========== //
    
    // Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#27ae60';
        clickOutput.style.fontWeight = 'bold';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Waiting for your click...';
            clickOutput.style.color = '';
            clickOutput.style.fontWeight = '';
        }, 2000);
    });
    
    // Hover Event
    const hoverArea = document.querySelector('.hover-area');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverArea.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse entered! 👋';
        this.style.backgroundColor = '#e3f2fd';
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Mouse left! 🏃‍♂️';
        this.style.backgroundColor = '';
    });
    
    // Keypress Event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
        
        // Bonus: Change color based on length
        const length = e.target.value.length;
        if (length > 10) {
            keypressOutput.style.color = '#e74c3c';
        } else if (length > 5) {
            keypressOutput.style.color = '#f39c12';
        } else {
            keypressOutput.style.color = '#2ecc71';
        }
    });
    
    // Double Click Secret Event
    const secretArea = document.querySelector('.secret-area');
    const secretOutput = document.getElementById('secret-output');
    
    secretArea.addEventListener('dblclick', function() {
        secretOutput.textContent = '🎉 You found the secret! 🎉';
        secretOutput.style.fontSize = '1.2em';
        secretOutput.style.color = '#9b59b6';
        
        // Add confetti effect (simple version)
        this.style.backgroundColor = '#f0e6ff';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 1000);
    });
    
    // Long Press Detection
    let pressTimer;
    secretArea.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretOutput.textContent = 'You held it down! 🕒';
            secretOutput.style.color = '#e67e22';
        }, 1000);
    });
    
    secretArea.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretArea.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ========== Interactive Elements Section ========== //
    
    // Color Changer
    const colorBtn = document.getElementById('color-btn');
    const colorBox = document.querySelector('.color-box');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorBox.style.backgroundColor = colors[colorIndex];
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('span').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                this.querySelector('span').textContent = '-';
            }
        });
    });
    
    // ========== Form Validation Section ========== //
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            this.reset();
            resetPasswordRules();
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    // Validation functions
    function validateName() {
        const value = nameInput.value.trim();
        if (value === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else if (value.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        const value = passwordInput.value;
        let isValid = true;
        
        // Check length
        const lengthRule = document.getElementById('length-rule');
        if (value.length >= 8) {
            lengthRule.classList.add('valid');
        } else {
            lengthRule.classList.remove('valid');
            isValid = false;
        }
        
        // Check for number
        const numberRule = document.getElementById('number-rule');
        if (/\d/.test(value)) {
            numberRule.classList.add('valid');
        } else {
            numberRule.classList.remove('valid');
            isValid = false;
        }
        
        // Check for special character
        const specialRule = document.getElementById('special-rule');
        if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            specialRule.classList.add('valid');
        } else {
            specialRule.classList.remove('valid');
            isValid = false;
        }
        
        if (value === '') {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            return false;
        } else if (!isValid) {
            passwordError.textContent = 'Password does not meet requirements';
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordError.style.display = 'none';
            return true;
        }
    }
    
    function resetPasswordRules() {
        document.querySelectorAll('.password-rules li').forEach(li => {
            li.classList.remove('valid');
        });
    }
});