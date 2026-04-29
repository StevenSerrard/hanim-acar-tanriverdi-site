const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const backToTop = document.getElementById("backToTop");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function handleScroll() {
  const scrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("show", window.scrollY > 520);
}

window.addEventListener("scroll", handleScroll);
handleScroll();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  revealObserver.observe(el);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => activeObserver.observe(section));

form.addEventListener("submit", (event) => {
  const action = form.getAttribute("action") || "";
  if (action.includes("REPLACE_WITH_YOUR_FORM_ID")) {
    event.preventDefault();
    formStatus.textContent = "Formun çalışması için Formspree form ID alanını güncellemeniz gerekiyor.";
    return;
  }

  formStatus.textContent = "Mesajınız gönderiliyor...";
  setTimeout(() => {
  formStatus.textContent = "Mesajınız başarıyla gönderildi.";
  form.reset();
}, 1500);
});
