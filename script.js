document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const statusMsg = document.getElementById('status-message');

    // Проверка номера телефона Кыргызстана (O!, Beeline, MegaCom, стационарные)
    function validateKyrgyzPhone(phone) {
        // Убираем пробелы, тире и скобки
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        // Поддерживает форматы: 0700123456, +996700123456, 996700123456
        const kgRegex = /^(\+996|996|0)(50\d|55\d|70\d|75\d|77\d|22\d|99\d|88\d|312)\d{6}$/;
        return kgRegex.test(cleanPhone);
    }

    // Проверка правильности имени (минимум 2 буквы, только кириллица/латиница/пробел)
    function validateName(name) {
        const trimmed = name.trim();
        const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s\-]{2,40}$/;
        return nameRegex.test(trimmed);
    }

    form.addEventListener('submit', function(e) {
        // Обязательно отменяем стандартную перезагрузку и переброс наверх страницы
        e.preventDefault();

        let isValid = true;
        statusMsg.className = 'status-hidden';

        // 1. Валидация имени
        if (!validateName(nameInput.value)) {
            document.getElementById('name-error').textContent = 'Введите корректное имя (минимум 2 буквы, без цифр)';
            nameInput.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = '';
            nameInput.classList.remove('invalid');
        }

        // 2. Валидация кыргызского номера
        if (!validateKyrgyzPhone(phoneInput.value)) {
            document.getElementById('phone-error').textContent = 'Введите верный номер КР (например: 0700123456 или +996555123456)';
            phoneInput.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('phone-error').textContent = '';
            phoneInput.classList.remove('invalid');
        }

        // 3. Валидация задачи
        if (messageInput.value.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Опишите задачу подробнее (минимум 10 символов)';
            messageInput.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('message-error').textContent = '';
            messageInput.classList.remove('invalid');
        }

        // Если все поля заполнены верно — отправляем заявку
        if (isValid) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка заявки...';

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    statusMsg.className = 'status-success';
                    statusMsg.innerHTML = '✅ Спасибо! Ваша заявка принята и находится в обработке. Мы скоро свяжемся с вами.';
                    form.reset();
                } else {
                    throw new Error('Ошибка сервера');
                }
            })
            .catch(error => {
                statusMsg.className = 'status-error';
                statusMsg.textContent = '❌ Произошла ошибка при отправке. Попробуйте еще раз или напишите нам в WhatsApp.';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
            });
        }
    });
});
