const params = new URLSearchParams(window.location.search);
const name = params.get('name') || 'Friend';

document.getElementById('js-name').textContent = name;

const greeting = document.getElementById('js-greeting');

greeting.addEventListener('click', () => {
  if (greeting.classList.contains('is-spinning')) return;
  greeting.classList.add('is-spinning');
  greeting.addEventListener('animationend', () => {
    greeting.classList.remove('is-spinning');
  }, { once: true });
});
