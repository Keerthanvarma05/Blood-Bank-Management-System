async function loadDashboardStats() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard");

        const data = await response.json();

        document.getElementById("totalDonors").textContent =
            data.totalDonors;

        document.getElementById("totalUnits").textContent =
            data.totalUnits;

        document.getElementById("totalBloodBanks").textContent =
            data.totalBloodBanks;

    }

    catch (err) {

        console.log(err);

    }

}

loadDashboardStats();