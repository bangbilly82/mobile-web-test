const INDONESIAN_CURRENCY_FRACTION = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50];

const returnNominal = amount => {
  const defaultCurrency = INDONESIAN_CURRENCY_FRACTION;
  const parsedAmount = parseInt(amount, 10);
  const exchangeNominal = [];
  let denom = parsedAmount;
  let leftDenom;

  for (let index = 0; index < defaultCurrency.length; index++) {
    let tempNominal = parsedAmount;

    // First we check if denom must greater than each fraction
    if (denom >= defaultCurrency[index]) {
      const currentDenom = defaultCurrency[index];
      const denomCount = Math.floor(denom / currentDenom);
      exchangeNominal.push({
        denom: currentDenom,
        count: denomCount
      });
      tempNominal -= currentDenom * denomCount; // We decrease denom with current fraction times denom count
      if (tempNominal > 0) {
        denom -= currentDenom * denomCount;
      } else if (tempNominal === 0) { // NOTE! This condition is required if inputed amount is equal to any of fraction
        return exchangeNominal;
      }
    }

    // check last index amount
    if (
      index === defaultCurrency.length - 1 &&
      denom !== 0 &&
      denom - defaultCurrency[index] !== 0
    ) {
      if (denom > defaultCurrency[index]) {
        leftDenom = denom - defaultCurrency[index];
      } else {
        leftDenom = denom;
      }
      exchangeNominal.push({
        denom: leftDenom,
        count: "leftdenom"
      });
    }

  }
  return exchangeNominal;
};

const amountParser = amount => {
  const indonesianPrefix = "rp";
  const formatAmount = amount.toLowerCase();
  const isContainPrefix = formatAmount.includes(indonesianPrefix);
  let result;
  if (isContainPrefix) {
    result = formatAmount.replace(indonesianPrefix, "");
  }
  return result;
};

export { returnNominal, amountParser };
