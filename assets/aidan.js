/* Aidan, the SEBROBIN AI origami robin.
   <div class="aidan" data-state="idle"></div>   states: idle · listening · thinking · speaking
   A square of red paper folds into Aidan, who flaps and hops. Click him to hop again.
   Visitors who prefer reduced motion see Aidan standing still. */
(function () {
  var BASE = (window.AIDAN_BASE || '/assets/aidan/');
  var FRAMES = 9, STEP = 230;
  var css = '\
.aidan{position:relative;width:100%;max-width:360px;margin:0 auto;aspect-ratio:695/637;cursor:pointer;-webkit-tap-highlight-color:transparent}\
.aidan img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;user-select:none;-webkit-user-drag:none;pointer-events:none}\
.ad-shadow{position:absolute;left:28%;right:22%;bottom:-1%;height:7%;border-radius:50%;background:radial-gradient(closest-side,rgba(30,37,69,.22),rgba(30,37,69,0));transform-origin:50% 50%}\
.ad-fold img{opacity:0;transition:opacity .2s linear}.ad-fold img.on{opacity:1}\
.ad-bird{position:absolute;inset:0;transform-origin:50% 99%;opacity:0}\
.aidan.ready .ad-bird{opacity:1}.aidan.ready .ad-fold{display:none}\
.ad-wing{transform-origin:47.5% 31%}\
.aidan.hop .ad-bird{animation:ad-hop 1.25s cubic-bezier(.3,.6,.4,1) 1}\
.aidan.hop .ad-wing{animation:ad-flap .3s ease-in-out 4}\
.aidan.hop .ad-shadow{animation:ad-shadow 1.25s cubic-bezier(.3,.6,.4,1) 1}\
.aidan.ready:not(.hop)[data-state=idle] .ad-bird{animation:ad-breathe 4s ease-in-out infinite}\
.aidan.ready:not(.hop)[data-state=listening] .ad-bird{transform:rotate(-4deg);transition:transform .4s}\
.aidan.ready:not(.hop)[data-state=thinking] .ad-bird{animation:ad-sway 2.6s ease-in-out infinite}\
.aidan.ready:not(.hop)[data-state=speaking] .ad-bird{animation:ad-talk .5s ease-in-out infinite}\
.aidan.ready:not(.hop)[data-state=speaking] .ad-wing{animation:ad-flap-small .5s ease-in-out infinite}\
@keyframes ad-hop{0%{transform:none}12%{transform:scale(1.05,.9)}30%{transform:translateY(-15%) scale(.97,1.05)}48%{transform:translateY(-18%) rotate(-2deg)}70%{transform:translateY(0) scale(1.05,.92)}82%{transform:scale(.98,1.03)}100%{transform:none}}\
@keyframes ad-flap{0%,100%{transform:rotate(0)}50%{transform:rotate(38deg)}}\
@keyframes ad-flap-small{0%,100%{transform:rotate(0)}50%{transform:rotate(12deg)}}\
@keyframes ad-shadow{0%,100%{transform:scale(1);opacity:1}12%{transform:scale(1.08)}48%{transform:scale(.6);opacity:.5}70%{transform:scale(1.1);opacity:1}}\
@keyframes ad-breathe{0%,100%{transform:none}50%{transform:scale(1.012,1.018)}}\
@keyframes ad-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}\
@keyframes ad-talk{0%,100%{transform:none}50%{transform:translateY(-1.2%)}}\
@media (prefers-reduced-motion:reduce){.aidan *{animation:none!important;transition:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function img(src) { var i = new Image(); i.src = BASE + src; i.alt = ''; i.decoding = 'async'; return i; }

  function start(el) {
    if (el.__aidan) return; el.__aidan = true;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.innerHTML = '';
    el.setAttribute('role', 'img');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Aidan');
    var shadow = document.createElement('div'); shadow.className = 'ad-shadow';
    var fold = document.createElement('div'); fold.className = 'ad-fold';
    var frames = [];
    for (var n = 0; n < FRAMES; n++) { var f = img('fold-' + n + '.webp'); frames.push(f); fold.appendChild(f); }
    var bird = document.createElement('div'); bird.className = 'ad-bird';
    var body = img('aidan-body.webp'), wing = img('aidan-wing.webp'); wing.className = 'ad-wing';
    bird.appendChild(body); bird.appendChild(wing);
    el.appendChild(shadow); el.appendChild(fold); el.appendChild(bird);

    function hop() {
      if (reduce) return;
      el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop');
    }
    bird.addEventListener('animationend', function (e) { if (e.animationName === 'ad-hop') el.classList.remove('hop'); });
    el.addEventListener('click', function () { if (el.classList.contains('ready')) hop(); });
    el.aidanHop = hop;

    if (reduce) { el.classList.add('ready'); return; }
    frames[0].classList.add('on');
    function playFold() {
      var i = 0;
      var t = setInterval(function () {
        frames[i].classList.remove('on'); i++;
        if (i >= FRAMES) { clearInterval(t); el.classList.add('ready'); setTimeout(hop, 120); return; }
        frames[i].classList.add('on');
      }, STEP);
    }
    var all = frames.concat([body, wing]);
    var loaded = Promise.all(all.map(function (im) { return im.decode ? im.decode().catch(function () {}) : Promise.resolve(); }));
    function go() { loaded.then(function () { setTimeout(playFold, 300); }); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.35 });
      io.observe(el);
    } else go();
  }

  function init() { document.querySelectorAll('.aidan').forEach(start); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.Aidan = { start: start };
})();
