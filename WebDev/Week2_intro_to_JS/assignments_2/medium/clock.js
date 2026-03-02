function pad(number) {
  return number < 10 ? "0" + number : number;
}

function showTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // ---- 24 Hour Format ----
  const time24 =
    pad(hours) + ":" +
    pad(minutes) + ":" +
    pad(seconds);

  // ---- 12 Hour Format ----
  let ampm = hours >= 12 ? "PM" : "AM";
  let hours12 = hours % 12;
  hours12 = hours12 === 0 ? 12 : hours12;

  const time12 =
    pad(hours12) + ":" +
    pad(minutes) + ":" +
    pad(seconds) + " " +
    ampm;

  console.clear(); // Clears console each second
  console.log("24-Hour Format :", time24);
  console.log("12-Hour Format :", time12);
}

// Update every second
