// Select DOM elements
const filterButtons = document.querySelectorAll('.btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

let currentIndex = 0;
let visibleItems = [];

updateVisibleItems();

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        updateVisibleItems();
    });
});

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

//  Lightbox Functionality -

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const index = visibleItems.indexOf(item);
        if (index !== -1) {
            openLightbox(index);
        }
    });
});

function openLightbox(index) {
    currentIndex = index;
    showSlide(currentIndex);
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigation functions
function changeSlide(n) {
    currentIndex += n;
    
    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }
    
    showSlide(currentIndex);
}

function showSlide(index) {
    if (visibleItems.length === 0) return;
    
    const item = visibleItems[index];
    const img = item.querySelector('img');
    const text = item.querySelector('.text');
    
    lightboxImg.src = img.src;
    captionText.innerHTML = text ? text.innerHTML : img.alt;
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});
