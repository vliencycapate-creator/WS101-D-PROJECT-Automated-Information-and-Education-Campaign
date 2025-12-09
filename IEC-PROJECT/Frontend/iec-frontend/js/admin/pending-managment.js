import { apiGetAuth } from "../api/api.js";
import { createFlyerElems } from "./createElement/adminCreateElement.js";

// const IMG_URL_BASE = "http://192.168.68.50/iec-server/";

let allFlyers = [];

// FETCH ALL PENDING FLYERS
async function fetchFlyers() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found — redirecting to login...");
            window.location.href = "/index.html";
            return;
        }

        const flyers = await apiGetAuth("flyers");

        // Handle invalid token or expired token
        if (flyers.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/index.html";
            return;
        }

        const flyerList = flyers.data; // store flyers for searching

        // Render all flyers
        document.getElementById("pending-flyer-list").innerHTML = ""; // clear first

        const pendingFlyers = flyerList.filter(f => f.record.status === "pending");

        if (pendingFlyers.length > 0) {
            document.getElementById("no-flyers-notice").style.display = "none";
            document.getElementById("pending-flyer-list").style.display = "flex";
        }

        // Display flyers
        pendingFlyers.forEach(flyer => {
            createFlyerElems(flyer, "pending-flyer-list");
        });

        // If you want a global list:
        allFlyers = pendingFlyers;
    } catch (error) {
        console.error("Error:", error);
    }
}

// FOR SEARCHING FLYERS
function searchFlyers() {
    const category = document.getElementById("category").value.toLowerCase();
    const query = document.getElementById("search-bar").value.toLowerCase();

    const results = allFlyers.filter(f => {
        const title = f.title.toLowerCase();
        const cat = f.category.toLowerCase();
        const author = (f.author || "").toLowerCase();

        const matchesQuery =
            title.includes(query) ||
            author.includes(query);

        const matchesCategory =
            category === "all" || cat === category;

        return matchesQuery && matchesCategory;
    });

    // RENDER RESULTS TO FLYER LIST
    const list = document.getElementById("pending-flyer-list");
    list.innerHTML = "";

    results.forEach(flyer => createFlyerElems(flyer, "pending-flyer-list"));
}

// LOGOUT
document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
};

document.getElementById("search-btn").addEventListener("click", searchFlyers);
document.getElementById("search-bar").addEventListener("input", searchFlyers);
document.getElementById("category").addEventListener("change", searchFlyers);

fetchFlyers();
