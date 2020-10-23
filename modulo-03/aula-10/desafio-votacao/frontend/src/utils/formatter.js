const formatPercent = (value) => {
  const roundedValue = Math.round(value * 100) / 100;
  const stringValie = roundedValue.toFixed(2);
  return `${stringValie}%`;
};

const formatNumber = (value) => {
  const numFormat = new Intl.NumberFormat('pt-BR');
  return numFormat.format(value);
};

export { formatPercent, formatNumber };
