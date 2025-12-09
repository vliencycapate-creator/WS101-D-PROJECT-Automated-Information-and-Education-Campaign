import { apiGetAuth } from "../api/api.js";

async function fetchFlyers() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found — redirecting to login...");
            window.location.href = "/index.html";
            return;
        }

        const flyers = await apiGetAuth("flyers");
        const users = await apiGetAuth("users");

        // Handle invalid token or expired token
        if (flyers.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/index.html";
            return;
        }

        document.getElementById("totalFlyers").textContent = flyers.size;
        // document.getElementById('pendingCount').textContent = 
        document.getElementById("userCount").textContent = users.size;
        
    } catch (error) {
        console.error("Error:", error);
    }
}

// FETCH ALL USERS
async function fetchUsers() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found — redirecting to login...");
            window.location.href = "/index.html";
            return;
        }

        // const users = await response.json();
        const users = await apiGetAuth("users"); // GET /users

        // Handle invalid token or expired token
        if (users.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/index.html";
            return;
        }

        const allUsers = users.data || [];

        const tableBody = document.getElementById("userTable");
        tableBody.innerHTML = ""; // clear table rows

        // Render all users
        allUsers.forEach(user => {
            if (user.role === "faculty") {
                createUserElem(user);
            }
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
    delBtn.onclick = () => deleteUser(user.id);

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

document.getElementById('addFlyer').onclick = () => {
    document.getElementById('flyer-creator').style.display = "grid";
    document.getElementById('dashboard').style.display = "none";
};

// LOGOUT
document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
};

fetchFlyers();
fetchUsers();