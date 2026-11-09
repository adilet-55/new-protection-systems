document.getElementById('tgForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Ваша заявка успешно отправлена в New Protection Systems. Мы свяжемся с вами.');
    this.reset();
});