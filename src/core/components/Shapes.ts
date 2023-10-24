import { block, cols, rows, shapes } from "../constants/index";
import type { Tetris } from "../main";

export class Shapes {
    currentShape: number[][] = [[1, 1, 1, 1]]
    nextShapes:number[][] = [[1,1], [1,1]]
    currentColor: string = "#fff"
    currentName: string = "I"
    positionX: number = 100;
    positionY: number = 0;

    game: Tetris;

    constructor(game: Tetris) {
        this.game = game
    }

    drawShape() {
        this.currentShape.forEach((rows, y) => {
            rows.forEach((col, x) => {
                if (col === 1) {
                    this.game.ctx.fillStyle = this.currentColor
                    this.game.ctx.fillRect(
                        x * block + this.positionX,
                        y * block + this.positionY,
                        block, block
                    )

                    this.game.ctx.strokeStyle = " #000 ";
                    this.game.ctx.strokeRect(
                        x * block + this.positionX,
                        y * block + this.positionY,
                        block, block
                    )
                }
            })
        })
    }

    rotateShape() {
        const numRows = this.currentShape.length;
        const numCols = this.currentShape[0].length;
        let rotatedShape: number[][] = [];
        for (let i = 0; i < numCols; i++) {
            rotatedShape.push([]);
            for (let j = numRows - 1; j >= 0; j--) {
                rotatedShape[i].push(this.currentShape[j][i]);
            }
        }

        return rotatedShape;
    }

    canRotate(rotateShape: number[][]) {
        const numRows = rotateShape.length;
        const numCols = rotateShape[0].length;

        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numCols; x++) {
                const boardX = Math.floor((this.positionX + x * block) / block);
                const boardY = Math.floor((this.positionY + y * block) / block);

                if (this.currentName === "I") {
                    if (boardX < 0 && this.game.board.board[boardY][boardX + 3] === 0) {
                        this.positionX += 20;
                        this.currentShape = this.rotateShape()
                    }

                    if (boardX >= cols && this.game.board.board[boardY][boardX - 3] === 0) {
                        this.positionX -= 40
                        this.currentShape = this.rotateShape()
                    }
                }


                // Verifica colisiones con el borde del tablero
                if (boardX < 0 || boardX >= cols || boardY >= rows) {
                    if (this.currentName !== "I") {
                        this.positionX -= 20
                        this.currentShape = this.rotateShape()
                    }
                    return false
                }


                // Verifica colisiones con bloques existentes en el tablero
                if (boardY >= 0 && boardX >= 0 && boardX < cols && boardY < rows) {
                    if (this.game.board.board[boardY][boardX] === 1) {
                        return false; // Colisión con un bloque existente
                    }
                }

            }
        }

        return true;
    }

    checkCollision() {
        let hasCollision = false;

        this.currentShape.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col === 1) {
                    const boardX = Math.floor((this.positionX + x * block) / block);
                    const boardY = Math.floor((this.positionY + y * block) / block);

                    // Verifica colisiones con el borde del tablero
                    if (boardX < 0 || boardX >= cols || boardY >= rows) {
                        hasCollision = true; // Colisión con el borde del tablero
                    }

                    // Verifica colisiones con bloques existentes en el tablero
                    if (boardY >= 0 && boardX >= 0 && boardX < cols && boardY < rows) {
                        if (this.game.board.board[boardY][boardX] === 1) {
                            hasCollision = true; // Colisión con un bloque existente
                        }
                    }
                }
            })
        })
        return hasCollision;
    }

    putShape() {
        this.currentShape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 1) {
                    // Calcula las coordenadas del tablero donde se debe colocar la pieza
                    const boardX = Math.floor((this.positionX + x * block) / block);
                    const boardY = Math.floor((this.positionY + y * block) / block);

                    // Verifica que las coordenadas estén dentro de los límites del tablero
                    if (boardY >= 0 && boardX >= 0 && boardX < cols && boardY < rows) {
                        // Coloca la pieza en la matriz del tablero
                        this.game.board.board[boardY][boardX] = 1;
                    }
                }
            });
        });
        this.setNextShape()
        this.game.setGameOver()
    }

    randomShape() {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

        return randomShape
    }

    setNextShape() {
        const randomShape = this.randomShape()
        this.currentShape = this.nextShapes;
        this.currentColor = randomShape.color
        this.currentName = randomShape.name
        this.nextShapes = randomShape.shape
        const randomPosX = [0, 20, 80, 120];
        this.positionX = randomPosX[Math.floor(Math.random() * randomPosX.length)];
        this.positionY = 0;
    }

    drawNextShape() {
        this.game.ctxPreview.clearRect(0, 0, this.game.canvasPreview.width, this.game.canvasPreview.height);
    
        const shape = this.nextShapes; // Get the next shape to draw
        const numRows = shape.length;
        const numCols = shape[0].length;
        
        // Calculate the starting position to center the shape
        const startX = (this.game.canvasPreview.width - numCols * block) / 2;
        const startY = (this.game.canvasPreview.height - numRows * block) / 2;
    
        shape.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col === 1) {
                    this.game.ctxPreview.fillStyle = "#ddd";
                    this.game.ctxPreview.fillRect(
                        startX + x * block,
                        startY + y * block,
                        block, block
                    );
                }
            });
        });
    }
}