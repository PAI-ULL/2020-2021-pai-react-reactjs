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

 const CreateItem = function(name, amount, price) {
   return {name, amount, price};
 }

 const Item = class extends React.Component {
  constructor(props) {
    super(props);
 }
 render() {
  return <li>
  <span>{this.props.name}</span>
  <span>{this.props.price}$</span>
  <span>{this.props.amount}</span>
</li>
 }
}

 const InputForm = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});

  }

  handleSubmit(event) {
    if (this.state.name && this.state.amount &&  this.state.price) {
      this.props.submit(new CreateItem(this.state.name, this.state.amount, this.state.price));
      this.state.name = '';
      this.state.amount = '';
      this.state.price = '';
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form class="form" onSubmit={this.handleSubmit}>
        <label>
          <span class="inputName">Name:</span>
          <span class="input"><input type="text" value={this.state.name} name="name" onChange={this.handleChange} /></span>
        </label>
        <br/>
        <label>
          <span class="inputName">Amount:</span>
          <span class="input"><input type="number" value={this.state.amount} name="amount" onChange={this.handleChange} /></span>
        </label>
        <br/>
        <label>
          <span class="inputName">Price:</span>
          <span class="input"><input type="number" value={this.state.price} name="price" onChange={this.handleChange} /></span>
        </label>
        <br/>
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
   * @param {Object} props Recieve the names of both divs which contains the colors
   */
  constructor(props) {
    super(props);
    let exampleMarketItem = [CreateItem('apple', 30, 30), CreateItem('pear', 30, 30)];
    this.state = {
      marketItems: exampleMarketItem,
    }

    /* 
      We use this, because if not, when call changeColor in ColorRadio component, 
      it will use the this of this component instead Color this
    */
    this.addItem = this.addItem.bind(this); 
  }
  
  addItem (item) {
    this.setState({marketItems: [...this.state.marketItems, item]});
  }

  render() {
    let listItemsDom  =  this.state.marketItems.map((item, index) => {
      return <Item key={index.toString()} name={item.name} amount={item.amount} price={item.price}/>;
    });
    return (
      <div class="list">
        <ul>
          <li>
            <span>Product:</span>
            <span>Price:</span>
            <span>Amount:</span>
          </li>
          {listItemsDom}
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
