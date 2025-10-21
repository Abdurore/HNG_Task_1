
document.addEventListener('DOMContentLoaded', () => {
    const timeEl = document.querySelector('[data-testid="test-user-time"]');
    if (timeEl) {
        timeEl.textContent = Date.now().toString();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return; 

    const successMsg = document.querySelector('[data-testid="test-contact-success"]');

    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        // Helper – show / hide error
        const setError = (fieldId, msg) => {
            const input = document.getElementById(fieldId);
            const errEl = document.getElementById(`contact-error-${fieldId.split('-').pop()}`);
            if (!input || !errEl) return;

            if (msg) {
                errEl.textContent = msg;
                errEl.hidden = false;
                input.setAttribute('aria-invalid', 'true');
                valid = false;
            } else {
                errEl.hidden = true;
                input.removeAttribute('aria-invalid');
            }
        };

        form.querySelectorAll('.error').forEach(el => el.hidden = true);
        form.querySelectorAll('input, textarea')
            .forEach(el => el.removeAttribute('aria-invalid'));

        const name = document.getElementById('contact-name')?.value.trim() || '';
        const email = document.getElementById('contact-email')?.value.trim() || '';
        const subject = document.getElementById('contact-subject')?.value.trim() || '';
        const message = document.getElementById('contact-message')?.value.trim() || '';


        if (!name) {
            setError('contact-name', 'Full name is required.')
        };

        if (!email) {
            setError('contact-email', 'Email is required.')}
        else if (!/^\S+@\S+\.\S+$/.test(email)){
                      setError('contact-email', 'Enter a valid email address.')
        };

        if (!subject) {
            setError('contact-subject', 'Subject is required.')
        };

        if (!message) {
             setError('contact-message', 'Message is required.')}
        else if (message.length < 10){
                      setError('contact-message', 'Message must be at least 10 characters.')
        };

        // ---- Success ----
        if (valid) {
            successMsg.textContent = 'Thank you! Your message has been sent.';
            successMsg.hidden = false;
            successMsg.setAttribute('aria-hidden', 'false');
            form.reset();
        }
    });
});