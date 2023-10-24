import { block } from "../constants/index";
import type { Tetris } from "../main";

export class Keyboard {
    private count: number = 0;
    private game: Tetris;

    constructor(game: Tetris) {
        this.game = game
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.handleKeys(e)
        })

    }

    handleKeys(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") {
            this.handlekeyLeft()
        }

        if (e.key === "ArrowRight") {
            this.handleKeyRight()
        }

        if (e.key === "ArrowUp") {
            this.handleKeyUp()
        }

        if (e.key === "ArrowDown") {
            this.handleKeyDown()
        }
    }

    handleKeyDown() {
        this.count++
        this.game.shapes.positionY += block;
        this.game.ScoreForArrowKey(this.count)
        this.count = 0;
        if (this.game.shapes.checkCollision()) {

            this.game.shapes.positionY -= block;
            this.game.shapes.putShape()


            this.game.board.removeRow()
        }
    }

    handleKeyUp() {
        const rotatedShape = this.game.shapes.rotateShape()

        if (this.game.shapes.canRotate(rotatedShape)) {
            this.game.shapes.currentShape = rotatedShape;
        }

    }

    handlekeyLeft() {
        this.game.shapes.positionX -= block;
        if (this.game.shapes.checkCollision()) {
            this.game.shapes.positionX += block;
        }
    }

    handleKeyRight() {
        this.game.shapes.positionX += block;
        if (this.game.shapes.checkCollision()) {
            this.game.shapes.positionX -= block;
        }
    }


}