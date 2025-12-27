function tokenChecker() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Unauthorized : Access denied!  — redirecting to login...");
        window.location.href = "/index.html";
        window.location.replace = "/index.html";
        return;
    }
}