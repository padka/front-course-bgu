document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.querySelector('.User');
    const passwordInput = document.querySelector('.Pass');
    const loadingIndicator = document.querySelector('.loading');
    const successMessage = document.querySelector('.success-message');

    // Объявление функции clearErrors()
    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.parentNode.removeChild(error);
        });
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы
        clearErrors(); // Очистка предыдущих сообщений об ошибке

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let errors = [];

        // Валидация логина и пароля
        if (username === '') {
            errors.push({ input: usernameInput, message: 'Логин не может быть пустым.' });
        } else if (!validateUsername(username)) {
            errors.push({ input: usernameInput, message: 'Логин должен состоять только из латинских букв и цифр и быть не менее 8 символов длиной.' });
        }

        if (password === '') {
            errors.push({ input: passwordInput, message: 'Пароль не может быть пустым.' });
        } else if (!validatePassword(password)) {
            errors.push({ input: passwordInput, message: 'Пароль должен быть не менее 8 символов длиной и включать хотя бы одну заглавную букву и цифру.' });
        }

        if (errors.length > 0) {
            errors.forEach(({ input, message }) => showError(input, message));
        } else {
            loadingIndicator.style.display = 'block';
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
                successMessage.style.display = 'block';
                setTimeout(() => successMessage.style.display = 'none', 5000);
            }, 2000);
        }
    });

    function showError(inputElement, message) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.className = 'error-message';
        inputElement.classList.add('error');
        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
    }

    function validateUsername(username) {
        return /^[a-zA-Z0-9]{8,}$/.test(username);
    }

    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    }
});
