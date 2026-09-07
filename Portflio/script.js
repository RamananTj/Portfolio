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
    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const message = document.getElementById("message").value;


    // Basic validation
    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill in all required fields.";

        formMessage.style.color = "red";

        return;
    }


    // Display success message
    formMessage.textContent =
        `Thank you, ${name}! Your message has been received.`;

    formMessage.style.color = "green";


    // Clear form
    contactForm.reset();

});


/* =====================================================
   CURRENT YEAR
   ===================================================== */

const yearElement = document.getElementById("year");

const currentYear = new Date().getFullYear();

yearElement.textContent = currentYear;
