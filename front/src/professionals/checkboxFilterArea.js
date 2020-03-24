import React, { useState } from 'react';

const CheckboxFilterArea = ({ districts, handleChecked }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = c => () => {
    // return the first index or -1
    const currentProfessionId = checked.indexOf(c);
    const newCheckedProfessionId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentProfessionId === -1) {
      newCheckedProfessionId.push(c);
    } else {
      newCheckedProfessionId.splice(currentProfessionId, 1);
    }
    setCheked(newCheckedProfessionId);
    handleChecked(newCheckedProfessionId);
  };

  return districts.map((d, i) => (
    <li className="container-li" key={i}>
      <label className="container-checkbox">
        <input
          type="checkbox"
          onChange={handleToggle(d._id)}
          value={checked.indexOf(d._id === -1)}
        />
        <span className="checkmark"></span>
        <p>{d.disName}</p>
      </label>
    </li>
  ));
};

export default CheckboxFilterArea;
