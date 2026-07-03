const results = document.getElementById("results");
const searchBtn = document.getElementById("searchBtn");

let inventory = [];

// ===============================
// Load Inventory
// ===============================

async function loadInventory() {

    try {

        const response = await fetch("http://localhost:5000/api/inventory");

        inventory = await response.json();

        // Check if blood group is passed from Home Page
        const params = new URLSearchParams(window.location.search);
        const selectedGroup = params.get("group");

        if (selectedGroup) {

            document.getElementById("bloodGroup").value = selectedGroup;

            const filtered = inventory.filter(item =>
                item.blood_group === selectedGroup
            );

            displayInventory(filtered);

        } else {

            displayInventory(inventory);

        }

    } catch (error) {

        console.error(error);

        results.innerHTML = `
            <h3 style="text-align:center; color:red;">
                Unable to connect to server.
            </h3>
        `;

    }

}

// ===============================
// Display Inventory
// ===============================

function displayInventory(data) {

    results.innerHTML = "";

    if (data.length === 0) {

        results.innerHTML = `
            <h3 style="text-align:center;">
                No Blood Units Found
            </h3>
        `;

        return;

    }

    data.forEach(item => {

        results.innerHTML += `

        <div class="blood-card">

            <div class="blood-group">
                ${item.blood_group}
            </div>

            <h3>
                ${item.bank_name}
            </h3>

            <p>
                <i class="fa-solid fa-location-dot"></i>
                ${item.city}
            </p>

            <p>
                <i class="fa-solid fa-droplet"></i>
                ${item.units_available} Units Available
            </p>

            <button onclick="window.location.href='blood-request.html'">
                Request Blood
            </button>

        </div>

        `;

    });

}

// ===============================
// Search
// ===============================

searchBtn.addEventListener("click", () => {

    const group = document.getElementById("bloodGroup").value;

    const city = document
        .getElementById("city")
        .value
        .toLowerCase();

    const filtered = inventory.filter(item => {

        const groupMatch =
            group === "" ||
            item.blood_group === group;

        const cityMatch =
            city === "" ||
            item.city.toLowerCase().includes(city);

        return groupMatch && cityMatch;

    });

    displayInventory(filtered);

});

// ===============================
// Initial Load
// ===============================

loadInventory();