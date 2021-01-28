export default function getDateDifferenceInTime(date1, date2) {
  let max;
  let min;
  if (date2 > date1) {
    max = +date2;
    min = +date1;
  } else {
    min = +date2;
    max = +date1;
  }
  const timeObj = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  while (min + 3600000 <= max) {
    timeObj.hours += 1;
    max -= 3600000;
  }

  while (min + 60000 <= max) {
    timeObj.minutes += 1;
    max -= 60000;
  }

  while (min + 1000 <= max) {
    timeObj.seconds += 1;
    max -= 1000;
  }
  return timeObj;
}
