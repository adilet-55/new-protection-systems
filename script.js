document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const statusMsg = document.getElementById('status-message');

    // Проверка правильности кыргызского номера
    function validatePhone(phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const kgRegex = /^(\+996|0)(50\d|55\d|70\d|77\d|22\d|99\d|312)\d{6}$/;
        return kgRegex.test(cleanPhone);
    }

    form.addEventListener('submit', function(e) {
        // Отменяем стандартную отправку и перезагрузку страницы
        e.preventDefault();
        let isValid = true;
        statusMsg.className = 'status-hidden';

        // 1. Проверка имени
        if (nameInput.value.trim().length < 2) {
            document.getElementById('name-error').textContent = 'Имя введено неверно (минимум 2 символа)';
            nameInput.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = '';
            nameInput.classList.remove('invalid');
        }

        // 2. Проверка телефона
        if (!validatePhone(phoneInput.value)) {
            document.getElementById('phone-error').textContent = 'Номер введен неправильно (формат КР: 0700123456 или +996700123456)';
            phoneInput.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('phone-error').textContent = '';
            phoneInput.classList.remove('invalid');
        }

        // 3. Проверка задачи / сообщения
        if (messageInput.value.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Задача введена неверно (опишите подробнее, от 10 символов)';
            messageInput.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('message-error').textContent = '';
            messageInput.classList.remove('invalid');
        }

        // Если все заполнено правильно — выводим уведомление на сайте
        if (isValid) {
            statusMsg.className = 'status-success';
            statusMsg.textContent = 'Заявка успешно отправлена и находится в обработке!';
            form.reset();
        }
    });
});
