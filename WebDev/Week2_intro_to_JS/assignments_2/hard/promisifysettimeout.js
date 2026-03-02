let n=10;
let p = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, n * 1000);
    });
