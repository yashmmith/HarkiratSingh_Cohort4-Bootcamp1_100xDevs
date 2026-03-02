function compressWords(arr) {
  if (arr.length === 0) return [];

  let result = [];
  let count = 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      count++;
    } else {
      if (count > 1) {
        result.push(arr[i] + count);
      } else {
        result.push(arr[i]);
      }
      count = 1;
    }
  }

  return result;
}

