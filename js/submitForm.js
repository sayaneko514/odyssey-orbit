document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = this.elements['name'].value.trim();
    let email = this.elements['email'].value.trim();
    let phone = this.elements['phone'].value.trim();
    let message = this.elements['message'].value.trim();

    let nameValid = /^[a-zA-Z\s]{1,50}$/.test(name);
    let phoneValid = phone === '' || /^[\d\s\-\(\)]+$/.test(phone) && !/[^\d]/.test(phone.replace(/[\s\-\(\)]+/g, ''));
    let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let messageValid = message.length > 0 && message.length <= 1000;

    if (!nameValid) {
        alert('Please enter a valid name (letters and spaces only, up to 50 characters).');
        return;
    }

    if (!phoneValid) {
        alert('Phone number must contain only numbers, spaces, parentheses, and hyphens.');
        return;
    }

    if (!emailValid) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!messageValid) {
        alert('Message must be between 1 and 1000 characters.');
        return;
    }

    console.log({ Name: name, Email: email, Phone: phone, Message: message });
    alert('Your message has been logged to the console.');

    this.reset();
});
