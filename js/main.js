const params = new URLSearchParams(window.location.search);
const name = params.get('name') || 'Friend';

document.getElementById('js-name').textContent = name;
