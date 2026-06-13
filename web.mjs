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

// DOM Elements
const defaultMsg = document.getElementById("default-msg");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");

// Initialize function
function init() {
  //defaultMsg.textContent = `${getGreeting()} - there are ${daysData.length} known days`;
  createMonthOptions();
  createYearOptions();
  createDaysOptions();
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
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const endYear = currentYear + 100;

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year}`;
    yearSelect.appendChild(option);
  }
}

// Creating options for days of the week
function createDaysOptions() {
  DAYS.forEach((id) => {
    const divOption = document.createElement("div");
    divOption.value = id;
    divOption.textContent = `${id}`;
    divOption.classList.add("day-header");
    calendarGrid.appendChild(divOption);
  });
}

// Calling initialize function
init();
