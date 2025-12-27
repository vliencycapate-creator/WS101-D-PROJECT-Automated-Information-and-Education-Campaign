import { apiPost } from "./api/api.js";

// OPEN AUTH MODAL
function openAuth(formId) {
    const auth = document.getElementById("auth-container");
    auth.style.display = "flex";
    auth.classList.remove("hide");
    auth.classList.add("show");

    // Switch to selected form
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

// SWITCH LOGIN / REGISTER FORM
function switchForm(formId) {
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

// LOGIN FORM SUBMIT
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const result = await apiPost("login", formData);
        console.log("Login result:", result);

        if (!result || result.success === false) {
            showMessage("login-message", result?.message || "Login failed", "error");
            return;
        }

        const currUser = result.data;

        console.log(currUser.token);
        

        // Save token and user info
        localStorage.setItem("token", currUser.token);
        localStorage.setItem("role", currUser.role[0]);
        // localStorage.setItem("role", currUser.role);
        localStorage.setItem("username", currUser.username);

        showMessage("login-message", "Login successful!", "success");
        e.target.reset();

        setTimeout(() => {
            closeAuth();
            if (currUser.role === "admin") {
                window.location.href = "/admin/dashboard.html";
            } else {
                window.location.href = "/faculty/dashboard.html";
            }
        }, 900);

    } catch (err) {
        console.error(err);
        showMessage("login-message", "Server unreachable", "error");
    }
});

// REGISTER FORM SUBMIT
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const result = await apiPost("register", formData);
        console.log("Register result:", result);

        if (!result || result.success === false) {
            showMessage("register-message", result?.message || "Registration failed", "error");
            return;
        }

        showMessage("register-message", "Registration successful!", "success");
        e.target.reset();

        setTimeout(() => {
            switchForm("login-form");
        }, 900);

    } catch (err) {
        console.error(err);
        showMessage("register-message", "Server unreachable", "error");
    }
});

// SHOW MESSAGE FUNCTION
function showMessage(id, message, type) {
    const box = document.getElementById(id);
    if (!box) return;

    box.textContent = message;
    // box.style.color = type === "success" ? "limegreen" : "#ff4444";
    box.style.color = type === "success" ? "#fff" : "#fff";
    box.style.border = type === "success" ? "1px solid limegreen" : "1px solid #ff4444";
    box.style.background = type === "success" ? "limegreen" : "#ff4444";
    box.style.display = "flex";

    setTimeout(() => {
        box.style.display = "none";
    }, 2000);
}

// CLOSE AUTH MODAL
function closeAuth() {
    const auth = document.getElementById("auth-container");
    auth.classList.remove("show");
    auth.classList.add("hide");

    document.querySelector('#loginForm').reset();
    document.querySelector('#registerForm').reset();

    setTimeout(() => {
        auth.style.display = "none";
    }, 250);
}

// Export functions for inline onclick if needed
export { openAuth, closeAuth, switchForm };

// MAKE FUNCTIONS ACCESSIBLE GLOBALLY (FOR INLINE ONCLICK)
window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.switchForm = switchForm;