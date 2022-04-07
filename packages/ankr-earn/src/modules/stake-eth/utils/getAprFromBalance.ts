const APR_THRESHOLD = [
  // * [GlobalPoolBalance, APR]
  [525288, 21.68],
  [1000000, 15.71],
  [1500000, 12.83],
  [2000000, 11.11],
  [2500000, 9.94],
  [3000000, 9.07],
  [3500000, 8.4],
  [4000000, 7.86],
  [4500000, 7.41],
  [5000000, 7.03],
  [5500000, 6.7],
  [6000000, 6.41],
  [6500000, 6.16],
  [7000000, 5.94],
  [7500000, 5.74],
  [8000000, 5.55],
  [8500000, 5.39],
  [9000000, 5.24],
  [9500000, 5.1],
  [10000000, 4.97],
];

export function getAprFromBalance(balance: number): number {
  const isLowestBalance = balance < APR_THRESHOLD[0][0];
  if (isLowestBalance) {
    return 0;
  }

  const isHighestBalance = balance > APR_THRESHOLD[APR_THRESHOLD.length - 1][0];
  if (isHighestBalance) {
    const lastPair = APR_THRESHOLD[APR_THRESHOLD.length - 1];
    const lastAPR = lastPair[1];
    return lastAPR;
  }

  let resultAPR = 0;
  for (let i = 0; i < APR_THRESHOLD.length - 1; i += 1) {
    const [currentThreshold, currentApr] = APR_THRESHOLD[i];
    const [nextThreshold, nextApr] = APR_THRESHOLD[i + 1];

    if (balance < currentThreshold) {
      break;
    }

    resultAPR =
      currentApr -
      ((currentApr - nextApr) * (balance - currentThreshold)) /
        (nextThreshold - currentThreshold);
  }

  return resultAPR;
}
