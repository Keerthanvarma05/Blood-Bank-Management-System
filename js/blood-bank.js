const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000`;

const bankForm = document.getElementById("bankForm");
const bankTable = document.getElementById("bankTable");

loadBloodBanks();

// ==============================
// Add Blood Bank
// ==============================

bankForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const bloodBank = {
        bank_name: document.getElementById("bankName").value,
        manager_name: document.getElementById("managerName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        capacity: document.getElementById("capacity").value,
        address: document.getElementById("address").value
    };

    const response = await fetch(`${API_BASE}/api/bloodbanks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bloodBank)
    });

    const data = await response.json();

    alert(data.message);

    bankForm.reset();

    loadBloodBanks();

});

// ==============================
// Load Blood Banks
// ==============================

async function loadBloodBanks() {

    const response = await fetch(`${API_BASE}/api/bloodbanks`);

    const banks = await response.json();

    bankTable.innerHTML = "";

    banks.forEach(bank => {

        bankTable.innerHTML += `
            <tr>
                <td>${bank.bank_name}</td>
                <td>${bank.manager_name}</td>
                <td>${bank.email}</td>
                <td>${bank.phone}</td>
                <td>${bank.city}</td>
                <td>${bank.capacity}</td>
                <td>
                    <button class="delete-btn" onclick="deleteBank(${bank.bank_id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// ==============================
// Delete Blood Bank
// ==============================

async function deleteBank(id) {

    if (!confirm("Delete this Blood Bank?")) return;

    await fetch(`${API_BASE}/api/bloodbanks/${id}`, {
        method: "DELETE"
    });

    loadBloodBanks();

}