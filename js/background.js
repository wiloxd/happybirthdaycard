(function () {
  // ── Canvas setup ────────────────────────────────────────────
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:0;';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ── Palettes ────────────────────────────────────────────────
  var PALETTES = [
    ['#f94144', '#f3722c', '#f9c74f', '#43aa8b', '#4361ee', '#9b5de5'],
    ['#ff99c8', '#9b5de5', '#4361ee', '#43aa8b', '#f9c74f', '#f94144'],
    ['#ffffff', '#f9c74f', '#ff6b6b', '#9b5de5', '#4361ee', '#43aa8b'],
    ['#f3722c', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b', '#118ab2'],
    ['#f94144', '#ff6b6b', '#ff99c8', '#ffd166', '#06d6a0', '#118ab2'],
  ];

  // ── Helpers ─────────────────────────────────────────────────
  var N = 15;

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function range(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    return a;
  }

  // ── Draw modes ──────────────────────────────────────────────
  // fill: 0.5–1.0 controls stripe width / circle radius as fraction of slot

  function drawDiag(present, palette, fill) {
    var D = W + H, bw = D / N;
    present.forEach(function (idx) {
      var c = idx * bw, fw = bw * fill, g = (bw - fw) / 2;
      ctx.fillStyle = palette[idx % palette.length];
      ctx.beginPath();
      ctx.moveTo(c + g,          0);
      ctx.lineTo(c + g + fw,     0);
      ctx.lineTo(c + g + fw - H, H);
      ctx.lineTo(c + g - H,      H);
      ctx.closePath();
      ctx.fill();
    });
  }

  function drawHoriz(present, palette, fill) {
    var bh = H / N;
    present.forEach(function (idx) {
      var fh = bh * fill;
      ctx.fillStyle = palette[idx % palette.length];
      ctx.fillRect(0, idx * bh + (bh - fh) / 2, W, fh);
    });
  }

  function drawVert(present, palette, fill) {
    var bw = W / N;
    present.forEach(function (idx) {
      var fw = bw * fill;
      ctx.fillStyle = palette[idx % palette.length];
      ctx.fillRect(idx * bw + (bw - fw) / 2, 0, fw, H);
    });
  }

  function drawCircles(present, palette, fill) {
    var cols = 5, rows = 3;
    var cw = W / cols, ch = H / rows;
    var r  = Math.min(cw, ch) * 0.48 * fill;
    present.forEach(function (idx) {
      ctx.fillStyle = palette[idx % palette.length];
      ctx.beginPath();
      ctx.arc(
        (idx % cols) * cw + cw / 2,
        Math.floor(idx / cols) * ch + ch / 2,
        r, 0, Math.PI * 2
      );
      ctx.fill();
    });
  }

  var MODES = [drawDiag, drawHoriz, drawVert, drawCircles];

  // ── Animation state ─────────────────────────────────────────
  var units = new Array(N);
  var drawInterval  = null;
  var removalTimers = [];

  function getPresent() {
    var a = [];
    for (var i = 0; i < N; i++) if (units[i]) a.push(i);
    return a;
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    var present = getPresent();
    if (!present.length) return;
    pick(MODES)(present, pick(PALETTES), 0.5 + Math.random() * 0.5);
  }

  function stop() {
    clearInterval(drawInterval);
    drawInterval = null;
    removalTimers.forEach(clearTimeout);
    removalTimers = [];
    ctx.clearRect(0, 0, W, H);
  }

  function start() {
    stop();

    for (var i = 0; i < N; i++) units[i] = true;

    // Schedule each unit to wink out at a random time within its slice of 2s
    var order = shuffle(range(N));
    var slotSize = 2000 / N;
    order.forEach(function (idx, i) {
      var t = i * slotSize + Math.random() * slotSize;
      removalTimers.push(setTimeout(function () { units[idx] = false; }, t));
    });

    removalTimers.push(setTimeout(stop, 2400));

    drawFrame(); // immediate first frame on click
    drawInterval = setInterval(function () {
      if (!getPresent().length) { stop(); return; }
      drawFrame();
    }, 200);
  }

  document.addEventListener('click', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    start();
  });
}());
