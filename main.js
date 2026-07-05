/**
 * Dreams of Diploma — shared site script
 * Intentionally small: mobile nav toggle, current-page marking,
 * footer year, and a friendly notice for placeholder Google Forms.
 * No frameworks, no build step — this stays a static site.
 */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Mark the current page's nav link for styling + a11y */
  var here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var target = link.getAttribute("href");
    if (target === here) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* Header shadow once the page scrolls */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Subtle scroll-reveal for elements marked .reveal */
  var revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /**
   * Placeholder Google Form links.
   * Every form CTA in this project is marked data-form="placeholder"
   * until real, published Google Form links are ready. Swapping in a
   * real link later just means editing the href on that one button —
   * no other code changes needed anywhere in the site.
   */
  document.querySelectorAll('[data-form="placeholder"]').forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      alert(
        "This form isn't connected yet. Publish your Google Form, then " +
        "replace this button's href with the form link — no other code changes needed."
      );
    });
  });
})();
