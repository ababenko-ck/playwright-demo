export function generateUniqueLastName() {
  const timestamp = Date.now();
  return `TestUser${timestamp}`;
}

export function generateFutureExpirationDate() {
  const currentYear = new Date().getFullYear();
  const randomYearOffset = Math.floor(Math.random() * 2) + 1; // 1 to 2 years in the future
  const futureYear = currentYear + randomYearOffset;
  const randomMonth = Math.floor(Math.random() * 12) + 1; // 1 to 12
  const formattedMonth = randomMonth < 10 ? `0${randomMonth}` : `${randomMonth}`;
  const formattedYear = String(futureYear).slice(-2); // Get last two digits of the year
  return `${formattedMonth}/${formattedYear}`;
}

export function generateUniqueAmount() {
  const min = 0.01;
  const max = 2.00;
  const amount = Math.random() * (max - min) + min;
  return `$${amount.toFixed(2)}`;
}

export function getTodaysDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate() -1 ;

  return `${mm}/${dd}/${yyyy}`;
}
