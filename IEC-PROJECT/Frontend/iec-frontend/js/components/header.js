// ---------- FOR TOGGLING MENU ICON ----------
document.getElementById('menu-icon').onclick = () => {
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebar = document.getElementById("sidebar");
    const isOpen = sidebar.style.left === "0px";

    document.getElementById('menu-icon').classList.toggle('active');

    sidebar.style.left = isOpen ? "-250px" : "0px";
    sidebarOverlay.style.display = isOpen ? "none" : "block";

    document.getElementById("auth-container").style.display = "none";

    sidebarOverlay.addEventListener('click', () => {
        sidebarOverlay.style.display = "none";
        closeSidebar();
    });
}

// ---------- FOR CLOSING SIDEBAR ----------
function closeSidebar() {
    document.getElementById("menu-icon").classList.remove("active");
    document.getElementById("sidebar").style.left = "-250px";
    document.getElementById("sidebar-overlay").style.display = "none";
}

// ---------- AUTO CLOSE SIDEBAR WHEN SCREEN SIZE GREATER THAN 768px  ----------
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});