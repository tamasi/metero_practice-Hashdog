import React, { Component } from 'react';


// Task component - represents a single todo item
export default class Property extends Component {
  render() {
    return (
      <li>{this.props.property.text}</li>
    );
  }
}
