import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Properties } from '../api/properties.js';

import Property from './Property.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const address = ReactDOM.findDOMNode(this.refs.addressInput).value.trim();
    console.log("llega");
    Properties.insert({
      text,
      address,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.addressInput).value = ''
  }

  renderProperties() {
   return this.props.properties.map((property) => (
      <Property key={property._id} property={property} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Lista de Propiedades</h1>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-property" onSubmit={this.handleSubmit.bind(this)} >
             <label>
              Description:
              <input
                type="text"
                ref="textInput"
                placeholder="Description"
              />
             </label>
             <label>
              Address:
              <input
                type="text"
                ref="addressInput"
                placeholder="Address"
              />
             </label>
             <button type="submit" value="Submit">Guardar</button>
            </form> : ''
          }
        </header>

        <ul>
          {this.renderProperties()}
        </ul>
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    properties: Properties.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(App);
