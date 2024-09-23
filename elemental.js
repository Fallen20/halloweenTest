document.addEventListener('DOMContentLoaded', function () {
    function addBootstrapLink() {
        var bootstrapLink = document.createElement('link');
        bootstrapLink.rel = 'stylesheet';
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';
        bootstrapLink.integrity = 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC';
        bootstrapLink.crossOrigin = 'anonymous';

        // Añadir el <link> al <head>
        document.head.appendChild(bootstrapLink);
    }

    // Llamar a la función para añadir el link de Bootstrap
    addBootstrapLink();

    document.getElementById('turnRightButton').addEventListener('click', girarDerecha);
    document.getElementById('turnLeftButton').addEventListener('click', girarIzquierda);

    createDoorButton();

    function girarDerecha() {
        clearText(document.getElementById('result'));


        var image = document.getElementById('image');
        //cortar src por /
        var imgSrc = image.src.split('/');

        switch (imgSrc[imgSrc.length - 1]) {
            case 'elemental_0010_delante.png':
                image.src = 'elemental/elemental_0007_derecha.png';
                createButtons('right');
                break;
            case 'elemental_0007_derecha.png':
                image.src = 'elemental/elemental_0009_detras.png';
                createButtons('back');

                break;
            case 'elemental_0009_detras.png':
                image.src = 'elemental/elemental_0002_Capa4.png';
                createButtons('left');

                break;
            case 'elemental_0002_Capa4.png':
                image.src = 'elemental/elemental_0010_delante.png';
                createButtons('north');
                break;
        }
    }

    function girarIzquierda() {
        clearText(document.getElementById('result'));

        var image = document.getElementById('image');
        //cortar src por /
        var imgSrc = image.src.split('/');

        switch (imgSrc[imgSrc.length - 1]) {
            case 'elemental_0010_delante.png':
                image.src = 'elemental/elemental_0002_Capa4.png';
                createButtons('left');
                break;
            case 'elemental_0002_Capa4.png':
                image.src = 'elemental/elemental_0009_detras.png';
                createButtons('back');
                break;
            case 'elemental_0009_detras.png':
                image.src = 'elemental/elemental_0007_derecha.png';
                createButtons('right');
                break;
            case 'elemental_0007_derecha.png':
                image.src = 'elemental/elemental_0010_delante.png';
                createButtons('north');
                break;
        }
    }

    function createButtons(position) {
        if (position == 'left') {
            deleteTypeButtons();


            // Verificar si el botón ya existe y eliminarlo
            var botonExistente = document.getElementById('getCloserLeft');
            if (botonExistente) {
                botonExistente.remove();
            }

            // Crear el botón
            createGetCloserLeftButton();


        }
        else if (position == 'north') {
            deleteElement(document.getElementById('getCloserLeft'));
            // Restablecer la posición del contenedor inmediato de la imagen
            var contenedorDeImagen = document.querySelector('#imageDiv');
            contenedorDeImagen.style.position = '';

            console.log('createDoorButton');
            createDoorButton();
        }

        else {
            // Eliminar solo el botón si existe
            deleteElement(document.getElementById('getCloserLeft'));
            deleteTypeButtons();


            // Restablecer la posición del contenedor inmediato de la imagen
            var contenedorDeImagen = document.querySelector('#imageDiv');
            contenedorDeImagen.style.position = '';
        }


    }

    function getCloserLeft() {
        //cambiar la img
        document.getElementById('image').src = "elemental/elemental_0001_Capa9.png";
        //añadir el boton de volver abajo del contenedor
        var getBack = document.createElement('button');
        //darle un id
        getBack.setAttribute('id', 'getBack');

        getBack.classList.add('btn', 'btn-secondary', 'mt-2');
        getBack.textContent = 'Get back';
        getBack.addEventListener('click', goBack);

        var contenedorDeImagen = document.querySelector('#imageDiv');
        contenedorDeImagen.appendChild(getBack);

        //borrar getCloser
        deleteElement(document.getElementById('getCloserLeft'));

        //array con los datos de los botones: nombre, style
        var botones = [
            { 'nombre': 'Click Fairy', 'style': '#C942C6', 'text': 'black' },
            { 'nombre': 'Click Dark', 'style': '#183353', 'text': 'white' },
            { 'nombre': 'Click Ice', 'style': '#06C0CD', 'text': 'black' },
            { 'nombre': 'Click Water', 'style': '#0270C0', 'text': 'black' },
            { 'nombre': 'Click Electric', 'style': '#F9E100', 'text': 'black' },
            { 'nombre': 'Click Psiquic', 'style': '#7B3A91', 'text': 'black' },
            { 'nombre': 'Click Grass', 'style': '#1F9426', 'text': 'black' },
            { 'nombre': 'Click Fire', 'style': '#ED281E', 'text': 'black' },
        ]
        var arrayElements = document.createElement('div');
        arrayElements.setAttribute('id', 'arrayElements');
        arrayElements.classList.add('d-flex');
        arrayElements.classList.add('flex-column');


        //recorrer la array
        for (var i = 0; i < botones.length; i++) {
            var boton = document.createElement('div');

            boton.classList.add('btn', 'w-50', 'mb-2');
            boton.style.backgroundColor = botones[i].style;
            boton.style.color = botones[i].text;

            boton.textContent = botones[i].nombre;
            boton.addEventListener('click', clickElement);

            //añadir los botones en la columna de la derecha
            arrayElements.appendChild(boton);
        }
        document.getElementById('rightColumn').appendChild(arrayElements);

        //disable botones de turnRight y turnLeft
        disableDivButton(document.getElementById('turnRightButton'));
        disableDivButton(document.getElementById('turnLeftButton'));
    }


    function goBack() {
        // quitar los botones dentro del div arrayElements
        deleteElement(document.getElementById('arrayElements'));
        //quitar el boton de getBack
        deleteElement(document.getElementById('getBack'));
        //cambiar la img
        document.getElementById('image').src = "elemental/elemental_0002_Capa4.png";
        //enable botones de turnRight y turnLeft
        enableDivButton(document.getElementById('turnRightButton'));
        enableDivButton(document.getElementById('turnLeftButton'));

        //que salga el boton de getCloser otra vez
        createGetCloserLeftButton();

        //limpiar el texto de result
        clearText(document.getElementById('result'));
    }



    //funciones especificas
    function clickElement() {
        document.getElementById('result').textContent = 'Nothing happened';
    }

    function createGetCloserLeftButton() {
        // Crear el botón
        var boton = document.createElement('button');
        boton.setAttribute('id', 'getCloserLeft');
        boton.classList.add('btn', 'btn-secondary', 'mt-2');
        boton.textContent = 'Get closer';

        // Obtener la imagen existente
        var imagen = document.querySelector('#imageDiv img');

        // Estilos para centrar el botón
        boton.style.position = 'absolute';
        boton.style.top = '50%';
        boton.style.left = '50%';
        boton.style.transform = 'translate(-50%, -50%)';
        boton.style.zIndex = '10';

        boton.addEventListener('click', getCloserLeft);

        // Asegurarse de que el padre inmediato tenga position relative
        var contenedorDeImagen = imagen.parentNode;
        contenedorDeImagen.style.position = 'relative';
        contenedorDeImagen.appendChild(boton);
    }

    function createDoorButton() {
        var botones = [
            { 'nombre': 'Click Fairy', 'style': '#C942C6', 'text': 'black', 'positionX': 26, 'positionY': 30 },
            { 'nombre': 'Click Dark', 'style': '#183353', 'text': 'white', 'positionX': 32, 'positionY': 30 },
            { 'nombre': 'Click Ice', 'style': '#06C0CD', 'text': 'black', 'positionX': 38, 'positionY': 30 },
            { 'nombre': 'Click Water', 'style': '#0270C0', 'text': 'black', 'positionX': 55, 'positionY': 36 },
            { 'nombre': 'Click Electric', 'style': '#F9E100', 'text': 'black', 'positionX': 50, 'positionY': 30 },
            { 'nombre': 'Click Psiquic', 'style': '#7B3A91', 'text': 'black', 'positionX': 43, 'positionY': 36 },
            { 'nombre': 'Click Grass', 'style': '#1F9426', 'text': 'black', 'positionX': 61, 'positionY': 30 },
            { 'nombre': 'Click Fire', 'style': '#ED281E', 'text': 'black', 'positionX': 68, 'positionY': 30 },
        ];

        for (var i = 0; i < botones.length; i++) {
            var boton = document.createElement('div');
            boton.setAttribute('id', botones[i].nombre);

            boton.classList.add('btn', 'btn-secondary', 'mt-2');
            boton.style.backgroundColor = botones[i].style;
            boton.style.color = botones[i].text;

            boton.style.position = 'absolute';
            boton.style.top = botones[i].positionY + '%';
            boton.style.left = botones[i].positionX + '%';

            boton.textContent = botones[i].nombre;
            boton.addEventListener('click', function () {
                console.log(this.id);
            });

            document.getElementById('imageDiv').appendChild(boton);
        }
    }


    //funciones auxuliares
    function deleteElement(botonExistente) {
        if (botonExistente) {
            botonExistente.remove();
        }
    }
    function clearText(element) {
        element.textContent = '';
    }

    function deleteTypeButtons() {
        var botones = [
            'Click Fairy',
            'Click Dark',
            'Click Ice',
            'Click Water',
            'Click Electric',
            'Click Psiquic',
            'Click Grass',
            'Click Fire',
        ];

        for (var i = 0; i < botones.length; i++) {
            deleteElement(document.getElementById(botones[i]));
        }
    }
    function disableDivButton(divButton) {
        divButton.style.pointerEvents = 'none';
        divButton.style.opacity = '0.5';
        divButton.style.cursor = 'not-allowed';
    }
    function enableDivButton(divButton) {
        divButton.style.pointerEvents = 'all';
        divButton.style.opacity = '1';
        divButton.style.cursor = 'pointer';
    }

});
