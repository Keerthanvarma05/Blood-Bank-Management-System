const donorForm = document.getElementById("donorForm");
const donorTable = document.getElementById("donorTable");

let editId = null;

loadDonors();

donorForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const donor = {

        full_name: document.getElementById("fullName").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        blood_group: document.getElementById("bloodGroup").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        last_donation: document.getElementById("lastDonation").value

    };

    let url = "http://localhost:5000/api/donors";
    let method = "POST";

    if (editId !== null) {

        url += "/" + editId;
        method = "PUT";

    }

    const response = await fetch(url, {

        method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(donor)

    });

    const data = await response.json();

    alert(data.message);

    donorForm.reset();

    editId = null;

    loadDonors();

});

async function loadDonors() {

    const response = await fetch("http://localhost:5000/api/donors");

    const donors = await response.json();

    donorTable.innerHTML = "";

    donors.forEach(donor => {

        donorTable.innerHTML += `

        <tr>

            <td>${donor.full_name}</td>
            <td>${donor.age}</td>
            <td>${donor.gender}</td>
            <td>${donor.blood_group}</td>
            <td>${donor.phone}</td>
            <td>${donor.city}</td>
            <td>${donor.last_donation ?? "-"}</td>

            <td>

                <button class="edit-btn"
                    onclick='editDonor(${JSON.stringify(donor)})'>
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteDonor(${donor.donor_id})">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

function editDonor(donor) {

    editId = donor.donor_id;

    document.getElementById("fullName").value = donor.full_name;
    document.getElementById("age").value = donor.age;
    document.getElementById("gender").value = donor.gender;
    document.getElementById("bloodGroup").value = donor.blood_group;
    document.getElementById("phone").value = donor.phone;
    document.getElementById("email").value = donor.email;
    document.getElementById("city").value = donor.city;
    document.getElementById("address").value = donor.address;
    document.getElementById("lastDonation").value =
        donor.last_donation ? donor.last_donation.split("T")[0] : "";

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

}

async function deleteDonor(id) {

    if (!confirm("Delete this donor?"))
        return;

    await fetch(`http://localhost:5000/api/donors/${id}`, {

        method: "DELETE"

    });

    loadDonors();

}