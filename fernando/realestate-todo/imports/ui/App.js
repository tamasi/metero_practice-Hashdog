import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';

import { Properties } from '../api/properties.js';

import Property from './Property.js';

// App component - represents the whole app
class App extends Component {
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
    properties: Properties.find({}).fetch(),
  };
})(App);
