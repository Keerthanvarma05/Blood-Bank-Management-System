const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000`;

async function loadDashboardStats() {

    try {

        const response = await fetch(`${API_BASE}/api/dashboard`);

        const data = await response.json();

        document.getElementById("totalDonors").textContent =
            data.totalDonors;

        document.getElementById("totalUnits").textContent =
            data.totalUnits;

        document.getElementById("totalBloodBanks").textContent =
            data.totalBloodBanks;

    } catch (err) {

        console.log(err);

    }

}

loadDashboardStats();