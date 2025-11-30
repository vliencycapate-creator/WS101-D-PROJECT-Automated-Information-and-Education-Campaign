function openAuth(formId) {
    const auth = document.getElementById("auth-container");

    // Show modal
    auth.style.display = "flex";
    auth.classList.remove("hide");
    auth.classList.add("show");

    // Switch to selected form
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
    document.getElementById(formId).classList.add("active");

    document.getElementById('menu-icon').classList.remove('active');
    document.getElementById("sidebar-overlay").style.display = "none";
    document.getElementById("sidebar").style.left = "-250px";
}

function closeAuth() {
    const auth = document.getElementById("auth-container");

    auth.classList.remove("show");
    auth.classList.add("hide");

    setTimeout(() => {
        auth.style.display = "none";
    }, 250);
}

function switchForm(formId) {
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}

// // FOR USE LOGIN
// async function loginAuth() {
//     const email = document.querySelector("#login-form input[type='text']").value;
//     const password = document.querySelector("#login-form input[type='password']").value;

//     const loginBtn = document.querySelector("#login-form button");
//     loginBtn.disabled = true;
//     loginBtn.textContent = "Logging in...";

//     try {
//         const res = await fetch("http://localhost:8080/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await res.json();

//         if (!res.ok || data.status === "error") {
//             alert(data.message || "Invalid login");
//             loginBtn.disabled = false;
//             loginBtn.textContent = "Login";
//             return;
//         }

//         // SUCCESS — Save JWT Token
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Optional popup close
//         closeAuth();

//         // Optional redirect
//         window.location.href = "/dashboard.html";

//     } catch (err) {
//         console.error("Login error:", err);
//         alert("Cannot connect to server");
//     }

//     loginBtn.disabled = false;
//     loginBtn.textContent = "Login";
// }


// ===========================
// AUTH POPUP OPEN/CLOSE
// ===========================
// function openAuth(type) {
//     const container = document.getElementById("auth-container");
//     const flipCard = document.querySelector(".flip-card");

//     if (!container || !flipCard) return;

//     container.classList.add("active");

//     if (type === "login") {
//         flipCard.classList.remove("flipped");
//     } else if (type === "register") {
//         flipCard.classList.add("flipped");
//     }
// }

// function closeAuth() {
//     document.getElementById("auth-container").classList.remove("active");
// }


// ===========================
// LOGIN / REGISTER HANDLERS
// ===========================
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// if (loginForm) {
//     loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         alert("submit user");
//         await loginUser(loginForm);
//     });
// }

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await registerUser();
    });
}


// ===========================
//  LOGIN REQUEST
// ===========================
// async function loginUser(logform) {
//     const email = document.getElementById("loginEmail").value.trim();
//     const password = document.getElementById("loginPassword").value.trim();

//     const form = new FormData(logform);

//     const body = { email : form.get("email") ,
//         password : form.get("password") };

//     console.log(form.get("email"));
//     console.log(form.get("password"));

//     console.log(body);


//     try {
//         const res = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/login", {
//             method: "POST",
//             // headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             // body: JSON.stringify(body)
//         });

//         const responseData = await res.json();
//         const data = await responseData.data;
//         console.log(data);
//         console.log(responseData);

//         if (!res.ok) {
//             showMessage("login-message", responseData.message || "Login failed", "error");
//             return;
//         }

//         // Save JWT token
//         localStorage.setItem("token", data.token);

//         showMessage("login-message", "Login successful!", "success");

//         setTimeout(() => {
//             closeAuth();
//             window.location.reload();
//         }, 900);

//     } catch (err) {
//         showMessage("login-message", "Server unreachable", "error");
//     }
// }


async function loginUser(logform) {
    const form = new FormData(logform);

    try {
        const res = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/login", {
            method: "POST",
            body: form  // multipart/form-data
        });

        const response = await res.json();

        console.log(response); // 🔍 See full backend response

        if (!res.ok || response.success !== true) {
            showMessage("login-message", response.message || "Login failed", "error");
            return;
        }

        const data = response.data;

        // Save user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);

        const name = localStorage.getItem("username");
        alert(name);
        const token = localStorage.getItem("token");
        alert(token);

        if (token) {
            console.log("User logged in.");
        } else {
            console.log("User NOT logged in.");
        }


        showMessage("login-message", "Login successful!", "success");

        setTimeout(() => {
            closeAuth();
            // window.location.reload();
            if (data.role == "admin") {
                window.location.href = "/admin/dashboard.html";
            } else {
                window.location.href = "/faculty/dashboard.html"
            }
        }, 900);

    } catch (err) {
        console.error(err);
        showMessage("login-message", "Server unreachable", "error");
    }
}



// ===========================
//  REGISTER REQUEST
// ===========================
async function registerUser() {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    const body = { name, email, password };

    try {
        const res = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            showMessage("register-message", data.message || "Registration failed", "error");
            return;
        }

        showMessage("register-message", "Registration successful!", "success");

        setTimeout(() => {
            openAuth("login"); // flip back
        }, 900);

    } catch (err) {
        showMessage("register-message", "Server unreachable", "error");
    }
}


// ===========================
// DISPLAY MESSAGE
// ===========================
function showMessage(id, message, type) {
    const box = document.getElementById(id);
    if (!box) return;

    box.textContent = message;
    box.style.color = type === "success" ? "limegreen" : "#ff4444";
    box.style.visibility = "visible";

    setTimeout(() => {
        box.style.visibility = "hidden";
    }, 3000);
}
