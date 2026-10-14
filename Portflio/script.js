/* =====================================================
   DARK MODE
   ===================================================== */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  // Add/remove dark-mode class from body
  document.body.classList.toggle("dark-mode");

  // Change button icon
  if (document.body.classList.contains("dark-mode")) {
    themeButton.textContent = "☀️";
  } else {
    themeButton.textContent = "🌙";
  }
});

/* =====================================================
   DYNAMIC HERO ROLE
   ===================================================== */

const roles = [
  "Full stack .NET Developer",
  "Java Developer",
  "Software Developer",
];

const roleText = document.getElementById("roleText");

const roleChips = document.querySelectorAll(".role-chip");

let activeRoleIndex = 0;

let roleTimer;

function setActiveRole(index) {
  activeRoleIndex = index;

  roleText.classList.add("is-changing");

  setTimeout(function () {
    roleText.textContent = roles[activeRoleIndex];

    roleChips.forEach(function (chip, chipIndex) {
      chip.classList.toggle("active", chipIndex === activeRoleIndex);
    });

    roleText.classList.remove("is-changing");
  }, 220);
}

function scheduleRoleRotation() {
  clearInterval(roleTimer);

  roleTimer = setInterval(function () {
    const nextRoleIndex = (activeRoleIndex + 1) % roles.length;

    setActiveRole(nextRoleIndex);
  }, 2600);
}

roleChips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    const nextRoleIndex = Number(chip.dataset.roleIndex);

    setActiveRole(nextRoleIndex);

    scheduleRoleRotation();
  });
});

scheduleRoleRotation();

/* =====================================================
   PROJECT FILTERS
   ===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.toggle("active", filterButton === button);
    });

    projectCards.forEach(function (card) {
      const cardCategory = card.dataset.category;

      const shouldShow =
        selectedFilter === "all" || cardCategory === selectedFilter;

      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

/* =====================================================
   EXPERIENCE TV
   ===================================================== */

const experienceTv = document.querySelector(".experience-tv");

const experienceSlides = document.querySelectorAll(".experience-slide");

const experienceDots = document.querySelectorAll(".experience-dot");

const experienceCounter = document.getElementById("experienceCounter");

const experiencePrev = document.getElementById("experiencePrev");

const experienceNext = document.getElementById("experienceNext");

let activeExperienceIndex = 0;

let touchStartX = 0;

function showExperience(index) {
  activeExperienceIndex =
    (index + experienceSlides.length) % experienceSlides.length;

  experienceSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("active", slideIndex === activeExperienceIndex);
    slide.setAttribute(
      "aria-hidden",
      String(slideIndex !== activeExperienceIndex),
    );

    if (slideIndex === activeExperienceIndex) {
      slide.scrollTop = 0;
    }
  });

  experienceDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("active", dotIndex === activeExperienceIndex);
  });

  experienceCounter.textContent = `${String(activeExperienceIndex + 1).padStart(2, "0")} / ${String(experienceSlides.length).padStart(2, "0")}`;
}

experiencePrev.addEventListener("click", function () {
  showExperience(activeExperienceIndex - 1);
});

experienceNext.addEventListener("click", function () {
  showExperience(activeExperienceIndex + 1);
});

experienceDots.forEach(function (dot) {
  dot.addEventListener("click", function () {
    showExperience(Number(dot.dataset.experienceIndex));
  });
});

experienceTv.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    showExperience(activeExperienceIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showExperience(activeExperienceIndex + 1);
  }
});

experienceTv.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
});

experienceTv.addEventListener("touchend", function (event) {
  const touchEndX = event.changedTouches[0].clientX;

  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) < 45) {
    return;
  }

  if (swipeDistance > 0) {
    showExperience(activeExperienceIndex - 1);
  } else {
    showExperience(activeExperienceIndex + 1);
  }
});

/* =====================================================
   SCROLL REVEAL
   ===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});

/* =====================================================
   CONTACT FORM
   ===================================================== */

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  // Prevent actual form submission
  event.preventDefault();

  // Get values from input fields
  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const subject = document.getElementById("subject").value.trim();

  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill in all required fields.";

    formMessage.style.color = "red";

    return;
  }

  const emailSubject = subject || `Portfolio contact from ${name}`;

  const emailBody = [
    "Messaging you from your portfolio website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  // Open the visitor's email client with the form contents.
  const mailtoLink = `mailto:ramanangkofficial@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ramanangkofficial@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const gmailAppLink = `googlegmail://co?to=ramanangkofficial@gmail.com&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  formMessage.textContent = isMobile
    ? "Opening the Gmail app..."
    : "Opening Gmail...";

  formMessage.style.color = "green";

  if (isMobile) {
    window.location.href = gmailAppLink;

    // Use Gmail in the browser if the app is not installed.
    setTimeout(function () {
      if (document.visibilityState === "visible") {
        window.location.href = gmailLink;
      }
    }, 1500);
  } else {
    const emailWindow = window.open(gmailLink, "_blank", "noopener,noreferrer");

    if (!emailWindow) {
      window.location.href = mailtoLink;
    }
  }
});

/* =====================================================
   CURRENT YEAR
   ===================================================== */

const yearElement = document.getElementById("year");

const currentYear = new Date().getFullYear();

yearElement.textContent = currentYear;
