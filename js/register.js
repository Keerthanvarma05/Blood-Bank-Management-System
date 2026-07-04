const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000`;

document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const full_name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const response = await fetch(`${API_BASE}/api/auth/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                full_name,
                email,
                password,
                role: "Donor"
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful!");

            document.getElementById("registerForm").reset();

            window.location.href = "login.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});