/* ============================================
   REDBOX OFFICIAL STORE - JavaScript
   Premium Fashion Kids & Teens - Blog Style
   Vanilla JS - No Dependencies - v2
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // PRELOADER
  // ============================================
  var preloader = document.getElementById('preloader');

  function hidePreloader() {
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(function () {
        preloader.style.display = 'none';
      }, 700);
    }
    document.body.classList.add('loaded');
  }

  // Hide preloader when page is fully loaded
  window.addEventListener('load', function () {
    setTimeout(hidePreloader, 800);
  });

  // Fallback: hide preloader after 3 seconds regardless
  setTimeout(function () {
    if (preloader && preloader.style.display !== 'none') {
      hidePreloader();
    }
  }, 3000);

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  var header = document.getElementById('mainHeader');
  var lastScrollY = 0;
  var ticking = false;

  function updateHeader() {
    var scrollY = window.scrollY;

    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  updateHeader();

  // ============================================
  // MOBILE MENU
  // ============================================
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var isMenuOpen = false;

  window.toggleMobileMenu = function () {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mobileMenu.classList.add('active');
      mobileMenuBtn.querySelector('.hamburger-icon').classList.add('hamburger-active');
      document.body.classList.add('no-scroll');
    } else {
      closeMobileMenu();
    }
  };

  window.closeMobileMenu = function () {
    isMenuOpen = false;
    mobileMenu.classList.remove('active');
    mobileMenuBtn.querySelector('.hamburger-icon').classList.remove('hamburger-active');
    document.body.classList.remove('no-scroll');
  };

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (isMenuOpen) {
        closeMobileMenu();
      }
      if (document.getElementById('sizeGuideModal').classList.contains('active')) {
        closeSizeGuide();
      }
    }
  });

  // Close menu on window resize (if desktop)
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && isMenuOpen) {
      closeMobileMenu();
    }
  });

  // ============================================
  // SIZE GUIDE MODAL
  // ============================================
  var sizeGuideModal = document.getElementById('sizeGuideModal');

  window.openSizeGuide = function () {
    sizeGuideModal.classList.add('active');
    sizeGuideModal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  };

  window.closeSizeGuide = function () {
    sizeGuideModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    setTimeout(function () {
      if (!sizeGuideModal.classList.contains('active')) {
        sizeGuideModal.classList.add('hidden');
      }
    }, 300);
  };

  // ============================================
  // SIZE GUIDE TABS - handled by inline switchCat() in HTML
  // ============================================
  // The new size guide uses inline onclick="switchCat(this, catId)" 
  // function defined in the HTML. No JS IIFE tab logic needed.

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  var backToTopBtn = document.getElementById('backToTopBtn');

  window.scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  function updateBackToTop() {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateBackToTop);
  }, { passive: true });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // INTERSECTION OBSERVER - Premium Fade In
  // ============================================
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for fade-in effect (skip hero - it's always visible)
  document.querySelectorAll('section:not(#home)').forEach(function (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
  });

  // Make hero section visible immediately
  var heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
  }

  // Observe category cards for staggered fade-in
  document.querySelectorAll('.category-card').forEach(function (card, index) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.1) + 's, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.1) + 's';

    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    cardObserver.observe(card);
  });

  // Observe lookbook cards for staggered fade-in (category editorial cards)
  document.querySelectorAll('.lookbook-card').forEach(function (card, index) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.15) + 's, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.15) + 's';

    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    cardObserver.observe(card);
  });

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // ============================================
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('text-redbox-600');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('text-redbox-600');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateActiveNav);
  }, { passive: true });

  // ============================================
  // UTILITY: Prevent body scroll on iOS when modal open
  // ============================================
  document.addEventListener('touchmove', function (e) {
    if (document.body.classList.contains('no-scroll')) {
      var sizeGuideContent = sizeGuideModal.querySelector('.relative.bg-white');
      if (sizeGuideContent && !sizeGuideContent.contains(e.target)) {
        e.preventDefault();
      }
    }
  }, { passive: false });

})();
