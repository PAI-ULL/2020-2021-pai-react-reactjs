/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Colors
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 6 of May of 2021
  * @desc A simple example of background colors using React. We can change the backgrounds colors of some divs using buttons
  * @link http://10.6.128.117:8080/reactJS/colors.html
  */

'use strict';

/**
 * Contains all the colors used by the component.
 * User can select one of this colors, and the background of the div will change
 */
const COLORS = ['blue', 'pink', 'black', 'white'];

/**
 * Gets a String and returns the same string but cappitalized (With first letter capital)
 * @param {String} string String to cappitalize
 * @returns {String} Same string as recived but cappitalized (First letter capital)
 */
const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @class Warning Message
 * @classdesc Show a warning message into the HTML when you select the same color
 */
const WarningMessage = class extends React.Component {
  /**
   * Constructor of the class Warning Message.
   * It sends to the super class the properties
   * @param {Object} props Contains the properties. In this case, a boolean which indicates 
   * if is necesary to show the Warning Message or not
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render function. It will show the Warning Message or not, depending of the boolean show 
   * @returns {JSX | null} If show is active, it will return the Warning Message div. If not, will return a null
   */
  render() {
    if(this.props.show) {
      return (<div id="warningMessage">You have selected the same color!</div>);
    }
    return null;
  }
}


/**
 * @class ColorRadios
 * @classdesc Create all the color radios which user will use to choose a color. Also, call the function to change the color
 */
const ColorRadios = class extends React.Component {

  /**
   * Create the color radio instance and call the super class
   * @param {Object} props Contains the properties, in this case, the current selected color, the divId which contains
   * the radios, and the callback function, which is called when user select a radio input
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the component. In this case, create all radio buttons, and attach the event to each button
   * @returns {JSX} An jsx with all the radio buttons, which user will use to select the color
   */
  render() {
    let inputs = [];
    for(let color = 0; color < COLORS.length; ++color) {
      inputs.push(<p><input type="radio" value={COLORS[color]} onChange={() => this.props.changeColor(this.props.divId, COLORS[color])}
        checked={this.props.color === COLORS[color]}/>{capitalize(COLORS[color])}</p>);
    }
    return (<div className="options">{inputs}</div>);
  }
}

/**
 * @class ColorDiv
 * @classdesc Contains the color divs. This is the radio buttons, to select the color
 * and the container which will change the background color
 */
const ColorDiv = class extends React.Component {
  /**
   * Creates the ColorDiv container. It gets the properties. It gets the background color
   * of the div, and also the id of the div, and the function to change the color.
   * @param {Object} props The recived properties. It have the background color, the name of the div, and the function to change the color
   */
  constructor(props) {
    super(props);
  }
  
  /**
   * Render the component. Returns a div which contains the current background color selected and the radio buttons
   * @returns {JSX} The divs of the component rendered
   */
  render() {
    return (
      <div className={"color " + this.props.color}>
        <ColorRadios color={this.props.color} divId={this.props.divId} changeColor={this.props.changeColor}/>
      </div>
    );
  }
}

/**
 * @class Colors
 * @classdesc The main component. It has the logic to change the colors, and also invoques the Warning component
 */
const Colors = class extends React.Component {
  /**
   * Creates the color component. It stores the names of the divs which contains both colors
   * @param {Object} props Recive the names of both divs which contains the colors
   */
  constructor(props) {
    super(props);
    this.state = {
      firstColor : props.firstColor,
      secondColor : props.secondColor
    }

    /* 
      We use this, because if not, when call changeColor in ColorRadio component, 
      it will use the this of this component instead Color this
    */
    this.changeColor = this.changeColor.bind(this); 
  }

  /**
   * Function called when user press a input radio. This function is called by the radio input
   * It will change the color of the div and change the state of the component
   * @param {String} divID The name of the color divs which contains the selected radio input
   * @param {String} color The name of the color which user selected.
   */
  changeColor(divID, color) {
    if(divID === 'firstColor') {
      this.setState({
        'firstColor' : color
      });
    } else {
      this.setState({
        'secondColor' : color
      });
    }
  }

  /**
   * Returns two components. The first and second colors, which the colors selected by the user
   * Also check if both colors are the same. In this case, it will render the Warning Message
   * @returns {JSX} Contains all the render elements. 
   */
  render() {
    return (    
      <div id="colorContainer">
        <WarningMessage show={this.state.firstColor === this.state.secondColor}/>
        <ColorDiv color={this.state.firstColor} changeColor={this.changeColor} divId="firstColor"/>
        <ColorDiv color={this.state.secondColor} changeColor={this.changeColor} divId="secondColor"/>
      </div>
    );
  }
}

/**
 * It will render the component Colors into the DOM 'root'
 */
ReactDOM.render(
  <Colors firstColor="blue" secondColor="pink"/>,
  document.getElementById('root')
);