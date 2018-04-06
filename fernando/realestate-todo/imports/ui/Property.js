import React, { Component } from 'react';


import { Properties } from '../api/properties.js';

// Task component - represents a single todo item
export default class Property extends Component {

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Properties.update(this.props.property._id, {
      $set: { checked: !this.props.property.checked },
    });
  }

  deleteThisProperty() {
    Properties.remove(this.props.property._id);
  }

  render() {
    const propertyClassName = this.props.property.checked ? 'checked' : '';

    return (
      <li className={propertyClassName}>
        <button className="delete" onClick={this.deleteThisProperty.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.property.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">
          {this.props.property.text} <strong>Owner: {this.props.property.username}</strong>:
        </span>
      </li>
    );
  }
}
