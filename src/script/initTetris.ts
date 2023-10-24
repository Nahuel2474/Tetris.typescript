import type { Board } from "../core/components/Board";
import type { Shapes } from "../core/components/Shapes";
import { Tetris } from "../core/main";

let lastTime = 0;
let dropInterval = 1000;
let dropCounter = 0;

let isPaused = false;
let isOn = false;
let game: Tetris;
let board: Board;
let shapes: Shapes;

let animationId: number;
let puntuacionDom: HTMLParagraphElement;


document.addEventListener("keydown", (e) => {
    if (e.key === "p") {
        isPaused = !isPaused;
        if (isPaused) {
            console.log("hi");
            cancelAnimationFrame(animationId);
        } else {
            requestAnimationFrame(update);
        }
    }
});

function setMenu(): void {
    const gameContainer = document.getElementById("gameContainer");
    if (gameContainer) {
        gameContainer.innerHTML = "";
    }

    const button = document.createElement("span");
    button.textContent = "Start Game";
    button.setAttribute("class", "btn")
    button.addEventListener("click", () => {
        isOn = true;
        startGame();
    });

    gameContainer?.appendChild(button);
}

function startGame() {
    const gameContainer = document.getElementById("gameContainer");
    const canvas = document.createElement("canvas");
    const canvasPreview = document.createElement("canvas");
    const puntuacion = document.createElement('p');

    if (gameContainer) {
        gameContainer.innerHTML = "";
        gameContainer.style.position = "relative"
    }

    canvas.style.opacity = "1"
    canvasPreview.style.opacity = "1"
    canvasPreview.style.position = "absolute"
    canvasPreview.style.top = "0em"
    canvasPreview.style.right = "-8em"

    puntuacion.style.opacity = "1"
    puntuacion.style.position = "absolute"
    puntuacion.style.top = "11em"
    puntuacion.style.right = "-4.8em"

    gameContainer?.appendChild(canvas);
    gameContainer?.appendChild(canvasPreview)
    gameContainer?.appendChild(puntuacion)
    puntuacionDom = puntuacion
    puntuacionDom.textContent = "0";
    game = new Tetris(canvas, canvasPreview);
    shapes = game.shapes
    board = game.board
}

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;


    if (isOn) {
        handleGameLogic()
    }

    animationId = requestAnimationFrame(update);
}

function handleGameLogic() {

    if (dropCounter >= dropInterval) {

        shapes.positionY += 20;
        dropCounter = 0;
    }

    if (shapes.checkCollision()) {
        shapes.positionY -= 20;
        shapes.putShape();
        board.removeRow()
    }

    board.drawBoard();
    shapes.drawShape();
    shapes.drawNextShape();

}


setMenu()
update();