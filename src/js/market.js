/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @file Market
  * @author Francisco Javier Arocas Herrera and Daniel Barroso Rocío
  * @since 12 of May of 2021
  * @desc A simple example of forms and lists (with keys), a market list with items and prices
  * @link http://10.6.128.117:8080/reactJS/market.html
  */

 'use strict';

/**
 * Class that represents an item on the unordered list of market products
 * @param {Object} props that contains properties from the component is called from
 */
 const Item = class extends React.Component {
  constructor(props) {
    super(props);
 }

 /**
  * It will render the component <li> into the <ul> element
  * @returns the li dom node
  */
 render() {
  return <li class="elementList">
  <span>{this.props.name}</span>
  <span>{parseFloat(this.props.price).toFixed(2)}$</span>
  <span>{this.props.amount}</span>
</li>
 }
}

/**
 * Class that represents an input field of the form that accepts new
 * items.
 * @param {Object} props that contains properties from the component is called from
 */
const InputElement = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

  }
  
  /**
  * It will render the component <input> into the form
  * @returns the label dom node that comes  with an input inside
  */
  render() {
    return (
      <label class="elementInput">
          <span class="inputName">{this.props.text}:</span>
          <span class="input"><input step={this.props.field==='price' ? '.01' : null} type={this.props.type} value={this.state.name} 
          name={this.props.field} onChange={this.props.onChange} /></span>
      </label>
    );
  }
}

/**
 * Class that represents the item form on the page
 * @param {Object} props that contains properties from the component is called from 
 */
const InputForm = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Submits the item with its properties if every field is introduced
   * @param {Object} event used here to prevent the submit button to work
   * if conditions aren't met
   */
  handleSubmit(event) {
    if (this.state.name && this.state.amount &&  this.state.price) {
      this.props.submit({name: this.state.name, amount: this.state.amount, price: this.state.price});
    }
    event.preventDefault();
  }

  /**
   * Registers the information on the input fields on the state object
   * @param {Object} event input that the function is called from
   */
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  /**
   * It will render the component InputForm into the div "main"
   * @returns DOM node with a div containing a form
   */
  render() {
    return (
      <div>
        <form class="form" onSubmit={this.handleSubmit}>
          <InputElement field="name" type="text" text="Name" onChange={this.handleChange}/>
          <InputElement field="amount" type="number" text="Amount" onChange={this.handleChange} />
          <InputElement field="price" type="number" text="Price" onChange={this.handleChange} />
          <label>
            <input type="submit" value="Submit" />
          </label>
      </form>
      </div>
    );
  }
 }

 /**
 * @class Market
 * @classdesc The main component. It has the logic to create list items from an input form
 */
 const Market = class extends React.Component {
   
  /**
   * Creates the market component
   * @param {Object} props Recieve the names of the div that contains the list and the form
   */
  constructor(props) {
    super(props);
    let exampleMarketItems = [this.createItem('apple', 30, 0.25), this.createItem('pear', 10, 0.20)];
    this.state = {
      marketItems: exampleMarketItems,
    }

    this.addItem = this.addItem.bind(this); 
  }
  
  /**
   * Adds an item to the array marketItems in the state object
   * @param {Object} item DOM object that will be added to the list of items
   */
  addItem (item) {
    this.setState({marketItems: [...this.state.marketItems, item]});
  }

  /**
   * Function that sums all the prices on the list
   * @returns {Number} with the sum of all the items
   */
  sumPrices () {
    let price = 0;
    for (let i = 0; i < this.state.marketItems.length; i++) {
      price += (parseFloat(this.state.marketItems[i].price, 10) * parseInt(this.state.marketItems[i].amount, 10));
    }
    return price.toFixed(2);
  }

  /**
  * Function in charge of creating examples of items for the list
  * @param {String} name of the item
  * @param {Number} amount of items of the same type
  * @param {Number} price of an individual item
  * @returns {Object} formed with the 3 properties that are passed
  */
  createItem (name, amount, price) {
    return {name, amount, price};
  }

  /**
   * It will render the component div "main" into the div "root" that
   * contains both the list and the form
   * @returns DOM node with a div containing a list of items
   */
  render() {
    let listItemsDom  =  this.state.marketItems.map((item, index) => {
      return <Item key={index.toString()} name={item.name} amount={item.amount} price={item.price}/>;
    });
    return (
      <div id='main'>
        <ul class="list">
          <li class="ulTitle">
            <span>Product:</span>
            <span>Price:</span>
            <span>Amount:</span>
          </li>
          {listItemsDom}
          <li class="liTotalPrice">Total price: {this.sumPrices()}$</li>
        </ul>
        
        <InputForm submit={this.addItem}/>
      </div>
    )
  }

}

  
 /**
 * It will render the component Market into the DOM 'root'
 */
ReactDOM.render(
  <Market/>,
  document.getElementById('root')
);
