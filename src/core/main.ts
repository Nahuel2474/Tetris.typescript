import { Board } from "./components/Board";
import { Keyboard } from "./components/Keyboard";
import { Shapes } from "./components/Shapes";
import { block, cols, rows } from "./constants";


export class Tetris {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    canvasPreview: HTMLCanvasElement;
    ctxPreview: CanvasRenderingContext2D;

    shapes: Shapes;
    keyboard: Keyboard;
    board: Board;

    points: number = 0;
    puntuacionElement = document.querySelector('p');

    constructor(canvas: HTMLCanvasElement, canvasPreview: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.ctx.canvas.width = cols * block;
        this.ctx.canvas.height = rows * block;

        this.canvasPreview = canvasPreview;
        this.canvasPreview.width = 5 * block;
        this.canvasPreview.height = 5 * block;
        this.ctxPreview = this.canvasPreview.getContext('2d') as CanvasRenderingContext2D;

        this.board = new Board(this)
        this.shapes = new Shapes(this);
        this.keyboard = new Keyboard(this)
        this.draw()
    }

    draw() {
        this.board.drawBoard()
        this.shapes.currentShape = this.shapes.randomShape().shape
        this.shapes.currentColor = this.shapes.randomShape().color
        this.shapes.currentName = this.shapes.randomShape().name
        this.shapes.nextShapes = this.shapes.randomShape().shape
        this.shapes.randomShape()

        this.shapes.drawShape()
    }

    Score(rowsToRemove: number[]) {
        this.points += rowsToRemove.length * 20
        if (this.puntuacionElement) {
            this.puntuacionElement.textContent = this.points.toString();
        }
    }

    ScoreForArrowKey(points: number) {
        this.points += points
        if (this.puntuacionElement) {
            this.puntuacionElement.textContent = this.points.toString();
        }
    }

    setGameOver(): boolean {
        if (this.shapes.checkCollision()) {
            alert('game over!')
            this.newGame();
            return true;
        }
        return false
    }

    newGame() {
        this.points = 0;
        if (this.puntuacionElement) {
            this.puntuacionElement.textContent = "0";
        }
        this.board.board.forEach((row) => row.fill(0));
        this.shapes.randomShape()

    }

}