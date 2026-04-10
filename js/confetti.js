(function () {
  var COLORS = [
    '#f9c74f', '#f94144', '#ff6b6b', '#f3722c',
    '#43aa8b', '#4361ee', '#9b5de5', '#ff99c8', '#ffffff'
  ];
  var COUNT   = 48;
  var GRAVITY = 0.18; // px / frame²

  function spawnPiece(x, y) {
    var el = document.createElement('span');
    el.className = 'confetti-piece';

    var angle    = Math.random() * Math.PI * 2;
    var speed    = 3.5 + Math.random() * 5.5;
    var vx       = Math.cos(angle) * speed;
    var vy       = Math.sin(angle) * speed - 3.5; // upward bias
    var rot      = Math.random() * 360;
    var rotSpeed = (Math.random() - 0.5) * 12;
    var w        = (5 + Math.random() * 7).toFixed(1);
    var h        = (4 + Math.random() * 6).toFixed(1);
    var radius   = Math.random() > 0.5 ? '50%' : '2px';
    var color    = COLORS[Math.floor(Math.random() * COLORS.length)];
    var life     = 70 + Math.floor(Math.random() * 30);
    var px = 0, py = 0, frame = 0;

    el.style.cssText =
      'left:' + x + 'px;top:' + y + 'px;' +
      'width:' + w + 'px;height:' + h + 'px;' +
      'border-radius:' + radius + ';' +
      'background:' + color + ';';

    document.body.appendChild(el);

    function tick() {
      frame++;
      vy += GRAVITY;
      px += vx;
      py += vy;
      rot += rotSpeed;

      var fadeStart = life * 0.6;
      var opacity = frame < fadeStart ? 1 : 1 - (frame - fadeStart) / (life - fadeStart);

      el.style.transform =
        'translate(calc(-50% + ' + px.toFixed(1) + 'px), calc(-50% + ' + py.toFixed(1) + 'px))' +
        ' rotate(' + rot.toFixed(1) + 'deg)';
      el.style.opacity = opacity.toFixed(3);

      if (frame >= life) {
        el.remove();
        return;
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  document.addEventListener('click', function (e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < COUNT; i++) spawnPiece(e.clientX, e.clientY);
  });
}());
