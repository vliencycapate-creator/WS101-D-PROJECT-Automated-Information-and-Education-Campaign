import { apiGetAuthPost } from "../api/api.js";

// -----------------------------
const imgInput = document.getElementById("images");
const category = document.getElementById("category");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");

const addDescBtn = document.getElementById("addDesc");
const previewBtn = document.getElementById("previewBtn");
const postBtn = document.getElementById("postBtn");

// PREVIEW ELEMENTS
const pvImages = document.querySelector("#livePreview .images");
const pvCategory = document.querySelector("#livePreview .pvCategory");
const pvTitle = document.getElementById("pvTitle");
const pvDesc = document.getElementById("pvDesc");

// Store descriptions
let descriptions = [];


// ADD DESCRIPTION
addDescBtn.addEventListener("click", () => {
    const text = descInput.value.trim();
    if (text === "") {
        alert("Description cannot be empty.");
        return;
    }

    descriptions.push(text);
    descInput.value = "";

    updatePreviewDescriptions();
});

// PREVIEW BUTTON
previewBtn.addEventListener("click", () => {
    updatePreviewImages();
    updatePreviewCategory();
    updatePreviewTitle();
    updatePreviewDescriptions();
});

// PREVIEW FUNCTIONS

// ---- Preview Images ----
function updatePreviewImages() {
    pvImages.replaceChildren(); // clear

    const files = imgInput.files;
    if (!files || files.length === 0) {
        const note = document.createElement("p");
        note.textContent = "No images selected";
        pvImages.appendChild(note);
        return;
    }

    const count = files.length;

    // If only one image
    if (count === 1) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(files[0]);
        img.className = "single-preview-image";
        pvImages.appendChild(img);
        return;
    }

    // Carousel
    let index = 0;

    const carousel = document.createElement("div");
    carousel.className = "carousel";

    const img = document.createElement("img");
    img.className = "carousel-img";
    img.src = URL.createObjectURL(files[index]);

    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-btn prev-btn";
    prevBtn.textContent = "❮";

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-btn next-btn";
    nextBtn.textContent = "❯";

    prevBtn.onclick = () => {
        index = (index - 1 + count) % count;
        img.src = URL.createObjectURL(files[index]);
    };

    nextBtn.onclick = () => {
        index = (index + 1) % count;
        img.src = URL.createObjectURL(files[index]);
    };

    carousel.appendChild(prevBtn);
    carousel.appendChild(img);
    carousel.appendChild(nextBtn);

    pvImages.appendChild(carousel);
}


// ---- Preview Category ----
function updatePreviewCategory() {
    pvCategory.replaceChildren();

    const value = category.value.trim();
    const p = document.createElement("p");
    const strong = document.createElement("strong");


    if (!value) {
        p.textContent = "No category selected";
    } else {
        p.textContent = "Category: " + `${strong.textContent = value}`;
    }

    pvCategory.appendChild(p);
}


// ---- Preview Title ----
function updatePreviewTitle() {
    pvTitle.replaceChildren();

    const p = document.createElement("p");
    const value = titleInput.value.trim();

    p.textContent = value ? value : "No title";

    pvTitle.appendChild(p);
}


// ---- Preview Descriptions ----
function updatePreviewDescriptions() {
    pvDesc.replaceChildren();

    // if (descriptions.length === 0) {
    if (descInput.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No description yet";
        pvDesc.appendChild(empty);
        return;
    }

    const p = document.createElement("p");
    p.textContent = descInput.value.trim();
    pvDesc.appendChild(p);

    // descriptions.forEach((d, i) => {
    //     const p = document.createElement("p");
    //     p.textContent = d;
    //     pvDesc.appendChild(p);
    // });
}

// LIVE UPDATE WHILE TYPING
titleInput.addEventListener("input", updatePreviewTitle);
descInput.addEventListener("input", updatePreviewDescriptions);
imgInput.addEventListener("change", updatePreviewImages);
category.addEventListener("change", updatePreviewCategory);

// POST FLYER TO BACKEND
postBtn.addEventListener("click", async () => {
    if (imgInput.files.length === 0) {
        alert("You must upload at least 1 image.");
        return;
    }
    if (!category.value.trim()) {
        alert("Category is required.");
        return;
    }
    if (!titleInput.value.trim()) {
        alert("Title is required.");
        return;
    }
    // if (descriptions.length === 0) {
    if (descInput.length === 0) {
        alert("Add at least 1 description.");
        return;
    }

    const formData = new FormData();
    for (let file of imgInput.files) {
        formData.append("images[]", file);
    }

    formData.append("category", category.value);
    formData.append("title", titleInput.value.trim());
    // formData.append("descriptions", JSON.stringify(descriptions));
    formData.append("description", descInput.value.trim());

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No token found — redirecting to login...");
            window.location.href = "/index.html";
            return;
        }

        const result = await apiGetAuthPost("flyers", formData);

        console.log(result);

        if (!result.success) {
            alert("Failed to upload flyer.");
            return;
        }

        alert("Flyer posted successfully!");
        window.location.href = "/faculty/dashboard.html";
        resetCreator();

    } catch (error) {
        console.error(error);
        alert("Error posting flyer.");
    }
});


// RESET CREATOR AFTER POST
function resetCreator() {
    imgInput.value = "";
    category.value = "";
    titleInput.value = "";
    descInput.value = "";
    descriptions = [];

    pvImages.replaceChildren();
    pvCategory.replaceChildren();
    pvTitle.replaceChildren();
    pvDesc.replaceChildren();
}
