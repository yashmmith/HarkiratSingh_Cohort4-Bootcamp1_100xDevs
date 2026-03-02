// Iterative Fibonacci function
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}

// Recursive Fibonacci function
function fibonacciRecursive(n) {
  if (n <= 0) return 0;     // For input 0
  if (n === 1) return 0;    // 0th index
  if (n === 2) return 1;    // 1st index

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

