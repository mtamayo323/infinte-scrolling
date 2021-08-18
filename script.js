// Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

const count = 30;
const apiKey = 'l6UI0ftsFchRk_huwPGM7wCobvZ_r9R30HYArnbCCjA';
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Link and Photos

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArr.length;
  photosArr.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // Create img for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    // Event listener when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put img inside <a> then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(url);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load more photos

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
