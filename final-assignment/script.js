// script.js — Unified JavaScript
// Merges: navbar.js (navbar toggle + active link),
//         script.js (form validation — Person 5),
//         behaviour.js (fade-in animations — Person 3)

// ── 1. Navbar mobile toggle ───────────────────────────────────
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── 2. Active nav link on scroll ─────────────────────────────
const sections = document.querySelectorAll('main section[id]');
const links    = document.querySelectorAll('.navbar__link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

// ── 3. Fade-in animations — from behaviour.js ─────────────────
// Original behaviour.js targeted .about and .card classes.
// Updated to target the renamed classes used in the merged HTML.

document.addEventListener("DOMContentLoaded", () => {

  // Fade in the about section text
  const aboutEl = document.querySelector(".about-section .about-animate");
  if (aboutEl) {
    aboutEl.style.opacity = "0";
    aboutEl.style.transform = "translateY(20px)";
    setTimeout(() => {
      aboutEl.style.transition = "all 0.6s ease";
      aboutEl.style.opacity = "1";
      aboutEl.style.transform = "translateY(0)";
    }, 200);
  }

  // Staggered fade-in for education cards (.edu__card)
  // Original targeted .card — renamed to avoid clash with contact cards
  const eduCards = document.querySelectorAll(".edu__card");
  eduCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 200 + index * 200);
  });

});

// ── 4. Form validation — from script.js (Person 5) ────────────
// Kept Person 5's full validation logic (name regex, email regex,
// subject length, message length). Added Cancel button handler.

const form      = document.getElementById("contactForm");
const formMsg   = document.getElementById("form-msg");
const cancelBtn = document.getElementById("cancel-btn");

function showError(input, message) {
  let errorEl = input.nextElementSibling;
  if (!errorEl || errorEl.tagName !== "SMALL") {
    errorEl = document.createElement("small");
    input.after(errorEl);
  }
  errorEl.textContent = message;
  input.style.border = "1px solid red";
}

function showSuccess(input) {
  let error = input.nextElementSibling;
  if (error && error.tagName === "SMALL") {
    error.textContent = "";
  }
  input.style.border = "1px solid green";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const firstName = document.getElementById("first-name");
  const lastName  = document.getElementById("last-name");
  const email     = document.getElementById("email");
  const subject   = document.getElementById("subject");
  const message   = document.getElementById("message");

  const fName = firstName.value.trim();
  const lName = lastName.value.trim();
  const mail  = email.value.trim();
  const sub   = subject.value.trim();
  const msg   = message.value.trim();

  // Name validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  if (!nameRegex.test(fName)) {
    showError(firstName, "First name must be at least 2 letters and contain only letters");
    isValid = false;
  } else { showSuccess(firstName); }

  if (!nameRegex.test(lName)) {
    showError(lastName, "Last name must be at least 2 letters and contain only letters");
    isValid = false;
  } else { showSuccess(lastName); }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(mail)) {
    showError(email, "Enter a valid email address");
    isValid = false;
  } else if (mail.includes("test@") || mail.includes("example.com")) {
    showError(email, "Please use a real email address");
    isValid = false;
  } else { showSuccess(email); }

  // Subject validation
  if (sub.length < 5) {
    showError(subject, "Subject must be at least 5 characters");
    isValid = false;
  } else if (/^\d+$/.test(sub)) {
    showError(subject, "Subject cannot be only numbers");
    isValid = false;
  } else { showSuccess(subject); }

  // Message validation
  if (msg.length < 20) {
    showError(message, "Message must be at least 20 characters long");
    isValid = false;
  } else { showSuccess(message); }

  // Final result
  if (isValid) {
    if (formMsg) {
      formMsg.textContent = `Thanks ${fName}, your message has been sent!`;
      formMsg.className = "form__feedback success";
    }
    form.reset();
  } else {
    if (formMsg) {
      formMsg.textContent = "Please fix the errors above and try again.";
      formMsg.className = "form__feedback error";
    }
  }
});

// Cancel — clears form and resets all validation states
cancelBtn.addEventListener("click", () => {
  form.reset();
  if (formMsg) {
    formMsg.textContent = "";
    formMsg.className = "form__feedback";
  }
  form.querySelectorAll("input, textarea").forEach(el => {
    el.style.border = "";
    const err = el.nextElementSibling;
    if (err && err.tagName === "SMALL") err.textContent = "";
  });
});


// ======================5=========================
//  DARK/ LIGHT MODE TOGGLE
// =================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const body        = document.body;
 
// Check if the user has a saved theme preference from a previous visit
const savedTheme = localStorage.getItem('theme') || 'light';
 
// Apply the saved theme immediately when the page loads
applyTheme(savedTheme);
 
// When the toggle button is clicked, switch to the opposite theme
themeToggle.addEventListener('click', () => {
  // Read the current theme and flip it
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
 
  // Apply the new theme and save it for next time
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
 
// Helper function — sets the theme and updates the button icon
function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
 
  if (theme === 'dark') {
    // Show a sun icon in dark mode (clicking it will switch to light)
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    // Show a moon icon in light mode (clicking it will switch to dark)
    themeIcon.className = 'fa-solid fa-moon';
  }
}