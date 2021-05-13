
/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Point2D
  * @author Francisco Javier Arocas Herrera
  * @since 22 de Mayo de 2021
  * @desc An a simple 2D Point Class. It contains the X and Y variable of a Point, and some methods to operate with the same Point or with another Point
  * @link http://10.6.128.117:8080/documentation/practica-10/
  */

'use strict';

/**
 * @class
 * @classdesc An a simple 2D Point Class. It contains the X and Y variable of a Point, and some methods to operate with the same Point or with another Point
 * @param {Number} coordenateX Coordenate X of the point
 * @param {Number} coordenateY Coordenate Y of the point
 */
const Point2D = class {
  #coordenateX;
  #coordenateY;

  /**
   * It recive the coordenate X and Y of a Point and store it in the class instance
   * @param {Number} coordenateX Coordenate X of the point
   * @param {Number} coordenateY Coordenate Y of the point
   */
  constructor(coordenateX = 0, coordenateY = 0) {
    if(typeof coordenateX !== 'number' || typeof coordenateY !== 'number') {
      throw new Error('Error, you can only create a Point2D instance with numbers');
    }
    this.#coordenateX = coordenateX;
    this.#coordenateY = coordenateY;
  }

  /**
   * Get the coordenate X of the point
   * @returns {Number} The coordenate X of the Point
   */
  getCoordenateX() {
    return this.#coordenateX;
  }

  /**
   * Get the coordenate Y of the point
   * @returns {Number} The coordenate Y of the Point
   */
  getCoordenateY() {
    return this.#coordenateY;
  }

  /**
   * Set the Coordenate X of the Point
   * @param {Number} newCoordenateX The new coordenate X
   */
  setCoordenateX(newCoordenateX) {
    if(typeof newCoordenateX !== 'number') {
      throw new Error('Error, the param to set the coordenate X must be a number');
    }
    this.#coordenateX = newCoordenateX;
  }

  /**
   * Set the Coordenate Y of the Point
   * @param {Number} newCoordenateX The new coordenate Y
   */
  setCoordenateY(newCoordenateY) {
    if(typeof newCoordenateY !== 'number') {
      throw new Error('Error, the param to set the coordenate Y must be a number');
    }
    this.#coordenateY = newCoordenateY;
  }

  /**
   * Returns the point converted to String
   * @returns {String} The point converted to String
   */
  toString() {
    return '{' + this.#coordenateX + ', ' + this.#coordenateY + '}';
  }

  /**
   * Check if two Point2D are equal. These points are equal, where coordenates X and coordeantes Y are the same coordenate
   * @param {Point2D} otherPoint The other point to check if is equal to this point 
   * @returns {Boolean} If both points are the same point, or if are differents points
   */
  equal(otherPoint) {
    return (this.#coordenateX === otherPoint.getCoordenateX() && this.#coordenateY === otherPoint.getCoordenateY());
  }
}