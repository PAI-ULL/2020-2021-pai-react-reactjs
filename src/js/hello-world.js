/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Hello World
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 6 of May of 2021
  * @desc A simple hello world in React JS
  * @link http://10.6.128.117:8080/reactJS/hello-world.html
  */

'use strict';

/**
 * Contains a h1 "Hello World" in JSX. It will convert to HTML 
 */
const helloWorld = <h1>Hello, world!</h1>;

/**
 * React Render. It recive two parameters.
 * The component to render and the DOM where render the component
 */
ReactDOM.render(helloWorld, document.getElementById('root'));