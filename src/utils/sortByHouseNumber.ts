const matchLetters = /\D/g;

export const parseHouseNumber = (houseNumber: string): number => {
  const withoutLetters = houseNumber.replace(matchLetters, "");
  return Number.parseInt(withoutLetters, 10);
};

export const sortByHouseNumber = <T>(
  items: T[],
  getNumber: (item: T) => string | undefined
): T[] =>
  items.sort((e1, e2) => {
    const firstNumber = getNumber(e1);
    const secondNumber = getNumber(e2);

    if (!firstNumber || !secondNumber) return 0;

    const firstValue = parseHouseNumber(firstNumber);
    const secondValue = parseHouseNumber(secondNumber);

    if (Number.isNaN(firstValue) || Number.isNaN(secondValue)) return 0;

    return firstValue > secondValue ? 1 : -1;
  });
