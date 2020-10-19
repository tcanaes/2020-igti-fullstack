/******************************************************************************/
/*                                CALCULA INSS                                */
/******************************************************************************/
function calculaINSS(salarioBruto) {
  const faixas = [
    { base: 3134.4, aliq: 14 },
    { base: 2089.6, aliq: 12 },
    { base: 1045, aliq: 9 },
    { base: 0, aliq: 7.5 }
  ];

  let salario = salarioBruto;
  let inss = 0;

  faixas.forEach(faixa => {
    if (salario > faixa.base) {
      const value = salario - faixa.base;
      salario = faixa.base;
      inss += value * faixa.aliq / 100;
    }
  });

  inss = (inss > 713.1) ? 713.1 : inss;
  inss = Math.round(inss * 100)/100;
  return inss;
}

/******************************************************************************/
/*                                CALCULA IRPF                                */
/******************************************************************************/
function calculaIRPF(salarioBruto) {
  
  const faixas = [
    { base: 4664.68, aliq: 27.5, parcela: 869.36 },
    { base: 3751.05, aliq: 22.5, parcela: 636.13 },
    { base: 2826.65, aliq: 15, parcela: 354.80 },
    { base: 1903.98, aliq: 7.5, parcela: 142.80 }
  ];
  
  let irpf = 0;
  
  faixas.forEach(faixa => {
    if (irpf === 0 && salarioBruto > faixa.base) {
      irpf = (salarioBruto * faixa.aliq / 100) - faixa.parcela;
    }
  });
  irpf = Math.round(irpf * 100)/100;
  return irpf;
}

/******************************************************************************/
/*                     CALCULA SALÁRIO LIQUIDO E IMPOSTOS                     */
/******************************************************************************/
function calcTaxes(salarioBruto) {

  let salarioLiquido = salarioBruto;
  
  const inss = calculaINSS(salarioLiquido);
  salarioLiquido -= inss;
  let inssPercent = inss / salarioBruto * 100;
  inssPercent = Math.round(inssPercent * 100)/100;
  
  const irpf = calculaIRPF(salarioLiquido);
  salarioLiquido -= irpf;
  let irpfPercent = irpf / salarioBruto * 100;
  irpfPercent = Math.round(irpfPercent * 100)/100;

  return {
    salarioBruto,
    salarioLiquido,
    baseInss: salarioBruto,
    inss,
    inssPercent,
    baseIrpf: salarioBruto - inss,
    irpf,
    irpfPercent
  }
}

export { calcTaxes };