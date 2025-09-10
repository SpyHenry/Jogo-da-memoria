const emojis = [
    "🕷️",
    "🕷️",
    "🕸️",
    "🕸️",
    "🎃",
    "🎃",
    "👻",
    "👻",
    "🧙‍♀️",
    "🧙‍♀️",
    "🩻",
    "🩻",
    "🧛‍♂️",
    "🧛‍♂️",
    "🦇",
    "🦇",
];

let openCards = [];
let lockBoard = false;
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "flex";
    initGame();
});

function playSound(type) {
    let audio;
    switch(type) {
        case "flip": audio = new Audio("./src/sounds/flip.mp3"); break;
        case "match": audio = new Audio("./src/sounds/match.mp3"); break;
        case "error": audio = new Audio("./src/sounds/error.mp3"); break;
        case "win": audio = new Audio("./src/sounds/win.mp3"); break;
    }
    if (audio) {
        audio.volume = 0.5;
        audio.play();
    }
}

function initGame() {
    const game = document.querySelector(".game");
    game.innerHTML = "";

    shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
    openCards = [];
    lockBoard = false;

    for (let i = 0; i < shuffleEmojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        game.appendChild(box);
    }
}

function handleClick() {
    if (lockBoard || this.classList.contains("boxOpen")) return;

    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
        playSound("flip");
    }

    if (openCards.length === 2) {
        lockBoard = true;
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch", "glow");
        openCards[1].classList.add("boxMatch", "glow");
        playSound("match");

        setTimeout(() => {
            openCards[0].classList.remove("glow");
            openCards[1].classList.remove("glow");
        }, 800);
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        playSound("error");
    }

    openCards = [];
    lockBoard = false;

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        setTimeout(() => {
            playSound("win");
            alert("🎉 Você venceu... ou será que foi o fantasma? 👻");
        }, 500);
    }
}
