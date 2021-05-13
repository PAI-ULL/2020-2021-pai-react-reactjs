/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Halma Web
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 13 of May of 2021
  * @desc The web of the Halma Game. It will render all the elements of the web, (Header, footer, and the Halma Game)
  * @link http://10.6.128.117:8080/reactJS/halma.html
  */

'use strict';

/**
 * Contents of each li showed in the footer of the web page. It will render each string as a li element
 */
const FOOTER_LI_CONTENT = [
  'Halma Game in ReactJS',
  'Universidad de La Laguna',
  'Grado en Informática',
  'Programación de Aplicaciones Interactivas (PAI)'
];;

/**
 * @class Header
 * @classdesc The header of the Halma Web. It contains the top menu of the web with the logo and a small menu
 */
const Header = class extends React.Component {
  /**
   * Create the header of the Web. It will show the logo and a small menu
   * @param {Object} props Contains the properties of the class. In this case, it contains a header title
   */
  constructor(props) {
    super(props);
  }

  /**
   * Will render and show a small header in the web. The header will contain the name of the page and a small menu
   * @returns {JSX} The containt of the header rendered by the component. It has the title and the menu
   */
  render() {
    return (
      <div id="headerBackground">
        <div id="header" className="menu">
          <h1>{this.props.title}</h1>
          <ul>
            <li><a href="index.html">Home</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * @class Content
 * @classdesc Contains the content of the web page. Currently its only the Halma Square, but it can has more content 
 */
const Content = class extends React.Component {
  /**
   * Create the content class. It will render a Halma Board with the default configuration
   * @param {Object} props Contains the properties of the class. In this case, is a empty object
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the content. It will return the Halma with the number of squares of pieces and the number of pieces to start
   * @returns {JSX} The component rendered it contains a div and inside this div the Halma Game
   */
  render() {
    return (
      <div id="content">
        <Halma numberSquares="9" numberPiece="3"/>
      </div>
    );
  }
}

/**
 * @class Footer
 * @classdesc The footer of the web page, it contains a small footer menu with some li elements that are descriptions about the aplication 
 */
const Footer = class extends React.Component {
  /**
   * Contains the footer of the web page. This footer will show a small menu with some li elements
   * @param {Object} props Recive a property menu which is an array of li elements content to show into the footer
   */
  constructor(props) {
    super(props);
  }

  /**
   * Will render all the footer. Before to render, it will create the li elements of the menu, and add a class to the last element of the menu
   * @returns {JSX} Will return the all footer with the menu. Also add some divs like footerBackground and the footer div id
   */
  render() {
    let footerMenuItems = this.props.menuElements.map((content, index) => {
      return <li className={index === this.props.menuElements.length - 1 ? 'lastLi' : ''}>{content}</li>;
    });
    console.log(footerMenuItems);
    return (    
      <div id="footerBackground">
        <div id="footer" class="menu">
          <ul>
            {footerMenuItems}
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * @class App
 * @classdesc The main component of the web. It will render all the web, incluiding the header, the game and the footer
 */
const App = class extends React.Component {
  /**
   * Create the App. It contains all the website, including the header, the game and the footer.
   * @param {Object} props Properties passed to the App Class. In this case, the props are empty
   */
  constructor(props) {
    super(props);
  }

  /**
   * It will render all the web page, it includes the header, the content and the footer
   * @returns {JSX} The content of the webpage. It will pase some parameters as the title of the webpage, and the elements of the footer
   */
  render() {
    return (
      <div>
        <Header title="Halma"/>
        <Content/>
        <Footer menuElements={FOOTER_LI_CONTENT}/>
      </div>
    );
  }
};

/**
 * Will render the Halma Web. In addition to the Halma Board, it will render the header and footer of the webpage
 */
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);