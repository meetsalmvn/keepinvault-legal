document.addEventListener("DOMContentLoaded", () => {
  buildTableOfContents();
  initScrollSpy();
  initTheme();
  markActiveNavLink();
});

/**
 * Builds the sidebar and mobile dropdown navigation directly from the
 * .legal-section elements already on the page, so the headings and the
 * table of contents can never drift out of sync with each other.
 */
function buildTableOfContents() {
  const sidebarList = document.getElementById("sidebar-toc-list");
  const mobileDropdown = document.getElementById("mobile-dropdown");
  if (!sidebarList || !mobileDropdown) return; // index.html has no TOC

  sidebarList.innerHTML = "";
  mobileDropdown.innerHTML = "";

  const sections = document.querySelectorAll(".content-wrapper > .legal-section");

  sections.forEach((section, index) => {
    const heading = section.querySelector("h3");
    if (!heading) return;
    const id = section.id;
    const title = heading.textContent;

    const li = document.createElement("li");
    li.className = "toc-item" + (index === 0 ? " active" : "");
    li.id = `toc-item-${id}`;

    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = title;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(id);
    });

    li.appendChild(link);
    sidebarList.appendChild(li);

    const mOpt = document.createElement("a");
    mOpt.href = `#${id}`;
    mOpt.className = "mobile-toc-option" + (index === 0 ? " active" : "");
    mOpt.id = `m-opt-${id}`;
    mOpt.textContent = title;
    mOpt.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(id);
      toggleMobileDropdown();
    });
    mobileDropdown.appendChild(mOpt);
  });

  const mobileTitle = document.getElementById("mobile-toc-title");
  if (mobileTitle) mobileTitle.textContent = "Jump to section...";
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const container = document.querySelector(".content-area");
  const headerOffset = window.innerWidth <= 768 ? 130 : 0;

  if (window.innerWidth <= 768) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  } else if (container) {
    container.scrollTo({ top: element.offsetTop - 20, behavior: "smooth" });
  }

  updateActiveTOCState(id);
}

function updateActiveTOCState(activeId) {
  document.querySelectorAll(".toc-item").forEach((item) => item.classList.remove("active"));
  const desktopTarget = document.getElementById(`toc-item-${activeId}`);
  if (desktopTarget) desktopTarget.classList.add("active");

  document.querySelectorAll(".mobile-toc-option").forEach((item) => item.classList.remove("active"));
  const mobileTarget = document.getElementById(`m-opt-${activeId}`);
  if (mobileTarget) {
    mobileTarget.classList.add("active");
    const mobileTitle = document.getElementById("mobile-toc-title");
    if (mobileTitle) mobileTitle.textContent = mobileTarget.textContent;
  }
}

function toggleMobileDropdown() {
  const dropdown = document.getElementById("mobile-dropdown");
  if (dropdown) dropdown.classList.toggle("show");
}

window.addEventListener("click", (event) => {
  if (!event.target.closest(".mobile-toc-container")) {
    const dropdown = document.getElementById("mobile-dropdown");
    if (dropdown && dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
});

/**
 * Theme toggle. Wrapped in try/catch since this same script.js may end up
 * reused inside a sandboxed embed somewhere down the line, and storage
 * access can throw there.
 */
function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("user-theme");
  } catch (e) {
    savedTheme = null;
  }
  const theme = savedTheme || "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcons(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  try {
    localStorage.setItem("user-theme", newTheme);
  } catch (e) {
    /* storage unavailable in this context; theme still applies for this view */
  }
  updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");
  if (!sunIcon || !moonIcon) return;
  if (theme === "dark") {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
}

/**
 * Highlights the current section in the sidebar/mobile nav as the user
 * scrolls through the document.
 */
let observer;
function initScrollSpy() {
  const sections = document.querySelectorAll(".content-wrapper > .legal-section");
  if (!sections.length) return;
  if (observer) observer.disconnect();

  const scrollContainer = window.innerWidth <= 768 ? null : document.querySelector(".content-area");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveTOCState(entry.target.id);
        }
      });
    },
    { root: scrollContainer, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initScrollSpy, 250);
});

/** Highlights the current page in the top nav (Home / Privacy / Terms). */
function markActiveNavLink() {
  const here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".page-nav a").forEach((a) => {
    const target = a.getAttribute("href");
    if (target === here) a.classList.add("active");
  });
}



