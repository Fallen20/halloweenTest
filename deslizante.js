document.addEventListener('DOMContentLoaded', function () {


    const puzzleContainer = document.getElementById('puzzle');
    const size = 3; // Tamaño del puzle 3x3
    let pieces = [];
    let firstClickedPiece = null; // Variable para almacenar la primera pieza clicada
    let emptyPositionIndex = null; // Para almacenar la posición del espacio vacío
    let clicksEnabled = true; // Variable para habilitar/deshabilitar clics

    // Colores específicos para las piezas
    const colors = [
        '#FF5733', // Color 1
        '#33FF57', // Color 2
        '#3357FF', // Color 3
        '#F1C40F', // Color 4
        '#9B59B6', // Color 5
        '#E67E22', // Color 6
        '#1ABC9C', // Color 7
        '#34495E'  // Color 8
    ];

    // Inicializar el puzle
    function initializePuzzle() {
        do {
            pieces = [];
            const availablePositions = Array.from({ length: size * size - 1 }, (_, i) => i);

            // Generar piezas
            for (let i = 0; i < availablePositions.length; i++) {
                pieces.push({
                    number: i + 1,
                    color: colors[i]
                });
            }
            // Agregar el espacio vacío
            emptyPositionIndex = pieces.length; // Posición del espacio vacío
            pieces.push({ number: null, color: '' });

            shuffle();
        } while (!isSolvable());

        renderPuzzle();
    }

    // Mezclar piezas
    function shuffle() {
        pieces.sort(() => Math.random() - 0.5);
    }

    // Verificar si el puzle es resolvible
    function isSolvable() {
        let inversions = 0;
        const flatPieces = pieces.map(piece => piece.number).filter(num => num !== null);

        // Contar las inversiones
        for (let i = 0; i < flatPieces.length; i++) {
            for (let j = i + 1; j < flatPieces.length; j++) {
                if (flatPieces[i] > flatPieces[j]) {
                    inversions++;
                }
            }
        }

        // El puzle es resolvible si el número de inversiones es par
        return inversions % 2 === 0;
    }

    // Renderizar el puzle
    function renderPuzzle() {
        puzzleContainer.innerHTML = '';
        pieces.forEach((piece, index) => {
            const div = document.createElement('div');
            div.classList.add('piece');
            div.style.backgroundColor = piece.color;
            div.textContent = piece.number !== null ? piece.number : ''; // Mostrar número

            // Añadir evento de clic
            div.addEventListener('click', () => {
                handlePieceClick(div, piece, index);
            });

            puzzleContainer.appendChild(div);
        });
    }

    // Manejar el clic en una pieza
    function handlePieceClick(pieceElement, piece, index) {
        if (!clicksEnabled) return; // No permitir clics si está deshabilitado

        // Si se clicó el espacio vacío
        if (piece.number === null) {
            console.log('Clicked the empty space!');
            if (firstClickedPiece) {
                // Verificar si la pieza seleccionada está adyacente
                if (isAdjacent(index, pieces.findIndex(p => p.number === firstClickedPiece.number))) {
                    // Intercambiar posiciones y colores
                    swapPieces(index);
                    console.log('Swapped with empty space!');
                    renderPuzzle(); // Actualizar el puzle
                    checkWinCondition(); // Comprobar si se ha ganado
                } else {
                    console.log('Pieces are not adjacent, cannot swap.');
                }
            }
            // Resetear firstClickedPiece
            firstClickedPiece = null;
            return; // No hacer nada si se clicó el espacio vacío
        }

        // Si es la primera pieza clicada
        if (!firstClickedPiece) {
            firstClickedPiece = piece; // Guardar la primera pieza clicada
            console.log(`Clicked piece number: ${piece.number}`);
            addOverlay(pieceElement);
        } else {
            // Segunda pieza clicada
            console.log(`Second clicked piece number: ${piece.number}`);
            addOverlay(pieceElement);
            // Resetear solo si no hay un intercambio válido
            firstClickedPiece = null; // Aquí también se resetea después de un clic
        }

        // Comprobar si hay más de un overlay
        const overlays = document.querySelectorAll('.overlay');
        if (overlays.length > 1) {
            // Eliminar overlay de todas las piezas
            const allPieces = document.querySelectorAll('.piece');
            allPieces.forEach(piece => {
                const existingOverlay = piece.querySelector('.overlay');
                if (existingOverlay) {
                    existingOverlay.remove(); // Eliminar el overlay si existe
                }
            });
        }
    }

    // Verificar si dos piezas están adyacentes
    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / size);
        const col1 = index1 % size;
        const row2 = Math.floor(index2 / size);
        const col2 = index2 % size;

        // Comprobar si están adyacentes (horizontal o verticalmente)
        return (Math.abs(row1 - row2) === 1 && col1 === col2) ||
            (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    // Intercambiar posiciones y colores de las piezas
    function swapPieces(emptyIndex) {
        const firstPieceIndex = pieces.findIndex(p => p.number === firstClickedPiece.number);

        // Intercambiar números
        const tempNumber = pieces[firstPieceIndex].number;
        pieces[firstPieceIndex].number = null; // Actualizar número al vacío
        pieces[emptyIndex].number = tempNumber; // Cambiar número

        // Intercambiar colores
        const tempColor = pieces[firstPieceIndex].color;
        pieces[firstPieceIndex].color = ''; // Vacío no tiene color
        pieces[emptyIndex].color = tempColor; // Cambiar color
    }

    // Añadir overlay a la pieza clicada
    function addOverlay(pieceElement) {
        const existingOverlay = pieceElement.querySelector('.overlay');
        if (!existingOverlay) {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            pieceElement.appendChild(overlay);
        }
    }

    // Comprobar si se ha ganado
    function checkWinCondition() {
        const winCondition = pieces.every((piece, index) => {
            return piece.number === null ? index === pieces.length - 1 : piece.number === index + 1;
        });

        if (winCondition) {
            clicksEnabled = false; // Deshabilitar clics
            setTimeout(() => {
                alert('¡Has ganado!');
                clicksEnabled = true; // Habilitar clics de nuevo
            }, 1000); // Esperar un segundo antes de mostrar el alert
        }
    }

    // Inicializar el puzle al cargar
    initializePuzzle();

});