/* Aidan: a square of red paper that folds into the SEBROBIN AI origami bird.
   Usage: <div class="aidan" data-state="idle"></div>  (states: idle, listening, thinking, speaking)
   Plays the fold when the bird first comes into view; click to replay. Respects reduced motion. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  // Final bird (traced from the logo artwork), in a 2048-wide space
  var V = {
    A: [772, 363], P: [885, 393], D: [1000, 628], B: [827, 291], C: [1035, 393], X: [1018, 512],
    E: [955, 905], F: [1297, 725], G: [1208, 603], H: [1322, 543], I: [1386, 584], R: [1318, 588],
    K: [675, 878], L: [855, 782], M: [972, 782], L2: [882, 808], N: [912, 905], O: [946, 893],
  };
  // Pieces, back to front: [vertices, gradient, group]
  var PIECES = [
    [['D', 'A', 'P'], 'gw2', 'wing'],
    [['M', 'K', 'L'], 'gt', 'tail'],
    [['O', 'N', 'L2'], 'gd', 'tail'],
    [['C', 'F', 'E'], 'gb', 'body'],
    [['G', 'H', 'F'], 'gh', 'head'],
    [['R', 'H', 'I'], 'gk', 'head'],
    [['D', 'B', 'X'], 'gw2', 'wing'],
    [['X', 'B', 'C'], 'gw', 'wing'],
  ];
  // Where each piece sits in the flat square: centre + two neighbouring rim points
  var CX = 1030, CY = 600, S = 140;
  var rim = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  var SLOT = [[7, 0], [6, 7], [5, 6], [4, 5], [2, 3], [3, 4], [1, 2], [0, 1]];
  var GRADS = {
    gw: ['#f0240c', '#c42a10'], gw2: ['#e8370f', '#b9240c'], gb: ['#bd5a07', '#d6260b'],
    gh: ['#d61f0a', '#e5280d'], gk: ['#c84a08', '#e02a0c'], gt: ['#c25e08', '#d8200a'], gd: ['#a3240c', '#d42a0e'],
  };

  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function rot(p, o, a) { var c = Math.cos(a), s = Math.sin(a), x = p[0] - o[0], y = p[1] - o[1]; return [o[0] + x * c - y * s, o[1] + x * s + y * c]; }

  // The three key shapes of each piece: flat square, folded kite ("bird base"), bird
  function shapes(i) {
    var slot = SLOT[i], tilt = -0.18;
    var sq = [[CX, CY], [CX + rim[slot[0]][0] * S, CY + rim[slot[0]][1] * S], [CX + rim[slot[1]][0] * S, CY + rim[slot[1]][1] * S]]
      .map(function (p) { return rot(p, [CX, CY], tilt); });
    var kite = sq.map(function (p) { var q = rot(p, [CX, CY], Math.PI / 4 - tilt); return [CX + (q[0] - CX) * 0.38, CY + (q[1] - CY) * 1.15]; });
    var bird = PIECES[i][0].map(function (k) { return V[k]; });
    return { sq: sq, kite: kite, bird: bird };
  }

  function build(el) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '640 250 780 700');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var defs = document.createElementNS(NS, 'defs');
    var uid = 'a' + Math.random().toString(36).slice(2, 7);
    Object.keys(GRADS).forEach(function (g) {
      var lg = document.createElementNS(NS, 'linearGradient');
      lg.setAttribute('id', uid + g); lg.setAttribute('x1', '0'); lg.setAttribute('y1', '1'); lg.setAttribute('x2', '1'); lg.setAttribute('y2', '0');
      [0, 1].forEach(function (n) { var st = document.createElementNS(NS, 'stop'); st.setAttribute('offset', String(n)); st.setAttribute('stop-color', GRADS[g][n]); lg.appendChild(st); });
      defs.appendChild(lg);
    });
    var f = document.createElementNS(NS, 'filter');
    f.setAttribute('id', uid + 'sh'); f.setAttribute('x', '-20%'); f.setAttribute('y', '-20%'); f.setAttribute('width', '150%'); f.setAttribute('height', '150%');
    f.innerHTML = '<feDropShadow dx="-14" dy="18" stdDeviation="16" flood-color="#1e2545" flood-opacity=".16"/>';
    defs.appendChild(f);
    svg.appendChild(defs);
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('filter', 'url(#' + uid + 'sh)');
    svg.appendChild(g);
    var polys = PIECES.map(function (p, i) {
      var poly = document.createElementNS(NS, 'polygon');
      poly.setAttribute('fill', 'url(#' + uid + p[1] + ')');
      poly.setAttribute('stroke', 'rgba(120,20,8,.25)');
      poly.setAttribute('stroke-width', '1');
      poly.setAttribute('stroke-linejoin', 'round');
      g.appendChild(poly);
      return { el: poly, s: shapes(i), group: p[2] };
    });
    el.innerHTML = '';
    el.appendChild(svg);
    return polys;
  }

  function start(el) {
    var polys = build(el);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DUR = 2600, t0 = null, playing = false, clock = 0;

    function frame(now) {
      if (t0 === null) t0 = now;
      var t = reduce ? 1 : clamp((now - t0) / DUR);
      clock = now / 1000;
      var state = el.getAttribute('data-state') || 'idle';
      var done = t >= 1;
      // Idle life once the bird is formed
      var amp = { idle: 0.035, listening: 0.02, thinking: 0.05, speaking: 0.09 }[state] || 0.035;
      var speed = { idle: 1.5, listening: 1.2, thinking: 0.8, speaking: 7 }[state] || 1.5;
      var life = reduce ? 0 : ease(clamp((t - 0.85) / 0.15));
      var wingA = -Math.abs(Math.sin(clock * speed)) * amp * 2.2 * life;
      var headA = (state === 'listening' ? -0.12 : state === 'thinking' ? Math.sin(clock * 1.1) * 0.06 : state === 'speaking' ? Math.sin(clock * speed) * 0.035 : 0) * life;
      var bob = Math.sin(clock * 1.4) * 8 * life;

      polys.forEach(function (p, i) {
        // stagger: pieces fold one after another
        var a = clamp((t - 0.08) / 0.32), b = clamp((t - 0.36 - i * 0.025) / 0.5);
        var pts = p.s.sq.map(function (sq, k) {
          var kt = p.s.kite[k], bd = p.s.bird[k];
          var ea = ease(a), eb = ease(b);
          var x1 = lerp(sq[0], kt[0], ea), y1 = lerp(sq[1], kt[1], ea);
          var x = lerp(x1, bd[0], eb), y = lerp(y1, bd[1], eb);
          var q = [x, y];
          if (p.group === 'wing') q = rot(q, V.C, wingA);
          if (p.group === 'head') q = rot(q, V.G, headA);
          return [q[0], q[1] + bob];
        });
        p.el.setAttribute('points', pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '));
      });
      if (!reduce || !done) requestAnimationFrame(frame); else playing = false;
    }

    function play() { t0 = null; if (!playing) { playing = true; requestAnimationFrame(frame); } }
    el.addEventListener('click', function () { if (!reduce) { t0 = null; } });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); setTimeout(play, 250); } }, { threshold: 0.4 });
      io.observe(el);
    } else play();
    // draw the flat square straight away
    polys.forEach(function (p) { p.el.setAttribute('points', p.s.sq.map(function (q) { return q.join(','); }).join(' ')); });
  }

  function init() { document.querySelectorAll('.aidan').forEach(start); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.AidanFold = { start: start };
})();
