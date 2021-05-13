/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Matrix
  * @author Francisco Javier Arocas Herrera
  * @since 28 de Abril de 2021
  * @desc A class which generate a 2D Matrix. You pass a number of Rows, Cols and a default value for the Matrix
  * @link http://10.6.128.117:8080/documentation/practica-13/
  */

'use strict';

/**
 * @class Matrix
 * @classdesc A class which generate a 2D Matrix. You pass a number of Rows, Cols and a default value for the Matrix 
 */
const Matrix = class {
  /** @private */
  #numberRows; /** Number of Rows of the Matrix */
  #numberCols; /** Number of Cols of the Matrix */
  #matrix; /** Matrix Items */

  /**
   * Recive the parameters of the Matrix, and generate the new Matrix 
   * @param {Number} numberRows The number of rows of the new matrix
   * @param {Number} numberCols The number of cols of the new matrix
   * @param {Number | String | Object} defaultValue The default value of the Matrix elements
   */
  constructor(numberRows, numberCols, defaultValue) {
    this.#numberRows = numberRows;
    this.#numberCols = numberCols;
    this.#createMatrix(defaultValue);
  }

  /**
   * Generate the new Matrix. Create the Arrays of the Matrix in the class instance, and fill all elements
   * of the Matrix with the default value
   * @param {Number | String | Object} defaultValue The default value of the Matrix elements
   */
  #createMatrix(defaultValue) {
    this.#matrix = [];
    for(let rows = 0; rows < this.#numberRows; ++rows) {
      let currentRow = [];
      for(let cols = 0; cols < this.#numberCols; ++cols) {
        currentRow.push(defaultValue);
      }
      this.#matrix.push(currentRow);
    }
  }

  /**
   * Get a item of the Matrix
   * @param {Number} row The number of the row to get the item
   * @param {Number} col The number of the col to get the item
   * @returns {Number | String | Object} The Matrix item to get
   */
  get(row, col) {
    return this.#matrix[row][col];
  }

  /**
   * Set a item of the Matrix
   * @param {Number} row The number of the row to set the item
   * @param {Number} col The number of the col to set the item
   * @param {Number | String | Object} value The Matrix item to set
   * @returns {Number | String | Object} The item to set
   */
  set(row, col, value) {
    this.#matrix[row][col] = value;
    return value;
  }
}