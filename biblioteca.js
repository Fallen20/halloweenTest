document.addEventListener('DOMContentLoaded', function () {

    //VARIABLES DE LIBROS PILLADOS
    var libroMesa = false;
    var libroSuelo = false;
    var libroFrente = false;
    var libroDerecha = false;
    var libroAbajo = false;


    //DELETES
    //borrar TODAS las img con clase imagenOverlay
    function deleteOverlayImg() {
        //recuperar todas las img con clase imagenOverlay
        const elements = Array.from(document.getElementsByClassName("imagenOverlay"));

        //recorrer y borrarlos
        elements.forEach(button => {
            button.remove();
        });
    }

    function deleteAllButtons() {
        //recuperar los btones con la clase botonSobreImagen
        const buttons = Array.from(document.getElementsByClassName("botonSobreImagen"));

        //recorrer y borrarlos
        buttons.forEach(button => {
            button.remove();
        });
    }


    //-----------------------------
    //BASE
    //-----------------------------
    //RENDER IMAGENES
    function baseRender() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar padre
        const container = document.getElementById("imageContainer");
        const imagen = document.getElementById("ImagenBase");

        //cambiarlo a base
        imagen.src = "biblioteca/base.png";

        // Crear imagen
        const abajo = document.createElement("img");
        const derecha = document.createElement("img");
        const frente = document.createElement("img");
        const suelo = document.createElement("img");
        const mesa = document.createElement("img");

        //añadir imagen
        abajo.src = "biblioteca/abajo/abajo.png";
        derecha.src = "biblioteca/derecha/derecha.png";
        frente.src = "biblioteca/frente/frenteLibro.png";
        suelo.src = "biblioteca/suelo/librosSuelo.png";
        mesa.src = "biblioteca/mesa/libroMesa.png";

        //clase
        abajo.className = "imagenOverlay";
        derecha.className = "imagenOverlay";
        frente.className = "imagenOverlay";
        suelo.className = "imagenOverlay";
        mesa.className = "imagenOverlay";


        // darsela al padre
        if (libroSuelo == false) container.appendChild(suelo);
        if (libroFrente == false) container.appendChild(frente);
        if (libroDerecha == false) container.appendChild(derecha);
        if (libroAbajo == false) container.appendChild(abajo);
        if (libroMesa == false) container.appendChild(mesa);

        botonesZoomBase();
    }

    function botonesZoomBase() {
        //recuperar base
        const container = document.getElementById("imageContainer");

        //crear un boton
        const btnMesa = document.createElement("button");
        const btnSuelo = document.createElement("button");
        const btnFrente = document.createElement("button");
        const btnAbajo = document.createElement("button");
        const btnDerecha = document.createElement("button");

        //darle texto
        btnMesa.textContent = "Zoom table";
        btnSuelo.textContent = "Zoom floor";
        btnFrente.textContent = "Zoom front";
        btnAbajo.textContent = "Zoom down";
        btnDerecha.textContent = "Zoom right";

        //meterlo en una array para recorrerlo
        const buttons = [btnMesa, btnSuelo, btnFrente, btnAbajo, btnDerecha];

        //ajustar el top/left/button/right de cada uno
        btnMesa.style.top = "65%";
        btnMesa.style.left = "40%";

        btnSuelo.style.top = "40%";
        btnSuelo.style.left = "65%";

        btnAbajo.style.top = "35%";
        btnAbajo.style.left = "45%";

        btnFrente.style.top = "20%";
        btnFrente.style.left = "20%";

        btnDerecha.style.top = "20%";
        btnDerecha.style.left = "80%";

        //recorrer
        buttons.forEach(btn => {
            //darle la clase
            btn.classList.add("botonSobreImagen");

            //al principio no son visibles
            btn.style.opacity = "0";

            //event listener cuando pasa por encima
            btn.addEventListener("mouseover", () => {
                btn.style.opacity = "1"; // Mostrar botones
            });

            //cuando sales de encima
            btn.addEventListener("mouseout", () => {
                btn.style.opacity = "0"; // Ocultar botones
            });

            //darselo al padre
            container.appendChild(btn);
        });

        // Darle evento click
        btnMesa.addEventListener("click", zoomMesa);
        btnSuelo.addEventListener("click", zoomSuelo);
        btnDerecha.addEventListener("click", zoomDerecha);
        btnAbajo.addEventListener("click", zoomAbajo);
        btnFrente.addEventListener("click", zoomFrente);
    }


    //-----------------------------
    //MESA
    //-----------------------------
    function zoomMesa() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar padre
        const container = document.getElementById("imageContainer");

        //recuperar img
        const base = document.getElementById("ImagenBase");
        //cambiar img
        base.src = "biblioteca/mesa/zoom/mesaZoom.png";

        //crear el boton para ir atras
        const btnBase = document.createElement("button");
        //darle texto
        btnBase.textContent = "Go back";
        //ajustar el top/left/button/right de cada uno
        btnBase.style.top = "90%";
        btnBase.style.left = "50%";
        //darle la clase
        btnBase.classList.add("botonSobreImagen");
        //darle al padre container
        container.appendChild(btnBase);

        //crear un evento
        btnBase.addEventListener("click", () => {
            //
            baseRender();
        });

        //Si no ha pillado el libro (libroMesa=false) entonces crear una img con la imagen del libro
        if (libroMesa == false) {
            const mesa = document.createElement("img");
            mesa.src = "biblioteca/mesa/zoom/libroMesaZoom.png";
            mesa.className = "imagenOverlay";
            container.appendChild(mesa);

            //crear un boton
            const btnMesa = document.createElement("button");
            //darle texto
            btnMesa.textContent = "Pick up book";

            //ajustar el top/left/button/right de cada uno
            btnMesa.style.top = "65%";
            btnMesa.style.left = "15%";

            //darle la clase
            btnMesa.classList.add("botonSobreImagen");

            //darle al padre container
            container.appendChild(btnMesa);

            //crear un evento
            btnMesa.addEventListener("click", () => {
                //cambiar a true
                libroMesa = true;

                //quitar la img
                mesa.remove();

                //quitar el boton
                btnMesa.remove();

                //añadir al borde el libro 
                addBook('mesa');
            });
        }


    }


    //-----------------------------
    //SUELO
    //-----------------------------
    function zoomSuelo() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar padre
        const container = document.getElementById("imageContainer");

        //recuperar img
        const base = document.getElementById("ImagenBase");
        //cambiar img
        base.src = "biblioteca/suelo/zoom/sueloZoom.png";

        //crear el boton para ir atras
        const btnBase = document.createElement("button");
        //darle texto
        btnBase.textContent = "Go back";
        //ajustar el top/left/button/right de cada uno
        btnBase.style.top = "90%";
        btnBase.style.left = "50%";
        //darle la clase
        btnBase.classList.add("botonSobreImagen");
        //darle al padre container
        container.appendChild(btnBase);

        //crear un evento
        btnBase.addEventListener("click", () => {
            baseRender();
        });

        //Si no ha pillado el libro (libroMesa=false) entonces crear una img con la imagen del libro
        if (libroSuelo == false) {
            const mesa = document.createElement("img");
            mesa.src = "biblioteca/suelo/zoom/libroSueloZoom.png";
            mesa.className = "imagenOverlay";
            container.appendChild(mesa);

            //crear un boton
            const btnMesa = document.createElement("button");
            //darle texto
            btnMesa.textContent = "Pick up books";

            //ajustar el top/left/button/right de cada uno
            btnMesa.style.top = "50%";
            btnMesa.style.left = "50%";

            //darle la clase
            btnMesa.classList.add("botonSobreImagen");

            //darle al padre container
            container.appendChild(btnMesa);

            //crear un evento
            btnMesa.addEventListener("click", () => {
                //cambiar a true
                libroSuelo = true;

                //quitar la img
                mesa.remove();

                //quitar el boton
                btnMesa.remove();

                //añadir al borde el libro 
                addBook('suelo');
            });
        }


    }

    //-----------------------------
    //DERECHA
    //-----------------------------
    function zoomDerecha() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar padre
        const container = document.getElementById("imageContainer");

        //recuperar img
        const base = document.getElementById("ImagenBase");
        //cambiar img
        base.src = "biblioteca/derecha/zoom/zoomDerecha.png";

        //crear el boton para ir atras
        const btnBase = document.createElement("button");
        //darle texto
        btnBase.textContent = "Go back";
        //ajustar el top/left/button/right de cada uno
        btnBase.style.top = "90%";
        btnBase.style.left = "50%";
        //darle la clase
        btnBase.classList.add("botonSobreImagen");
        //darle al padre container
        container.appendChild(btnBase);

        //crear un evento
        btnBase.addEventListener("click", () => {
            baseRender();
        });

        //Si no ha pillado el libro (libroMesa=false) entonces crear una img con la imagen del libro
        if (libroDerecha == false) {
            const mesa = document.createElement("img");
            mesa.src = "biblioteca/derecha/zoom/libroDerechaZoom.png";
            mesa.className = "imagenOverlay";
            container.appendChild(mesa);

            //crear un boton
            const btnMesa = document.createElement("button");
            //darle texto
            btnMesa.textContent = "Pick up book";

            //ajustar el top/left/button/right de cada uno
            btnMesa.style.top = "50%";
            btnMesa.style.left = "50%";

            //darle la clase
            btnMesa.classList.add("botonSobreImagen");

            //darle al padre container
            container.appendChild(btnMesa);

            //crear un evento
            btnMesa.addEventListener("click", () => {
                //cambiar a true
                libroDerecha = true;

                //quitar la img
                mesa.remove();

                //quitar el boton
                btnMesa.remove();

                //añadir al borde el libro 
                addBook('derecha');
            });
        }


    }

    //-----------------------------
    //ABAJO
    //-----------------------------
    function zoomAbajo() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar padre
        const container = document.getElementById("imageContainer");

        //recuperar img
        const base = document.getElementById("ImagenBase");
        //cambiar img
        base.src = "biblioteca/abajo/zoom/zoomAbajo.png";

        //crear el boton para ir atras
        const btnBase = document.createElement("button");
        //darle texto
        btnBase.textContent = "Go back";
        //ajustar el top/left/button/right de cada uno
        btnBase.style.top = "90%";
        btnBase.style.left = "50%";
        //darle la clase
        btnBase.classList.add("botonSobreImagen");
        //darle al padre container
        container.appendChild(btnBase);

        //crear un evento
        btnBase.addEventListener("click", () => {
            baseRender();
        });

        //Si no ha pillado el libro (libroMesa=false) entonces crear una img con la imagen del libro
        if (libroAbajo == false) {
            const mesa = document.createElement("img");
            mesa.src = "biblioteca/abajo/zoom/zoomLibro.png";
            mesa.className = "imagenOverlay";
            container.appendChild(mesa);

            //crear un boton
            const btnMesa = document.createElement("button");
            //darle texto
            btnMesa.textContent = "Pick up book";

            //ajustar el top/left/button/right de cada uno
            btnMesa.style.top = "70%";
            btnMesa.style.left = "20%";

            //darle la clase
            btnMesa.classList.add("botonSobreImagen");

            //darle al padre container
            container.appendChild(btnMesa);

            //crear un evento
            btnMesa.addEventListener("click", () => {
                //cambiar a true
                libroAbajo = true;

                //quitar la img
                mesa.remove();

                //quitar el boton
                btnMesa.remove();

                //añadir al borde el libro 
                addBook('abajo');
            });
        }


    }


    //-----------------------------
    //FRENTE
    //-----------------------------
    function zoomFrente() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar padre
        const container = document.getElementById("imageContainer");

        //recuperar img
        const base = document.getElementById("ImagenBase");
        //cambiar img
        base.src = "biblioteca/frente/zoom1/frenteZoom1.png";

        //crear el boton para ir atras
        const btnBase = document.createElement("button");
        //darle texto
        btnBase.textContent = "Go back";
        //ajustar el top/left/button/right de cada uno
        btnBase.style.top = "90%";
        btnBase.style.left = "50%";
        //darle la clase
        btnBase.classList.add("botonSobreImagen");
        //darle al padre container
        container.appendChild(btnBase);

        //crear un evento
        btnBase.addEventListener("click", () => {
            baseRender();
        });

        console.log(libroFrente);
        //Si no ha pillado el libro (libroMesa=false) entonces crear una img con la imagen del libro
        if (libroFrente == false) {
            const mesa = document.createElement("img");
            mesa.src = "biblioteca/frente/zoom1/libroFrenteZoom1.png";
            mesa.className = "imagenOverlay";
            container.appendChild(mesa);

            //crear un boton
            const btnMesa = document.createElement("button");
            //darle texto
            btnMesa.textContent = "Pick up book";

            //ajustar el top/left/button/right de cada uno
            btnMesa.style.top = "70%";
            btnMesa.style.left = "20%";

            //darle la clase
            btnMesa.classList.add("botonSobreImagen");

            //darle al padre container
            container.appendChild(btnMesa);

            //crear un evento
            btnMesa.addEventListener("click", () => {
                //cambiar a true
                libroFrente = true;

                //quitar la img
                mesa.remove();

                //quitar el boton
                btnMesa.remove();

                //añadir al borde el libro 
                addBook('frente');
                zoomFrenteAfterBook(container);
            });
        }
        else {
            zoomFrenteAfterBook(container);
        }


    }

    function zoomFrenteAfterBook(container) {
        //crear un boton
        const btnMesa = document.createElement("button");
        //darle texto
        btnMesa.textContent = "Zoom in";

        //ajustar el top/left/button/right de cada uno
        btnMesa.style.top = "60%";
        btnMesa.style.left = "20%";

        //darle la clase
        btnMesa.classList.add("botonSobreImagen");

        //darle al padre container
        container.appendChild(btnMesa);

        //crear un evento
        btnMesa.addEventListener("click", () => {
            zoomDisplay();
        });
    }

    function zoomDisplay() {
        deleteOverlayImg();
        deleteAllButtons();

        //recuperar container
        const container = document.getElementById("imageContainer");


        //recuperar img
        const base = document.getElementById("ImagenBase");
        //cambiar img
        base.src = "biblioteca/frente/zoom2/frenteZoom2.png";

        //crear el boton para ir atras
        const btnBase = document.createElement("button");
        //darle texto
        btnBase.textContent = "Go back";
        //ajustar el top/left/button/right de cada uno
        btnBase.style.top = "90%";
        btnBase.style.left = "50%";
        //darle la clase
        btnBase.classList.add("botonSobreImagen");
        //darle al padre container
        container.appendChild(btnBase);

        //crear un evento
        btnBase.addEventListener("click", () => {
            zoomFrente();
        });

        var options = [];
        //si libroMesa es true, añadir C a la array
        if (libroMesa) { options.push("C"); }
        if (libroAbajo) { options.push("U"); }
        if (libroDerecha) { options.push("H"); }
        if (libroFrente) { options.push("I", "P"); }
        if (libroSuelo) { options.push("K", "A"); }

        const selectPosition = [
            ['45%', '4%'],
            ['45%', '17%'],
            ['45%', '29%'],
            ['45%', '41%'],
            ['45%', '53%'],
            ['45%', '64%'],
            ['45%', '77%']
        ];

        //recorrer selectPosition
        selectPosition.forEach((position, contador) => {
            //ahora crear un select
            const select = document.createElement("select");
            select.id = "select" + contador;
            select.style.top = position[0];
            select.style.left = position[1];
            //darle la clase
            select.classList.add("botonSobreImagen");

            //recorrer options y darselo al select
            options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });

            //ponerle bg como blanco
            select.style.backgroundColor = "white";
            //borde negro  
            select.style.border = "1px solid black";
            //color negro
            select.style.color = "black";

            //darle al padre container
            container.appendChild(select);

            //darle un evento cuando se cambie el option
            select.addEventListener("change", () => {
                checkResult();
            });
        });

    }

    function checkResult() {
        //recuperar todos los select
        const selects = document.querySelectorAll("select");

        var values = [];
        //recorrer selects
        selects.forEach((select, index) => {
            //recuperar el valor seleccionado y meterlo en la array
            values.push(select.value);
        });

        console.log(values);

        //comprobar si values tiene estos valores en el mismo orden
        // P, I,K,A,C,H,U
        const expectedValues = ["P", "I", "K", "A", "C", "H", "U"];

        // comprobar si todos los valores coinciden con los esperados
        const isCorrect = values.length === expectedValues.length && values.every((value, index) => value === expectedValues[index]);


        if (isCorrect) {
            document.getElementById("result").innerHTML = "The room starts to tremble as the shelf reveals a <a href='your-link-here'>secret passage</a>.";
        }

    }

    //-----------------------------
    //añadir LIBROS SIDE
    //-----------------------------
    function addBook(book) {
        // Recuperar base
        const container = document.getElementById("collection");

        // Crear img
        const img = document.createElement("img");
        img.src = "biblioteca/side/recortados/" + book + ".png";
        img.className = "imagenLibroSide";

        // Aquí puedes establecer la posición de las imágenes para que se superpongan
        // Por ejemplo, usando top y left para cada imagen de forma manual o aleatoria
        img.style.top = "0"; // Ajusta según lo que necesites
        img.style.left = "0"; // Ajusta según lo que necesites

        // Dársela al padre
        container.appendChild(img);

        // Si es suelo o frente, añadir otro
        if (book == 'suelo' || book == 'frente') {
            const img2 = document.createElement("img");
            img2.src = "biblioteca/side/recortados/" + book + "2.png";
            img2.className = "imagenLibroSide";

            // Puedes ajustar la posición de la segunda imagen también
            img2.style.top = "0"; // Ajusta según lo que necesites
            img2.style.left = "0"; // Ajusta según lo que necesites

            // Dársela al padre
            container.appendChild(img2);
        }
    }


    baseRender();
});