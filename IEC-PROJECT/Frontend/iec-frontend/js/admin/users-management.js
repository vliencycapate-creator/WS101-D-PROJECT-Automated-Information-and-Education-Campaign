import { apiGetAuth } from "../api/api.js";

// FETCH ALL USERS
async function fetchUsers() {
    try {
        // const token = localStorage.getItem("token");

        // if (!token) {
        //     alert("No token found — redirecting to login...");
        //     window.location.href = "/index.html";
        //     return;
        // }

        // const users = await response.json();
        const users = await apiGetAuth("users"); // GET /users

        // Handle invalid token or expired token
        if (users.status === 401) {
            alert("Session expired. Please login again.");
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("No token found — redirecting to login...");
                    window.location.href = "/index.html";
                    return;
                }

                // const users = await response.json();
                const response = apiLogout("logout"); // GET /users

                // Handle invalid token or expired token
                if (response.status === 401) {
                    alert("Session expired. Please login again.");
                    localStorage.removeItem("token");
                    window.location.href = "/index.html";
                    return;
                }

                localStorage.removeItem("token");
                window.location.href = "/index.html";
            } catch (error) {
                console.error("Fetch users error:", error);
            }
        }

        const allUsers = users.data || [];

        const tableBody = document.getElementById("userTable");
        tableBody.innerHTML = ""; // clear table rows

        // Render all users
        allUsers.forEach(user => {
            createUserElem(user);
        });
    } catch (error) {
        console.error("Fetch users error:", error);
    }
}

// CREATE USERS ELEM
function createUserElem(user) {
    const list = document.getElementById("userTable");
    const row = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = user.id;

    const tdName = document.createElement("td");
    tdName.textContent = user.username;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;

    const tdRole = document.createElement("td");
    tdRole.textContent = user.role;

    const tdDateReg = document.createElement("td");
    tdDateReg.textContent = user.createdAt;

    const tdActions = document.createElement("td");
    tdActions.className = "tdActions";

    const editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editUser(user);

    const delBtn = document.createElement("button");
    delBtn.className = "deleteBtn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return { cancelled: true };

        const result = await apiDelete(`users?id=${user.id}`);

        if (!result || result.cancelled) return;

        if (result.success === true || result.status === 200) {
            alert(result.message || "User deleted successfully!");
        } else {
            alert(result.message || "Failed to delete user.");
        }
    });

    tdActions.appendChild(editBtn);
    tdActions.appendChild(delBtn);

    row.appendChild(tdId);
    row.appendChild(tdName);
    row.appendChild(tdEmail);
    row.appendChild(tdRole);
    row.appendChild(tdDateReg);
    row.appendChild(tdActions);

    list.appendChild(row);
}

// LOGOUT
document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
};


fetchUsers();