
document.addEventListener("DOMContentLoaded", function () {
    const places = [
      { name: "Bed", searched: false },
      { name: "Pillow", searched: false },
      { name: "Under the bed", searched: false },
      { name: "Bucket", searched: false },
      { name: "Trophy rack", searched: false },
    ]
  
    const phrases = [
      "-.-. .... .- --- ... / .-. . .. --. -. ... / .- ... / - .... . / .-. . -... . .-.. ... / ..-. .. --. .... - / ..-. --- .-. / - .... . .. .-. / ..-. .-. . . -.. --- -- / .- --. .- .. -. ... - / .... ..- -- .- -.",
      ".... --- .--. . / ..-. --- .-. / .- / -... . - - . .-. / ..-. ..- - ..- .-. . / -- --- - .. ...- .- - . ... / - .... . / .--. .-. --- - . -.-. - --- .-. ... / - --- / ... - .- -. -.. / ... - .-. --- -. --.",
      "..-. .-. . . -.. --- -- / - --- / -.. . -.-. .. -.. . / - .... . .. .-. / --- .-- -. / ..-. .- - . / .. ... / .-- .... .- - / - .... . / -. . ..- - .-. .- .-.. ... / -.-. .... . .-. .. ... .... / -- --- ... -",
    ]
  
    let searchedCount = 0
  
    // Elegir un botón que no llenará información
    const buttonNotFillingIndex = Math.floor(Math.random() * 4)
  
    // Elegir un botón especial que no sea el mismo que el botón que no llenará información
    let specialButtonIndex
    do {
      specialButtonIndex = Math.floor(Math.random() * places.length)
    } while (specialButtonIndex === buttonNotFillingIndex)
  
    // Array para almacenar las frases ya utilizadas
    const usedPhrases = []
  
    function createButtons() {
      var button = document.createElement("button")
      var button2 = document.createElement("button")
      var button3 = document.createElement("button")
      var button4 = document.createElement("button")
      const specialButton = document.createElement("button")
  
      //darle la clase
      button.classList.add("btn")
      button2.classList.add("btn")
      button3.classList.add("btn")
      button4.classList.add("btn")
      specialButton.classList.add("btn", "disabled");
  
      //texto interior
      button.innerText = places[0].name // Cambia el texto para que coincida con los lugares
      button2.innerText = places[1].name
      button3.innerText = places[2].name
      button4.innerText = places[3].name
      specialButton.innerText = places[4].name // Cambia el texto del botón especial
  
      // Asignar posiciones (ajusta según tus necesidades)
      button.style.top = "50%" // Ajusta la posición Y
      button.style.left = "60%" // Ajusta la posición X
  
      button2.style.top = "40%" // Ajusta la posición Y
      button2.style.left = "80%" // Ajusta la posición X
  
      button3.style.top = "75%" // Ajusta la posición Y
      button3.style.left = "45%" // Ajusta la posición X
  
      button4.style.top = "70%" // Ajusta la posición Y
      button4.style.left = "10%" // Ajusta la posición X
  
      specialButton.style.top = "25%" // Ajusta la posición Y
      specialButton.style.left = "5%" // Ajusta la posición X
  
      // evento
      button.addEventListener("click", () => {
        clickRegularButtons(0) // Cambia a 0 para el primer botón
      })
      button2.addEventListener("click", () => {
        clickRegularButtons(1)
      })
      button3.addEventListener("click", () => {
        clickRegularButtons(2)
      })
      button4.addEventListener("click", () => {
        clickRegularButtons(3)
      })
  
      // Asignar evento al botón especial
      specialButton.addEventListener("click", () => {
        var special = document.getElementById("specialBox")
        special.classList.add("active")
        special.innerHTML = "<strong>First letter, from more to less.</strong> <br>"+
        "A voice whispers and behind the note, the sudden text appears: <br>"+
        "<a href='https://morsecode.world/international/translator.html'>Language of the war</a>"+
        "<br> First letter must be in lowercase"+
        "<br>A=0, B=1, C=1. Maybe this page will <a href='./transform.html'>help</a>"+
        "<br> <a href='https://www.rapidtables.com/convert/number/base-converter.html'>Language of the numbers</a>"+
        
        "<br> Make sure to chose 10 as base and to convert it to the lower case Q <br>"
        +"<img src='lowerQ.png' class='img-fluid mx-auto text-center d-block' height='100'>";
      });
  
      //dar al padre
      var container = document.getElementById("contenedor")
      container.appendChild(button)
      container.appendChild(button2)
      container.appendChild(button3)
      container.appendChild(button4)
      container.appendChild(specialButton)
    }
  
    function clickRegularButtons(index) {
      if (index === buttonNotFillingIndex) {
        // alert(`No se llenará nada al buscar en: ${places[index].name}`)
        document.getElementById('text').innerHTML='Ras Ras.. there\'s nothing here';
        places[index].searched = true // Marcar como buscado aunque no llene
        searchedCount++ // Contar búsqueda
      } else {
        document.getElementById('text').innerHTML="";
        handleSearch(index)
      }
  
      // Activar el botón especial después de buscar 4 lugares
      if (searchedCount >= 4) {
        document.querySelector(".btn.disabled").classList.remove("disabled")
      }
    }
  
    createButtons()
  
    function handleSearch(index) {
      if (places[index].searched) {
        // console.log(`Ya has buscado en: ${places[index].name}`)
        return // No hacer nada si ya se buscó
      }
  
      places[index].searched = true // Marcar como buscado
      searchedCount++
      // console.log(`Buscado en: ${places[index].name}`)
  
      // Encontrar un div de información aleatorio
      const infoBoxes = document.querySelectorAll(".info-box")
      const availableBoxes = Array.from(infoBoxes)
        .slice(0, 3)
        .filter((box) => !box.classList.contains("active"))
  
      if (availableBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableBoxes.length)
        const selectedBox = availableBoxes[randomIndex]
        selectedBox.classList.add("active")
  
        // Asignar una frase aleatoria que no se haya usado
        let randomPhraseIndex
        do {
          randomPhraseIndex = Math.floor(Math.random() * phrases.length)
        } while (usedPhrases.includes(randomPhraseIndex))
  
        usedPhrases.push(randomPhraseIndex)
        selectedBox.innerText = phrases[randomPhraseIndex]
      } else {
        alert("ERROR- please contact fallen with the code Morse-150")
      }
    }
  
  
  })
  
  
    function inputCode(value) {
      var inputTxt = document.getElementById("inputNum")
  
      // Si tiene 4 caracteres, comprobar si es el correcto
      if (inputTxt.innerHTML.length === 4) {
        checkFinalResult(inputTxt.innerHTML)
      } else {
        // Si no tiene 4 caracteres, añadir el valor
        inputTxt.innerHTML += value
  
        // Si ahora tiene 4 caracteres, comprobar si es correcto
        if (inputTxt.innerHTML.length === 4) {
          checkFinalResult(inputTxt.innerHTML)
        }
      }
    }
    
    
    function checkFinalResult(value) {
      document.getElementById('text').innerHTML='';
      if (value === "1025") {
        // Es correcto, pon ok
        document.getElementById('result').innerHTML = 'A beep is heard and the screen turns green <a href="https://docs.google.com/document/d/1tVsDuMMllzG3Xyw24NhCIQ9ZyKOMceihtmbGXs3xpW4/edit?tab=t.0">and you can go throught.</a>.'
      } else {
        // No es correcto, pon error
        value = "ERROR"
  
        // Cambiar el color a rojo
        document.getElementById("inputNum").style.color = "red"
  
        // Borrar después de 1 segundo
        setTimeout(() => {
          document.getElementById("inputNum").style.color = "black" // Restablecer color
          document.getElementById("inputNum").innerHTML = "" // Limpiar el contenido visible
        }, 1000) // 1000 ms = 1 segundo
      }
    }
  