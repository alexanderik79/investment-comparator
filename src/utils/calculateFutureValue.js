export const calculateFutureValue = ({ 
  initial, 
  monthly, 
  annualRate, 
  years, 
  inflationRate = 0, 
  adjustForInflation = false 
}) => {
  // Если учитываем инфляцию, вычитаем её из годовой доходности
  const realRate = adjustForInflation ? (annualRate - inflationRate) : annualRate;
  const r = realRate / 100 / 12; // месячная ставка
  const n = years * 12; // количество месяцев

  if (r === 0) return initial + (monthly * n);

  // Формула сложного процента с регулярными взносами
  const futureValue = initial * Math.pow(1 + r, n) + 
                      monthly * ((Math.pow(1 + r, n) - 1) / r);

  return Math.round(futureValue);
};