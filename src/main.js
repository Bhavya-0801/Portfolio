/**
 * BHAVYA — PORTFOLIO CLIENT LOGIC
 * High-performance, clean vanilla JS with zero external runtime dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initCopyEmail();
  initProjectFilters();
  initScrollSpy();
  initMobileNav();
  initContactForm();
});

/**
 * 1. Live Indian Standard Time (IST) Clock
 */
function initClock() {
  const clockEl = document.getElementById('ist-clock');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      // Formatter for New Delhi / Asia/Kolkata
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.textContent = `${timeString} IST`;
    } catch {
      clockEl.textContent = 'GMT+5:30 (New Delhi)';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * 2. Copy Email to Clipboard with tactile toast feedback
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toastEl = document.getElementById('copy-toast');
  const emailText = 'bhavyajindal830@gmail.com';

  if (!copyBtn || !toastEl) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✓ Copied</span>';
      toastEl.classList.add('visible');

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        toastEl.classList.remove('visible');
      }, 3000);
    } catch (err) {
      // Fallback for clipboard
      const textArea = document.createElement('textarea');
      textArea.value = emailText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      copyBtn.innerHTML = '<span>✓ Copied</span>';
      toastEl.classList.add('visible');
      setTimeout(() => {
        copyBtn.innerHTML = '<span>Copy Address</span>';
        toastEl.classList.remove('visible');
      }, 3000);
    }
  });
}

/**
 * 3. Project Filter Tabs
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectArticles = document.querySelectorAll('.project-article');

  if (!filterBtns.length || !projectArticles.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectArticles.forEach(article => {
        const articleCategories = article.getAttribute('data-category') || '';
        if (filterCategory === 'all' || articleCategories.includes(filterCategory)) {
          article.style.display = 'grid';
          article.style.opacity = '1';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 4. Scroll Spy to highlight active nav link
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * 5. Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 6. Contact Form — sends directly to bhavyajindal830@gmail.com via Web3Forms
 */
const WEB3FORMS_KEY = 'b71eef2f-3372-4b6a-b440-5973caaa6494';

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const topic = form.querySelector('#topic')?.value;
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in your name, email, and message.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending…</span><span class="btn-icon" aria-hidden="true">↻</span>';
    statusMsg.className = 'form-status-message';
    statusMsg.textContent = '';

    // If key hasn't been set yet
    if (!WEB3FORMS_KEY) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
      showStatus('⚠️ Form not configured. Please contact directly via email.', 'error');
      return;
    }

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        name,
        email,
        subject: `Portfolio Contact — ${topic || 'General'} from ${name}`,
        message,
        from_name: 'Bhavya Portfolio',
        botcheck: '',        // honeypot field
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        form.reset();
        showStatus(`✓ Message sent, ${name}! I'll get back to you soon.`, 'success');
      } else {
        showStatus('Something went wrong. Please email me directly at bhavyajindal830@gmail.com', 'error');
      }
    } catch {
      showStatus('Network error. Please email me directly at bhavyajindal830@gmail.com', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  });

  function showStatus(text, type) {
    statusMsg.textContent = text;
    statusMsg.className = `form-status-message ${type}`;
    if (type === 'success') {
      setTimeout(() => {
        statusMsg.className = 'form-status-message';
        statusMsg.textContent = '';
      }, 8000);
    }
  }
}
