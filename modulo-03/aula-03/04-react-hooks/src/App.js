import React, { useEffect, useState } from 'react';
import { getTimestamp } from './helpers/timestampHelper';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length.toString();
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getTimestamp());
    setClickArray(newClickArray);
  };

  const clearList = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.splice(0, newClickArray.length);
    setClickArray(newClickArray);
  };

  return (
    <div>
      <h1>
        React e <em>Hooks</em>
      </h1>
      <button onClick={handleClick}>Add Timestamp</button>
      <button onClick={clearList}>Clear</button>
      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
