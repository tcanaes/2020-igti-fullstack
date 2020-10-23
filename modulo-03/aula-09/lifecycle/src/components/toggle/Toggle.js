import React from 'react';

export default function Toggle({ onToggle }) {
  const handleOnChange = (evt) => {
    onToggle(evt.target.checked);
  };

  return (
    <div className="switch">
      <label>
        Mostrar usuários:
        <input type="checkbox" onChange={handleOnChange} />
        <span className="lever"></span>
      </label>
    </div>
  );
}
