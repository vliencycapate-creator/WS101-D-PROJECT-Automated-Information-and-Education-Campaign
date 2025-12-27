import { apiGetAuth, apiGetAuthPost } from "../api/api.js";
import { apiLogout } from "../api/api.js";

async function fetchFlyers() {
    try {
        // const token = localStorage.getItem("token");

        // if (!token) {
        //     alert("No token found — redirecting to login...");
        //     window.location.href = "/index.html";
        //     return;
        // }

        const flyers = await apiGetAuth("myflyers");
        const pendingflyers = await apiGetAuth("myflyers?status=pending");

        // Handle invalid token or expired token
        if (flyers.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/index.html";
            return;
        }

        document.getElementById("totalFlyers").textContent = flyers.size ? flyers.size : "0";
        document.getElementById("pendingCount").textContent = pendingflyers.size ? pendingflyers.size : "0";
    } catch (error) {
        console.error("Error:", error);
    }
}

// Create flyer
document.getElementById('addFlyer').onclick = () => {
    document.getElementById('flyer-creator').style.display = "grid";
    document.getElementById('dashboard').style.display = "none";

    // Reset form for creation
    const form = document.querySelector('#flyer-creator form');
    if (form) {
        form.reset();
    }
};

// Form Submission (Create only)
const flyerForm = document.querySelector('#flyer-creator form');
if (flyerForm) {
    flyerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(flyerForm);

        try {
            const result = await apiGetAuthPost("myflyers", formData);
            alert(result.message || "Created successfully");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Failed to create flyer");
        }
    });
}

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

fetchFlyers();