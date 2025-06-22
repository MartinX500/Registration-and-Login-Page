// Get references to form elements
        const form = document.getElementById('form');
        const fullNameInput = document.getElementById('fullname');
        const addressInput = document.getElementById('address');
        const usernameInput = document.getElementById('username');
        const countrySelect = document.getElementById('country');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        // Get references to error message divs
        const fullNameError = document.getElementById('fullNameError');
        const addressError = document.getElementById('addressError');
        const usernameError = document.getElementById('usernameError');
        const countryError = document.getElementById('countryError');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        // Regular Expressions (RegEx)
        const fullNameRegex = /^[A-Za-z\s]+$/;
        const addressRegex = /^[A-Za-z0-9\s.,#-]+$/;
        const usernameRegex = /^[A-Za-z0-9._-]+$/;
        const phoneRegex = /^\+?[0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;


        function validateField(inputElement, regex, errorElement, errorMessage) {
            const value = inputElement.value.trim();
            if (value === '') {
                errorElement.textContent = 'This field is required.';
                return false;
            } else if (!regex.test(value)) {
                errorElement.textContent = errorMessage;
                return false;
            } else {
                errorElement.textContent = '';
                return true;
            }
        }

        function validateConfirmPassword() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (confirmPassword === '') {
                confirmPasswordError.textContent = 'Please confirm your password.';
                return false;
            } else if (password !== confirmPassword) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                return false;
            } else {
                confirmPasswordError.textContent = '';
                return true;
            }
        }

        // Add real-time validation on input change
        fullNameInput.addEventListener('input', () => validateField(fullNameInput, fullNameRegex, fullNameError, 'Full Name can only contain alphabets and spaces.'));
        addressInput.addEventListener('input', () => validateField(addressInput, addressRegex, addressError, 'Address can only contain alpha-numeric characters and common symbols like ., #-'));
        usernameInput.addEventListener('input', () => {
            validateField(usernameInput, usernameRegex, usernameError, 'Username can only contain alpha-numeric characters, underscores, hyphens, and periods.');
        });

        // For select elements, 'change' event is often more appropriate.
        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            if (selectedCountry === '') {
                countryError.textContent = 'Please select a country.';
            } else {
                countryError.textContent = '';
            }
        });

        phoneInput.addEventListener('input', () => validateField(phoneInput, phoneRegex, phoneError, 'Phone Number can only contain numbers and optionally a leading "+".'));
        emailInput.addEventListener('input', () => validateField(emailInput, emailRegex, emailError, 'Please enter a valid email address.'));

        // Password validation triggers its own field validation and also the confirm password validation.
        passwordInput.addEventListener('input', () => {
            validateField(passwordInput, passwordRegex, passwordError, 'Password must be at least 8 characters, include 1 uppercase, 1 special character, and 1 number.');
            validateConfirmPassword(); // Re-validate confirm password if password changes
        });
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);


        // Form submission validation
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the default form submission behavior (page reload).

            let isValid = true;

            // Validate all fields sequentially.
            isValid = validateField(fullNameInput, fullNameRegex, fullNameError, 'Full Name can only contain alphabets and spaces.') && isValid;
            isValid = validateField(addressInput, addressRegex, addressError, 'Address can only contain alpha-numeric characters and common symbols like ., #-') && isValid;
            isValid = validateField(usernameInput, usernameRegex, usernameError, 'Username can only contain alpha-numeric characters, underscores, hyphens, and periods.') && isValid;

            // Manual validation for country select (as it's a dropdown).
            if (countrySelect.value === '') {
                countryError.textContent = 'Please select a country.';
                isValid = false;
            } else {
                countryError.textContent = '';
            }

            isValid = validateField(phoneInput, phoneRegex, phoneError, 'Phone Number can only contain numbers and optionally a leading "+".') && isValid;
            isValid = validateField(emailInput, emailRegex, emailError, 'Please enter a valid email address.') && isValid;
            isValid = validateField(passwordInput, passwordRegex, passwordError, 'Password must be at least 8 characters, include 1 uppercase, 1 special character, and 1 number.') && isValid;
            isValid = validateConfirmPassword() && isValid;

            // Final conditional check before submission.
            if (isValid) {
                alert('Form submitted successfully!');
                
            } else {
                alert('Form has validation errors. Please check the fields.');
            }
        });

