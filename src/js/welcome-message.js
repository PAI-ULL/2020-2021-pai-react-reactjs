/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Welcome Message
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 16 of May of 2021
  * @desc A simple hello world in React JS
  * @link http://10.6.128.117:8080/reactJS/welcomeMessage.html
  */

'use strict';

/**
 * Simple Hello Div, returns the h1 message with the name of the user
 * @param {Object} props Properties of the component. In this case, contains the name of the suer
 * @returns {JSX} 
 */
const HelloDiv = function(props) {
  return <h1>Hello, {props.name}!</h1>;
}

/**
 * @class HelloMessage
 * @classdesc Show a simple Hello Message into the browser screen. The name of the hello message is passed as parameter
 */
class HelloMessage extends React.Component {
  /**
   * Create the hello message class. It will recive the name of the user and it will write it
   * @param {Object} props Contains the properties of the class, in this case, only the name
   */
  constructor(props) {
    super(props);
  }

  /**
   * It will render the Welcome Message component, showing the name of the user
   * @returns {JSX} Contains a div with a title, which it will show the name of the user
   */
  render() {
    return (
      <div>
        <h2>Hello Again, {this.props.name}!</h2>
      </div>
    );
  }
}

/**
 * Function which ask the user for the name, and will return this name. If user doesnt write a name, it will ask again
 * @returns {String} The name of the user which user entered
 */
function askName() {
  let userName= undefined;
  while(!userName) {
    userName = prompt('Please insert your name: ');
  }
  return userName;
}

const USER_NAME = askName();

/**
 * React Render. It recive two parameters.
 * The component to render and the DOM where render the component
 */
ReactDOM.render(
  <div>
    <HelloDiv name={USER_NAME}/>
    <HelloMessage name={USER_NAME}/>
  </div>, 
  document.getElementById('root')
);