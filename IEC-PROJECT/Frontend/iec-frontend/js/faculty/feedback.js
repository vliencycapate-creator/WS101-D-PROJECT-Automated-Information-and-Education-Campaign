// FOR FLYERS FEEDBACKS
const flyersFeedback = [
    {
        "username" : "Pedro",
        "flyer_title" : "Protect our nature",
        "message" : "This is nice to read. Thank you for sharing",
        "date" : "2025-11-23"
    },
    {
        "username" : "Juan",
        "flyer_title" : "Protect our nature",
        "message" : "Thank you for sharing",
        "date" : "2025-12-03"
    },
]

flyersFeedback.forEach(feedback => {
    document.getElementById("ff-table-notice").style.display = "none";
    createTableRow(feedback, "flyerFeedbackTable");
});

function createTableRow(list, tableId) {
    const flyerFeedbackTable = document.getElementById(`${tableId}`);

    const trUser = document.createElement("tr");
    const tdUsername = document.createElement("td");
    const tdFlyersTitle = document.createElement("td");
    const tdMessage = document.createElement("td");
    const tdDate = document.createElement("td");

    trUser.appendChild(tdUsername);
    trUser.appendChild(tdFlyersTitle);
    trUser.appendChild(tdMessage);
    trUser.appendChild(tdDate);

    tdUsername.textContent = list.username;
    tdFlyersTitle.textContent = list.flyer_title;
    tdMessage.textContent = list.message;
    tdDate.textContent = list.date;

    flyerFeedbackTable.appendChild(trUser);
}

// LOGOUT
document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
};