validateField = (field, value) => {
    switch (field) {
        case 'name':
            if (value.trim().length < 2) {
                return 'Ім\'я має містити мінімум 2 символи';
            }
            return '';

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Введіть коректний email';
            }
            return '';

        case 'password':
            if (value.length < 8) {
                return 'Пароль має містити мінімум 8 символів';
            }
            if (!/\d/.test(value)) {
                return 'Пароль має містити хоча б 1 цифру';
            }
            return '';
        case 'confirmPassword' :
            const passwordValue = document.getElementById('password').value;
            if (value !== passwordValue) {
                return 'Паролі не збігаються';
            }
            return '';
        case 'age':
            const age = parseInt(value, 10);
            if (isNaN(age) || age < 16 || age > 100) {
                return 'Вік має бути від 16 до 100';
            }
            return '';
        case 'terms':
            const terms = document.getElementById('terms').checked;
            if (!terms) {
                return 'Необхідно погодитись з умовами';
            }
            return '';
        default:
            return '';
    }
}

errorHandler = (input) => {
    const errorMessage = validateField(input.name, input.value);
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');

    if (input.name === 'password') {
       passwordProgressBar(input);
    }

    if (errorMessage === '') {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        errorSpan.textContent = '';
    } else {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorSpan.textContent = errorMessage;
    }
}

validateAllFields = () => {
    const inputs = document.querySelectorAll('#registration-form input');
    let isValid = true;

    inputs.forEach(input => {
        if (validateField(input.name, input.value) !== '') {
            isValid = false;
        }
    });

    return isValid;
}

saveUser = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push({
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        age: Number(document.getElementById('age').value),
        registeredAt: new Date().toLocaleString('uk-UA'),
    });

    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();

}

clearValidationStyles = () => {
    const inputs = document.querySelectorAll('#registration-form input');
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error', 'success');
        const errorSpan = formGroup.querySelector('.error-message');
        errorSpan.textContent = '';
    });
}

showMessage = (success) => {
    const message = success ?
        document.querySelector('.messages .success-message')
        : document.querySelector('.messages .error-message');

    message.classList.add('show');

    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

renderUsers = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const container = document.getElementById('users-list');

    if (users.length === 0) {
        container.innerHTML = '<p>Поки немає зареєстрованих користувачів</p>';
        return;
    }

    container.innerHTML = users
        .map(user => `
      <div class="user-card">
        <strong>${user.name}</strong>
        <span>${user.email}</span>
        <span>Вік: ${user.age}</span>
        <small>Зареєстровано: ${user.registeredAt}</small>
      </div>
    `)
        .join('');
}

getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (password.length >= 12) strength++;

    if (strength <= 1) return { level: 'weak', label: 'Слабкий', color: '#e74c3c' };
    if (strength <= 3) return { level: 'medium', label: 'Середній', color: '#f39c12' };
    return { level: 'strong', label: 'Сильний', color: '#2ecc71' };
}

passwordProgressBar = (input) => {
    const strength = getPasswordStrength(input.value);
    const passwordStrengthLevel = document.getElementById('password-strength');
    const passwordStrengthLabel = document.getElementById('password-strength-label');
    const maxProgressBarLevel = 100;

    passwordStrengthLabel.textContent = strength.label;
    passwordStrengthLabel.style.color = strength.color;
    switch (strength.level) {
        case 'weak':
            passwordStrengthLevel.value = maxProgressBarLevel / 3;
            break;
        case 'medium':
            passwordStrengthLevel.value = (maxProgressBarLevel / 3) * 2;
            break;
        case 'strong':
            passwordStrengthLevel.value = maxProgressBarLevel;
            break;
        default:
            passwordStrengthLevel.value = 0;
    }
}

(() => {
    const form = document.getElementById('registration-form');
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            errorHandler(input);
        });
        input.addEventListener('blur', () => {
            errorHandler(input);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isValid = validateAllFields();

        if (isValid) {
            saveUser();
            showMessage(true);
            form.reset();
            clearValidationStyles();
        } else {
            showMessage(false);
        }
    });

    renderUsers();
})();
