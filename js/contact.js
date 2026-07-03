const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const message = {

        full_name: contactForm.fullname.value.trim(),
        email: contactForm.email.value.trim(),
        subject: contactForm.subject.value.trim(),
        message: contactForm.message.value.trim()

    };

    const response = await fetch("http://localhost:5000/api/contact", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(message)

    });

    const data = await response.json();

    alert(data.message);

    contactForm.reset();

});