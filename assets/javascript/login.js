// Get references to form elements
        const form = document.getElementById('form');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        // Get references to error message divs
        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError')

        // Regular Expressions (RegEx)
        const usernameRegex = /^[A-Za-z0-9._-]+$/;
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

        // Add real-time validation on input change
        usernameInput.addEventListener('input', () => {
            validateField(usernameInput, usernameRegex, usernameError, 'Username can only contain alpha-numeric characters, underscores, hyphens, and periods.');
        });

        // Password validation triggers its own field validation and also the confirm password validation.
        passwordInput.addEventListener('input', () => {
            validateField(passwordInput, passwordRegex, passwordError, 'Password must be at least 8 characters, include 1 uppercase, 1 special character, and 1 number.')
        });


        // Form submission validation
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the default form submission behavior (page reload).

            let isValid = true;

            // Validate all fields sequentially.

            isValid = validateField(usernameInput, usernameRegex, usernameError, 'Username can only contain alpha-numeric characters, underscores, hyphens, and periods.') && isValid;

            isValid = validateField(passwordInput, passwordRegex, passwordError, 'Password must be at least 8 characters, include 1 uppercase, 1 special character, and 1 number.') && isValid;

            // Final conditional check before submission.
            if (isValid) {
                alert('Form submitted successfully!');
                
            } else {
                alert('Form has validation errors. Please check the fields.');
            }
        });

