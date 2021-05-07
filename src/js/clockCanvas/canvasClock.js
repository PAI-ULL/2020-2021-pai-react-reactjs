/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Clock
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 6 of May of 2021
  * @desc A advanced clock in React JS to test the states 
  * @link http://10.6.128.117:8080/reactJS/clock.html
  */

'use strict';

 /**
  * @class Clock
  * @lassdesc A advanced clock in React JS to test the states 
  */
const CanvasClock = class extends React.Component {
  /** @private */
  #clock = undefined; /** It contains the clock class. This class have the model and view of the clock */
  #size = undefined; /** The size of the canvas clock */
  #canvasID = 'clock'; /** The ID of the canvas which will contains the clock */
  
  /**
  * Creates a clock instance. It create a state with the current date
  * @param {Object} props The properties passed to the Clock instance
  */
  constructor(props) {
    super(props);
    this.#size = parseInt(props.size, 10);
    this.state = {date: new Date()};
  }
 
  /**
  * Component did mount. It is called when the Clock instance is called
  * It creates an interval to change the class every second and update the clock
  */
  componentDidMount() {
    this.#clock = new Clock(this.#canvasID, this.#size);
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  /**
  * Component will unmount. It is called when the component es unmounted (Or deleted)
  * It stop the interval, because if you doesnt stop it. It will called again even though the instance
  * of this object was deleted. And in this case, it will generate an error.
  */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Called each time the component is updated
   * It will render the clock again (Every second)
   */
  componentDidUpdate() {
    this.#clock.render();
  }

  /**
  * Change the current state of the class with the new date
  * Remember that, if you change the state, the class will be render again
  */
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  /**
  * Render returns a clock title and the current date.
  * Remember, that, when the state of the component change, this functions is called again
  * @returns {JSX} A jsx which contains the render 
  */
  render() {
    return (
      <div className="Clock">
        <canvas id={this.#canvasID}></canvas>
      </div>
    );
  }
 }
 
/**
* React render, which will render the component (First parameter) in the HTML DOM (Second parameter)
*/
ReactDOM.render(
  <CanvasClock size="400"/>,
  document.getElementById('root')
);