import React, { useState } from 'react';

const Checkbox = ({ professions, handleChecked }) => {
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

  return professions.map((p, i) => (
    <li key={i}>
      <input
        onChange={handleToggle(p._id)}
        value={checked.indexOf(p._id === -1)}
        type="checkbox"
      />
      <label>{p.professionName}</label>
    </li>
  ));
};

export default Checkbox;
