import { IMG_URL_BASE } from "../api/base_api.js";

export function createFlyer(flyerData, listId) {
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
    readMoreBtn.addEventListener("click", () => {
        document.getElementById('flyer-list').style.display = "none";
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

    // Add the card to the list
    flyerContainer.appendChild(cardWrapper);

    setupCarousel(cardWrapper.querySelector('.carousel'));
}



// -------------------------------- FULL VIEW ---------------------------------------
// export function flyerFullview(flyerData) {
//     const flyerContainer = document.getElementById("fullview-flyer");
//     const container = document.getElementById('div');
//     container.className = "fullview-container";
//     container.id = "fullview-container";

//     const cardWrapper = document.createElement('div');
//     cardWrapper.className = "card-wrapper";
//     const flyerCard = document.createElement('div');
//     flyerCard.className = "flyer-card";
//     const carousel = document.createElement('div');
//     carousel.className = "carousel";
//     const carousel_inner = document.createElement('div');
//     carousel_inner.className = "carousel-inner";

//     let imgCount = 1;
//     // Flyer images
//     flyerData.images.forEach(image => {
//         let imgName = `img_${imgCount}`;
//         let flyerImage = document.createElement('img');

//         flyerImage.alt = imgName
//         flyerImage.src = IMG_URL_BASE + image.imagePath;

//         carousel_inner.appendChild(flyerImage);

//         if (imgName === "img_1") {
//             flyerImage.className = "active";
//         }

//         imgCount++;
//     });

//     // Create a button
//     const prevBtn = document.createElement('button');
//     prevBtn.className = "carousel-prev";

//     // Create SVG namespace
//     const svgNS = "http://www.w3.org/2000/svg";
//     const svg = document.createElementNS(svgNS, "svg");
//     svg.setAttribute("width", "24");
//     svg.setAttribute("height", "24");
//     svg.setAttribute("viewBox", "0 0 24 24");

//     // Create path for left arrow
//     const path = document.createElementNS(svgNS, "path");
//     path.setAttribute("d", "M15 18L9 12l6-6"); // left arrow path
//     path.setAttribute("stroke", "currentColor");
//     path.setAttribute("stroke-width", "2");
//     path.setAttribute("fill", "none");

//     svg.appendChild(path);
//     prevBtn.appendChild(svg);

//     // Do the same for next button
//     const nextBtn = document.createElement('button');
//     nextBtn.className = "carousel-next";
//     const svgNext = document.createElementNS(svgNS, "svg");
//     svgNext.setAttribute("width", "24");
//     svgNext.setAttribute("height", "24");
//     svgNext.setAttribute("viewBox", "0 0 24 24");
//     const pathNext = document.createElementNS(svgNS, "path");
//     pathNext.setAttribute("d", "M9 6l6 6-6 6"); // right arrow path
//     pathNext.setAttribute("stroke", "currentColor");
//     pathNext.setAttribute("stroke-width", "2");
//     pathNext.setAttribute("fill", "none");
//     svgNext.appendChild(pathNext);
//     nextBtn.appendChild(svgNext);

//     // Append buttons to your carousel container
//     carousel.appendChild(carousel_inner);

//     if (flyerData.images.length <= 1) {
//         prevBtn.style.display = "none";
//         nextBtn.style.display = "none";
//     }

//     carousel.appendChild(prevBtn);
//     carousel.appendChild(nextBtn);

//     // Flyer content
//     const card_content = document.createElement('div');
//     card_content.className = "card-content";

//     // Category
//     const category = document.createElement('strong');
//     category.textContent = flyerData.category;

//     // Title
//     const title = document.createElement('h3');
//     title.className = "card-title";
//     title.textContent = flyerData.title;

//     // Description
//     const description = document.createElement('p');
//     description.className = "card-description";
//     description.textContent = flyerData.description;

//     card_content.appendChild(category);
//     card_content.appendChild(title);
//     card_content.appendChild(description);

//     // Author container
//     const author_container = document.createElement('div');
//     author_container.className = "author-container";

//     // Created by (Name of author)
//     const createdByP = document.createElement('p');
//     createdByP.textContent = "Created By: ";
//     const createdBy = document.createElement('strong');
//     createdBy.className = "createdBy";
//     createdBy.textContent = flyerData.createdBy;

//     createdByP.appendChild(createdBy);

//     // Created At (Date of creation)
//     const createdAtP = document.createElement('p');
//     createdAtP.textContent = "Created At: ";
//     const createdAt = document.createElement('strong');
//     createdAt.className = "createdAt";
//     createdAt.textContent = flyerData.createdAt;

//     createdAtP.appendChild(createdAt);

//     author_container.appendChild(createdByP);
//     author_container.appendChild(createdAtP);

//     flyerCard.appendChild(carousel);
//     flyerCard.appendChild(card_content);
//     flyerCard.appendChild(readMoreBtn);
//     flyerCard.appendChild(author_container);

//     cardWrapper.appendChild(flyerCard);
//     container.appendChild(cardWrapper);

//     // Add the card to the list
//     flyerContainer.appendChild(container);

//     setupCarousel(cardWrapper.querySelector('.carousel'));
// }



export function flyerFullview(flyerData) {

    // Create Overlay
    const overlay = document.createElement("div");
    overlay.className = "fullview-overlay";
    document.body.appendChild(overlay);

    // Create Popup Container
    const popup = document.createElement("div");
    popup.className = "fullview-popup";
    overlay.appendChild(popup);

    // Add close button
    const closeBtn = document.createElement("div");
    closeBtn.className = "fullview-close-btn";
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    closeBtn.appendChild(span1);
    closeBtn.appendChild(span2);

    popup.appendChild(closeBtn);

    const flyerCard = document.createElement('div');
    flyerCard.className = "fv-flyer-card";

    const carousel = document.createElement('div');
    carousel.className = "fv-carousel";

    const carousel_inner = document.createElement('div');
    carousel_inner.className = "carousel-inner";


    let imgCount = 1;
    flyerData.images.forEach(image => {
        let imgName = `img_${imgCount}`;
        let flyerImage = document.createElement('img');

        flyerImage.alt = imgName;
        flyerImage.src = IMG_URL_BASE + image.imagePath;

        if (imgName === "img_1") flyerImage.className = "active";

        carousel_inner.appendChild(flyerImage);
        imgCount++;
    });

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = "carousel-prev";
    prevBtn.innerHTML = "&#9664;";

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = "carousel-next";
    nextBtn.innerHTML = "&#9654;";

    if (flyerData.images.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    carousel.appendChild(carousel_inner);
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);

    // Content
    const card_content = document.createElement('div');
    card_content.className = "fv-card-content";

    const text_content = document.createElement('div');
    text_content.className = "fv-text-content";

    const title = document.createElement('h3');
    title.className = "card-title";
    title.textContent = flyerData.title;
    
    const category = document.createElement('strong');
    category.textContent = flyerData.category;

    const description = document.createElement('p');
    description.className = "fv-card-description";
    description.textContent = flyerData.description;

    text_content.appendChild(title);
    text_content.appendChild(category);
    text_content.appendChild(description);

    // Author
    const author_container = document.createElement('div');
    author_container.className = "author_container";

    const createdByP = document.createElement('p');
    createdByP.innerHTML = `Created By: <strong>${flyerData.createdBy}</strong>`;

    const createdAtP = document.createElement('p');
    createdAtP.innerHTML = `Created At: <strong>${flyerData.createdAt}</strong>`;

    author_container.appendChild(createdByP);
    author_container.appendChild(createdAtP);

    card_content.appendChild(text_content);
    card_content.appendChild(author_container);

    flyerCard.appendChild(carousel);
    flyerCard.appendChild(card_content);

    // cardWrapper.appendChild(flyerCard);
    popup.appendChild(flyerCard);

    setupCarousel(flyerCard.querySelector('.fv-carousel'));


    // Close Events
    closeBtn.addEventListener("click", () => {
        overlay.remove();
        popup.remove();
        window.location.reload();
    });

    // overlay.addEventListener("click", () => {
    //     overlay.remove();
    //     popup.remove();
    //     window.location.reload();
    // });
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



