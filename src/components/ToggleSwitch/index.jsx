import { Component } from "react";
import "./ToggleSwitch.css"
import PropTypes from 'prop-types'

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
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

ToggleSwitch.defaultProps = {
  label: '',
  title: '',
}
export default ToggleSwitch;