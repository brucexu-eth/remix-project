import React, { useState } from 'react' // eslint-disable-line
/* eslint-disable-next-line */
import './value-selector.css'

export const ValueSelector = () => {
  const [gasValue, setGasValue] = useState('0')

  const changeGasValue = (newValue) => {
    if (newValue === '') {
      return setGasValue('')
    }
    let value = parseInt(newValue, 10)
    setGasValue(String(isNaN(value) ? 0 : value))
  }

  const forceGasValue = () => {
    if (gasValue === '') { setGasValue('0') }
  }

  return (
    <div className="remixui_crow">
      <label className="remixui_settingsLabel">Value</label>
      <div className="remixui_gasValueContainer">
        <input type="text" className="form-control remixui_gasNval remixui_col2" id="value" onBlur={forceGasValue} value={gasValue} onChange={(e) => changeGasValue((e.target as HTMLInputElement).value)} title="Enter the value and choose the unit" />
        <select name="unit" className="form-control p-1 remixui_gasNvalUnit remixui_col2_2 custom-select" id="unit">
          <option data-unit="wei">wei</option>
          <option data-unit="gwei">gwei</option>
          <option data-unit="finney">finney</option>
          <option data-unit="ether">ether</option>
        </select>
      </div>
    </div>
  )
}

export default ValueSelector
