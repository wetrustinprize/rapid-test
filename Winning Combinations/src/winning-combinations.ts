
type WinningCombinationsResult = [number, number[]][];

const WILD = 0;
const PAYABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MIN_PAYS = 3;

interface IPay {
  symbol: number;
  positions: number[];
}

function call(lines: number[]): WinningCombinationsResult {

  let pays: IPay[] = [];

  let checkingSymbol: number | undefined;
  let totalOfSymbol: number[] = [];
  let totalWilds: number = 0;

  for (let index = 0; index < lines.length; index++) {
    const pos = index;
    const symbol = lines[pos];
    const isWild = symbol === WILD;

    const brokeChain = symbol !== checkingSymbol && !isWild;

    const notCheckingSymbol = checkingSymbol === undefined;
    if (notCheckingSymbol || brokeChain && checkingSymbol !== WILD) {
      if (totalOfSymbol.length >= MIN_PAYS && !notCheckingSymbol) {
        pays.push({ symbol: checkingSymbol!, positions: totalOfSymbol })
      }

      if (!notCheckingSymbol && !isWild && totalWilds > 0) {
        checkingSymbol = undefined;
        totalOfSymbol = [];

        index -= totalWilds + 1;
        totalWilds = 0;
        continue;
      }

      const isPayable = PAYABLES.includes(symbol) || isWild;
      if (isPayable) {
        checkingSymbol = symbol;
        totalOfSymbol = [pos];
        totalWilds = 0;

        if (isWild)
          totalWilds += 1;
      }

      continue;
    }

    if (checkingSymbol === WILD && !isWild) {
      checkingSymbol = symbol;
    }

    totalOfSymbol.push(pos);

    if (isWild)
      totalWilds += 1;
    else
      totalWilds = 0;

    const lastIndex = index === lines.length - 1;
    if (lastIndex) {
      if (totalOfSymbol.length >= MIN_PAYS && !notCheckingSymbol)
        pays.push({ symbol: checkingSymbol!, positions: totalOfSymbol })

      checkingSymbol = undefined;
      totalOfSymbol = [];
    }
  };

  const formattedPays = pays.map(pay => [pay.symbol, pay.positions]) satisfies WinningCombinationsResult;

  return formattedPays;
}
export const WinningCombinations = { call };
