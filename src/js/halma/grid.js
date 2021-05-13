
/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Grid
  * @author Francisco Javier Arocas Herrera
  * @since 22 de Abril de 2021 | 11 de Mayo de 2021
  * @desc Draw a grid in the canvas. User can choose the color of the lines, the size of the circle and also the size of the line
  * @link http://10.6.128.117:8080/documentation/practica-13/
  * NOTE: Recicled from the RandomWalk Practica
  */

'use strict';

import { Line } from './forms/line.js';
import { Point2D } from './forms/point2D.js';

/**
 * The default color of the Grid
 */
const GRID_COLOR = 'gray';

/**
 * The default size of the lines of the Grid
 */
const GRID_LINE_SIZE = 1;

/**
 * @class
 * @classdesc Draw a grid in the canvas. User can choose the color of the lines, the size of the circle and also the size of the line
 * @param {Number} size The size of the canvas to draw the grid
 * @param {DOM} canvasContext The context of the current canvas to draw
 * @param {Number} numberLines The number of the lines of the grid
 */
export const Grid = class {
  /** @private */
  #size; /** Size of the grid. In pixels, it contains the all size of the grid */
  #canvasContext /** The context of the canvas to draw the grid */;
  #numberLines; /** The number of lines, that grid will contain */
  
  /**
   * Constructor of the class. It recive the parameters and store it in the class
   * @param {Number} size The size of the canvas
   * @param {DOM} canvasContext 
   * @param {*} numberLines 
   */
  constructor(size, canvasContext, numberLines) { // Note size is Square: width = height
    this.#size = size;
    this.#canvasContext = canvasContext;
    this.#numberLines = numberLines;
  }

  /**
   * Draw the grid in the canvas. It draw a #numberLines lines from left to right and from top to bottom
   */
  draw() {
    const linesDistances = Math.floor(this.#size / this.#numberLines);
    for(let i = 0; i < this.#size; i += linesDistances) {
      const currentLineXAxe = new Line(this.#canvasContext, new Point2D(i, 0), new Point2D(i, this.#size), GRID_COLOR, GRID_LINE_SIZE);
      currentLineXAxe.draw();
      const currentLineYAxe = new Line(this.#canvasContext, new Point2D(0, i), new Point2D(this.#size, i), GRID_COLOR, GRID_LINE_SIZE);
      currentLineYAxe.draw();
    }
  }

}