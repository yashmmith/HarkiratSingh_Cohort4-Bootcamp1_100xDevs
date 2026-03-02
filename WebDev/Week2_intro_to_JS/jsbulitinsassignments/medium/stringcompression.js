function compression(str) {
  if (str.length === 0) return "";

  let result = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    // If next character is same, increase count
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      // Add character
      result += str[i];

      // Add count only if greater than 1
      if (count > 1) {
        result += count;
      }

      // Reset count
      count = 1;
    }
  }

  return result;
}

