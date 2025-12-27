import { apiDeclineFlyer, apiDelete } from "../../api/api.js";
import { IMG_URL_BASE } from "../../api/base_api.js";
import { flyerFullview } from "../../components/createFullview.js";
import { openUpdateFlyer } from "../../components/updateFlyer.js";

export function createFlyerElems(flyerData, listId) {
    const flyerContainer = document.getElementById(`${listId}`);
    const cardWrapper = document.createElement('div');
    cardWrapper.className = "card-wrapper";
    const flyerCard = document.createElement('div');
    flyerCard.className = "flyer-card";
    const carousel = document.createElement('div');
    carousel.className = "carousel";
    const carousel_inner = document.createElement('div');
    carousel_inner.className = "carousel-inner";

    let imgCount = 1;
    // Flyer images
    flyerData.images.forEach(image => {
        let imgName = `img_${imgCount}`;
        let flyerImage = document.createElement('img');

        flyerImage.alt = imgName
        flyerImage.src = IMG_URL_BASE + image.imagePath;

        carousel_inner.appendChild(flyerImage);

        if (imgName === "img_1") {
            flyerImage.className = "active";
        }

        imgCount++;
    });

    // Create a button
    const prevBtn = document.createElement('button');
    prevBtn.className = "carousel-prev";

    // Create SVG namespace
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");

    // Create path for left arrow
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M15 18L9 12l6-6"); // left arrow path
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");

    svg.appendChild(path);
    prevBtn.appendChild(svg);

    // Do the same for next button
    const nextBtn = document.createElement('button');
    nextBtn.className = "carousel-next";
    const svgNext = document.createElementNS(svgNS, "svg");
    svgNext.setAttribute("width", "24");
    svgNext.setAttribute("height", "24");
    svgNext.setAttribute("viewBox", "0 0 24 24");
    const pathNext = document.createElementNS(svgNS, "path");
    pathNext.setAttribute("d", "M9 6l6 6-6 6"); // right arrow path
    pathNext.setAttribute("stroke", "currentColor");
    pathNext.setAttribute("stroke-width", "2");
    pathNext.setAttribute("fill", "none");
    svgNext.appendChild(pathNext);
    nextBtn.appendChild(svgNext);

    // Append buttons to your carousel container
    carousel.appendChild(carousel_inner);

    if (flyerData.images.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);

    // Flyer content
    const card_content = document.createElement('div');
    card_content.className = "card-content";

    // Category
    const category = document.createElement('strong');
    category.textContent = flyerData.category;

    // Title
    const title = document.createElement('h3');
    title.className = "card-title";
    title.textContent = flyerData.title;

    // Description
    const description = document.createElement('p');
    description.className = "card-description";
    description.textContent = flyerData.description;

    card_content.appendChild(category);
    card_content.appendChild(title);
    card_content.appendChild(description);

    // Read More button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.id = "read-more-btn";
    readMoreBtn.textContent = "Read more";
    readMoreBtn.addEventListener('click', function () {
        flyerFullview(flyerData);
    });

    // Author container
    const author_container = document.createElement('div');
    author_container.className = "author-container";

    // Created by (Name of author)
    const createdByP = document.createElement('p');
    createdByP.textContent = "Created By: ";
    const createdBy = document.createElement('strong');
    createdBy.className = "createdBy";
    createdBy.textContent = flyerData.createdBy;

    createdByP.appendChild(createdBy);

    // Created At (Date of creation)
    const createdAtP = document.createElement('p');
    createdAtP.textContent = "Created At: ";
    const createdAt = document.createElement('strong');
    createdAt.className = "createdAt";
    createdAt.textContent = flyerData.createdAt;

    createdAtP.appendChild(createdAt);

    author_container.appendChild(createdByP);
    author_container.appendChild(createdAtP);

    flyerCard.appendChild(carousel);
    flyerCard.appendChild(card_content);
    flyerCard.appendChild(readMoreBtn);
    flyerCard.appendChild(author_container);

    cardWrapper.appendChild(flyerCard);



    if (flyerData.record.status === "approved") {
        const actionBox = document.createElement('div');
        actionBox.className = "action-box";

        const updateBtn = document.createElement('button');
        updateBtn.type = "button";
        updateBtn.id = "update-btn";
        updateBtn.className = "update-btn";
        updateBtn.textContent = "Update";

        updateBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Open the prefilled update form
            openUpdateFlyer(flyerData);
            document.getElementById('update-flyer-view').style.display = "flex";
            document.getElementById('no-flyers-notice').style.display = "none";
            document.getElementById('approved-flyer-list').style.display = "none";
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.id = "delete-btn";
        deleteBtn.textContent = "Delete"

        deleteBtn.addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to delete this flyer?");
            if (!confirmDelete) return { cancelled: true };

            const result = await apiDelete(`flyers/${flyerData.id}`);

            if (!result || result.cancelled) return;

            if (result.success === true || result.status === 200) {
                alert(result.message || "Flyer deleted successfully!");
            } else {
                alert(result.message || "Failed to delete flyer.");
            }
        });
        
        actionBox.appendChild(updateBtn);
        actionBox.appendChild(deleteBtn);
        cardWrapper.appendChild(actionBox);
    }
    else if (flyerData.record.status === "pending") {
        // Update & Decline buttons
        const actionBox = document.createElement('div');
        actionBox.className = "action-box";

        const updateBtn = document.createElement('button');
        updateBtn.type = "button";
        updateBtn.id = "update-btn";
        updateBtn.className = "update-btn";
        updateBtn.textContent = "Update";

        updateBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Open the prefilled update form
            openUpdateFlyer(flyerData);
            document.getElementById('update-flyer-view').style.display = "flex";
            document.getElementById('no-flyers-notice').style.display = "none";
            document.getElementById('pending-flyer-list').style.display = "none";
        });


        const declineBtn = document.createElement('button');
        declineBtn.id = "cancel-btn";
        declineBtn.textContent = "Cancel";

        declineBtn.addEventListener("click", async () => {
            const result = await apiDeclineFlyer(`flyers/${flyerData.id}`);

            if (!result || result.cancelled) return;

            if (result.success === true) {
                alert(result.message || "Flyer declined successfully!");
            } else {
                alert(result.message || "Failed to decline flyer.");
            }
        });

        actionBox.appendChild(updateBtn);
        actionBox.appendChild(declineBtn);
        cardWrapper.appendChild(actionBox);
    }
    else if (flyerData.record.status === "declined") {
        const actionBox = document.createElement('div');
        actionBox.className = "action-box";

        const updateBtn = document.createElement('button');
        updateBtn.type = "button";
        updateBtn.id = "update-btn";
        updateBtn.className = "update-btn";
        updateBtn.textContent = "Update";

        updateBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Open the prefilled update form
            openUpdateFlyer(flyerData);
            document.getElementById('update-flyer-view').style.display = "flex";
            document.getElementById('no-flyers-notice').style.display = "none";
            document.getElementById('declined-flyer-list').style.display = "none";
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.id = "delete-btn";
        deleteBtn.textContent = "Delete"

        deleteBtn.addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to delete this flyer?");
            if (!confirmDelete) return { cancelled: true };

            const result = await apiDelete(`flyers/${flyerData.id}`);

            if (!result || result.cancelled) return;

            if (result.success === true || result.status === 200) {
                alert(result.message || "Flyer deleted successfully!");
            } else {
                alert(result.message || "Failed to delete flyer.");
            }
        });
        
        actionBox.appendChild(updateBtn);
        actionBox.appendChild(deleteBtn);
        cardWrapper.appendChild(actionBox);
    }

    // Add the card to the list
    flyerContainer.appendChild(cardWrapper);


    setupCarousel(cardWrapper.querySelector('.carousel'));
}

// CAROUSEL
function setupCarousel(carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const images = carouselInner.querySelectorAll('img');
    let currentIndex = 0;

    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    function showPrevImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
    }

    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
}
