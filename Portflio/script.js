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
