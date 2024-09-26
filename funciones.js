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

    // const form = document.getElementById('miFormulario');
    // if (form) {
    //     form.addEventListener('submit', function(event) {
    //         event.preventDefault(); // Evita que se recargue la página

    //         const numeroCorrecto = 12345; // El número correcto
    //         const numeroIngresado = document.getElementById('numeroInput').value;

    //         if (numeroIngresado == numeroCorrecto) {
    //             document.getElementById('resultado').textContent = "¡Número correcto!";
    //             // Aquí podrías redirigir a otro sitio si es correcto:
    //             // window.location.href = "https://tupagina.com/enlace.html";
    //         } else {
    //             document.getElementById('resultado').textContent = "Número incorrecto, intenta de nuevo.";
    //         }
    //     });
    // } else {
    //     console.error('No se encontró el formulario con el ID "miFormulario".');
    // }

    isLightOn = true;
    isLinternaOn = false;
    var turnRightButton = document.getElementById('turnRightButton');
    var turnLeftButton = document.getElementById('turnLeftButton');

    function recuperarImageName(image) {
        var imageSrc = image.src;
        var imageSrcArray = imageSrc.split('/');
        return imageSrcArray[imageSrcArray.length - 1];
    }

    function createLightSwitch(destroy) {
        if (destroy) {
            var lightSwitch = document.getElementById('lightSwitch');
            if (lightSwitch) {
                lightSwitch.remove();
            }

            return;
        }
        isLinternaOn = false;

        // Crear un botón
        var button = document.createElement('button');

        // Asignarle un atributo id
        button.setAttribute('id', 'lightSwitch');

        // Darle un texto
        button.textContent = 'Light switch';

        // Establecer el estilo para posicionarlo
        button.style.position = 'fixed'; // Fijo en la pantalla
        button.style.top = 28 + 'vh'; // Posición fija en el alto
        button.style.left = 53 + 'vw'; // Posición fija en el ancho
        button.style.zIndex = '1000'; // Asegura que esté por encima de otros elementos
        button.style.padding = '20px'; // Aumentar el área activa del botón
        button.style.fontSize = '16px'; // Ajustar tamaño de fuente si es necesario
        button.style.opacity = '0'; // Hacerlo invisible al inicio pero detectable por eventos
        button.style.transition = 'opacity 0.3s'; // Suavizar la transición de visibilidad

        button.classList.add('btn', 'btn-secondary', 'btn-lg');

        // Mostrar el botón cuando el mouse esté sobre el botón
        button.addEventListener('mouseover', function () {
            button.style.opacity = '1'; // Hacer visible el botón
        });

        // Ocultar el botón cuando el mouse salga del botón
        button.addEventListener('mouseout', function () {
            button.style.opacity = '0'; // Hacer invisible el botón
        });

        //cuando hace click, que cambie isLighOn a true si es false y si es false, a true
        button.addEventListener('click', function () {
            isLightOn = !isLightOn;
            changeImage();
        });

        // Colocarlo en el documento
        document.body.appendChild(button);



    }

    function turnOnLintern() {

        var imgOriginal = document.getElementById('image');
        var image = recuperarImageName(imgOriginal);
        var imgPath = "constellationRoom/off";

        if (isLinternaOn) {
            imgPath += '/light';
        }
        imgOriginal.src = imgPath + '/' + image;
    }

    function changeImage() {
        var imgOriginal = document.getElementById('image');
        var image = recuperarImageName(imgOriginal);
        var imgPath = "constellationRoom/";
        if (!isLightOn) {
            imgPath += 'off';
        } else {
            imgPath += 'on';
        }
        imgOriginal.src = imgPath + '/' + image;

        //si linterna existe, borrarla
        if (document.getElementById('linterna')) {
            document.getElementById('linterna').remove();
            return;
        }
        //crear boton linterna
        // Crear un botón
        var button2 = document.createElement('button');

        // Asignarle un atributo id
        button2.setAttribute('id', 'linterna');

        // Darle un texto
        button2.textContent = 'Flashlight';
        button2.classList.add('btn', 'btn-secondary', 'mt-2');

        //le damos un evento click que llame a turnOnLintern
        button2.addEventListener('click', function () {
            isLinternaOn = !isLinternaOn;

            if (button2.classList.contains('btn-secondary')) {
                button2.classList.remove('btn-secondary');
                button2.classList.add('btn-info');
            } else {
                button2.classList.remove('btn-info');
                button2.classList.add('btn-secondary');
            }
            turnOnLintern();
        });
        //lo metemos en el doc
        document.getElementById('buttons').appendChild(button2);
    }

    turnRightButton.addEventListener('click', function () {
        //cortar image.src por /constellationRoom
        var imgOriginal = document.getElementById('image');
        var image = recuperarImageName(imgOriginal);
        var imgPath = "constellationRoom/";
        if (!isLightOn) {
            imgPath += 'off';
        } else {
            imgPath += 'on';
        }


        switch (image) {
            case 'o.png':
                imgOriginal.src = imgPath + '/n.png';
                createLightSwitch(true);
                break;
            case 'e.png':
                imgOriginal.src = imgPath + '/s.png';
                createLightSwitch(true);
                break;
            case 's.png':
                imgOriginal.src = imgPath + '/o.png';
                createLightSwitch(false);
                break;
            case 'n.png':
                imgOriginal.src = imgPath + '/e.png';
                createLightSwitch(false);
                break;
        }
    });


    turnLeftButton.addEventListener('click', function () {
        //cortar image.src por /constellationRoom
        var imgOriginal = document.getElementById('image');
        var image = recuperarImageName(imgOriginal);
        var imgPath = "constellationRoom/";
        if (!isLightOn) {
            imgPath += 'off';
        } else {
            imgPath += 'on';
        }


        switch (image) {
            case 'o.png':
                imgOriginal.src = imgPath + '/s.png';
                createLightSwitch(true);
                break;
            case 'e.png':
                imgOriginal.src = imgPath + '/n.png';
                createLightSwitch(true);
                break;
            case 's.png':
                imgOriginal.src = imgPath + '/e.png';
                createLightSwitch(false);
                break;
            case 'n.png':
                imgOriginal.src = imgPath + '/o.png';
                createLightSwitch(false);
                break;
        }
    });


    const formConst = document.getElementById('constellationForm');
    if (formConst) {
        formConst.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que se recargue la página

            const numeroCorrecto = "0598"; // El número correcto
            const numeroIngresado = document.getElementById('constellationCode').value;

            if (numeroIngresado == numeroCorrecto) {
                document.getElementById('result').innerHTML = 'A ding is heard, the floor starts to rumble and a new passage is <a href="index.html">open</a>';
                // Aquí podrías redirigir a otro sitio si es correcto:
                // window.location.href = "https://tupagina.com/enlace.html";
            } else {
                document.getElementById('result').textContent = "A loud buzz comes from the machine";
            }
        });
    }


    // Función para guardar el contenido del textarea en una cookie
    document.getElementById('notes').addEventListener('blur', function () {
        var notes = document.getElementById('notes').value;
        // Guardar el contenido en localStorage
        localStorage.setItem('constellationNotes', notes);
    });

    // Función para cargar el contenido de la cookie al cargar la página
    function loadNotesFromLocalStorage() {
        return localStorage.getItem('constellationNotes') || "";
    }
    var savedNotes = loadNotesFromLocalStorage();
    if (savedNotes) {
        document.getElementById('notes').value = savedNotes;
    }

    var hintIndex = 0;
    function hints(number) {
        var hints = [
            'Hint 1: Seems you can interact with the light switch..',
            'Hint 2: What is shown in the corner of a regular map?',
            'Hint 3: I wonder how a compass is read...',
            'Hint 4: Follow the <a href="https://en.wikipedia.org/wiki/Cardinal_direction">cardinal directions</a>',
        ];

        var hints = document.getElementById('hints');

        if (number < hints.length) {
            hints.innerHTML += '<br>' + hints[number];
        }
        if (number === hintsArray.length) {
            clearInterval(intervalId);
        }
    }

    // Función para ejecutar cada 5 minutos
    function ejecutarHintsPeriodicamente() {
        hints(hintIndex); // Ejecutar la función de pistas con el índice actual
        hintIndex++; // Incrementar el índice para la siguiente pista
    }

    // Ejecutar cada 5 minutos (300,000 milisegundos)
    var intervalId = setInterval(ejecutarHintsPeriodicamente, 300000); // 300000 ms = 5 minutos

});
