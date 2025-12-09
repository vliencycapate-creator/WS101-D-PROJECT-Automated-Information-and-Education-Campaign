import { apiGetAuth } from "../api/api.js";

let pendingFlyers = [];

async function fetchFlyers() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found — redirecting to login...");
            window.location.href = "/index.html";
            return;
        }

        const flyers = await apiGetAuth("myflyers");

        // Handle invalid token or expired token
        if (flyers.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/index.html";
            return;
        }

        document.getElementById("totalFlyers").textContent = flyers.size;
        pendingFlyers = flyers;

    } catch (error) {
        console.error("Error:", error);
    }
}

const pendingf = pendingFlyers.filter(f => f.record.status === "pending");
document.getElementById("pendingCount").textContent = pendingf.length;

// Create flyer
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