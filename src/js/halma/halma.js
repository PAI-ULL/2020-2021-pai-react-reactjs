/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Halma
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 13 of May of 2021
  * @desc The halma game converted to react. The objetive of the game is to move all pieces to the other korner of the board 
  * @link http://10.6.128.117:8080/reactJS/halma.html
  */

'use strict';

/**
 * @class HalmaSquare
 * @classdesc Contains a square of the board. This square can be empty, or contain a piece
 */
const HalmaSquare = class extends React.Component {
  /**
   * Create the Halma Sqaure. Recive the props and call the React.Component super
   * @param {Object} props Props passed is the row and the col of the square (The coordenates into the board)
   * Also the content. This is if contains a piece or not (Or if the piece is the piece selected by the user)
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the square class of the square. The CSS class will draw the circle or the filled circle, 
   * depending if there is a piece in the square or not
   * @param {Number} squareContent A number which represents the content of the square
   * @returns {String} The class of CSS which will add to the square div
   */
  getSquareClass(squareContent) {
    switch (squareContent) {
      case EMPTY_SQUARE : {
        return 'empty';
      }
      case OCCUPIED_SQUARE : {
        return 'dot';
      }
      case SELECTED_SQUARE : {
        return 'dot filledDot';
      }
    } 
  }

  /**
   * Render the current square. Also add an event when the user will click the square
   * @returns {JSX} Will return the jsx which contains the current square of the game
   */
  render() {
    return <div class="square" onClick={() => this.props.squareOnClick(this.props.rowID, this.props.colID)}>
      <div class={this.getSquareClass(this.props.content)}></div>
    </div>
  }
}


/**
 * @class HalmaBoard
 * @classdesc Generate the board of the Halma Game. This is all the squares of the board (In this case 9x9 squares)
 */
const HalmaBoard = class extends React.Component {
  /**
   * It is called by the Halma Game Component. It recives some props from this
   * @param {Object} props The props recived by the Halma Game Component. This are the total numberOfSquares per row and column. 
   * A function to get the content of each square, and onClick function which is called when user press a function
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the content of the board. This is all the squares contained in a div. Each row is contained in another div
   * So, the structure is similar to this <board><row><square/><square/></row><row><square/><square/></row></board>
   */
  render() {
    let board = [];
    for(let row = 0; row < this.props.numberSquares; ++row) {
      let rowCanvas = [];
      for(let col = 0; col < this.props.numberSquares; ++col) {
        rowCanvas.push(<HalmaSquare rowID={row} colID={col} content={this.props.getSquare(row, col)} squareOnClick={this.props.squareOnClick}/>);
      }
      board.push(<div class="row">{rowCanvas}</div>);
    }
    return <div id="board">{board}</div>;
  }
}

/**
 * @class Halma
 * @classdesc It contains all the game. Including the board and the logic to move the piece. Also a div to show the number of moves and a reset button
 */
const Halma = class extends React.Component {
  /** @private */
  #numberSquares; /** The number of squares per row and col of the game. Remeber that there are the same number of squares per row and col */
  #numberPieces; /** The number of total pieces of the game. If for example is 3, there are 9 pieces (3x3) */

  /**
   * Creates the Halma Class. It creas the board of the game, and bind some functions which will be recived by the children components
   * @param {Object} props The props recived by the Halma Class. This is the number of squares and the names os pieces
   */
  constructor(props) {
    super(props);
    this.#numberSquares = parseInt(props.numberSquares, 10);
    this.#numberPieces = parseInt(props.numberPiece, 10);
    this.state = { board : new HalmaModel(this.#numberSquares, this.#numberPieces)};
    this.onClickSquare = this.onClickSquare.bind(this);
    this.reset = this.reset.bind(this);
    this.state.board.getSquare = this.state.board.getSquare.bind(this.state.board);
  }

  /**
   * This functions is called when user click in some of the divs. It will call the board logic to check what halma board must do
   * @param {Number} row The number of the row which user click
   * @param {Number} col The number of the col which user click
   */
  onClickSquare(row, col) {
    this.setState({
      board : this.state.board.selectOrMovePiece(new Point2D(col, row))
    });
  }

  /**
   * Get the total number of moves made by the user. Remember when user move a piece to other square, it is a move.
   * So, this function returs the current number of moves.
   * @returns {Number} The current number of moves made by the user
   */
  #getNumberMoves() {
    return this.state.board.getMoves();
  }

  /**
   * It will reset the board. This is, set moves to 0, and move the pieces to the start position of the board
   */
  reset() {
    this.setState({
      board : this.state.board.reset()
    });
  }

  /**
   * Render the Halma Game. It will render the board, and also some divs to show the number of moves and a reset button
   * @returns {JSX} A div which contains all the structure to play the halma game
   */
  render() {
    return (
      <div class="flex">
        <HalmaBoard numberSquares={this.#numberSquares} getSquare={this.state.board.getSquare} squareOnClick={this.onClickSquare}/>
        <div id="rightUserController" class="userController">
          <div id="moves">
          <span>Number of moves: <strong id="movesCounter">{this.#getNumberMoves()}</strong></span>
          </div>
          <button id="reset" onClick={this.reset}>Reset Game</button>
        </div>
      </div>
    );
  }
}

