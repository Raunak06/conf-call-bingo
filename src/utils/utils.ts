export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const getRandomNumberList = (
  listLength: number,
  maxNumber: number
): number[] => {
  const numList = [];
  while (numList.length < listLength) {
    const num = getRandomNumber(maxNumber);
    if (numList.indexOf(num) === -1) numList.push(num);
  }
  return numList;
};

export const removeDuplicates = (arr1: number[], arr2: number[]): number[] => {
  const mergedArr = [...Array.from(new Set([...arr1, ...arr2]))];
  return mergedArr;
};
