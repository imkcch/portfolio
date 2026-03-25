/* ============================================================================
   PORTFOLIO WEBSITE — JAVASCRIPT
   Dark/Light Mode Toggle
   ============================================================================ */

(function () {
  'use strict';

  // Theme constants
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  const THEME_STORAGE_KEY = 'portfolio-theme-preference';

  // Get the HTML element
  const htmlElement = document.documentElement;

  // Initialize theme on page load
  function initializeTheme() {
    // Check localStorage for saved preference
    let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    // If no saved preference, default to dark
    if (!savedTheme) {
      savedTheme = DARK_THEME;
      localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME);
    }

    // Apply the theme
    applyTheme(savedTheme);
  }

  // Apply theme to HTML element
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    updateToggleButton(theme);
  }

  // Get the current theme
  function getCurrentTheme() {
    return htmlElement.getAttribute('data-theme') || DARK_THEME;
  }

  // Toggle between dark and light mode
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    // Apply new theme
    applyTheme(newTheme);

    // Save preference
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }

  // Update the toggle button icon
  function updateToggleButton(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      // Use moon icon for dark mode, sun icon for light mode
      toggleButton.textContent = theme === DARK_THEME ? '☀️' : '🌙';
      toggleButton.setAttribute('aria-label', `Switch to ${theme === DARK_THEME ? 'light' : 'dark'} mode`);
    }
  }

  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-links a');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      // Remove trailing slash and compare
      const isCurrentPage = href === currentPage || (currentPage === '' && href === 'index.html');

      if (isCurrentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Add fade-in animation to main content on load
  function addFadeInAnimation() {
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('fade-in');
    }
  }

  // Event listeners
  function setupEventListeners() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initializeTheme();
      setActiveNavLink();
      addFadeInAnimation();
      setupEventListeners();
    });
  } else {
    // DOM already loaded
    initializeTheme();
    setActiveNavLink();
    addFadeInAnimation();
    setupEventListeners();
  }
})();
