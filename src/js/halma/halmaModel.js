/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file halmaModel
  * @author Francisco Javier Arocas Herrera
  * @since 11 of May of 2021
  * @desc Contains the model of the Halma Class. It contains the Logic of the game. It contains a board with the moves, and check every user move
  * @link http://10.6.128.117:8080/documentation/practica-13/
  */

'use strict';

/**
 * An empty square. A square without piece in it. User can move a piece into this square
 */
const EMPTY_SQUARE = 0;

/**
 * If a square is ocupped by other piece. User cant move to this square, because, there is a piece in it
 */
const OCCUPIED_SQUARE = 1;

/**
 * If the current square is selected by the user. In this case, user can move this square to another square
 */
const SELECTED_SQUARE = 2;

/**
 * @class Halma Model
 * @classdesc Contains the model of the Halma Class. It contains the Logic of the game. It contains a board with the moves, and check every user move
 */
const HalmaModel = class {
  /**
   * @private
   */
  #board = undefined; /** The board of the halma. It contains the pieces of the game and their position */
  #numberOfMoves = 0; /** The user current number of moves. When user move a piece, it will increment by one */
  #boardSquares = undefined; /** The size of the board of the Halma Game */
  #numberOfPieces = undefined  /** The number of pieces of the Halma Game */
  #currentSelectedSquare = undefined; /** If user has select a square or not */
  #lastPieceJump = undefined; /** Contains the coordenate of the last piece which jump to other piece */
  
  /**
   * Creates the Halma Model. It Will create the board matrix, and also the first pieces
   * @param {Number} boardSquares The size (In squres) of the board. Its a square size (Example 9: 9x9)
   * @param {Number} numberPieces The number of the pieces of the game. Usually are 9 pieces (3x3)
   */
  constructor(boardSquares = 9, numberPieces = 3) {
    this.#boardSquares = boardSquares;
    this.#numberOfPieces = numberPieces;
    this.#generateDefaultBoard();
  }

  /**
   * Generate the default board of Halma Game. The default board is when user start the game
   */
  #generateDefaultBoard() {
    this.#board = new Matrix(this.#boardSquares, this.#boardSquares, EMPTY_SQUARE); // Change false to constant
    this.#numberOfMoves = 0;
    for(let row = 0; row < this.#numberOfPieces; row++) {
      for(let col = 0; col < this.#numberOfPieces; col++) {
        this.#board.set(this.#boardSquares - 1 - row, col, OCCUPIED_SQUARE); // CHANGE true to constant
      }
    }
    this.#numberOfMoves = 0;
  }

  getSquare(row, col) {
    return this.#board.get(row, col);
  }

  /**
   * Get the total of moves of the game. Every time user move, the number of moves will increase one number
   * @returns {Number} The current of numbers of move of the game
   */
  getMoves() {
    return this.#numberOfMoves;
  }

  /**
   * Reset the board. It moves the pieces into to korner, and will put the numberOfMoves to 0
   */
  reset() {
    this.#generateDefaultBoard();
    this.#currentSelectedSquare = undefined;
    this.#lastPieceJump = undefined;
    return this;
  }

  /**
   * Unselect the last piece select by the user. If user has select a piece in the last movement, it will delete it.
   */
  #unselectPiece() {
    if(this.#currentSelectedSquare) {
      this.#board.set(this.#currentSelectedSquare.getCoordenateY(), this.#currentSelectedSquare.getCoordenateX(), OCCUPIED_SQUARE);
      this.#currentSelectedSquare = undefined;
    }
  }

  /**
   * Check if the square can jumpo to another piece. Remember, if there is a square next to the selected piece, it can jump
   * @param {Point2D} selectedSquare The selected squre where user is trying to jump
   * @returns {Boolean} If the current piece can jump to the square selected by user
   */
  #checkIfCanJumpPiece(selectedSquare) {
    const absDistanceX = Math.abs(this.#currentSelectedSquare.getCoordenateX() - selectedSquare.getCoordenateX()); 
    const absDistanceY = Math.abs(this.#currentSelectedSquare.getCoordenateY() - selectedSquare.getCoordenateY());
    if(absDistanceX <= 2 && absDistanceY <=2 && absDistanceX !== 1 && absDistanceY !== 1) {
      let distanceXFromSelected = selectedSquare.getCoordenateX() - this.#currentSelectedSquare.getCoordenateX();
      let distanceYFromSelected = selectedSquare.getCoordenateY() - this.#currentSelectedSquare.getCoordenateY();
      if(distanceXFromSelected % 2 === 0) {
        distanceXFromSelected /= 2;
      }
      if(distanceYFromSelected % 2 === 0) {
        distanceYFromSelected /= 2;
      }
      if(this.#board.get(this.#currentSelectedSquare.getCoordenateY() + distanceYFromSelected, 
        this.#currentSelectedSquare.getCoordenateX() + distanceXFromSelected) === OCCUPIED_SQUARE) {
          return true;
      }
    }
    return false;
  }

  /**
   * Move a Circle to another Square. It is called after check that the move is possible
   * @param {Point2D} selectedSquare The destination square to move the circle
   */
  #move(selectedSquare) {
    this.#board.set(this.#currentSelectedSquare.getCoordenateY(), this.#currentSelectedSquare.getCoordenateX(), EMPTY_SQUARE);
    this.#board.set(selectedSquare.getCoordenateY(), selectedSquare.getCoordenateX(), OCCUPIED_SQUARE);
    this.#currentSelectedSquare = undefined;
  }

  /**
   * Check if the selectedSquare is near to the currentSelectedSquare (Near is next square, only 1 of distance)
   * @param {Point2D} selectedSquare Last square selected by the user, to move the circle
   * @returns {Boolean} If the square selected by user is near to the last one selected by the user
   */
  #nearSquare(selectedSquare) {
    const distanceX = Math.abs(this.#currentSelectedSquare.getCoordenateX() - selectedSquare.getCoordenateX()); 
    const distanceY = Math.abs(this.#currentSelectedSquare.getCoordenateY() - selectedSquare.getCoordenateY());
    return (distanceX <= 1 && distanceY <= 1);
  }

  /**
   * Select a square if there is a piece selected. If pieces is already selected, it will calculate if the position to move
   * is correct. In this case, it will move the piece, and increse the counter
   * @param {Point2D} selectedSquare The square selected, if we select the squre row 2, and col 3, it will be x = 2, y = 3
   */
  selectOrMovePiece(selectedSquare) {
    if(this.#board.get(selectedSquare.getCoordenateY(), selectedSquare.getCoordenateX()) === OCCUPIED_SQUARE) {
      this.#unselectPiece();
      this.#currentSelectedSquare = selectedSquare;
      this.#board.set(selectedSquare.getCoordenateY(), selectedSquare.getCoordenateX(), SELECTED_SQUARE);
    } else if(this.#currentSelectedSquare) {
      if(this.#nearSquare(selectedSquare)) {
        this.#move(selectedSquare);
        this.#numberOfMoves++;
      } else if(this.#checkIfCanJumpPiece(selectedSquare)) {
        if(this.#lastPieceJump && !this.#currentSelectedSquare.equal(this.#lastPieceJump)) {
          this.#lastPieceJump = undefined;
        }
        this.#move(selectedSquare);
        if(!this.#lastPieceJump) {
          this.#numberOfMoves++;
        }
        this.#lastPieceJump = selectedSquare;
      }
    }
    return this;
  }
}