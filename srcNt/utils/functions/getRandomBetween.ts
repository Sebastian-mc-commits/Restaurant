export default function getRandomBetween<T>(arr: T[]) {
  const getRandomNumber: number = Math.floor(Math.random() * arr.length);

  if (getRandomNumber >= arr.length) {
    return getRandomBetween(arr);
  }

  return arr[getRandomNumber];
}
