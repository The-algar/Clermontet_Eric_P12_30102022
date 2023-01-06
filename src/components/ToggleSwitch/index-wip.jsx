import React, { Component } from "react";
// import "./ToggleSwitch.css"
import PropTypes from 'prop-types'
import "./ToggleSwitch.scss"

class ToggleSwitch extends Component {
  render() {
    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          {/* Control label dynamically using content control HTML5 data-attributes */}
          <span className="toggle-switch-inner" data-yes="Api" data-no="Mock"/>
          <span className="toggle-switch-button" />
        </label>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
}

ToggleSwitch.defaultProps = {
  id:'',
  checked:'',
  label: '',
  name: '',
}
export default ToggleSwitch;