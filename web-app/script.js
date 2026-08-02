// Back to top button
(function () {
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 200);
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Clicker version toggle (Build Together page)
(function () {
  var toggle = document.querySelector('.clicker-toggle');
  if (!toggle) return;
  var buttons = Array.from(toggle.querySelectorAll('.toggle-btn'));
  var panels = Array.from(document.querySelectorAll('.toggle-panel'));

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.target;

      buttons.forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.id !== target;
      });
    });
  });
})();

// Hamburger nav toggle
(function () {
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      hamburger.classList.toggle('is-open', isOpen);
    });
  }
})();

// Active page highlight
(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === '') path = 'index.html';
  var links = document.querySelectorAll('.nav-links a, .nav-mobile a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
})();

// Returns current camp day info
// { status: 'before' | 'during' | 'after', day: 1-5, theme: string }
function getCampDay() {
  var now = new Date();
  var y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
  var themes = [
    'Web Foundations + JavaScript Makes Things Happen',
    'Games Need Decisions',
    'Movement + Randomness',
    'Build Day',
    'Pizzazz + Showcase'
  ];
  // Before Aug 3, 2026
  if (y < 2026 || (y === 2026 && (m < 7 || (m === 7 && d < 3)))) {
    return { status: 'before' };
  }
  // After Aug 7, 2026
  if (y > 2026 || (y === 2026 && (m > 7 || (m === 7 && d > 7)))) {
    return { status: 'after' };
  }
  var dayNum = d - 2; // Aug 3 → Day 1
  return { status: 'during', day: dayNum, theme: themes[dayNum - 1] };
}

// Content-swap page nav — shows one .page-section at a time, no scroll required
(function () {
  var pageNav = document.querySelector('.page-nav');
  if (!pageNav) return;
  var navLinks = Array.from(pageNav.querySelectorAll('a[href^="#"]'));
  if (!navLinks.length) return;

  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  // Only games.html has a "Get Started" tab whose content the shared
  // page-header (title + byline) actually describes — hide that header
  // on the other tabs, where each section has its own title instead.
  var hasGetStarted = sections.some(function (section) {
    return section.id === 'get-started';
  });
  var pageHeader = hasGetStarted ? document.querySelector('.page-header') : null;

  function showSection(targetId) {
    sections.forEach(function (section) {
      section.style.display = section.id === targetId ? '' : 'none';
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + targetId);
    });
    if (pageHeader) {
      pageHeader.style.display = targetId === 'get-started' ? '' : 'none';
    }
    window.scrollTo(0, 0);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.getAttribute('href').slice(1);
      history.pushState(null, '', '#' + id);
      showSection(id);
      link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  window.addEventListener('popstate', function () {
    var id = window.location.hash.slice(1) || (sections[0] && sections[0].id);
    if (id) showSection(id);
  });

  var initial = window.location.hash.slice(1) || (sections[0] && sections[0].id);
  if (initial) showSection(initial);
})();
