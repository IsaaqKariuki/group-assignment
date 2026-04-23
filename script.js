const form = document.getElementById("form");
const clearBtn = document.getElementById("clear-btn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    function showError(input, message) {
        // Try to find an existing error element
        let errorEl = input.nextElementSibling;

        // Create one if it doesn't exist or isn't the right type
        if (!errorEl || errorEl.tagName !== "SMALL") {
            errorEl = document.createElement("small");
            input.after(errorEl); 
        }

        // Apply styles and message
        errorEl.textContent = message;
        errorEl.style.color = "red";
        input.style.border = "1px solid red";
        isValid = false;
    }

    function showSuccess(input) {
        let error = input.nextElementSibling;
        if (error && error.tagName === "SMALL") {
            error.textContent = "";
        }
        input.style.border = "1px solid green";
    }

    // CLEAN VALUES
    const fName = firstName.value.trim();
    const lName = lastName.value.trim();
    const mail = email.value.trim();
    const sub = subject.value.trim();
    const msg = message.value.trim();

    // NAME VALIDATION
    const nameRegex = /^[A-Za-z]{2,}$/;

    if (!nameRegex.test(fName)) {
        showError(firstName, "First name must be at least 2 letters and contain only letters");
    } else {
        showSuccess(firstName);
    }

    if (!nameRegex.test(lName)) {
        showError(lastName, "Last name must be at least 2 letters and contain only letters");
    } else {
        showSuccess(lastName);
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(mail)) {
        showError(email, "Enter a valid email address");
    } else if (mail.includes("test@") || mail.includes("example.com")) {
        showError(email, "Please use a real email address");
    } else {
        showSuccess(email);
    }

    // SUBJECT VALIDATION
    if (sub.length < 5) {
        showError(subject, "Subject must be at least 5 characters");
    } else if (/^\d+$/.test(sub)) {
        showError(subject, "Subject cannot be only numbers");
    } else {
        showSuccess(subject);
    }

    // MESSAGE VALIDATION
    if (msg.length < 20) {
        showError(message, "Message must be at least 20 characters long");
    } else {
        showSuccess(message);
    }

    // FINAL CHECK
    if (isValid) {
        alert("Form submitted successfully!");
        form.submit();
    }
});