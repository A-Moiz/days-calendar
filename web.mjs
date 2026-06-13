// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Imports
// import { getGreeting } from "./common.mjs";
// import daysData from "./days.json" with { type: "json" };

// Consts
const MONTHS = [
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

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let CURRENT_YEAR = new Date().getFullYear();
let CURRENT_MONTH = new Date().getMonth();

// DOM Elements
const defaultMsg = document.getElementById("default-msg");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid")
const prevBtn = document.getElementById("previous-month-btn");
const nextBtn = document.getElementById("next-month-btn");;

// Initialize function
function init() {
  createMonthOptions();
  createYearOptions();
  createDaysOptions();
  updateSelectorsAndRender();
  monthSelect.value = MONTHS[CURRENT_MONTH];
  yearSelect.value = CURRENT_YEAR;
  renderCalendar(monthSelect.value, yearSelect.value);
}

// Event listeners
monthSelect.addEventListener("change", () => {
  renderCalendar(monthSelect.value, yearSelect.value);
});

yearSelect.addEventListener("change", () => {
  renderCalendar(monthSelect.value, yearSelect.value);
});

prevBtn.addEventListener("click", () => {
  CURRENT_MONTH--;
  if (CURRENT_MONTH < 0) {
    CURRENT_MONTH = 11;
    CURRENT_YEAR--;
  }
  updateSelectorsAndRender();
});

nextBtn.addEventListener("click", () => {
  CURRENT_MONTH++;
  if (CURRENT_MONTH > 11) {
    CURRENT_MONTH = 0;
    CURRENT_YEAR++;
  }
  updateSelectorsAndRender();
});

// Update selectors and render calendar
function updateSelectorsAndRender() {
  monthSelect.value = MONTHS[CURRENT_MONTH];
  yearSelect.value = CURRENT_YEAR;
  renderCalendar(monthSelect.value, yearSelect.value);
}
// Creating options for months
function createMonthOptions() {
  MONTHS.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `${id}`;
    monthSelect.appendChild(option);
  });
}

// Creating options for months
function createYearOptions() {
  const startYear = CURRENT_YEAR - 100;
  const endYear = CURRENT_YEAR + 100;

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year}`;
    yearSelect.appendChild(option);
  }
}

// Creating options for days of the  week
function createDaysOptions() {
  DAYS.forEach((id) => {
    const divOption = document.createElement("div");
    divOption.value = id;
    divOption.textContent = `${id}`;
    divOption.classList.add("day-header");
    calendarGrid.appendChild(divOption);
  });
}

// Getting details for the selected month and year
function fetchMonthDetails(monthName, year) {
  const monthIndex = MONTHS.indexOf(monthName);
  const firstDay = new Date(year, monthIndex, 1);
  const startDayOfWeek = firstDay.getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  return { startDayOfWeek, totalDays };
}

function renderCalendar(monthName, year) {
  const headers = calendarGrid.querySelectorAll(".day-header");
  calendarGrid.innerHTML = "";
  headers.forEach((header) => calendarGrid.appendChild(header));
  const { startDayOfWeek, totalDays } = fetchMonthDetails(monthName, year);

  for (let i = 0; i < startDayOfWeek; i++) {
    const blankBlock = document.createElement("div");
    blankBlock.classList.add("calendar-day", "empty-day");
    calendarGrid.appendChild(blankBlock);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dayBlock = document.createElement("div");
    dayBlock.classList.add("calendar-day");
    dayBlock.textContent = day;
    calendarGrid.appendChild(dayBlock);
  }
}

// Calling initialize function
init();
