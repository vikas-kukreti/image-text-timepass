// some required global variables
const timepassContainer = document.querySelector('.timepass-container');
let currentImageIndex = 0, zoom = 100;
let imageList = [];
let imageSelf = null;

// zoom in function
const zoomInImage = () => {
    zoom += 20;
    imageSelf.style.backgroundSize = `${zoom}%`;
};

// zoom out function
const zoomOutImage = () => {
    zoom -= 20;
    if(zoom < 100) zoom = 100;
    imageSelf.style.backgroundSize = `${zoom}%`;
};

// zoom reset function
const zoomResetImage = () => {
    zoom = 100;
    imageSelf.style.backgroundSize = `${zoom}%`;
    imageSelf.style.backgroundPosition = '50% 50%'
};

// previous image
const prevImage = () => {
    currentImageIndex -= 1;
    if(currentImageIndex < 0) currentImageIndex = imageList.length - 1;
    imageSelf.style.backgroundImage = `url(images/${imageList[currentImageIndex]})`;
    zoomResetImage();
};

// next image
const nextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    imageSelf.style.backgroundImage = `url(images/${imageList[currentImageIndex]})`;
    zoomResetImage();
};

const setPanGestures = () => {
    let isMouseDown = false;

    imageSelf.addEventListener('mousedown', (e) => {
        isMouseDown = true;
    });
    
    imageSelf.addEventListener('mouseup', (e) => {
        isMouseDown = false;
    });

    imageSelf.addEventListener("mousemove", (e) => {
        if(!isMouseDown || zoom == 100) return;
        imageSelf.style.backgroundPositionX = (imageSelf.clientWidth / 2 - e.clientX * (zoom / 100)) + 'px';
        imageSelf.style.backgroundPositionY = (imageSelf.clientHeight / 2 - e.clientY * (zoom / 100)) + 'px' ;
    });
}

// image controls logic
const initControls = () => {
    if(imageList.length == 0) return;
    const controls = timepassContainer.querySelector('.controls');
    const prevButton = controls.querySelector('.prev');
    const nextButton = controls.querySelector('.next');
    const zoomInButton = controls.querySelector('.zoom-in');
    const zoomOutButton = controls.querySelector('.zoom-out');
    const zoomResetButton = controls.querySelector('.zoom-reset');
    
    // panning in zoomed image
    setPanGestures();

    prevButton.addEventListener('click', () => {
        prevImage();
    });
    nextButton.addEventListener('click', () => {
        nextImage();
    });
    zoomInButton.addEventListener('click', () => {
        zoomInImage();
    });
    zoomOutButton.addEventListener('click', () => {
        zoomOutImage();
    });
    zoomResetButton.addEventListener('click', () => {
        zoomResetImage();
    });
};

// initilization of time pass
const initTimepass = () => {
    imageList = timepassContainer.getAttribute('data-list').split(',');
    imageSelf = timepassContainer.querySelector('.image-self');
    imageSelf.style.backgroundImage = `url(images/${imageList[currentImageIndex]})`;
    initControls();
};

//check if element exists
if(timepassContainer) {
    initTimepass();
}