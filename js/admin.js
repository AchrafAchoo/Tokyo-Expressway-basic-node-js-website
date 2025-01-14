document.addEventListener("DOMContentLoaded", () => {
    let usersData = [];

    fetch("http://localhost:3000/js/crud")
        .then((response) => response.json())
        .then((data) => {
            usersData = data;
            displayUsers(usersData);
        })
        .catch((error) => console.error("Error fetching data:", error));

    function displayUsers(users) {
        const tableBody = document.getElementById("userList");
        tableBody.innerHTML = "";

        users.forEach((user) => {
            const row = `
                <tr>
                    <td>${user.email}</td>
                    <td>${user.model}</td>
                    <td>${user.vin}</td>
                    <td>${user.phone}</td>
                    <td><button class="delete-button" data-email="${user.email}">Delete</button></td>

                </tr>
            `;
            tableBody.innerHTML += row;
        });
        document.querySelectorAll(".delete-button").forEach((button) => {
            button.addEventListener("click", (event) => {
                const email = event.target.getAttribute("data-email");
                deleteUser(email);
            });
        });
    }
    function deleteUser(email) {
        usersData = usersData.filter((user) => user.email !== email);

        if (confirm("Are you sure you want to delete this user ?")) {
            displayUsers(usersData);
            fetch("http://localhost:3000/js/crud", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usersData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.error("Error updating data:", error));
        }
    }
});
