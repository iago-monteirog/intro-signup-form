const form = document.querySelector('[data-formulario]');
const formFields = document.querySelectorAll('[required]');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.elements['first_name'].value;
    let lastName = event.target.elements['last_name'].value;
    let email = event.target.elements['email'].value;
    let password = event.target.elements['password'].value;

    const responseList = {
        'firstName': name,
        'lastName': lastName,
        'email': email,
        'password': password,
    }

    localStorage.setItem('register', JSON.stringify(responseList));

    form.reset();
});

formFields.forEach((field) => {
    field.addEventListener('invalid', event => event.preventDefault());
    field.addEventListener('blur', () => validateField(field));
});

const errorsType = [
    'valueMissing',
    'typeMismatch',
];

const messages = {
    first_name: {
        valueMissing: 'First name cannot be empty',
    },
    last_name: {
        valueMissing: 'Last name cannot be empty',
    },
    email: {
        valueMissing: 'Email cannot be empty',
        typeMismatch: 'Looks like this is not an email',
    },
    password: {
        valueMissing: 'Password cannot be empty',
    }
};

function validateField(field) {
    let message = '';
    field.setCustomValidity('');


    errorsType.forEach(error => {
        if (field.validity[error]) {
            message = messages[field.name][error];
        }
    });

    const errorMessage = field.parentNode.querySelector('.error-message');
    const errorIcon = field.parentNode.querySelector('.icon-error');
    const input = field.parentNode.querySelector('.campo_escrita');

    const inputValidator = field.checkValidity();

    if (!inputValidator) {
        errorMessage.textContent = message;
        errorIcon.setAttribute('style', 'display: block;');
        input.setAttribute('style', 'border: 1px solid hsl(0, 100%, 74%);');
        input.placeholder = '';

        if (field.name === 'email' && field.validity.typeMismatch) {
            input.value = '';
            input.placeholder = 'email@example/com';
            input.classList.add('red-placeholder');
        }

    } else {
        errorMessage.textContent = '';
        errorIcon.removeAttribute('style');
        input.removeAttribute('style');
    }

}
