const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000`;

const inventoryForm = document.getElementById("inventoryForm");
const inventoryTable = document.getElementById("inventoryTable");
const bankSelect = document.getElementById("bankId");

// ==============================
// Load Data on Page Load
// ==============================

window.onload = () => {
    loadBloodBanks();
    loadInventory();
};

// ==============================
// Load Blood Banks
// ==============================

async function loadBloodBanks() {

    try {

        const response = await fetch(`${API_BASE}/api/bloodbanks`);

        const banks = await response.json();

        bankSelect.innerHTML =
            '<option value="">Select Blood Bank</option>';

        banks.forEach(bank => {

            bankSelect.innerHTML += `
                <option value="${bank.bank_id}">
                    ${bank.bank_name} (${bank.city})
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ==============================
// Add Inventory
// ==============================

inventoryForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const inventory = {

        bank_id: document.getElementById("bankId").value,
        blood_group: document.getElementById("bloodGroup").value,
        units_available: document.getElementById("units").value,
        expiry_date: document.getElementById("expiryDate").value

    };

    try {

        const response = await fetch(`${API_BASE}/api/inventory`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(inventory)

        });

        const data = await response.json();

        alert(data.message);

        inventoryForm.reset();

        loadInventory();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});

// ==============================
// Load Inventory
// ==============================

async function loadInventory() {

    try {

        const response = await fetch(`${API_BASE}/api/inventory`);

        const inventory = await response.json();

        inventoryTable.innerHTML = "";

        inventory.forEach(item => {

            inventoryTable.innerHTML += `

            <tr>

                <td>${item.bank_name}</td>

                <td>${item.city}</td>

                <td>${item.blood_group}</td>

                <td>${item.units_available}</td>

                <td>${formatDate(item.expiry_date)}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteInventory(${item.inventory_id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ==============================
// Delete Inventory
// ==============================

async function deleteInventory(id) {

    if (!confirm("Delete this inventory?")) return;

    await fetch(`${API_BASE}/api/inventory/${id}`, {

        method: "DELETE"

    });

    loadInventory();

}

// ==============================
// Format Date
// ==============================

function formatDate(date) {

    return new Date(date).toLocaleDateString("en-GB");

}