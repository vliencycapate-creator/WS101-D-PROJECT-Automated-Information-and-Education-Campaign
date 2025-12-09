import { apiGetAuth } from "../api/api.js";
import { createFlyerElems } from "./createElement/createElement.js";

// const IMG_URL_BASE = "http://192.168.68.50/iec-server/";

let allFlyers = [];

// FETCH ALL APPROVED FLYERS
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
        // document.getElementById("totalflyers").textContent = flyers.size;

        // Render all flyers
        document.getElementById("approved-flyer-list").innerHTML = ""; // clear first

        const approvedFlyers = flyerList.filter(f => f.record.status === "approved");

        if (approvedFlyers.length > 0) {
            document.getElementById("no-flyers-notice").style.display = "none";
            document.getElementById("approved-flyer-list").style.display = "flex";
        }

        // Display flyers
        approvedFlyers.forEach(flyer => {
            createFlyerElems(flyer, "approved-flyer-list")
        });

        // If you want a global list:   
        allFlyers = approvedFlyers;
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
    const list = document.getElementById("approved-flyer-list");
    list.innerHTML = "";

    results.forEach(flyer => createFlyerElems(flyer, "approved-flyer-list"));
    // results.forEach(flyer => createFlyerElems(flyer, "approved-flyer-list", `${flyer.record["status"]}`));
}

document.getElementById("search-btn").addEventListener("click", searchFlyers);
document.getElementById("search-bar").addEventListener("input", searchFlyers);
document.getElementById("category").addEventListener("change", searchFlyers);

// LOGOUT
document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
};

fetchFlyers();
