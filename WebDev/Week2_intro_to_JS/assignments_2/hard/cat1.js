function sleep(milliseconds) {
  return new Promise((resolve) => {
    const start = Date.now();

    // Busy wait loop (blocks thread)
    while (Date.now() - start < milliseconds) {
      // Do nothing
    }

    resolve();
  });
}

