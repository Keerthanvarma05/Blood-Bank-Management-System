const requestForm = document.getElementById("requestForm");
const requestTable = document.querySelector("#requestTable tbody");

// ===================================
// Load Requests
// ===================================

loadRequests();

// ===================================
// Submit Blood Request
// ===================================

requestForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const request = {

        patient_name: document.getElementById("patientName").value.trim(),
        hospital_name: document.getElementById("hospitalName").value.trim(),
        blood_group: document.getElementById("bloodGroup").value,
        units_required: document.getElementById("units").value,
        city: document.getElementById("city").value.trim(),
        contact: document.getElementById("contact").value.trim(),
        email: document.getElementById("email").value.trim(),
        required_date: document.getElementById("date").value,
        remarks: document.getElementById("remarks").value.trim()

    };

    const response = await fetch("http://localhost:5000/api/bloodrequests", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(request)

    });

    const data = await response.json();

    alert(data.message);

    requestForm.reset();

    loadRequests();

});

// ===================================
// Load All Requests
// ===================================

async function loadRequests() {

    const response = await fetch("http://localhost:5000/api/bloodrequests");

    const requests = await response.json();

    requestTable.innerHTML = "";

    requests.forEach(request => {

        requestTable.innerHTML += `

        <tr>

            <td>${request.patient_name}</td>
            <td>${request.blood_group}</td>
            <td>${request.units_required}</td>
            <td>${request.city}</td>
            <td>${request.status}</td>

            <td>

                <button
                    class="approve-btn"
                    onclick="approveRequest(${request.request_id})"
                    ${request.status !== "Pending" ? "disabled" : ""}
                >
                    Approve
                </button>

                <button
                    class="reject-btn"
                    onclick="rejectRequest(${request.request_id})"
                    ${request.status !== "Pending" ? "disabled" : ""}
                >
                    Reject
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRequest(${request.request_id})"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// ===================================
// Approve Request
// ===================================

async function approveRequest(id) {

    if (!confirm("Approve this request?"))
        return;

    const response = await fetch(

        `http://localhost:5000/api/bloodrequests/approve/${id}`,

        {

            method: "PUT"

        }

    );

    const data = await response.json();

    alert(data.message);

    loadRequests();

}

// ===================================
// Reject Request
// ===================================

async function rejectRequest(id) {

    if (!confirm("Reject this request?"))
        return;

    const response = await fetch(

        `http://localhost:5000/api/bloodrequests/reject/${id}`,

        {

            method: "PUT"

        }

    );

    const data = await response.json();

    alert(data.message);

    loadRequests();

}

// ===================================
// Delete Request
// ===================================

async function deleteRequest(id) {

    if (!confirm("Delete this request?"))
        return;

    const response = await fetch(

        `http://localhost:5000/api/bloodrequests/${id}`,

        {

            method: "DELETE"

        }

    );

    const data = await response.json();

    alert(data.message);

    loadRequests();

}