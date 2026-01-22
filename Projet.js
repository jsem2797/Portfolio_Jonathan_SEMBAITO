const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}
const form = document.querySelector('.contact__form');
const statusEl = document.querySelector('.form__status');

function setError(id, message) {
  const el = document.querySelector(`[data-error-for="${id}"]`);
  if (el) el.textContent = message || '';
}

function validateField(input) {
  const value = input.value.trim();
  let error = '';

  if (!value) {
    error = 'Ce champ est requis.';
  } else {
    if (input.id === 'firstName' && value.length < 2) error = 'Prénom trop court.';
    if (input.id === 'lastName' && value.length < 2) error = 'Nom trop court.';
    if (input.id === 'subject' && value.length < 4) error = 'Sujet trop court.';
    if (input.id === 'message' && value.length < 10) error = 'Message trop court.';
  }

  setError(input.id, error);
  input.setAttribute('aria-invalid', error ? 'true' : 'false');
  return !error;
}

['firstName','lastName','subject','message'].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => setError(id, ''));
  }
});

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = ['firstName','lastName','subject','message'].map(id => document.getElementById(id));
    const allValid = inputs.every(input => validateField(input));

    if (!allValid) {
      statusEl.textContent = 'Veuillez corriger les erreurs.';
      statusEl.style.color = 'var(--danger)';
      return;
    }
    statusEl.textContent = 'Message envoyé avec succès !';
    statusEl.style.color = 'var(--success)';
    form.reset();
    ['firstName','lastName','subject','message'].forEach(id => setError(id, ''));
  });
}
(function enableFocusRing(){
  function handleFirstTab(e){
    if (e.key === 'Tab'){
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();
