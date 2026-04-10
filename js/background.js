(function () {
  var el = document.createElement('div');
  el.className = 'bg-stripes';
  document.body.insertBefore(el, document.body.firstChild);

  document.addEventListener('click', function () {
    el.classList.remove('is-active');
    void el.offsetWidth; // force reflow so animation restarts on rapid clicks
    el.classList.add('is-active');
  });

  el.addEventListener('animationend', function () {
    el.classList.remove('is-active');
  });
}());
