/* eslint-disable jsx-a11y/label-has-associated-control */
import { array, func, string, number, oneOfType, bool } from 'prop-types'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const PanelEditorDropdown = ({
  title,
  options,
  value,
  onChange,
  className,
  required,
  disabled,
}: any) => {
  return (
    <div className={`panel-editor-segment ${className}`}>
      <p className="select-label">
        {title}:{required && <span className="asterisk">*</span>}
      </p>

      <Dropdown
        selection
        placeholder="-----------"
        options={options}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default PanelEditorDropdown

PanelEditorDropdown.propTypes = {
  title: string.isRequired,
  options: array.isRequired,
  onChange: func.isRequired,
  value: oneOfType([string, number]).isRequired,
  className: string,
  required: bool,
  disabled: bool,
}

PanelEditorDropdown.defaultProps = {
  className: '',
  required: false,
  disabled: false,
}
