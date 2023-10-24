import { block, cols, rows } from "../constants";
import type { Tetris } from "../main";


export class Board {
    board: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))
    puntuacion: number = 0;
    game: Tetris;

    constructor(game: Tetris) {
        this.game = game;
    }

    drawBoard() {
        this.board.forEach((rows, y) => {
            rows.forEach((col, x) => {
                if (col === 0) {
                    this.game.ctx.fillStyle = "#333";
                    this.game.ctx.fillRect(
                        x * block,
                        y * block,
                        block, block
                    )

                    this.game.ctx.strokeStyle = "#222";
                    this.game.ctx.strokeRect(
                        x * block,
                        y * block,
                        block, block
                    )
                }
            })
        })
    }

    removeRow() {
        const rowsToRemove: number[] = [];
        this.board.forEach((row, y) => {

            if (row.every((value) => value === 1)) {
                rowsToRemove.push(y)
            }

            rowsToRemove.forEach((y) => {
                this.board.splice(y, 1);
                const newRow = Array(cols).fill(0);
                this.board.unshift(newRow)
            })

        })

        if (rowsToRemove.length > 0) {
            this.game.Score(rowsToRemove)
        }
    }



}