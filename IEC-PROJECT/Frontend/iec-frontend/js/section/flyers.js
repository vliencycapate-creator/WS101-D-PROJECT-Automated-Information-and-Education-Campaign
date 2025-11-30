// ---------- FETCHING ALL FLYERS ----------
// async function fetchFlyers() {
//     try {
//         const response = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/flyers");
//         const flyers = await response.json();
//         // console.log(data)
//         // return data;
//         alert(flyers.data);
//         flyers.data.forEach(d => {
//             createFlyerElem(d)
//         });
//     } catch (error) {
//         console.error('Error:', error)
//     }
// }

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


// SEARCH FLYERS
let allFlyers = [];

async function fetchFlyers() {
    try {
        const response = await fetch("http://192.168.68.50/my_websites/Backends/iec-server-v-1.3/public/index.php/flyers");
        const flyers = await response.json();

        allFlyers = flyers.data; // store flyers for searching

        // Render all flyers
        const list = document.getElementById("flyer-list");
        list.innerHTML = ""; // clear first

        allFlyers.forEach(d => createFlyerElem(d));

    } catch (error) {
        console.error("Error:", error);
    }
}

function searchFlyers() {
    const category = document.getElementById("category").value.toLowerCase();
    const query = document.getElementById("search-bar").value.toLowerCase();

    const results = allFlyers.filter(f => {
        const title = f.title.toLowerCase();
        const desc = f.description.toLowerCase();
        const cat = f.category.toLowerCase();
        const author = (f.author || "").toLowerCase();

        const matchesQuery =
            title.includes(query) ||
            desc.includes(query) ||
            author.includes(query);

        const matchesCategory =
            category === "all" || cat === category;

        return matchesQuery && matchesCategory;
    });

    // RENDER RESULTS TO FLYER LIST
    const list = document.getElementById("flyer-list");
    list.innerHTML = "";

    results.forEach(flyer => createFlyerElem(flyer));
}

document.getElementById("search-btn").addEventListener("click", searchFlyers);
document.getElementById("search-bar").addEventListener("input", searchFlyers);
document.getElementById("category").addEventListener("change", searchFlyers);



fetchFlyers();