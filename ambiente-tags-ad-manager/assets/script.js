var CODE_NAME_PLACEHOLDER = '{{CODE_NAME}}';
var MCM_CODE_PLACEHOLDER = '{{MCM_CODE}}';
var PAGE_URL_PLACEHOLDER = '{{PAGE_URL}}';

// ── MCM code live update ──────────────────────────────
function updateMCMCode(value) {
  var trimmed = value.trim();
  var display = trimmed || MCM_CODE_PLACEHOLDER;
  document.querySelectorAll('.mcm-network-val').forEach(function (el) {
    el.textContent = display;
    el.classList.toggle('mcm-code-filled', !!trimmed);
  });
}

// ── Code name live update ─────────────────────────────
function updateCodeName(value) {
  var display = value.trim() || CODE_NAME_PLACEHOLDER;
  document.querySelectorAll('.code-name-val').forEach(function (el) {
    el.textContent = display;
    el.classList.toggle('code-name-filled', !!value.trim());
  });
}

// ── Page URL live update ──────────────────────────────
function updatePageUrl(value) {
  var display = value.trim() || PAGE_URL_PLACEHOLDER;
  document.querySelectorAll('.page-url-val').forEach(function (el) {
    el.textContent = display;
    el.classList.toggle('page-url-filled', !!value.trim());
  });
}

// ── Main head/body tab switcher ───────────────────────
function switchMainTab(name, btn) {
  // update tab buttons
  document.querySelectorAll('#block-head .gd-code-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  btn.classList.add('active');
  // show correct panel
  document.querySelectorAll('#block-head .gd-tab-panel').forEach(function (p) {
    p.classList.remove('active');
  });
  document.getElementById('panel-' + name + '-content').classList.add('active');
}

// ── Copy active panel ─────────────────────────────────
function copyActivePanel(btn) {
  var activePanel = document.querySelector('#block-head .gd-tab-panel.active pre');
  if (!activePanel) return;
  navigator.clipboard.writeText(activePanel.innerText).then(function () {
    var originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copiado!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.innerHTML = originalHTML;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ── Copy code block ───────────────────────────────────
function copyBlock(blockId, btn) {
  var pre = document.querySelector('#' + blockId + ' pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(function () {
    var originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copiado!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.innerHTML = originalHTML;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ── Active sidenav on scroll ──────────────────────────
(function () {
  var sections = document.querySelectorAll('section[id], h3[id]');
  var navLinks = document.querySelectorAll('.gd-sidenav__link');

  function onScroll() {
    var scrollY = window.scrollY + 80;
    var current = '';
    sections.forEach(function (s) {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
