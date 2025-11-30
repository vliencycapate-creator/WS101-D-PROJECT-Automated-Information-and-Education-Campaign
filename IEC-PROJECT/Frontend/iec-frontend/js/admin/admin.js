let allFlyers = [];

async function fetchFlyers() {
    try {
        const response = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/flyers");
        const flyers = await response.json();

        allFlyers = flyers.data; // store flyers for searching
        document.getElementById("totalFlyers").textContent = allFlyers.length;


        // Render all flyers
        const list = document.getElementById("flyer-list");
        list.innerHTML = ""; // clear first

        allFlyers.forEach(d => createFlyerElem(d));
    } catch (error) {
        console.error("Error:", error);
    }
}

// ---------- CREATING FLYER ELEMENT
function createFlyerElem(flyerData) {
    const flyerList = document.getElementById('flyer-list');    // Flyers List (parent container of flyers)
    const flyerCard = document.createElement('div');            // Flyer Card
    const imageBox = document.createElement('div');             // Image Container
    const image = document.createElement('img');                // Flyer Image
    const category = document.createElement('strong');          // Flyer Category
    const flyerContent = document.createElement('div');         // Content Container
    const title = document.createElement('h3');                 // Flyer Title
    const description = document.createElement('p');            // Flyer Description
    const readButton = document.createElement('button');        // Read More Button
    const authorBox = document.createElement('div');            // Author Container
    const createdByP = document.createElement('p');
    const createdBy = document.createElement('strong');              // Flyers Created By (Name)
    const createdAtP = document.createElement('p');
    const createdAt = document.createElement('strong');              // Flyers Created At (Date)

    // Setting Text Content
    readButton.textContent = 'Read more';
    createdByP.textContent = 'Created By: ';
    createdAtP.textContent = 'Created At: ';

    // Setting Classname
    flyerCard.className = 'flyerCard';
    imageBox.className = 'img-box';
    category.className = 'category';
    flyerContent.className = 'flyer-content';
    title.className = 'title';
    description.className = 'flyerDescription';
    readButton.className = 'flyer-btn';
    authorBox.className = 'author-container'
    createdBy.className = 'createdBy';
    createdAt.className = 'createdAt';


    flyerCard.appendChild(imageBox);
    imageBox.appendChild(image);
    flyerCard.appendChild(category);
    flyerCard.appendChild(flyerContent);
    flyerContent.appendChild(title);
    flyerContent.appendChild(description);
    flyerCard.appendChild(readButton);
    flyerCard.appendChild(authorBox);
    authorBox.appendChild(createdByP);
    createdByP.appendChild(createdBy);
    authorBox.appendChild(createdAtP);
    createdAtP.appendChild(createdAt);

    // console.log(flyerData);
    // flyerData.forEach(d => {
    //     console.log(d);
    // });
    image.src = flyerData.imgUrl;
    category.textContent = flyerData.category;
    title.textContent = flyerData.title;
    description.textContent = flyerData.description;
    createdBy.textContent = flyerData.createdBy;
    createdAt.textContent = flyerData.createdAt;

    flyerList.appendChild(flyerCard);
}

let allUsers = [];

// async function fetchUsers() {
//     try {
//         // const token = localStorage.getItem("token");
//         const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IlRhdGltIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJ0YXRpbUBnbWFpbC5jb20iLCJleHAiOiIxNzY0NTA2Mzc4In0.SGw4Li-7PwhXww37OqJr6uF_PxU0Kbw9NINN9vWS2is";

//         const response = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/users", {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });
//         const users = await response.json();
        
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

async function fetchUsers() {
    try {
        const token = localStorage.getItem("token");
        const noUserFound = document.getElementById("noUsers");
        const totalUsers = 0;
        // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IlRhdGltIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJ0YXRpbUBnbWFpbC5jb20iLCJleHAiOiIxNzY0NTA2Mzc4In0.SGw4Li-7PwhXww37OqJr6uF_PxU0Kbw9NINN9vWS2is";

        const response = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const users = await response.json();
        allUsers = users.data;
        alert(allUsers);

        if (allUsers !== null) {
            noUserFound.style.display = "none";
            users.data.forEach(u => {
                createUserElem(u);
            });
        }

        allUsers = users.data; // store flyers for searching
        document.getElementById("userCount").textContent = users.data;

        // Render all flyers
        const list = document.getElementById("userTable");
        list.innerHTML = ""; // clear first

        allUsers.forEach(d => createUserElem(d));
    } catch (error) {
        console.error("Fetch users error:", error);
    }
}

// CREATE USERS ELEM
function createUserElem(users) {
    const tbody = document.getElementById("userTable");
    const row = document.createElement("tr");
    const tdUserId = document.createElement("td");
    const tdUserName = document.createElement("td");
    const tdUserEmail = document.createElement("td");
    const tdUserRole = document.createElement("td");
    const tdDateRegistered = document.createElement("td");

    row.appendChild(tdUserId);
    row.appendChild(tdUserName);
    row.appendChild(tdUserEmail);
    row.appendChild(tdUserRole);
    row.appendChild(tdDateRegistered);

    tdUserId.textContent = users.id;
    tdUserName.textContent = users.username;
    tdUserEmail.textContent = users.email;
    tdUserRole.textContent = users.role;
    tdDateRegistered.textContent = users.createdAt;

    tbody.appendChild(row);
}


// LOGOUT
document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
};


fetchFlyers();
fetchUsers();