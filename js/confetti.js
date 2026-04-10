(function () {
  var COLORS = [
    '#f9c74f', '#f94144', '#ff6b6b', '#f3722c',
    '#43aa8b', '#4361ee', '#9b5de5', '#ff99c8', '#ffffff'
  ];
  var COUNT = 24;

  function spawnPiece(x, y) {
    var el = document.createElement('span');
    el.className = 'confetti-piece';

    var angle  = Math.random() * Math.PI * 2;
    var dist   = 70 + Math.random() * 120;
    var dx     = (Math.cos(angle) * dist).toFixed(1);
    var dy     = (Math.sin(angle) * dist - 60).toFixed(1); // bias upward
    var rot    = Math.round(Math.random() * 720 - 360);
    var w      = (5 + Math.random() * 7).toFixed(1);
    var h      = (4 + Math.random() * 6).toFixed(1);
    var radius = Math.random() > 0.5 ? '50%' : '2px';
    var color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    var dur    = (0.55 + Math.random() * 0.45).toFixed(2);

    el.style.cssText =
      'left:' + x + 'px;top:' + y + 'px;' +
      'width:' + w + 'px;height:' + h + 'px;' +
      'border-radius:' + radius + ';' +
      'background:' + color + ';' +
      '--dx:' + dx + 'px;--dy:' + dy + 'px;--rot:' + rot + 'deg;' +
      'animation-duration:' + dur + 's;';

    document.body.appendChild(el);
    el.addEventListener('animationend', function () { el.remove(); }, { once: true });
  }

  document.addEventListener('click', function (e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < COUNT; i++) spawnPiece(e.clientX, e.clientY);
  });
}());
