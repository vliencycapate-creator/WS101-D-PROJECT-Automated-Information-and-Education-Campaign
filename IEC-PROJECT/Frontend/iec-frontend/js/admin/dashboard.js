import { apiDelete, apiGetAuth, apiGetAuthPost, apiLogout } from "../api/api.js";

async function fetchFlyers() {
    try {
        // const token = localStorage.getItem("token");

        // if (!token) {
        //     alert("No token found — redirecting to login...");
        //     window.location.href = "/index.html";
        //     return;
        // }

        const flyers = await apiGetAuth("flyers");

        // Handle invalid token or expired token
        if (flyers.status === 401) {
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

        document.getElementById("totalFlyers").textContent = flyers.size;

    } catch (error) {
        console.error("Error:", error);
    }
}

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

        document.getElementById("userCount").textContent = users.size;

        const tableBody = document.getElementById("userTable");
        tableBody.innerHTML = ""; // clear table rows

        // Render all users
        allUsers.forEach(user => {
            if (user.role[0] === "faculty") {
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
    delBtn.addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return { cancelled: true };

        const result = await apiDelete(`users?id=${user.id}`);

        if (!result || result.cancelled) return;

        if (result.success === true || result.status === 200) {
            alert(result.message || "User deleted successfully!");
            window.location.reload();
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

document.getElementById('addFlyer').onclick = () => {
    document.getElementById('flyer-creator').style.display = "grid";
    document.getElementById('dashboard').style.display = "none";
};

// LOGOUT
document.getElementById("logoutButton").onclick = () => {

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
};

// Form Submission (Create or Update)
const flyerForm = document.querySelector('#flyer-creator form');
if (flyerForm) {
    flyerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(flyerForm);
        const id = flyerForm.dataset.id;

        let result;
        if (id) {
            // Update existing flyer
            formData.append("_method", "PUT"); // Method spoofing for file upload updates
            result = await apiUpdate(`myflyers/${id}`, formData);
            alert(result.message || "Updated successful");
            window.location.reload();
        } else {
            // Create new flyer
            result = await apiGetAuthPost("myflyers", formData);
            alert(result.message || "Created successful");
            window.location.reload();
        }
    });
}

fetchFlyers();
fetchUsers();