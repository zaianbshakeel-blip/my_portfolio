// ========================================
// MOBILE MENU
// ========================================

const menu = document.getElementById("menu");
const mobile = document.getElementById("mobile");

if (menu && mobile) {

    menu.addEventListener("click", () => {

        mobile.classList.toggle("show");

        menu.innerHTML = mobile.classList.contains("show")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    // Close mobile menu after clicking a link

    document.querySelectorAll(".mobile a").forEach(link => {

        link.addEventListener("click", () => {

            mobile.classList.remove("show");

            menu.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}


// ========================================
// PROJECT FILTER
// ========================================

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

if (filters.length && projects.length) {

    filters.forEach(btn => {

        btn.addEventListener("click", () => {

            // Remove active class from all buttons

            filters.forEach(button => {
                button.classList.remove("active");
            });

            // Add active class to selected button

            btn.classList.add("active");

            const type = btn.dataset.filter;

            // Filter projects

            projects.forEach(project => {

                const category = project.dataset.cat;

                if (
                    type === "all" ||
                    category === type
                ) {

                    project.style.display = "block";

                } else {

                    project.style.display = "none";

                }

            });

        });

    });

}


// ========================================
// FAQ ACCORDION
// ========================================

const faqButtons = document.querySelectorAll(".q button");

if (faqButtons.length) {

    faqButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const item = btn.parentElement;

            // Close other FAQ items

            document.querySelectorAll(".q").forEach(q => {

                if (q !== item) {
                    q.classList.remove("open");
                }

            });

            // Toggle current FAQ

            item.classList.toggle("open");

        });

    });

}


// ========================================
// HERO TYPING ANIMATION
// ========================================

const roles = [
    "Frontend Developer",
    "UI/UX Designer"
];

const typingRole = document.querySelector(".typing-role");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeRole() {

    // Stop if element does not exist

    if (!typingRole) {
        return;
    }

    const currentRole = roles[roleIndex];


    // ------------------------------------
    // TYPING
    // ------------------------------------

    if (!deleting) {

        typingRole.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;


        // Finished typing

        if (charIndex === currentRole.length) {

            deleting = true;

            // Wait before deleting

            setTimeout(typeRole, 1500);

            return;
        }


        // Continue typing

        setTimeout(typeRole, 100);

    }


    // ------------------------------------
    // DELETING
    // ------------------------------------

    else {

        typingRole.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;


        // Finished deleting

        if (charIndex === 0) {

            deleting = false;

            // Move to next role

            roleIndex =
                (roleIndex + 1) % roles.length;

            // Small pause

            setTimeout(typeRole, 500);

            return;
        }


        // Continue deleting

        setTimeout(typeRole, 50);

    }

}


// Start typing animation

document.addEventListener("DOMContentLoaded", () => {

    if (typingRole) {
        setTimeout(typeRole, 500);
    }

});


// ========================================
// CONTACT FORM VALIDATION + FORMSPREE
// ========================================

const form = document.getElementById("form");
const msg = document.getElementById("msg");


if (form) {

    form.addEventListener("submit", function (e) {

        const name =
            form.querySelector('[name="name"]');

        const email =
            form.querySelector('[name="email"]');

        const message =
            form.querySelector('[name="message"]');


        // ------------------------------------
        // Remove Previous Errors
        // ------------------------------------

        form.querySelectorAll(".error").forEach(error => {
            error.remove();
        });


        let valid = true;


        // ------------------------------------
        // NAME VALIDATION
        // ------------------------------------

        if (name) {

            const nameValue = name.value.trim();

            if (nameValue === "") {

                showError(
                    name,
                    "Please enter your name."
                );

                valid = false;

            } else if (nameValue.length < 2) {

                showError(
                    name,
                    "Name must be at least 2 characters."
                );

                valid = false;

            }

        }


        // ------------------------------------
        // EMAIL VALIDATION
        // ------------------------------------

        if (email) {

            const emailValue =
                email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (emailValue === "") {

                showError(
                    email,
                    "Please enter your email."
                );

                valid = false;

            } else if (
                !emailPattern.test(emailValue)
            ) {

                showError(
                    email,
                    "Please enter a valid email address."
                );

                valid = false;

            }

        }


        // ------------------------------------
        // MESSAGE VALIDATION
        // ------------------------------------

        if (message) {

            const messageValue =
                message.value.trim();


            if (messageValue === "") {

                showError(
                    message,
                    "Please enter your message."
                );

                valid = false;

            } else if (
                messageValue.length < 10
            ) {

                showError(
                    message,
                    "Message must be at least 10 characters."
                );

                valid = false;

            }

        }


        // ------------------------------------
        // STOP FORM SUBMISSION IF INVALID
        // ------------------------------------

        if (!valid) {

            e.preventDefault();

            return;

        }


        // ------------------------------------
        // VALID FORM
        // ------------------------------------

        if (msg) {

            msg.classList.add("show");

            setTimeout(() => {

                msg.classList.remove("show");

            }, 5000);

        }


        // IMPORTANT:
        // Do NOT use e.preventDefault()
        // here.
        //
        // Formspree will receive the valid form.
        // ------------------------------------

    });


    // ------------------------------------
    // ERROR MESSAGE FUNCTION
    // ------------------------------------

    function showError(input, text) {

        const error =
            document.createElement("small");

        error.className = "error";

        error.textContent = text;

        input.parentElement.appendChild(error);

    }

}


// ========================================
// ACTIVE NAVBAR LINK ON SCROLL
// ========================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".links a");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


// Update while scrolling

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


// Initial state

updateActiveNav();