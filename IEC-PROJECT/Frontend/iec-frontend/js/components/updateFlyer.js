
// import { apiGetAuthPost } from "../api/api.js";
// import { IMG_URL_BASE } from "../api/base_api.js";

// // -----------------------------
// // Inject CSS
// const style = document.createElement("style");
// style.textContent = `
// .wrap {
//   width: 100%;
//   margin: 0 auto;
//   display: none;
//   grid-template-columns: 1fr 460px;
//   align-items: start;
//   gap: 20px;
//   padding-top: 40px;
//   margin-left: 20px;
//   margin-right: 20px;
// }

// .wrap .panel {
//   display: flex;
//   flex-direction: column;
//   background: var(--card-color);
//   padding: 18px;
//   border-radius: 12px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
// }

// .wrap .panel h3, .wrap .panel h2 {
//   font-size: 20px;
//   margin: 0 0 12px 0;
//   font-weight: 700;
// }

// .wrap .panel p {
//   color: var(--muted-color);
//   font-size: 13px;
//   margin-top: 10px;
// }

// .wrap .panel label {
//   font-size: .9rem;
//   margin-top: 10px;
//   margin-bottom: 5px;
// }

// .wrap .panel select,
// .wrap .panel input[type="text"],
// .wrap .panel textarea {
//   width: 100%;
//   background: #fff;
//   border: 1px solid #ccc;
//   padding: 8px 10px;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 13px;
// }

// .wrap .panel textarea {
//   width: 100%;
//   resize: none;
//   overflow: hidden;
// }

// .wrap .panel .post-btn-box {
//   margin-top: 40px;
// }

// .wrap .panel .post-btn-box .postBtn {
//   width: 235px;
//   font-size: .9rem;
//   font-weight: bold;
//   color: #fff;
//   padding: 5px 8px;
//   border: none;
//   border-radius: 6px;
//   background: blue;
//   cursor: pointer;
// }

// .wrap .panel .post-btn-box .postBtn:hover {
//   background: darkblue;
// }

// .wrap .right {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// .wrap .right .preview {
//   max-width: 100%;
//   min-width: 450px;
//   display: flex;
//   flex-direction: column;
//   background: var(--card-color);
//   padding: 18px;
//   border-radius: 12px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
// }

// .wrap .right .preview .livePreview {
//   display: flex;
//   flex-direction: column;
// }

// .wrap .right .preview .livePreview .images{
//   width: 100%;
//   height: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   overflow: hidden;
// }

// .wrap .right .preview .livePreview .images img {
//   max-width: 100%;
//   min-width: 200px;
//   height: 200px;
// }

// .wrap .right .preview .livePreview .images .carousel {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .wrap .right .preview .livePreview .images .carousel .carousel-btn {
//   width: 20px;
//   height: 40px;
//   font-size: 2.5rem;
//   margin: 8px;
//   border: none;
//   background: transparent;
//   text-align: center;
//   cursor: pointer;
// }

// .wrap .right .preview .livePreview .pvCategory strong {
//   font-size: .8rem;
// }

// .wrap .right .preview .livePreview #pvDesc p {
//   font-size: .9rem;
//   white-space: pre-wrap;
//   margin-top: 20px;
// }
// `;
// document.head.appendChild(style);

// // -----------------------------
// // Main Update Flyer Function
// export function openUpdateFlyer(flyerData) {
//     const container = document.getElementById("update-flyer-view");
//     container.innerHTML = "";
//     container.style.display = "flex";

//     const wrap = document.createElement("div");
//     wrap.className = "wrap";
//     container.appendChild(wrap);

//     // Create panel form
//     const panel = document.createElement("div");
//     panel.className = "panel";

//     const h2 = document.createElement("h2");
//     h2.textContent = "Update Flyer";
//     panel.appendChild(h2);

//     // Image input
//     const imgLabel = document.createElement("label");
//     imgLabel.textContent = "Upload Images (1–3)";
//     const imgInput = document.createElement("input");
//     imgInput.type = "file";
//     imgInput.multiple = true;
//     imgInput.accept = "image/*";

//     panel.appendChild(imgLabel);
//     panel.appendChild(imgInput);

//     // Category select
//     const catLabel = document.createElement("label");
//     catLabel.textContent = "Category";
//     const category = document.createElement("select");
//     category.innerHTML = `
//         <option value="">-- Select a category --</option>
//         <option value="Nature Preservation">Nature Preservation</option>
//         <option value="Disaster Preparedness">Disaster Preparedness</option>
//         <option value="Climate Policy">Climate Policy</option>
//         <option value="Awareness and Education">Awareness & Education</option>
//     `;
//     category.value = flyerData.category;

//     panel.appendChild(catLabel);
//     panel.appendChild(category);

//     // Title input
//     const titleLabel = document.createElement("label");
//     titleLabel.textContent = "Title";
//     const titleInput = document.createElement("input");
//     titleInput.type = "text";
//     titleInput.value = flyerData.title;

//     panel.appendChild(titleLabel);
//     panel.appendChild(titleInput);

//     // Description textarea
//     const descLabel = document.createElement("label");
//     descLabel.textContent = "Descriptions";
//     const descInput = document.createElement("textarea");
//     descInput.value = flyerData.description;

//     panel.appendChild(descLabel);
//     panel.appendChild(descInput);

//     // Save button
//     const postBtnBox = document.createElement("div");
//     postBtnBox.className = "post-btn-box";
//     const saveBtn = document.createElement("button");
//     saveBtn.className = "postBtn";
//     saveBtn.textContent = "Update Flyer";
//     postBtnBox.appendChild(saveBtn);
//     panel.appendChild(postBtnBox);

//     wrap.appendChild(panel);

//     // Live preview
//     const preview = document.createElement("div");
//     preview.className = "right";
//     preview.innerHTML = `
//         <div class="preview">
//             <h3>Live Preview</h3>
//             <div id="livePreview" class="livePreview">
//                 <div class="images"></div>
//                 <div id="pvTitle"></div>
//                 <div class="pvCategory"></div>
//                 <div id="pvDesc"></div>
//             </div>
//         </div>
//     `;
//     wrap.appendChild(preview);

//     const pvImages = preview.querySelector(".images");
//     const pvCategory = preview.querySelector(".pvCategory");
//     const pvTitle = preview.querySelector("#pvTitle");
//     const pvDesc = preview.querySelector("#pvDesc");

//     // ------------------ Preview functions ------------------
//     function updatePreviewImages() {
//         pvImages.replaceChildren();
//         const files = imgInput.files;

//         if (!files || files.length === 0) {
//             if (flyerData.images && flyerData.images.length > 0) {
//                 const count = flyerData.images.length;
//                 if (count === 1) {
//                     const img = document.createElement("img");
//                     img.src = IMG_URL_BASE + flyerData.images[0].imagePath;
//                     img.className = "single-preview-image";
//                     pvImages.appendChild(img);
//                     return;
//                 }

//                 // Carousel
//                 let index = 0;
//                 const carousel = document.createElement("div");
//                 carousel.className = "carousel";

//                 const img = document.createElement("img");
//                 img.className = "carousel-img";
//                 img.src = IMG_URL_BASE + flyerData.images[index].imagePath;

//                 const prevBtn = document.createElement("button");
//                 prevBtn.className = "carousel-btn prev-btn";
//                 prevBtn.textContent = "❮";

//                 const nextBtn = document.createElement("button");
//                 nextBtn.className = "carousel-btn next-btn";
//                 nextBtn.textContent = "❯";

//                 prevBtn.onclick = () => {
//                     index = (index - 1 + count) % count;
//                     img.src = IMG_URL_BASE + flyerData.images[index].imagePath;
//                 };
//                 nextBtn.onclick = () => {
//                     index = (index + 1) % count;
//                     img.src = IMG_URL_BASE + flyerData.images[index].imagePath;
//                 };

//                 carousel.appendChild(prevBtn);
//                 carousel.appendChild(img);
//                 carousel.appendChild(nextBtn);
//                 pvImages.appendChild(carousel);
//             } else {
//                 const note = document.createElement("p");
//                 note.textContent = "No images available";
//                 pvImages.appendChild(note);
//             }
//             return;
//         }

//         // New images
//         const count = files.length;
//         if (count === 1) {
//             const img = document.createElement("img");
//             img.src = URL.createObjectURL(files[0]);
//             img.className = "single-preview-image";
//             pvImages.appendChild(img);
//             return;
//         }

//         let index = 0;
//         const carousel = document.createElement("div");
//         carousel.className = "carousel";

//         const img = document.createElement("img");
//         img.className = "carousel-img";
//         img.src = URL.createObjectURL(files[index]);

//         const prevBtn = document.createElement("button");
//         prevBtn.className = "carousel-btn prev-btn";
//         prevBtn.textContent = "❮";

//         const nextBtn = document.createElement("button");
//         nextBtn.className = "carousel-btn next-btn";
//         nextBtn.textContent = "❯";

//         prevBtn.onclick = () => {
//             index = (index - 1 + count) % count;
//             img.src = URL.createObjectURL(files[index]);
//         };
//         nextBtn.onclick = () => {
//             index = (index + 1) % count;
//             img.src = URL.createObjectURL(files[index]);
//         };

//         carousel.appendChild(prevBtn);
//         carousel.appendChild(img);
//         carousel.appendChild(nextBtn);
//         pvImages.appendChild(carousel);
//     }

//     function updatePreviewTitle() {
//         pvTitle.replaceChildren();
//         const h3 = document.createElement("h3");
//         h3.textContent = titleInput.value.trim() || "No title";
//         pvTitle.appendChild(h3);
//     }

//     function updatePreviewCategory() {
//         pvCategory.replaceChildren();
//         const strong = document.createElement("strong");
//         strong.textContent = category.value.trim() || "No Category";
//         pvCategory.appendChild(strong);
//     }

//     function updatePreviewDescriptions() {
//         pvDesc.replaceChildren();
//         if (!descInput.value) {
//             const p = document.createElement("p");
//             p.textContent = "No description yet";
//             pvDesc.appendChild(p);
//             return;
//         }
//         const p = document.createElement("p");
//         p.textContent = descInput.value;
//         pvDesc.appendChild(p);
//     }

//     // Live preview events
//     imgInput.addEventListener("change", updatePreviewImages);
//     titleInput.addEventListener("input", updatePreviewTitle);
//     category.addEventListener("change", updatePreviewCategory);
//     descInput.addEventListener("input", updatePreviewDescriptions);

//     // Initial preview render
//     updatePreviewImages();
//     updatePreviewTitle();
//     updatePreviewCategory();
//     updatePreviewDescriptions();

//     // ------------------ Save / Update ------------------
//     saveBtn.addEventListener("click", async () => {
//         const updatedData = {
//             title: titleInput.value.trim(),
//             description: descInput.value.trim(),
//             category: category.value
//         };

//         try {
//             let result;
//             const files = imgInput.files;

//             if (files.length > 0) {
//                 const formData = new FormData();
//                 formData.append("title", updatedData.title);
//                 formData.append("description", updatedData.description);
//                 formData.append("category", updatedData.category);
//                 Array.from(files).forEach(file => formData.append("images", file));
//                 result = await apiGetAuthPost(`flyers/${flyerData.id}`, formData);
//             } else {
//                 // No new images, send JSON data
//                 const formData = new FormData();
//                 formData.append("title", updatedData.title);
//                 formData.append("description", updatedData.description);
//                 formData.append("category", updatedData.category);
//                 result = await apiGetAuthPost(`flyers/${flyerData.id}`, formData);
//             }

//             if (result.success) {
//                 alert("Flyer updated successfully!");
//                 container.style.display = "none";
//             } else {
//                 alert(result.message || "Failed to update flyer.");
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Error updating flyer.");
//         }
//     });
// }


import { apiGetAuthPost } from "../api/api.js";
import { IMG_URL_BASE } from "../api/base_api.js";

// -----------------------------
// Inject CSS
// const style = document.createElement("style");
// style.textContent = `
// .wrap {
//   width: 90%;
//   display: grid;
//   grid-template-columns: 1fr 460px;
//   gap: 20px;
//   padding: 40px 20px 0 20px;
//   box-sizing: border-box;
// }

// @media (max-width: 950px) {
//   .wrap {
//     grid-template-columns: 1fr;
//   }
// }

// .wrap .panel {
//   display: flex;
//   flex-direction: column;
//   background: var(--card-color);
//   padding: 18px;
//   border-radius: 12px;
//   box-shadow: 0 0 10px rgba(0,0,0,0.2);
// }

// .wrap .panel h2, .wrap .panel h3 {
//   font-size: 20px;
//   margin: 0 0 12px 0;
//   font-weight: 700;
// }

// .wrap .panel p {
//   color: var(--muted-color);
//   font-size: 13px;
//   margin-top: 10px;
// }

// .wrap .panel label {
//   font-size: .9rem;
//   margin-top: 10px;
//   margin-bottom: 5px;
// }

// .wrap .panel select,
// .wrap .panel input[type="text"],
// .wrap .panel textarea {
//   width: 100%;
//   background: #fff;
//   border: 1px solid #ccc;
//   padding: 8px 10px;
//   border-radius: 8px;
//   font-size: 13px;
//   box-sizing: border-box;
// }

// .wrap .panel textarea {
//   resize: none;
//   overflow: hidden;
// }

// .wrap .panel .post-btn-box {
//   margin-top: 40px;
// }

// .wrap .panel .post-btn-box .postBtn {
//   width: 235px;
//   font-size: .9rem;
//   font-weight: bold;
//   color: #fff;
//   padding: 5px 8px;
//   border: none;
//   border-radius: 6px;
//   background: blue;
//   cursor: pointer;
// }

// .wrap .panel .post-btn-box .postBtn:hover {
//   background: darkblue;
// }

// .wrap .right {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// .wrap .right .preview {
//   max-width: 100%;
//   min-width: 450px;
//   display: flex;
//   flex-direction: column;
//   background: var(--card-color);
//   padding: 18px;
//   border-radius: 12px;
//   box-shadow: 0 0 10px rgba(0,0,0,0.2);
// }

// .wrap .right .preview .livePreview {
//   display: flex;
//   flex-direction: column;
// }

// .wrap .right .preview .livePreview .images{
//   width: 100%;
//   height: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 20px 0;
//   overflow: hidden;
// }

// .wrap .right .preview .livePreview .images img {
//   max-width: 100%;
//   min-width: 200px;
//   height: 200px;
//   object-fit: cover;
// }

// .wrap .right .preview .livePreview .images .carousel {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .wrap .right .preview .livePreview .images .carousel .carousel-btn {
//   width: 20px;
//   height: 40px;
//   font-size: 2.5rem;
//   margin: 0 8px;
//   border: none;
//   background: transparent;
//   cursor: pointer;
// }

// .wrap .right .preview .livePreview .pvCategory strong {
//   font-size: .8rem;
// }

// .wrap .right .preview .livePreview #pvDesc p {
//   font-size: .9rem;
//   white-space: pre-wrap;
//   margin-top: 20px;
// }
// `;
// document.head.appendChild(style);

// -----------------------------
// Main Update Flyer Function
export function openUpdateFlyer(flyerData) {
    const container = document.getElementById("update-flyer-view");
    container.innerHTML = "";
    container.style.display = "flex";

    // Create wrap inside container
    const wrap = document.createElement("div");
    wrap.className = "wrap";
    container.appendChild(wrap);

    // --- Panel Form ---
    const panel = document.createElement("div");
    panel.className = "panel";

    const h2 = document.createElement("h2");
    h2.textContent = "Update Flyer";
    panel.appendChild(h2);

    // Image input
    const imgLabel = document.createElement("label");
    imgLabel.textContent = "Upload Images (1–3)";
    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.multiple = true;
    imgInput.accept = "image/*";
    panel.appendChild(imgLabel);
    panel.appendChild(imgInput);

    // Category
    const catLabel = document.createElement("label");
    catLabel.textContent = "Category";
    const category = document.createElement("select");
    category.innerHTML = `
        <option value="">-- Select a category --</option>
        <option value="Nature Preservation">Nature Preservation</option>
        <option value="Disaster Preparedness">Disaster Preparedness</option>
        <option value="Climate Policy">Climate Policy</option>
        <option value="Awareness and Education">Awareness & Education</option>
    `;
    category.value = flyerData.category;
    panel.appendChild(catLabel);
    panel.appendChild(category);

    // Title
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = flyerData.title;
    panel.appendChild(titleLabel);
    panel.appendChild(titleInput);

    // Description
    const descLabel = document.createElement("label");
    descLabel.textContent = "Descriptions";
    const descInput = document.createElement("textarea");
    descInput.value = flyerData.description;
    descInput.style.height = "auto";
    panel.appendChild(descLabel);
    panel.appendChild(descInput);

    descInput.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + 'px';
    })

    // Save button
    const postBtnBox = document.createElement("div");
    postBtnBox.className = "post-btn-box";
    const saveBtn = document.createElement("button");
    saveBtn.className = "postBtn";
    saveBtn.textContent = "Update Flyer";
    postBtnBox.appendChild(saveBtn);
    panel.appendChild(postBtnBox);

    wrap.appendChild(panel);

    // --- Preview ---
    const preview = document.createElement("div");
    preview.className = "right";
    preview.innerHTML = `
        <div class="preview">
            <h3>Live Preview</h3>
            <div id="livePreview" class="livePreview">
                <div class="images"></div>
                <div id="pvTitle"></div>
                <div class="pvCategory"></div>
                <div id="pvDesc"></div>
            </div>
        </div>
    `;
    wrap.appendChild(preview);

    // --- Preview Elements ---
    const pvImages = preview.querySelector(".images");
    const pvCategory = preview.querySelector(".pvCategory");
    const pvTitle = preview.querySelector("#pvTitle");
    const pvDesc = preview.querySelector("#pvDesc");

    // --- Functions for Preview ---
    function updatePreviewImages() {
        pvImages.replaceChildren();
        const files = imgInput.files;

        if (files && files.length > 0) {
            if (files.length === 1) {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(files[0]);
                pvImages.appendChild(img);
            } else {
                let index = 0;
                const carousel = document.createElement("div");
                carousel.className = "carousel";
                const img = document.createElement("img");
                img.src = URL.createObjectURL(files[index]);
                img.className = "carousel-img";

                const prevBtn = document.createElement("button");
                prevBtn.className = "carousel-btn prev-btn";
                prevBtn.textContent = "❮";
                const nextBtn = document.createElement("button");
                nextBtn.className = "carousel-btn next-btn";
                nextBtn.textContent = "❯";

                prevBtn.onclick = () => { index = (index - 1 + files.length) % files.length; img.src = URL.createObjectURL(files[index]); };
                nextBtn.onclick = () => { index = (index + 1) % files.length; img.src = URL.createObjectURL(files[index]); };

                carousel.appendChild(prevBtn);
                carousel.appendChild(img);
                carousel.appendChild(nextBtn);
                pvImages.appendChild(carousel);
            }
        } else if (flyerData.images && flyerData.images.length > 0) {
            if (flyerData.images.length === 1) {
                const img = document.createElement("img");
                img.src = IMG_URL_BASE + flyerData.images[0].imagePath;
                pvImages.appendChild(img);
            } else {
                let index = 0;
                const carousel = document.createElement("div");
                carousel.className = "carousel";
                const img = document.createElement("img");
                img.src = IMG_URL_BASE + flyerData.images[index].imagePath;
                img.className = "carousel-img";

                const prevBtn = document.createElement("button");
                prevBtn.className = "carousel-btn prev-btn";
                prevBtn.textContent = "❮";
                const nextBtn = document.createElement("button");
                nextBtn.className = "carousel-btn next-btn";
                nextBtn.textContent = "❯";

                prevBtn.onclick = () => { index = (index - 1 + flyerData.images.length) % flyerData.images.length; img.src = IMG_URL_BASE + flyerData.images[index].imagePath; };
                nextBtn.onclick = () => { index = (index + 1) % flyerData.images.length; img.src = IMG_URL_BASE + flyerData.images[index].imagePath; };

                carousel.appendChild(prevBtn);
                carousel.appendChild(img);
                carousel.appendChild(nextBtn);
                pvImages.appendChild(carousel);
            }
        } else {
            const note = document.createElement("p");
            note.textContent = "No images available";
            pvImages.appendChild(note);
        }
    }

    function updatePreviewTitle() {
        // const h3 = document.createElement("h3");

        //  pvTitle.textContent = titleInput.value.trim() || "No title"; 
        pvTitle.replaceChildren();

        const h3 = document.createElement("h3");
        const value = titleInput.value.trim();

        h3.textContent = value ? value : "No title";

        pvTitle.appendChild(h3);
    }

    function updatePreviewCategory() {
        //  pvCategory.textContent = category.value.trim() || "No Category"; 
        pvCategory.replaceChildren();

        const value = category.value.trim();
        const strong = document.createElement("strong");

        strong.textContent = value ? value : "No Category";

        pvCategory.appendChild(strong);
    }
    function updatePreviewDescriptions() {
        // pvDesc.textContent = descInput.value.trim() || "No description yet"; 
        pvDesc.replaceChildren();

        if (descInput.value.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "No description yet";
            pvDesc.appendChild(empty);
            return;
        }

        const p = document.createElement("p");
        p.textContent = descInput.value;
        pvDesc.appendChild(p);
    }

    // --- Event Listeners ---
    imgInput.addEventListener("change", updatePreviewImages);
    titleInput.addEventListener("input", updatePreviewTitle);
    category.addEventListener("change", updatePreviewCategory);
    descInput.addEventListener("input", updatePreviewDescriptions);

    // Initial render
    updatePreviewImages();
    updatePreviewTitle();
    updatePreviewCategory();
    updatePreviewDescriptions();

    // --- Save / Update ---
    saveBtn.addEventListener("click", async () => {
        const updatedData = {
            title: titleInput.value.trim(),
            description: descInput.value.trim(),
            category: category.value
        };

        try {
            const formData = new FormData();
            formData.append("title", updatedData.title);
            formData.append("description", updatedData.description);
            formData.append("category", updatedData.category);
            Array.from(imgInput.files).forEach(file => formData.append("images", file));

            const result = await apiGetAuthPost(`flyers/${flyerData.id}`, formData);

            if (result.success) {
                alert("Flyer updated successfully!");
                container.style.display = "none";
                // document.getElementById('pending-flyer-list').style.display = "block";
                // document.getElementById('approved-flyer-list').style.display = "block";
                // document.getElementById('declined-flyer-list').style.display = "block";
                window.location.reload();
            } else {
                alert(result.message || "Failed to update flyer.");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating flyer.");
        }
    });
}
