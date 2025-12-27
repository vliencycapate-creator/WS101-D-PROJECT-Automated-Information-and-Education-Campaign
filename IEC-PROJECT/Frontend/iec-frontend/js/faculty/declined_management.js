import { apiGetAuth } from "../api/api.js";
import { createFlyerElems } from "./createElement/facultyCreateElement.js";
import { apiLogout } from "../api/api.js";

let allFlyers = [];

// FETCH ALL APPROVED FLYERS
async function fetchFlyers() {
    try {
        // const token = localStorage.getItem("token");

        // if (!token) {
        //     alert("No token found — redirecting to login...");
        //     window.location.href = "/index.html";
        //     return;
        // }

        const flyers = await apiGetAuth("myflyers?status=declined");

        // Handle invalid token or expired token
        if (flyers.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/index.html";
            return;
        }

        const flyerList = flyers.data; // store flyers for searching

        // Render all flyers
        document.getElementById("declined-flyer-list").innerHTML = ""; // clear first

        const declinedFlyers = flyerList.filter(f => f.record.status === "declined");

        if (declinedFlyers.length > 0) {
            document.getElementById("no-flyers-notice").style.display = "none";
            document.getElementById("declined-flyer-list").style.display = "flex";
        }

        // Display flyers
        declinedFlyers.forEach(flyer => {
            createFlyerElems(flyer, "declined-flyer-list")
        });

        // If you want a global list:   
        allFlyers = declinedFlyers;
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
    const list = document.getElementById("declined-flyer-list");
    list.innerHTML = "";

    results.forEach(flyer => createFlyerElems(flyer, "declined-flyer-list"));
}

document.getElementById("search-btn").addEventListener("click", searchFlyers);
document.getElementById("search-bar").addEventListener("input", searchFlyers);
document.getElementById("category").addEventListener("change", searchFlyers);

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