let counter = 0;

function updateTime() {
  if (counter >= 1000000) return;

  counter++;
  console.log(counter);

  setTimeout(updateTime, 1000);
}

