document.addEventListener('DOMContentLoaded', function () {
    // entrar en una puerta sin pulsar un boton: muerte
    // pulsar el boton y entrar en la puerta: muerte pero puedes salir con un timeevent
    // pulsar el boton pero entrar a la puerta diferente: muerte
    // pulsar en el orden de la pokedex: una pista

    console.log('Hey, you should not me looking here ;)');

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

    var lastButtonTouched = '';
    var acceptFate = true;
    var isPanicClicked = false;
    var closeDoor = false;
    var textLine = 0;
    var enteredRooms = [];
    var clickedButtons = [];
    var correctClickedButtons = ['Water', 'Electric', 'Fire', 'Psiquic', 'Dark', 'Grass', 'Ice', 'Fairy'];
    var isCorrectOrderGuessed = false;
    var lookedUp = false;
    var hintIndex = 0;


    //WIP
    var textEnterRoom = [
        {
            'name': 'Fairy', 'text': [
                ['You decided to enter the Fairy room', 'elemental/fairy/black.png'],
                ['You put your ear close to the door, trying to make a sound.', 'elemental/fairy/black.png'],
                ['You can hear a faint breathing. Someone is in there!', 'elemental/fairy/black.png'],
                ['You open the door, determined to find whoever is there.', 'elemental/fairy/black.png'],
                ['But as soon as you do, you hear a clicking sound. When you turn around, the door is closed.', 'elemental/fairy/runDoor.png'],
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Fairy') == 0) ?
                        ['You try to open the door and you notice you can open it.', 'elemental/fairy/door.png'] :
                        ['You try to open the door, but it doesn\'t budge an inch', 'elemental/fairy/door.png'];
                },
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Fairy') == 0) ?
                        ['Do you want to Exit?', 'elemental/fairy/door.png'] :
                        ['You try not to panic as you turn around and take a step deeper into the room.', 'elemental/fairy/runDoor.png'];
                },

                ['The air feels cold and you can hear the faint breathing closer and closer, each time more heavy.', 'elemental/fairy/corridor.png'],
                ['You find Sylveon sitting, looking at where you came from. Its ribbons move like tentacles as you notice that aren\'t regular ribbons- but human looking hands.', 'elemental/fairy/enter.png'],
                ['They wave at you as you feel force to wave back.', 'elemental/fairy/enter.png'],
                ['Sylveon takes a step closer as you noticed it\'s not a regular sylveon. Its teeth are as sharp as sharpedo and you can see a ring of red around it.', 'elemental/fairy/salute.png'],
                ['It takes another step, you take one back as you glance over the door.', 'elemental/fairy/salute.png'],
                function () {
                    return !acceptFate ?
                        ['You run back and try to open the door, your palms sweaty as you heard its steps closer and closer.' ,'elemental/fairy/runDoor.png'] :
                        ['You know there\'s nothing to do as Sylveon is just a breathaway from you. You made a bad decision', 'elemental/fairy/badEnding1.png'];
                },
                function () {
                    return (!acceptFate && (lastButtonTouched != null && lastButtonTouched.localeCompare('Fairy') == 0)) ?
                        ['You manage to open the door as you hear its claws agains the stone floor. As soon as you manage to take a step outside the room, you see Sylveon launching at you, ready to attack', 'elemental/fairy/doorClose.png'] :
                        ['But was all futile. Your hands manage to turn the rusty doorknob but the door is still closed. Your faith is sealed as you turn around and see Sylveon\'s luminiscent pelt change in the darkness, its bi-colored eyes looking with such happiness you can\'t help but regret what brought you here', 'elemental/fairy/badEnding1.png'];
                },
                function () {
                    return !closeDoor ?
                        ['Despite your quick reaction time, Sylveon is way quicker as you\'re thrown to the floor in what you thought was a safe room. You can smell the rancid smell of blood as Sylveon makes your world black, white teeth as the last thing you manage to see', 'elemental/fairy/badEnding2.png'] :
                        ['You manage to close the door before it manages to enter the safe room, hearing how Sylveon hits the door at the other side. You expect something else to happen but the room grows silent.', 'elemental/fairy/black.png'];
                }
            ]
        },
        {
            'name': 'Fire', 'text': [
                'You decided to enter the Fire room',
                'The sound of embers you heard from before gets closer and draws you near',
                'Somehow, you can\'t make any smell of fire or smoke so you decide to enter the room, as safe as you think it is.',
                'As soon as you step in, you are illuminated by multiple, fake chimneys all around the walls, as they make the whole room. The sound of crisp seems to be comming from them.',
                'As fascinated by the safeity of what would have been the most dangerous, you hear a soft clicking sound, somehow managing to hear despite the hard sounds of the chymenis.. When you turn around, the door is closed.',
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Fire') == 0) ?
                        'You go back to the dark corridor and try to open the door, noticing you can open it' :
                        'You already entered, you decided to ignore the sound but to be safe, you try to turn the rusty knock.';
                },
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Fire') == 0) ?
                        'The door opens as it\'s paper, letting you outside. Exit?'
                        : 'The knock doesn\'t budge as you turn it with all your strength. Despite panic fills you, you decide that you made the correct decision to enter.';

                },

                'You leave the door as you decide to continue walking the corridor, all the walls looking the same.',
                'You notice a bundle of green fur near one of the walls, soft sniffles comming from it as you recognize it as a living being.',
                'Unable to leave someone as lost as you, you decide to approach as you notice a green furred Flareon.',
                'The Flareon is crying, one of his paws deep burried in the fake fire as he looks back at you and asks for help.',
                'He says his cap is there but can\'t reach it as he pushes you down, letting you see the black cap behind realistic flames. You try to back up as the Flareon pushes more and more you in, feeling the heat of flames.',
                function () {
                    return !acceptFate ?
                        'You push yourself back somehow, falling back, a loud hit in your lower back as the Flareon looks at you with a surprise face.' :
                        'You try to yell, to tell the flareon to release you as you feel the smell of real burning in your hair. As the oxygen start to leave your body, you notice the cap was only a fake image that burns along you.';

                },
                function () {
                    return (!acceptFate && (lastButtonTouched != null && lastButtonTouched.localeCompare('Fire') == 0)) ?
                        'The flareon gets up as starts to call you names between growls. An unworthy helper as he grows, their fur spiking as you somehow manage to balance yourself out, managing to get up before his massive paw can get you' :
                        'The flareon looks in awe as his sad face turns into anger. He flungs to you as he starts growing, telling how he was also leaving him back as his weight starts to crush you. You try to trash around only to for your vision to see green fur before it turns black.';

                },
                function () {
                    return !closeDoor ?
                        'Despite all your efforts, as soon as you get to the door and turn the knock, it starts burning as you can see a burn mark in your hand. With no way out, you can only see the distorted face of the flareon just behind you, his amber and black eyes turning to fire as you feel the heat of the fire.' :
                        'You manage to get to the door as your hands hardly manage to turn the knock, hearing the struggle of the flareon to try to reach you through the small corridor. You close the door and turn around, trying to not think what could have happened.';

                }
            ]
        },
        {
            'name': 'Ice', 'text': [
                'You decided to enter the Ice room',
                'You can feel the cold of the room by standing outside, your trembling hand in the knock.',
                'But you made your choice to be here and you push forward, entering a white room.',
                'Inmediatly, you hear the breaking sound closer than ever, making it as some ice falling off the ceiling. It could be dangerous',
                'Despite your thoughts, you are forced to jump before a massive ice falls on you and you can see the door is blocked.',
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Ice') == 0) ?
                        'Somehow, you manage to jump over the block of ice and touch the door. With a gently touch, you can see it opens as normal.' :
                        'With effort, you get over the cold block and get in front of the door. But as soon as you put your hands in it, you can feel this door doesn\'t seems to be the same as before.';
                },
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Ice') == 0) ?
                        'The cold air swallows you whole as you notice you can end this cold torture now if you return to a warmer room. Exit?' :
                        'You swallow when you notice the door seems more a boulder than a door and you\'re unable to move it. Feeling this was a bad decision, you try to find an exit somewhere else.';
                },

                'Leaving the door back, you turn back your sight to your back. Somehow, the block of ice is now break out in multiple, small pieces that allows you to walk freely.',
                'Feeling the cold in your bones you continue, the floor becomming more and more slippery but you mantain your feet.',
                'In the silence, you make out a sound that is not the ice falling. You look around to see nothing.',
                'But the more you walk, more this sound is heard, closer and closer. You notice is the sound of a very heavy breathing.',
                'You make out the origin by looking up. Hidden along the ice with white pelt, you can see blue eyes in the stalagtites as they roll something around the ice and before you can even distinguish who or what is, ice fills your vision. ',
                function () {
                    return !acceptFate ?
                        'Somehow you manage to avoid getting hit by the stalagtite of ice, which breaks in million pieces, hitting you. You lost sight of whoever did this and your un blindy towards the end of the corridor.' :
                        'Before you can even order your body to move, you\'re hit by the stalagtite of ice. Somehow you\'re not dead but you feel your head lighter as the cold and blood loss soon made you faint forever.';
                },
                function () {
                    return (!acceptFate && (lastButtonTouched != null && lastButtonTouched.localeCompare('Ice') == 0)) ?
                        'You feel you\'re walking in circles as you continue to hear the ice breaking behind you. You sight a familiar block of ice as you manage to see the door you came from and you run as much as you are allowed to, your palms sweaty as you manage to open the door.' :
                        'You seem to run in circles as all feel familiar and not familiar at the same time. Ice is now everywhere and you trip, slipping through the cold floor as your head hit something. Dizzy, you try to get up but you get inmediatly crushed by a block of ice.';
                },
                function () {
                    return !closeDoor ?
                        'But you\'re not quick enough to exit as sharp ice falls on your arm, forcing you to recoil and yell in pain. The figure catches you off guard by landing between you and the door, revealing a glaceon with a seemingly weapon. Before you can make what was, you heard your neck snap.' :
                        'You manage to pass through the door as quick as the light as you heard the ice breaking only an inch behind you. Falling to the ground, you can distinguish the figure of whoever attacked you behind it, small frame is all you can make before the door closes.';
                }
            ]
        },
        {
            'name': 'Dark', 'text': [
                'You decided to enter the Dark room',
                'The howling you heard slowly dies down, as somehow they know you\'re about to enter. When you turn the knock completly, the sounds had disappeard.',
                'As you expected, is a room as dark as the night and you can\'t really see anything, the faint light of the room behind you being the only light.',
                'You can sense something near your feet but your eyes nor feet can really distinguish what it is aside of something soft. Looks like it\'sa pile of clothes',
                'Trying to get used to the darkness you take another step and look around and suddenly, the door closes with a slam, leaving you in real complete darkness.',
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Dark') == 0) ?
                        'With panic you go back where you know the door is, touching all walls \'till you notice the feeling of wood. Continuing to touch it allows you to feel the knock and turn it.' :
                        'You stumble to the floor in panic as you get filled with darknes, making it somehow to feel a sensation of wood against your hands. Dispair fills you while looking for the knock as you grasp it like your life depends on it.';
                },
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Dark') == 0) ?
                        'White fills your vision as the light returns, calming you down. The room is still as black as ever and you don\'t think the door closing was bad luck. It\'s your only opportunity to get out.' :
                        'But nothing you do seems to work as the knock refuses to move. You can\'t make out if you\'re turning it in the right direction or not. You lost complete sense as the darkness fill you and you don\'t know anymore if you\'re looking at the right direction.';
                },

                'The darkness doesn\'t feel to welcome you as your eyes never seem to get used to. Your senses can\'t pick the direction you\'re going and you only hope you don\'t bump ove something.',
                'A few minutes walking seems like an ethernity as you also lost track of time. The darkness fills you more than you ever imagine.',
                'But in your dispair, you sense something.. different in the room. A wamr, orange point of light is seen in the distance. Light!',
                'You run to see the light comming from.. something. It\'s giving you their back and you have the sensation you shouldn\'t be looking at.',
                'Suddenly, he turns back, revealing an umbreon, the light comming from his marks. But it feels hard to breate as you notice a ghostly figure more than a living being as his blue eyes lock on you with a hunger you never seen before.',
                function () {
                    return !acceptFate ?
                        'You turn your back before your eyes lock as you stumble and fell multiple times, desperate to escape.' :
                        'You fell back when he takes a step and your fear engulfs you. The sinister smile of the umbreon is only followed by his voice, telling a warm welcome to the death realm as the orange light shuts down. You can only see the faint glow of his blue eyes and gleaming white teeth.';
                },
                function () {
                    return (!acceptFate && (lastButtonTouched != null && lastButtonTouched.localeCompare('Dark') == 0)) ?
                        'You can hear a humming song comming from him as you hit yourself with a wall. When trying to get up you notice it\'s a door! You frantically run your hands over to find the knock, somehow managing to as you turn it with as much strenght as you can, opening what seems to be a heavy door. Light fills your vision as you feel relief.' :
                        'Running blindinly was not a good idea, but was the only one. You stumble and fall as you heard the umbreon laugh. In the time you manage to recover your feet, he\'s in front of you. With his light, you manage to see what you stumble on, looking at what looked a.. corpse. Was more bones than anything as the umbreon just allows you to see your own fate before turning his lights off.';
                },
                function () {
                    return !closeDoor ?
                        'The light seems to make you forget you\'re not safe as you are tackled down, your upper half on the light and the rest inside the dark room. You notice the umbreon pulling you back from your feet as you try to hit him, but your feet seems to go through. In a matter of seconds, you experience the true darkness.' :
                        'You hear a roar and you stumble into the room in the last second, your feets barely scratched. The door is not closed but the umbreon screams in pain at the moment his paw touches the light as it turns back running. Using this opportunity, you close the door as strong as possible, resting your back on it as a secure precaution.';
                }
            ]
        },
        {
            'name': 'Psiquic', 'text': [
                'You decided to enter Psiquic the room',
                'The sound of metal falling is still as hard as ever as you open the door',
                'Your supersitions were correct to think this was a dangerous room. Despite that, you chose it',
                'You can see giant axes swinging side to side and massive metal balls rolling and falling, probably the ones that make the sounds. Despite the initial shock, you can only see how this is something you could see in games',
                'You chuckle a laugh without really knowing how to react as a ball rolls way too near but not enough to hurt you. The falling sound is soon followed by a more rusty sound as you turn back to see two things: the door closed and a peculiar looking pokemon sitting next to it.',
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Psiquic') == 0) ?
                        'You walk slowly to not disturb the pokemon and try to turn the knock. Maybe because the initial surprise a quick thought of not managing to open the door crosses your mind, but the door knock turns as easly as the first time.' :
                        'You walk as steady and as slow as possible, your back on the wall where the pokemon is not. Somehow, you can\'t seem to break eye contact as you find yourself in front of the door. But despite your intentions of opening the door, you just know it won\'t open.';
                },
                function () {
                    return (lastButtonTouched != null && lastButtonTouched.localeCompare('Psiquic') == 0) ?
                        'Maybe you\'re not ready for this room. If this is like the games you played, maybe you need extra levels or another item to get over this room. It would be wise to exit the room now..' :
                        'And your thoughts were true. You shift your sight between the pokemon and the door and thought this was the way of the pokemon telling you to continue.';
                },

                'Continue in the room felt more correct than any other thing you did. Maybe the familiarity with this kind of rooms in your life made you confident.',
                'One of the axes swings in front of you as you jump to the thin platform and you make your way across the room easly. Another door is seen at the end of the path as the pokemon previously sitting back is now there.',
                'You don\'t put too much thought about it as you continue with caution, finally reaching the other side. The pokemon\'s gaze is still as lost as ever but you somehow can see a flinch in her ear',
                'You open the door without any more thought as you continue to stare the pokemon.',
                'Suddenly the bicolor eyes of the pokemon met yours as you can see more faint eyes around. With a shiver you break eye contact and look at the door, only to see a log straight being sent to you.',
                function () {
                    return !acceptFate ?
                        'You close the door and duck in time to avoid the log, feeling somehow as a ninja. The door is broken inmediatly as the log swings on top of you with the same strenght. Suddenly, you remember this is real life. You CAN die. You should not be playing.' :
                        'Your quick videogame reflexes are not the same in real life. The log hurts less than you expected, only knocking you backwards as you stumble back. Suddenly, as your hand searches for new floor, it slips as you fall into the void. Axes swing above you as the pokemon only stares from the top.';
                },
                function () {
                    return (!acceptFate && (lastButtonTouched != null && lastButtonTouched.localeCompare('Psiquic') == 0)) ?
                        'Not knowing if the first room was luck or not, you can\'t risk to return, now the log desynchronized the axes. You run towards the next room as soon as the log is out, a single path away from the door. You reach it and you open it just in time to feel the log scratch your back.' :
                        'You take too much to decide as the log starts to follow you, a hard knock throwing you off. Luck or not, is all floor and you manage to walk away hurt. The pokemon soon appears as smoke starts filling your vision. When you return to your senses, you\'re in front of an axe with nothing you can do.';
                },
                function () {
                    return !closeDoor ?
                        'You throw yourself to avoid any more damage before you see the room, your eyes squeezing hard. You open them to see that was the safe room but unlike the last time, you see the pokemon in the room was now here with you. As the world starts to be filled with smoke, you manage to see the safe room changing slowly as you\'re trapped in an infinite trap.' :
                        'You breath heavely as you recognize the room you\'re in: the safe room. You turn back to see the pokemon staring at you, multiple eyes and smoke all around as you shut the door before anything could enter your head.';
                },
                //PLANTILLA
                {
                    'name': 'Dark', 'text': [
                        'You decided to enter the room',
                        '',
                        '',
                        '',
                        '',
                        function () {
                            return (lastButtonTouched != null && lastButtonTouched.localeCompare('Fairy') == 0) ?
                                'You can open the door' :
                                'You CANT open the door';
                        },
                        function () {
                            return (lastButtonTouched != null && lastButtonTouched.localeCompare('Fairy') == 0) ?
                                'exit?.' :
                                'no exit';
                        },

                        '.',
                        '',
                        '',
                        '',
                        '.',
                        function () {
                            return !acceptFate ?
                                'dont die' :
                                'die';
                        },
                        function () {
                            return (!acceptFate && (lastButtonTouched != null && lastButtonTouched.localeCompare('Fairy') == 0)) ?
                                'not die' :
                                'die';
                        },
                        function () {
                            return !closeDoor ?
                                'die' :
                                'not die.';
                        }
                    ]
                },
            ]
        },
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
        resetTurning();

        if (position == 'left') {
            deleteTypeButtons();
            // Crear el botón
            createGetCloserLeftButton();
        }
        else if (position == 'north') {
            createDoorButton();
        }
        else if (position == 'back') {
            createUpArrow();
        }
        else if (position == 'right') {
            createMirrorButton();
        }

    }

    //----------------------
    //UP
    function createUpArrow() {

        if (isCorrectOrderGuessed) {
            // Crear el botón
            var boton = document.createElement('button');
            boton.setAttribute('id', 'lookUp');
            boton.classList.add('btn', 'btn-secondary', 'mt-2');
            boton.textContent = 'Look up';

            // Obtener la imagen existente
            var imagen = document.querySelector('#imageDiv img');

            // Estilos para centrar el botón
            boton.style.position = 'absolute';
            boton.style.top = '5%';
            boton.style.left = '50%';
            boton.style.transform = 'translate(-50%, -50%)';
            boton.style.zIndex = '10';

            boton.addEventListener('click', lookUp);

            // Asegurarse de que el padre inmediato tenga position relative
            var contenedorDeImagen = imagen.parentNode;
            contenedorDeImagen.style.position = 'relative';
            contenedorDeImagen.appendChild(boton);


        }
    }
    function lookUp() {
        //quitar el boton de lookUp
        deleteElement(document.getElementById('lookUp'));
        document.getElementById('image').src = "elemental/elemental_0008_arriba.png";
        resetTurning();
        //añadir pista
        const hintText = 'Seems a light is reflected on the right wall.<br>';

        document.getElementById('hints').innerHTML.includes(hintText) ? null : document.getElementById('hints').innerHTML += hintText;

        disableDivButton(document.getElementById('turnRightButton'));
        disableDivButton(document.getElementById('turnLeftButton'));

        //tras 2 segundos, que se cree el boton
        setTimeout(function () {
            lookedUp = true;
            // Crear el botón
            var boton = document.createElement('button');
            boton.setAttribute('id', 'returnLookUp');
            boton.classList.add('btn', 'btn-secondary', 'mt-2');
            boton.textContent = 'Return';

            // Obtener la imagen existente
            var imagen = document.querySelector('#imageDiv img');

            // Estilos para centrar el botón
            boton.style.position = 'absolute';
            boton.style.top = '70%';
            boton.style.left = '50%';
            boton.style.transform = 'translate(-50%, -50%)';
            boton.style.zIndex = '10';

            boton.addEventListener('click', returnLookUp);

            // Asegurarse de que el padre inmediato tenga position relative
            var contenedorDeImagen = imagen.parentNode;
            contenedorDeImagen.style.position = 'relative';
            contenedorDeImagen.appendChild(boton);
        }, 2000);


    }

    function returnLookUp() {
        document.getElementById('image').src = "elemental/elemental_0009_detras.png";
        resetTurning();
        createUpArrow();
        enableDivButton(document.getElementById('turnRightButton'));
        enableDivButton(document.getElementById('turnLeftButton'));

    }

    //RIGHT

    function createMirrorButton() {
        // Crear el botón
        var boton = document.createElement('button');
        boton.setAttribute('id', 'getCloserMirror');
        boton.classList.add('btn', 'btn-secondary', 'mt-2');
        boton.textContent = 'Get Closer to the mirror';

        // Obtener la imagen existente
        var imagen = document.querySelector('#imageDiv img');

        // Estilos para centrar el botón
        boton.style.position = 'absolute';
        boton.style.top = '50%';
        boton.style.left = '45%';
        boton.style.transform = 'translate(-50%, -50%)';
        boton.style.zIndex = '10';

        boton.addEventListener('click', getCloserMirror);


        // Asegurarse de que el padre inmediato tenga position relative
        var contenedorDeImagen = imagen.parentNode;
        contenedorDeImagen.style.position = 'relative';
        contenedorDeImagen.appendChild(boton);
    }
    function getCloserMirror() {
        //cambiar imagen
        document.getElementById('image').src = "elemental/elemental_0006_Capa5.png";
        //borrar getCloser
        deleteElement(document.getElementById('getCloserMirror'));
        //deshabilitar los botones deir a los lados
        disableDivButton(document.getElementById('turnRightButton'));
        disableDivButton(document.getElementById('turnLeftButton'));

        //crear boton para ir atras

        var boton = document.createElement('button');
        boton.setAttribute('id', 'getBackMirror');
        boton.classList.add('btn', 'btn-secondary', 'mt-2');
        boton.textContent = 'Go back';

        // Obtener la imagen existente
        var imagen = document.querySelector('#imageDiv img');

        // Estilos para centrar el botón
        boton.style.position = 'absolute';
        boton.style.top = '90%';
        boton.style.left = '50%';
        boton.style.transform = 'translate(-50%, -50%)';
        boton.style.zIndex = '10';

        boton.addEventListener('click', getBackMirror);

        // Asegurarse de que el padre inmediato tenga position relative
        var contenedorDeImagen = imagen.parentNode;
        contenedorDeImagen.style.position = 'relative';
        contenedorDeImagen.appendChild(boton);

        //que al cabo de 5segundos salga un console log       
        if (lookedUp) {

            setTimeout(function () {
                deleteElement(document.getElementById('getBackMirror'));


                // Crear el botón
                var botonGlich = document.createElement('button');
                botonGlich.setAttribute('id', 'glichButton');

                // Añadir la clase al botón
                botonGlich.classList.add('cybr-btn', 'mt-2');

                // Crear el primer span
                var span1 = document.createElement('span');
                span1.setAttribute('aria-hidden', 'true');
                span1.textContent = 'back';  // Texto dentro del primer span

                // Crear el segundo span para el glitch
                var span2 = document.createElement('span');
                span2.setAttribute('aria-hidden', 'true');
                span2.classList.add('cybr-btn__glitch');
                span2.textContent = 'There\'s no turn back';  // Texto dentro del segundo span

                // Añadir los spans al botón
                botonGlich.textContent = 'There\'s no turn '; // Texto principal del botón
                botonGlich.appendChild(span1);
                botonGlich.appendChild(span2);


                // Estilos para centrar el botón
                botonGlich.style.position = 'absolute';
                botonGlich.style.top = '90%';
                botonGlich.style.left = '50%';
                botonGlich.style.transform = 'translate(-50%, -50%)';
                botonGlich.style.zIndex = '10';

                //que no se pueda clicar
                disableDivButton(botonGlich);
                botonGlich.style.opacity = '1';

                contenedorDeImagen.appendChild(botonGlich);
                //en 1segundo, que llame a 'pressMirror'

                setTimeout(function () {
                    pressMirror();
                }, 1000);

            }, 1000);
        }

    }

    function getBackMirror() {
        //quitar los botones
        resetTurning();
        ///quitar getBack
        deleteElement(document.getElementById('getBackMirror'));
        //habilitar botones de turning
        enableDivButton(document.getElementById('turnRightButton'));
        enableDivButton(document.getElementById('turnLeftButton'));
        //cambiar la imagen
        document.getElementById('image').src = "elemental/elemental_0007_derecha.png";
        //llamar el metodo para crear el getCloser del mirror
        createMirrorButton();
    }
    function pressMirror() {
        // Crear un div encima de la imagen y darle ventana.png
        var div = document.createElement('div');
        div.setAttribute('id', 'mano');

        div.style.backgroundImage = 'url("elemental/elemental_0003_Capa6.png")';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'cover';


        // Ajustar el tamaño del div y la imagen 'ventana.png'
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '12px';
        div.style.width = '740px';
        div.style.height = '454px';
        div.style.zIndex = '1';

        // Asegurarse de que el contenedor sea relative
        var imageDiv = document.getElementById('imageDiv');
        imageDiv.style.position = 'relative';

        // Añadir el nuevo div sobre la imagen de fondo
        imageDiv.appendChild(div);


        //en otro segundo que haga un console log
        setTimeout(function () {
            document.getElementById('image').src = "elemental/elemental_0005_Capa7.png";

        }, 1000);
        setTimeout(function () {
            deleteElement(document.getElementById('mano'));
        }, 2000);

        setTimeout(function () {
            deleteElement(document.getElementById('glichButton'));
        }, 3000);

        setTimeout(function () {
            document.getElementById('image').src = "elemental/elemental_0004_Capa8.png";
            //llamar el metodo 'continueCorrect'
            continueCorrect();
        }, 3500);
    }

    function continueCorrect() {
        var boton = document.createElement('button');
        boton.setAttribute('id', 'continue');
        boton.classList.add('btn', 'btn-success', 'mt-2');
        boton.textContent = 'You can continue';

        // Obtener la imagen existente
        var imagen = document.querySelector('#imageDiv img');

        // Estilos para centrar el botón
        boton.style.position = 'absolute';
        boton.style.top = '50%';
        boton.style.left = '50%';
        boton.style.transform = 'translate(-50%, -50%)';
        boton.style.zIndex = '10';

        boton.addEventListener('click', function () {
            //abrir una nueva ventana con el link a google.com
            window.open('https://google.com', '_blank');
        });

        // Asegurarse de que el padre inmediato tenga position relative
        var contenedorDeImagen = imagen.parentNode;
        contenedorDeImagen.style.position = 'relative';
        contenedorDeImagen.appendChild(boton);
    }
    //----------------------
    //LEFT
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

        //limpiar la array
        clickedButtons = [];
    }



    //funciones especificas
    function clickElement(clicked) {
        lastButtonTouched = clicked;
        clickedButtons.push(clicked);

        //hay que comprobar si va por buen camino, es decir si el orden de clicked Buttons corresponde con los principios de correctclickedButtons

        const isCorrect = clickedButtons.every((value, index) => value === correctClickedButtons[index]);
        //si has empezado en el orden correcto, saca una cosa u otra
        document.getElementById('result').textContent = isCorrect ? 'You heard a soft click.' : 'Nothing seems to be changing here.';

        //si es correcto todo, entonces saca una pista extra
        if (isCorrect && clickedButtons.length === correctClickedButtons.length) {
            document.getElementById('hints').textContent += 'Did you look the sky?';
            isCorrectOrderGuessed = true;
        }
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


    //---------------------------------------
    //HABITACIONES
    function enterRoom(elemento) {

        //si ya has entrado, que no siga
        if (enteredRooms.includes(elemento)) {
            //crear la ventana de texto 'You refuse to enter this room again'
            createRefuseWindow();
            //quitar los botones
            deleteTypeButtons();
            return;
        }
        //desahilitar los botones de ir para los lados
        disableDivButton(document.getElementById('turnRightButton'));
        disableDivButton(document.getElementById('turnLeftButton'));
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

        text.textContent = roomObject.text[textLine][0];
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

        
      
        document.getElementById('text').textContent = typeof text.text[textLine] === 'function' ? text.text[textLine]()[0] : text.text[textLine][0];
        document.getElementById('image').src = typeof text.text[textLine] === 'function' ? text.text[textLine]()[1] : text.text[textLine][1];

        // console.log(textLine, text.text[textLine]);
        //para salir de la sala
        console.log(textLine, text.text[textLine], lastButtonTouched, text.name);
        if (textLine == 6 && lastButtonTouched != null && lastButtonTouched.localeCompare(text.name) == 0) {
            createExitButton(text.name);
        }
        // panico
        if (textLine == 11 && document.getElementById('panic') == null) {
            createPanicButton(text.name);
        }
        //esta opcion solo sale si has apretado al boton en el panel
        if (textLine == 13 && document.getElementById('closeDoor') == null && (lastButtonTouched == text.name && lastButtonTouched != '') && acceptFate == false) {
            createCloseDoorButton(text.name);
        }

        //si has llegado al final pero no has apretado al boton, que salga la ultima frase y luego haga un timeout
        if (textLine == 14 && closeDoor == false) {

            document.getElementById('next').removeEventListener('click', nextText);
            document.getElementById('next').addEventListener('click', gameOver);

            textLine--;

        }
        //has conseguido cerrar la puerta
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
                panicButton.remove();

                document.getElementById('next').removeEventListener('click', nextText);

                isPanicClicked = true;
                acceptFate = true;
                textLine++;

                const text = textEnterRoom.find(room => room.name === name);
                nextText(text);

                //hacer el next posible
                enableDivButton(document.getElementById('next'));

                document.getElementById('next').addEventListener('click', function () {
                    gameOver();
                });

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
            if (!isPanicClicked && !closeDoor) {
                panicButton.remove();
                document.getElementById('next').removeEventListener('click', nextText);

                isPanicClicked = true;
                closeDoor = false;
                textLine++;

                const text = textEnterRoom.find(room => room.name === name);
                nextText(text);


                //hacer el next posible
                enableDivButton(document.getElementById('next'));

                document.getElementById('next').addEventListener('click', function () {
                    gameOver();
                });

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


    function hints(number) {
        var hintsArray = [
            'Hint 1: Maybe the panel is connected to the doors.. did you try clicking a button and enter said room?',
            'Hint 2: Are the dangers of the doors really worth?',
            'Hint 3: Did you try following the pokedex?',
            'Hint 4: Reflect and see yourself.',
        ];

        var hints = document.getElementById('hintsReal');

        if (number < hintsArray.length) {
            hints.innerHTML += '<br>' + hintsArray[number];
        }
        if (number === hintsArray.length) {
            clearInterval(intervalId);
            clearInterval(intervalConsoleLog);
        }
    }
    function ejecutarHintsPeriodicamente() {
        hints(hintIndex); // Ejecutar la función de pistas con el índice actual
        hintIndex++; // Incrementar el índice para la siguiente pista
    }


    function ejecutarConsoleHints() {
        var hintsArray = [
            '..You\'re still looking here? There\'s nothing for you to see, really.',
            'You\'re REALLY patient, I see. Maybe if you stick around, I\'ll tell you a hint',
            'The doors are only funny game over you know..',
            'Pokedex numbers? You know this room is inspired in eeveevolutions? Is this hint enough?',
        ];

        if (hintIndex < hintsArray.length) {
            console.log(hintsArray[hintIndex]);
        }

    }
    // Ejecutar cada 5 minutos (300,000 milisegundos)
    var intervalId = setInterval(ejecutarHintsPeriodicamente, 300000); // 300000 ms = 5 minutos
    var intervalConsoleLog = setInterval(ejecutarConsoleHints, 299999); // 300000 ms = 5 minutos



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

    function gameOver() {
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
    }

    function resetTurning() {
        // Eliminar solo el botón si existe
        deleteElement(document.getElementById('getCloserLeft'));
        deleteElement(document.getElementById('lookUp'));
        deleteTypeButtons();

        deleteElement(document.getElementById('lookUp'));
        deleteElement(document.getElementById('returnLookUp'));

        deleteElement(document.getElementById('getCloserMirror'));
        deleteElement(document.getElementById('getBackMirror'));

        // Restablecer la posición del contenedor inmediato de la imagen
        var contenedorDeImagen = document.querySelector('#imageDiv');
        contenedorDeImagen.style.position = '';
    }
});
