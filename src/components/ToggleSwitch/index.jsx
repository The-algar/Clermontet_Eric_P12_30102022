import React from "react";
// import "./ToggleSwitch.css"
import PropTypes from 'prop-types'
import "./ToggleSwitch.scss"

const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, disabled }) => {

  return (
    <div className={"toggle-switch"}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        />
        {id ? (
        <label className="toggle-switch-label" htmlFor={id}>
            <span
              className={
                disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
              data-yes={optionLabels[0]}
              data-no={optionLabels[1]}
            />
            <span
              className={
              disabled
                ? "toggle-switch-button toggle-switch-disabled"
                : "toggle-switch-button"
              }
            />
          </label>
        ) : null}
      </div>
    );
  }

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Api", "Mock"],
}
ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array.isRequired,
  disabled: PropTypes.bool
}

export default ToggleSwitch;