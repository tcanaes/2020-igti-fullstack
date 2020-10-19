import React, { Component } from 'react';
import Titulo from './components/titulo/Titulo';
import SalarioBruto from './components/salario/SalarioBruto';
import { calcTaxes } from './helpers/taxesCalculator';
import Impostos from './components/impostos/Impostos';
import SalarioLiquido from './components/salario/SalarioLiquido';
import BarraCores from './components/barraCores/BarraCores';

export default class App extends Component {
  constructor() {
    super();
    this.state = calcTaxes(1000);
  }

  handleValueChange = (salarioBruto) => {
    this.setState(calcTaxes(salarioBruto));
  }
  
  render() {
    const dadosImpostos = Object.assign({}, this.state);
    return (<div className="container">
      <Titulo />
      <SalarioBruto setSalarioBruto={this.handleValueChange}/>
      <Impostos taxesData={dadosImpostos}/>
      <SalarioLiquido value={dadosImpostos.salarioLiquido} />
      <BarraCores taxesData={dadosImpostos}/>
    </div>);
  }

}
