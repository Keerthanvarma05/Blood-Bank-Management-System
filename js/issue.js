const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000`;

const issueForm = document.getElementById("issueForm");
const issueTable = document.getElementById("issueTable");

// ===================================
// Load Blood Issues
// ===================================

loadIssuedRecords();

// ===================================
// Submit Blood Issue
// ===================================

issueForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const issue = {

        patient_name: document.getElementById("patientName").value.trim(),
        hospital_name: document.getElementById("hospitalName").value.trim(),
        blood_group: document.getElementById("bloodGroup").value,
        units_issued: document.getElementById("units").value,
        issue_date: document.getElementById("issueDate").value,
        issued_by: document.getElementById("issuedBy").value.trim()

    };

    if (

        issue.patient_name === "" ||
        issue.hospital_name === "" ||
        issue.blood_group === "" ||
        issue.units_issued === "" ||
        issue.issue_date === "" ||
        issue.issued_by === ""

    ) {

        alert("Please fill all fields.");
        return;

    }

    const response = await fetch(`${API_BASE}/api/issues`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(issue)

    });

    const data = await response.json();

    alert(data.message);

    issueForm.reset();

    loadIssuedRecords();

});

// ===================================
// Load All Blood Issues
// ===================================

async function loadIssuedRecords() {

    const response = await fetch(`${API_BASE}/api/issues`);

    const issues = await response.json();

    issueTable.innerHTML = "";

    issues.forEach(issue => {

        issueTable.innerHTML += `

        <tr>

            <td>${issue.patient_name}</td>
            <td>${issue.hospital_name}</td>
            <td>${issue.blood_group}</td>
            <td>${issue.units_issued}</td>
            <td>${issue.issue_date}</td>
            <td>${issue.issued_by}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteIssue(${issue.issue_id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===================================
// Delete Blood Issue
// ===================================

async function deleteIssue(id) {

    if (!confirm("Delete this record?")) return;

    const response = await fetch(`${API_BASE}/api/issues/${id}`, {

        method: "DELETE"

    });

    const data = await response.json();

    alert(data.message);

    loadIssuedRecords();

}