// Form submission handling
document.querySelector('.email-signup').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Design test: Email ${email} submitted successfully!`);
});

// Google sign-in button
document.querySelector('.google-signin').addEventListener('click', () => {
    alert('Design test: Google sign-in button clicked!');
});

// Login link
document.querySelector('.login-link a').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Design test: Login link clicked!');
});

// Apply as DPO button
document.querySelector('.apply-btn').addEventListener('click', () => {
    alert('Design test: Apply as DPO button clicked!');
});

// Login button in header
document.querySelector('.login-btn').addEventListener('click', () => {
    alert('Design test: Login button clicked!');
});
