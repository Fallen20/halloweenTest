const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const actionButton1 = document.getElementById('actionButton1');
const actionButton2 = document.getElementById('actionButton2');

let overlay1 = false;
let overlay2 = false;

const originalImages = [
    'https://ethic.es/wp-content/uploads/2023/03/imagen.jpg',
    'https://www.asturtalla.com/roseton_04.jpg',
    'https://ethic.es/wp-content/uploads/2023/03/imagen.jpg',
    'https://www.zsierra.com/images/articulos/Z6581-2.jpg'
];

const newImages = [
    'https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg',
    'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg',
    'https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg',
    'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg'
];

let initialPositions = {
    button1: { left: button1.style.left, top: button1.style.top },
    button2: { left: button2.style.left, top: button2.style.top }
};

function makeDraggable(element, imgElement, index) {
    let offsetX, offsetY;

    element.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    function mouseMoveHandler(e) {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        
        let newX = e.clientX - offsetX - rect.left;
        let newY = e.clientY - offsetY - rect.top;

        newX = Math.max(0, Math.min(newX, rect.width - element.clientWidth));
        newY = Math.max(0, Math.min(newY, rect.height - element.clientHeight));

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;

        checkOverlap(element, imgElement, index);
    }

    function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
}

function checkOverlap(button, img, index) {
    const buttonRect = button.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const overlapX = buttonRect.left < imgRect.right - 10 && buttonRect.right > imgRect.left + 10;
    const overlapY = buttonRect.top < imgRect.bottom - 10 && buttonRect.bottom > imgRect.top + 10;

    if (overlapX && overlapY) {
        button.style.backgroundImage = `url('${newImages[index * 2]}')`;
        img.src = newImages[index * 2 + 1];
        if (index === 0) {
            overlay1 = true;
            actionButton1.style.display = 'block'; // Mostrar botón para img1
        } else {
            overlay2 = true;
            actionButton2.style.display = 'block'; // Mostrar botón para img2
        }
    } else {
        button.style.backgroundImage = `url('${originalImages[index * 2]}')`;
        img.src = originalImages[index * 2 + 1];
        if (index === 0) {
            overlay1 = false;
            actionButton1.style.display = 'none'; // Ocultar botón para img1
        } else {
            overlay2 = false;
            actionButton2.style.display = 'none'; // Ocultar botón para img2
        }
    }
}

actionButton1.addEventListener('click', () => {
    if (overlay1 && overlay2) {
        document.querySelector('.container').style.backgroundImage = "url('https://img.freepik.com/fotos-premium/mansion-embrujada-casa-terror-ojos-rojos-parpadeantes-pasillo-iluminado-velas_124507-91997.jpg')";
        hideElements(); // Ocultar elementos cuando se muestra la segunda imagen
        createNextButton();
    } else {
        setBackgroundAndCreateGoBack();
    }
});

actionButton2.addEventListener('click', () => {
    if (overlay1 && overlay2) {
        document.querySelector('.container').style.backgroundImage = "url('https://img.freepik.com/fotos-premium/mansion-embrujada-casa-terror-ojos-rojos-parpadeantes-pasillo-iluminado-velas_124507-91997.jpg')";
        hideElements(); // Ocultar elementos cuando se muestra la segunda imagen
        createNextButton();
    } else {
        setBackgroundAndCreateGoBack();
    }
});

function setBackgroundAndCreateGoBack() {
    document.querySelector('.container').style.backgroundImage = "url('https://mejorconsalud.as.com/wp-content/uploads/2021/12/cielo-estrellado-negro-768x512.jpg')";
    hideElements();
    createGoBackButton(); // Crear botón "Go Back"
}

function hideElements() {
    button1.style.display = 'none';
    button2.style.display = 'none';
    img1.style.display = 'none';
    img2.style.display = 'none';
    actionButton1.style.display = 'none';
    actionButton2.style.display = 'none';
}

function createNextButton() {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.style.position = 'absolute';
    nextButton.style.top = '50%';
    nextButton.style.left = '50%';
    nextButton.style.transform = 'translate(-50%, -50%)';
    nextButton.style.padding = '10px 20px';
    nextButton.style.backgroundColor = '#4CAF50';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.cursor = 'pointer';
    nextButton.onclick = () => window.location.href = 'https://www.google.com';
    
    document.querySelector('.container').appendChild(nextButton);
}

function createGoBackButton() {
    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.style.position = 'absolute';
    goBackButton.style.top = '50%';
    goBackButton.style.left = '50%';
    goBackButton.style.transform = 'translate(-50%, -50%)';
    goBackButton.style.padding = '10px 20px';
    goBackButton.style.backgroundColor = '#f44336';
    goBackButton.style.color = 'white';
    goBackButton.style.border = 'none';
    goBackButton.style.cursor = 'pointer';

    // Ahora solo recarga la página
    goBackButton.onclick = () => {
        location.reload();
    };

    document.querySelector('.container').appendChild(goBackButton);
}

// Hacer ambos botones arrastrables
makeDraggable(button1, img1, 0);
makeDraggable(button2, img2, 1);
