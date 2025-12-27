// Base URL of your backend
// const API_BASE = "http://192.168.68.51/iec/myapi/v1";
// const API_BASE = "http://192.168.68.51:8080/iec-server/api/v1";
const API_BASE = "https://iec-api.onrender.com/iec-server/api/v1";
// const API_BASE = "http://192.168.68.52/iec-server/public/index.php";
// const API_BASE = "http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php";

export async function apiPost(endpoint, data) {
    
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        body: data
    });

    // Try to parse JSON
    try {
        const result = await response.json();
        return result;
    } catch (err) {
        return { error: "Invalid JSON response from server" };
    }
}

// API GET
export async function apiGet(endpoint) {
    const response = await fetch(`${API_BASE}/${endpoint}`);
    try {
        return await response.json();
    } catch {
        return { error: "Invalid JSON response" };
    }
}

// GET AUTHENTICATION
export async function apiGetAuth(endpoint) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    try {
        return await response.json();
    } catch {
        return { error: "Invalid JSON response" };
    }
}


// GET ALL THE USERS AND FLYERS (ADMIN) AND FLYERS (FACULTY) VIA TOKEN
export async function apiGetAuthPost(endpoint, form) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: form
    });

    try {
        return await response.json();
    } catch {
        return { error: "Invalid JSON response" };
    }
}

// GET ALL THE PENDING FLYERS
export async function apiGetFlyers(endpoint, status) {
    const token = localStorage.getItem("token");
    if (status === "pending") {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    try {
        return await response.json();
    } catch {
        return { error: "Invalid JSON response" };
    }
}

// Update flyers
// export async function apiUpdate(endpoint, data, isFormData = false) {
//     try {
//         const token = localStorage.getItem("token");
//         const headers = { "Authorization": `Bearer ${token}` };

//         let body;
//         if (!isFormData) {
//             headers["Content-Type"] = "application/json";
//             body = JSON.stringify(data);
//         } else {
//             body = data; // FormData
//         }

//         const response = await fetch(`${API_BASE}/${endpoint}`, {
//             method: "POST", // changed from PUT to POST
//             headers,
//             body
//         });

//         try {
//             return await response.json();
//         } catch {
//             return { error: "Invalid JSON response" };
//         }
//     } catch (error) {
//         console.error("API update error:", error);
//         return { status: "error", message: "Network error" };
//     }
// }


// Delete flyers
export async function apiDelete(endpoint) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        return result; // return to caller
    } catch (error) {
        console.error("API delete error:", error);
        return { status: "error", message: "Network error" };
    }
}

// Declined flyers
export async function apiDeclineFlyer(endpoint) {
    const confirmDecline = confirm("Are you sure you want to decline this flyer?");
    if (!confirmDecline) return { cancelled: true };

    
    const formData = new FormData();
    formData.append("status", "declined");

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            // body: JSON.stringify({
            //     status: "declined"
            // })
            body: formData
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("API decline error:", error);
        return { success: false, message: "Network error" };
    }
}


// Approved flyers
export async function apiApproveFlyer(endpoint) {
    const confirmDecline = confirm("Are you sure you want to approved this flyer?");
    if (!confirmDecline) return { cancelled: true };

    const formData = new FormData();
    formData.append("status", "approved");

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            // body: JSON.stringify({
            //     status: "approved"
            // })
            body: formData
        });

        const result = await response.json();

        return result; // return to caller
    } catch (error) {
        console.error("API decline error:", error);
        return { status: "error", message: "Network error" };
    }
}


// Logout api
export async function apiLogout(endpoint) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            status: "offline"
        })
    });

    try {
        return await response.json();
    } catch {
        return { error: "Invalid JSON response" };
    }
}