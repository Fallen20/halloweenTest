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

    var lastButtonTouched = 'Fairy';
    var acceptFate = null;
    var isPanicClicked = false;
    var closeDoor = null;
    var textLine = 0;
    var enteredRooms = [];

    var textEnterRoom = [
        {
            'name': 'Fairy', 'text': ['You decided to enter the Fairy room',
                'You put your ear close to the door, trying to make a sound.',
                'You can hear a faint breathing. Someone is in there!',
                'You open the door, determined to find whoever is there.',
                'But as soon as you do, you hear a clicking sound. When you turn around, the door is closed.',
                lastButtonTouched == 'Fairy' ? 'You try to open the door and you notice you can open it.' : 'You try to open the door, but doesn\'t brudge an inch'
                , lastButtonTouched == 'Fairy' ? 'Exit?' : 'You try not to panic as you turn around and take a step deeper into the room.',
                'The air feels cold and you can hear the faint breathing closer and closer, each time more heavy.',
                'You find Sylveon sitting, looking at where you came from. Its ribbons move like tentacles as you notice that aren\'t regular ribbons- but human looking hands.',
                'They wave at you as you feel force to wave back.',
                'Sylveon takes a step closer as you noticed it\'s not a regular sylveon. Its teeth are as sharp as sharpedo and you can see a ring of red around it.',
                'It takes another step, you take one back as you glance over the door.',
                !acceptFate ? 'You run back and try to open the door, your palms sweaty as you heard its steps closer and closer.' : 'You know there\'s nothing to do as Sylveon is just a breathaway from you. You made a bad decision',
                !acceptFate && lastButtonTouched == 'Fairy' ? 'You manage to open the door as you hear its claws agains the stone floor. As soon as you manage to take a step outside the room, you see Sylveon launching at you, ready to attack' : 'But was all futile. Your hands manage to turn the rusty doorknob but the door is still closed. Your faith is sealed as you turn around and see Sylveon\'s luminiscent pelt change in the darkness, its bi-colored eyes looking with such happiness you can\'t help but regret what brought you here',

                !closeDoor ? 'Despite your quick reaction time, Sylveon is way quicker as you\'re thrown to the floor in what you thought was a safe room. You can smell the rancid smell of blood as Sylveon makes your world black, white teeth as the last thing you manage to see' : 'You manage to close the door before it manages to enter the safe room, hearing how Sylveon hits the door at the other side. You expect something else to happen but the room grows silent.'
            ]
        },
        { 'name': 'Fire', 'text': ['a'] },
    ];
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
            boton.addEventListener('click', (function (botonTxt) {
                return function () {
                    clickElement(botonTxt.replace('Click ', ''));
                };
            })(botones[i].nombre));

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
    function clickElement(clicked) {
        lastButtonTouched = clicked;
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

            boton.addEventListener('click', (function (botonTxt) {
                return function () {
                    enterRoom(botonTxt.replace('Click ', ''));
                };
            })(botones[i].nombre));
            document.getElementById('imageDiv').appendChild(boton);
        }
    }

    function enterRoom(elemento) {
        //si ya has entrado, que no siga
        if (enteredRooms.includes(elemento)) {
            //crear la ventana de texto 'You refuse to enter this room again'
            createRefuseWindow();
            //quitar los botones
            deleteTypeButtons();
            return;
        }
        //quitar los botones
        deleteTypeButtons();

        switch (elemento) {
            case 'Fairy':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Dark':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Ice':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Water':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Electric':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Psiquic':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Grass':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
            case 'Fire':
                document.getElementById('image').src = 'elemental/elemental_0004_Capa8.png';
                colocarTexto(elemento);
                break;
        }
    }

    function createRefuseWindow() {
        // Crear un div encima de la imagen y darle ventana.png
        var div = document.createElement('div');
        div.setAttribute('id', 'ventanaDiv');

        div.style.backgroundImage = 'url("elemental/ventana.png")';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'cover';


        // Ajustar el tamaño del div y la imagen 'ventana.png'
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '12px';
        div.style.width = '740px';
        div.style.height = '454px';
        div.style.zIndex = '1';

        //ahora hay que poner un texto dentro del div que coincida en donde está la imagen
        var text = document.createElement('p');
        text.setAttribute('id', 'text');
        text.style.zIndex = '2';

        // Crear un estilo para el texto
        text.style.position = 'absolute';
        text.style.top = '60%';
        text.style.left = '5%';
        text.style.color = 'black';
        text.style.textAlign = 'left';
        text.style.fontSize = '18px';
        text.style.fontFamily = 'Arial, sans-serif';
        text.style.width = '80%';


        text.innerHTML = 'You refuse to enter this room. <em>again</em>';
        div.appendChild(text);

        //crear un boton con ►
        var botonNext = document.createElement('div');
        botonNext.setAttribute('id', 'next');
        botonNext.textContent = ' ► ';
        botonNext.style.position = 'absolute';
        botonNext.style.top = '80%';
        botonNext.style.right = '5%';
        botonNext.style.fontSize = '18px';
        botonNext.classList.add('btn', 'btn-secondary');

        botonNext.addEventListener('click', function () {
            //que se quite la ventana
            deleteElement(document.getElementById('ventanaDiv'));
            //que devuelva los botones
            createDoorButton();
            //que devuelva la ventana a position null
            document.getElementById('imageDiv').style.position = '';
        });
        div.appendChild(botonNext);

        // Asegurarse de que el contenedor sea relative
        var imageDiv = document.getElementById('imageDiv');
        imageDiv.style.position = 'relative';

        // Añadir el nuevo div sobre la imagen de fondo
        imageDiv.appendChild(div);

    }
    function colocarTexto(element) {
        // Crear un div encima de la imagen y darle ventana.png
        var div = document.createElement('div');
        div.setAttribute('id', 'ventanaDiv');

        div.style.backgroundImage = 'url("elemental/ventana.png")';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'cover';


        // Ajustar el tamaño del div y la imagen 'ventana.png'
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '12px';
        div.style.width = '740px';
        div.style.height = '454px';
        div.style.zIndex = '1';

        //ahora hay que poner un texto dentro del div que coincida en donde está la imagen
        var text = document.createElement('p');
        text.setAttribute('id', 'text');
        text.style.zIndex = '2';

        // Crear un estilo para el texto
        text.style.position = 'absolute';
        text.style.top = '60%';
        text.style.left = '5%';
        text.style.color = 'black';
        text.style.textAlign = 'left';
        text.style.fontSize = '18px';
        text.style.fontFamily = 'Arial, sans-serif';
        text.style.width = '80%';



        //recuperar de la array textEnterRoom, donde name == element
        const roomObject = textEnterRoom.find(room => room.name === element);

        text.textContent = roomObject.text[textLine];
        div.appendChild(text);

        //crear un boton con ►
        var botonNext = document.createElement('div');
        botonNext.setAttribute('id', 'next');
        botonNext.textContent = ' ► ';
        botonNext.style.position = 'absolute';
        botonNext.style.top = '80%';
        botonNext.style.right = '5%';
        botonNext.style.fontSize = '18px';
        botonNext.classList.add('btn', 'btn-secondary');

        botonNext.addEventListener('click', function () {
            textLine++;
            nextText(roomObject);
        });
        div.appendChild(botonNext);

        // Asegurarse de que el contenedor sea relative
        var imageDiv = document.getElementById('imageDiv');
        imageDiv.style.position = 'relative';

        // Añadir el nuevo div sobre la imagen de fondo
        imageDiv.appendChild(div);
    }



    function nextText(text) {

        // console.log(textLine, text.text[textLine]);
        if (textLine == 6 && lastButtonTouched == text.name) {
            createExitButton(text.name);
        }
        // Si es la posición 11 y el botón no está creado, entra al if
        if (textLine == 11 && document.getElementById('panic') == null) {
            createPanicButton(text.name);
        }
        if (textLine == 13 && document.getElementById('closeDoor') == null && lastButtonTouched == text.name) {
            createCloseDoorButton(text.name);
        }

        if (textLine == 14 && closeDoor == false) {
            setTimeout(function () {
                //quitar ventana
                deleteElement(document.getElementById('ventanaDiv'));

                document.getElementById('image').src = 'https://media.tenor.com/ZpBMkWyufhMAAAAM/dead.gif';
                document.getElementById('image').style.width = '756px';
                document.getElementById('image').style.height = '453.6px';

                setTimeout(function () {
                    //al cabo de 1 segundo, hacer f5
                    window.location.reload();
                }, "2000");
            }, "5000");

        }
        else if (textLine == 15 && closeDoor == true) {
            //quitar ventana
            deleteElement(document.getElementById('ventanaDiv'));
            //cambiar src por delante
            document.getElementById('image').src = 'elemental/elemental_0010_delante.png';
            //quitar posicion relative de imageDiv
            document.getElementById('imageDiv').style.position = '';
            //crear botones
            createDoorButton();
            //reset lineas
            textLine = 0;
            acceptFate = null;
            isPanicClicked = false;
            closeDoor = null;
            //meter que has entrado en este
            enteredRooms.push(text.name);

        }

        if (isPanicClicked == true) {
            isPanicClicked = false;
        }

        document.getElementById('text').textContent = text.text[textLine];


    }

    function createPanicButton(name) {
        //disable next button
        disableDivButton(document.getElementById('next'));

        var panicButton = document.createElement('button');
        panicButton.setAttribute('id', 'panic');
        panicButton.textContent = 'Turn back';
        panicButton.style.position = 'absolute'; // Posicionamiento absoluto
        panicButton.style.top = '50%'; // Alineado verticalmente en el centro
        panicButton.style.left = '50%'; // Alineado horizontalmente en el centro

        // Desplaza el botón hacia arriba y hacia la izquierda por su propio tamaño
        panicButton.style.transform = 'translate(-50%, -50%)';
        panicButton.style.fontSize = '18px';
        panicButton.style.zIndex = '2';

        panicButton.classList.add('btn', 'btn-danger', 'shake'); // Añade la clase 'shake'

        //el user tiene 15 segundos para clickar, sino es game over.
        //poner un timer que si no se clica en 15seg, saque un console log
        //si lo ha clickado, cancelar este timer
        setTimeout(() => {
            //esto no se activa si acceptFate=false
            if (!isPanicClicked && acceptFate) {
                document.getElementById('next').removeEventListener('click', nextText);

                isPanicClicked = true;
                acceptFate = true;
                textLine++;

                const roomObject = textEnterRoom.find(room => room.name === name);
                document.getElementById('text').textContent = roomObject.text[textLine];

                console.log(roomObject, roomObject.text[textLine]);
                //hacer el next posible
                enableDivButton(document.getElementById('next'));

                document.getElementById('next').addEventListener('click', function () {
                    textLine = 0;
                    //cambiar el fondo
                    document.getElementById('image').src = 'https://media.tenor.com/ZpBMkWyufhMAAAAM/dead.gif';
                    document.getElementById('image').style.width = '756px';
                    document.getElementById('image').style.height = '453.6px';

                    //al cabo de 1 segundo, hacer f5
                    setTimeout(function () {
                        window.location.reload();
                    }, "2000");

                    //quitar la ventana-png
                    deleteElement(document.getElementById('ventanaDiv'));
                });

                panicButton.remove();
            }
        }, "1000");

        //añadirle un event listener click
        panicButton.addEventListener('click', function () {
            acceptFate = false;
            isPanicClicked = true;
            //quitar el panic button
            panicButton.remove();
            //enable div next
            enableDivButton(document.getElementById('next'));
            //siguiente linea
            textLine++;

            const roomObject = textEnterRoom.find(room => room.name === name);
            nextText(roomObject);
        });

        // Agrega el botón al div
        document.getElementById('imageDiv').appendChild(panicButton);



    }

    function createCloseDoorButton(name) {
        //disable next button
        disableDivButton(document.getElementById('next'));

        var panicButton = document.createElement('button');
        panicButton.setAttribute('id', 'closeDoor');
        panicButton.textContent = 'Close door';
        panicButton.style.position = 'absolute'; // Posicionamiento absoluto
        panicButton.style.top = '50%'; // Alineado verticalmente en el centro
        panicButton.style.left = '50%'; // Alineado horizontalmente en el centro

        // Desplaza el botón hacia arriba y hacia la izquierda por su propio tamaño
        panicButton.style.transform = 'translate(-50%, -50%)';
        panicButton.style.fontSize = '18px';
        panicButton.style.zIndex = '2';

        panicButton.classList.add('btn', 'btn-danger', 'shake'); // Añade la clase 'shake'

        //el user tiene 15 segundos para clickar, sino es game over.
        //poner un timer que si no se clica en 15seg, saque un console log
        //si lo ha clickado, cancelar este timer
        setTimeout(() => {
            //esto no se activa si acceptFate=false
            if (!isPanicClicked && closeDoor == null) {
                document.getElementById('next').removeEventListener('click', nextText);

                isPanicClicked = true;
                closeDoor = false;
                textLine++;

                const roomObject = textEnterRoom.find(room => room.name === name);
                document.getElementById('text').textContent = roomObject.text[textLine];

                console.log(isPanicClicked, closeDoor);
                //hacer el next posible
                enableDivButton(document.getElementById('next'));

                document.getElementById('next').addEventListener('click', function () {
                    textLine = 0;
                    //cambiar el fondo
                    document.getElementById('image').src = 'https://media.tenor.com/ZpBMkWyufhMAAAAM/dead.gif';
                    document.getElementById('image').style.width = '756px';
                    document.getElementById('image').style.height = '453.6px';

                    //al cabo de 1 segundo, hacer f5
                    setTimeout(function () {
                        window.location.reload();
                    }, "2000");

                    //quitar la ventana-png
                    deleteElement(document.getElementById('ventanaDiv'));
                });

                panicButton.remove();
            }
        }, "1500");

        //añadirle un event listener click
        panicButton.addEventListener('click', function () {
            closeDoor = true;
            isPanicClicked = true;
            //quitar el panic button
            panicButton.remove();
            //enable div next
            enableDivButton(document.getElementById('next'));
            //siguiente linea
            textLine++;

            const roomObject = textEnterRoom.find(room => room.name === name);
            console.log(textLine, roomObject.text[textLine]);
            nextText(roomObject);
        });

        // Agrega el botón al div
        document.getElementById('imageDiv').appendChild(panicButton);



    }

    function createExitButton(name) {
        //disable next button
        disableDivButton(document.getElementById('next'));

        var panicButton = document.createElement('button');
        panicButton.setAttribute('id', 'exit');
        panicButton.textContent = 'Exit room';
        panicButton.style.position = 'absolute'; // Posicionamiento absoluto
        panicButton.style.top = '50%'; // Alineado verticalmente en el centro
        panicButton.style.left = '40%'; // Alineado horizontalmente en el centro

        // Desplaza el botón hacia arriba y hacia la izquierda por su propio tamaño
        panicButton.style.transform = 'translate(-50%, -50%)';
        panicButton.style.fontSize = '18px';
        panicButton.style.zIndex = '2';

        panicButton.classList.add('btn', 'btn-secondary');

        var continueButton = document.createElement('button');
        continueButton.setAttribute('id', 'continue');
        continueButton.textContent = 'Continue';
        continueButton.style.position = 'absolute'; // Posicionamiento absoluto
        continueButton.style.top = '50%'; // Alineado verticalmente en el centro
        continueButton.style.left = '60%'; // Alineado horizontalmente en el centro

        // Desplaza el botón hacia arriba y hacia la izquierda por su propio tamaño
        continueButton.style.transform = 'translate(-50%, -50%)';
        continueButton.style.fontSize = '18px';
        continueButton.style.zIndex = '2';

        continueButton.classList.add('btn', 'btn-success');


        //añadirle un event listener click
        panicButton.addEventListener('click', function () {
            //quitar el panic button
            continueButton.remove();
            panicButton.remove();
            //quitar ventana
            deleteElement(document.getElementById('ventanaDiv'));
            //volver la imagen al normal
            document.getElementById('image').src = 'elemental/elemental_0010_delante.png';
            document.getElementById('imageDiv').style.position = '';
            //crear botones
            createDoorButton();
            //reset lines
            textLine = 0;
        });

        //añadirle un event listener click
        continueButton.addEventListener('click', function () {
            console.log('click continue', name);
            //quitar el panic button
            continueButton.remove();
            panicButton.remove();
            textLine++;

            const roomObject = textEnterRoom.find(room => room.name === name);
            nextText(roomObject);

            //enable div next
            enableDivButton(document.getElementById('next'));

        });

        // Agrega el botón al div
        document.getElementById('imageDiv').appendChild(panicButton);
        document.getElementById('imageDiv').appendChild(continueButton);



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
