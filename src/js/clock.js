/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Clock
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 6 of May of 2021
  * @desc A simple clock in React JS to test the states 
  * @link http://10.6.128.117:8080/reactJS/clock.html
  */

'use strict';

/**
 * @class Clock
 * @lassdesc A simple clock in React JS to test the states 
 */
const Clock = class extends React.Component {
  /**
   * Creates a clock instance. It create a state with the current date
   * @param {Object} props The properties passed to the Clock instance
   */
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  /**
   * Component did mount. It is called when the Clock instance is called
   * It creates an interval to change the class every second and update the clock
   */
  componentDidMount() {
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
        <h1>{this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

/**
 * React render, which will render the component (First parameter) in the HTML DOM (Second parameter)
 */
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);