export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const OCCURRENCE_MAP = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

export function calculateEventDay(year, monthName, dayName, occurrence) {
  const monthIndex = MONTHS.indexOf(monthName);
  const targetDayOfWeek = DAYS.indexOf(dayName);

  if (occurrence === "last") {
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    for (let day = totalDays; day >= 1; day--) {
      const currentDayOfWeek = new Date(year, monthIndex, day).getDay();
      if (currentDayOfWeek === targetDayOfWeek) {
        return day;
      }
    }
  }

  const targetCount = OCCURRENCE_MAP[occurrence];
  let matchCount = 0;
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    const currentDayOfWeek = new Date(year, monthIndex, day).getDay();

    if (currentDayOfWeek === targetDayOfWeek) {
      matchCount++;
      if (matchCount === targetCount) {
        return day;
      }
    }
  }

  return null;
}
