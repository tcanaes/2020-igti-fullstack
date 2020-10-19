import React, { Component } from 'react';

export default class BarraCores extends Component {
  render() {
    const { inssPercent, irpfPercent } = this.props.taxesData;
    const inssStyle = {
      width: `${inssPercent}%`,
      height: '1rem',
      backgroundColor: "darkorange",
      display: 'inline-block'
    }

    const irpfStyle = {
      width: `${irpfPercent}%`,
      height: '1rem',
      backgroundColor: "darkred",
      display: 'inline-block'
    }
    
    const liquidoStyle = {
      width: `${100 - inssPercent - irpfPercent}%`,
      height: '1rem',
      backgroundColor: "green",
      display: 'inline-block'
    }    
    
    return (<div>
      <div style={inssStyle}></div>
      <div style={irpfStyle}></div>
      <div style={liquidoStyle}></div>
    </div>);
  }
}
