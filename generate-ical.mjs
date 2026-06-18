// Imports
import { MONTHS, calculateEventDay } from "./common.mjs";
import fs from "fs";

// Formatting year month and day
function formatDateString(year, monthIndex, day) {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}${mm}${dd}`;
}

function generateICal() {
  const rawData = fs.readFileSync("days.json", "utf-8");
  const eventsData = JSON.parse(rawData);

  // [1]
  let icalContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dynamic Commemorative Calendar//EN",
    "CALSCALE:GREGORIAN",
  ];

  for (let year = 2020; year <= 2030; year++) {
    eventsData.forEach((event) => {
      const day = calculateEventDay(
        year,
        event.monthName,
        event.dayName,
        event.occurrence,
      );

      if (day) {
        const monthIndex = MONTHS.indexOf(event.monthName);
        const startDate = new Date(year, monthIndex, day);
        const endDate = new Date(year, monthIndex, day + 1);

        const dtStartStr = formatDateString(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
        );
        const dtEndStr = formatDateString(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
        );

        // Getting date in YYYYMMDDTHHMMSSZ format
        const timestamp =
          new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        // [2]
        icalContent.push("BEGIN:VEVENT");
        icalContent.push(
          `UID:${year}-${monthIndex}-${day}-${event.name.replace(/\s+/g, "_")}@calendarproject`,
        );
        icalContent.push(`DTSTAMP:${timestamp}`);
        icalContent.push(`DTSTART;VALUE=DATE:${dtStartStr}`);
        icalContent.push(`DTEND;VALUE=DATE:${dtEndStr}`);
        icalContent.push(`SUMMARY:${event.name}`);
        icalContent.push("END:VEVENT");
      }
    });
  }

  icalContent.push("END:VCALENDAR");

  fs.writeFileSync("days.ics", icalContent.join("\r\n"), "utf-8");
}

generateICal();

// Reference:
// - [1] = https://emailshot.io/blog/what-are-ics-files/
// - [2] = https://developers.google.com/workspace/calendar/api/guides/create-events#javascript
