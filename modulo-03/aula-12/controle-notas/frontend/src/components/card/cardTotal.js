import React, { useEffect, useState } from 'react';

export default function CardTotal({ total }) {
  return (
    <div className="row">
      <div className="col s8"></div>
      <div className="col s1">Total</div>
      <div className="col s1">{total}</div>
      <div className="col s2"></div>
    </div>
  );
}
