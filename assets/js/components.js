(function () {
  'use strict';

  var page = window.location.pathname.split('/').pop() || 'index.html';
  var isIndex = page === 'index.html' || page === '';

  // ── Kontakt-Link: auf Seiten ohne #kontakt-Sektion zur Startseite verlinken
  var hasKontakt = !!document.getElementById('kontakt');
  var kontaktHref = hasKontakt ? '#kontakt' : 'index.html#kontakt';

  function active(href) {
    return href === page ? ' class="active"' : '';
  }

  // ── Navbar HTML
  var navHTML =
    '<nav id="navbar">' +
      '<div class="nav-inner">' +
        '<a href="' + (isIndex ? '#hero' : 'index.html') + '" class="nav-logo">' +
          '<div class="nav-logo-mark">MA</div>' +
          '<div class="nav-logo-text">' +
            '<span class="nav-logo-name">Marie Altmann</span>' +
            '<span class="nav-logo-sub">SAP Consultant</span>' +
          '</div>' +
        '</a>' +
        '<ul class="nav-links">' +
          '<li><a href="ueber-mich.html"' + active('ueber-mich.html') + '>Über mich</a></li>' +
          '<li><a href="leistungen.html"' + active('leistungen.html') + '>Leistungen</a></li>' +
          '<li><a href="einsatzbereiche.html"' + active('einsatzbereiche.html') + '>Einsatzbereiche</a></li>' +
          '<li><a href="projekte.html"' + active('projekte.html') + '>Projekte</a></li>' +
        '</ul>' +
        '<a href="' + kontaktHref + '" class="nav-cta">Jetzt kontaktieren&nbsp;<span class="sdg-arrow">></span></a>' +
        '<button class="hamburger" id="hamburger" aria-label="Menü öffnen"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</nav>' +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<a href="ueber-mich.html"' + active('ueber-mich.html') + '>Über mich</a>' +
      '<a href="leistungen.html"' + active('leistungen.html') + '>Leistungen</a>' +
      '<a href="einsatzbereiche.html"' + active('einsatzbereiche.html') + '>Einsatzbereiche</a>' +
      '<a href="projekte.html"' + active('projekte.html') + '>Projekte</a>' +
      '<a href="' + kontaktHref + '" class="nav-cta">Jetzt kontaktieren</a>' +
    '</div>';

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // ── Footer HTML
  var footerHTML =
    '<footer>' +
      '<div class="hero-grid"></div>' +
      '<div class="hero-orb" style="right:-15%;left:auto;transform:none;bottom:-95%;width:900px;height:900px;"></div>' +
      '<div class="container">' +
        '<div class="footer-main">' +
          '<div>' +
            '<div class="footer-brand">' +
              '<div class="footer-brand-mark">MA</div>' +
              '<span class="footer-brand-name">Marie Altmann · Me-One-Consulting</span>' +
            '</div>' +
            '<p class="footer-tagline">Senior SAP Consultant – Berechtigungsmanagement, IDM/IAM, GRC und S/4HANA Security. Präzise. Verlässlich. Erfahren.</p>' +
            '<a href="' + kontaktHref + '" class="nav-cta" style="align-self:flex-start;">Jetzt kontaktieren&nbsp;<span class="sdg-arrow">></span></a>' +
          '</div>' +
          '<div class="footer-nav" style="display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end;gap:.35rem;">' +
            '<a href="ueber-mich.html" class="footer-nav-link">Über mich <span class="footer-nav-arrow">></span></a>' +
            '<a href="leistungen.html" class="footer-nav-link">Leistungen <span class="footer-nav-arrow">></span></a>' +
            '<a href="einsatzbereiche.html" class="footer-nav-link">Einsatzbereiche <span class="footer-nav-arrow">></span></a>' +
            '<a href="projekte.html" class="footer-nav-link">Projekte <span class="footer-nav-arrow">></span></a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span class="footer-copy">© 2026 Marie Altmann · Me-One-Consulting</span>' +
          '<ul class="footer-legal">' +
            '<li><a href="impressum.html">Impressum</a></li>' +
            '<li><a href="datenschutz.html">Datenschutz</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // Vorhandenen Footer ersetzen, sonst ans Ende anfügen
  var existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // ── Navbar scroll-Effekt
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Hamburger-Menü
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    navbar.classList.toggle('menu-open');
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      navbar.classList.remove('menu-open');
    });
  });

  // ── Fade-in Observer
  var fadeEls = document.querySelectorAll('.fade-in');
  var fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(function (el) { fadeObs.observe(el); });

  // ── Kontaktformular (falls vorhanden)
  var form = document.getElementById('contact-form');
  if (form) {
    var successDiv = document.getElementById('form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = form.name.value.trim();
      var email   = form.email.value.trim();
      var betreff = form.betreff.value.trim();
      var message = form.message.value.trim();
      var privacy = form.datenschutz && form.datenschutz.checked;
      if (!name || !email || !betreff || !message || !privacy) {
        alert('Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie der Datenschutzerklärung zu.');
        return;
      }
      var subject = encodeURIComponent(betreff || 'Anfrage über die Website');
      var body    = encodeURIComponent('Name: ' + name + '\nE-Mail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:Me-One-Consulting@outlook.de?subject=' + subject + '&body=' + body;
      form.style.display = 'none';
      if (successDiv) successDiv.style.display = 'block';
    });
  }

  // ── Hero-Grid-Muster (für footer .hero-grid und Sektions-Grids)
  (function () {
    var W = 56, H = 56, OX = 30, OY = -10, cols = 6, rows = 8;
    var xStart = 4, xSpan = 40, yStart = 1, ySpan = 36;
    var cw = xSpan / cols, rh = ySpan / rows;
    document.querySelectorAll('.hero-grid').forEach(function (gridEl) {
      if (gridEl.dataset.injected) return;
      gridEl.dataset.injected = '1';
      var pid = 'hgp' + Math.random().toString(36).slice(2, 8);
      var squares = [];
      for (var r = 0; r < rows; r++)
        for (var c = 0; c < cols; c++)
          squares.push([Math.floor(xStart + c * cw + Math.random() * cw), Math.floor(yStart + r * rh + Math.random() * rh)]);
      var rects = squares.map(function (s) {
        return '<rect width="' + (W + 1) + '" height="' + (H + 1) + '" x="' + (s[0] * W) + '" y="' + (s[1] * H) + '" stroke-width="0"/>';
      }).join('');
      gridEl.insertAdjacentHTML('beforeend',
        '<svg aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible;mix-blend-mode:multiply;fill:rgba(37,99,235,.07);stroke:none">' +
        '<defs><pattern id="' + pid + '" width="' + W + '" height="' + H + '" patternUnits="userSpaceOnUse" x="' + OX + '" y="' + OY + '">' +
        '<path d="M.5 ' + H + 'V.5H' + W + '" fill="none" stroke="rgba(0,0,0,.05)" stroke-width="1"/>' +
        '</pattern></defs>' +
        '<rect width="100%" height="100%" fill="url(#' + pid + ')" stroke-width="0"/>' +
        '<svg x="' + OX + '" y="' + OY + '" overflow="visible">' + rects + '</svg></svg>');
    });
  })();

  // ── Kontakt-, Formular- & Profilkarten Grid-Muster
  (function () {
    var W = 32, H = 32, OX = 30, OY = -10;
    function inject(card, fn) {
      var pid = 'gp' + Math.random().toString(36).slice(2, 8);
      var isCategoryHeader = card.classList.contains('category-header');
      var sq = Array.from({ length: isCategoryHeader ? Math.floor(Math.random() * 5) + 10 : Math.floor(Math.random() * 4) + 6 }, function () {
        if (isCategoryHeader) {
          return [Math.floor(Math.random() * 12) + 2, Math.floor(Math.random() * 5)];
        }
        return [Math.floor(Math.random() * 6) + 4, Math.floor(Math.random() * 5) + 1];
      });
      var rects = sq.map(function (s) {
        return '<rect width="' + (W + 1) + '" height="' + (H + 1) + '" x="' + (s[0] * W) + '" y="' + (s[1] * H) + '" stroke-width="0"/>';
      }).join('');
      fn('<svg aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible;mix-blend-mode:multiply;fill:rgba(37,99,235,.07);stroke:none">' +
        '<defs><pattern id="' + pid + '" width="' + W + '" height="' + H + '" patternUnits="userSpaceOnUse" x="' + OX + '" y="' + OY + '">' +
        '<path d="M.5 ' + H + 'V.5H' + W + '" fill="none" stroke="rgba(0,0,0,.06)" stroke-width="1"/>' +
        '</pattern></defs>' +
        '<rect width="100%" height="100%" fill="url(#' + pid + ')" stroke-width="0"/>' +
        '<svg x="' + OX + '" y="' + OY + '" overflow="visible">' + rects + '</svg></svg>');
    }
    var cardSelector = '.contact-form, .contact-box, .profil-card-main, .profil-card-side, .service-block, .usp-card, .eb-card, .category-header, .projekt-card';
    if (!isIndex) cardSelector += ', .timeline-card, .branchen-card';
    document.querySelectorAll(cardSelector).forEach(function (card) {
      if (card.dataset.injected) return;
      card.dataset.injected = '1';
      var bg = card.querySelector('.sdg-bg') || document.createElement('div');
      bg.className = 'sdg-bg';
      var bi = bg.querySelector('.sdg-bg-inner') || document.createElement('div');
      bi.className = 'sdg-bg-inner';
      if (!bi.parentElement) bg.appendChild(bi);
      if (!bg.parentElement) card.insertBefore(bg, card.firstChild);
      inject(card, function (svg) { bi.insertAdjacentHTML('afterend', svg); });
    });
  })();

  // ── Mobile tap state for branch cards
  (function () {
    var cards = Array.from(document.querySelectorAll('#branchen .branchen-card, .arbeitsweise-section .branchen-card'));
    if (!cards.length) return;
    var mobileQuery = window.matchMedia('(max-width: 768px)');

    function clear() {
      cards.forEach(function (card) { card.classList.remove('is-active'); });
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (!mobileQuery.matches) return;
        clear();
        card.classList.add('is-active');
      });
    });

    mobileQuery.addEventListener('change', function (event) {
      if (!event.matches) clear();
    });
  })();

  // ── Mobile tap state for profile cards
  (function () {
    var cards = Array.from(document.querySelectorAll('.profil-card-main, .profil-card-side'));
    if (!cards.length) return;
    var mobileQuery = window.matchMedia('(max-width: 768px)');

    function clear() {
      cards.forEach(function (card) { card.classList.remove('is-active'); });
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (!mobileQuery.matches) return;
        clear();
        card.classList.add('is-active');
      });
    });

    mobileQuery.addEventListener('change', function (event) {
      if (!event.matches) clear();
    });
  })();

  // ── Mobile manual dropdowns for profile focus timeline
  (function () {
    if (page !== 'ueber-mich.html') return;
    var items = Array.from(document.querySelectorAll('.timeline-item'));
    if (!items.length) return;
    var mobileQuery = window.matchMedia('(max-width: 768px)');

    function closeAll(except) {
      items.forEach(function (item) {
        if (item !== except) item.classList.remove('is-open');
      });
    }

    items.forEach(function (item) {
      var trigger = item.querySelector('.timeline-meta');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        if (!mobileQuery.matches) return;
        var willOpen = !item.classList.contains('is-open');
        closeAll(item);
        item.classList.toggle('is-open', willOpen);
      });
    });

    mobileQuery.addEventListener('change', function (event) {
      if (!event.matches) closeAll();
    });
  })();

  // ── Timeline scroll effect
  (function () {
    if (isIndex) return;
    var items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    var sentinels = document.querySelectorAll('.timeline-sentinel');
    var activeIndex = 0;
    items[0].classList.add('active');

    function tick() {
      var centerY = window.innerHeight / 3;
      var bestIndex = 0;
      var bestDist = Infinity;
      sentinels.forEach(function (node, i) {
        var rect = node.getBoundingClientRect();
        var dist = Math.abs(rect.top - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) {
        items[activeIndex].classList.remove('active');
        activeIndex = bestIndex;
        items[activeIndex].classList.add('active');
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

})();
