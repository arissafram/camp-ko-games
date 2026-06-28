// Hamburger nav toggle
(function () {
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
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

// Anchor scroll handler — updates .page-nav active link on scroll
(function () {
  var pageNav = document.querySelector('.page-nav');
  if (!pageNav) return;
  var navLinks = Array.from(pageNav.querySelectorAll('a[href^="#"]'));
  if (!navLinks.length) return;

  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function updateActive() {
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 120) current = section;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
    if (current) history.replaceState(null, '', '#' + current.id);
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
