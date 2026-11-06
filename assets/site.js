// SEBROBIN AI — site behaviour (menu + call-request form)
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav-wrap');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('call-form');
  if (!form) return;
  var msg = document.getElementById('form-msg');
  var submit = form.querySelector('button[type="submit"]');
  var T = JSON.parse(form.getAttribute('data-i18n'));
  var started = Date.now();

  function show(text) { msg.textContent = text; msg.hidden = false; msg.focus(); }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    msg.hidden = true;
    var d = Object.fromEntries(new FormData(form).entries());
    Object.keys(d).forEach(function (k) { if (typeof d[k] === 'string') d[k] = d[k].trim(); });

    if (!d.first_name || !d.last_name || !d.email || !d.company || !d.consent) return show(T.errRequired);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) return show(T.errEmail);

    d.consent = true;
    d.site_language = document.documentElement.lang;
    d.elapsed_ms = Date.now() - started;

    submit.disabled = true;
    var label = submit.textContent;
    submit.textContent = T.sending;
    try {
      var r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      var done = document.createElement('div');
      done.className = 'form-done';
      done.setAttribute('role', 'status');
      done.setAttribute('tabindex', '-1');
      var p = document.createElement('p');
      p.textContent = T.success;
      done.appendChild(p);
      form.replaceWith(done);
      done.focus();
    } catch (err) {
      submit.disabled = false;
      submit.textContent = label;
      show(T.errNetwork + ' sr@sebrobin.com');
    }
  });
})();
