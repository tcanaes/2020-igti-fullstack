const formatter = Intl.NumberFormat('pt-BR');

function formatCurrency(inValue, inPercent = 0) {
  const value = formatter.format(inValue);
  if (inPercent === 0 )
    return `R$ ${value}`;

  const percent = formatter.format(inPercent);    
  return `R$ ${value} (${percent}%)`;
}

export {formatCurrency};