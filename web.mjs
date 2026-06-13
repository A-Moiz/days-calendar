// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Imports

// Global
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

const FIXED_START_YEAR = CURRENT_YEAR - 100;
const FIXED_END_YEAR = CURRENT_YEAR + 100;

const defaultMsg = document.getElementById("default-msg");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("previous-month-btn");
const nextBtn = document.getElementById("next-month-btn");

function init() {
  createMonthOptions();
  createYearOptions();
  createDaysOptions();
  renderCurrentView();
}

// Event listeners
monthSelect.addEventListener("change", () => {
  CURRENT_MONTH = MONTHS.indexOf(monthSelect.value);
  renderCalendar(monthSelect.value, yearSelect.value);
});

yearSelect.addEventListener("change", () => {
  CURRENT_YEAR = parseInt(yearSelect.value, 10);
  renderCalendar(monthSelect.value, yearSelect.value);
});

prevBtn.addEventListener("click", () => {
  CURRENT_MONTH--;
  if (CURRENT_MONTH < 0) {
    CURRENT_MONTH = 11;
    CURRENT_YEAR--;
  }
  renderCurrentView();
});

nextBtn.addEventListener("click", () => {
  CURRENT_MONTH++;
  if (CURRENT_MONTH > 11) {
    CURRENT_MONTH = 0;
    CURRENT_YEAR++;
  }
  renderCurrentView();
});

// Updating selectors and then updating UI
function renderCurrentView() {
  updateSelectors();
  renderCalendar(monthSelect.value, yearSelect.value);
}

// Updating selectors - adding extra option if needed
function updateSelectors() {
  const yearOptionExists = Array.from(yearSelect.options).some(
    (opt) => parseInt(opt.value, 10) === CURRENT_YEAR,
  );

  if (!yearOptionExists) {
    const option = document.createElement("option");
    option.value = CURRENT_YEAR;
    option.textContent = `${CURRENT_YEAR}`;

    const optionsArray = Array.from(yearSelect.options);
    const insertBeforeOption = optionsArray.find(
      (opt) => parseInt(opt.value, 10) > CURRENT_YEAR,
    );

    if (insertBeforeOption) {
      yearSelect.insertBefore(option, insertBeforeOption);
    } else {
      yearSelect.appendChild(option);
    }
  }

  monthSelect.value = MONTHS[CURRENT_MONTH];
  yearSelect.value = CURRENT_YEAR;
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

// Creating options for years
function createYearOptions() {
  yearSelect.innerHTML = "";
  for (let year = FIXED_START_YEAR; year <= FIXED_END_YEAR; year++) {
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
    divOption.textContent = `${id}`;
    divOption.classList.add("day-header");
    calendarGrid.appendChild(divOption);
  });
}

// Getting details for the selected month and year
function getMonthDetails(monthName, year) {
  const monthIndex = MONTHS.indexOf(monthName);
  const firstDayOfWeek = new Date(year, monthIndex, 1);
  const startDayOfWeekIndex = firstDayOfWeek.getDay();
  const totalDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return { startDayOfWeekIndex, totalDaysInMonth };
}

// Render calendar
function renderCalendar(monthName, year) {
  // Redrawing grid
  const headers = calendarGrid.querySelectorAll(".day-header");
  calendarGrid.innerHTML = "";
  headers.forEach((header) => calendarGrid.appendChild(header));
  const { startDayOfWeek, totalDaysInMonth } = getMonthDetails(monthName, year);

  for (let i = 0; i < startDayOfWeek; i++) {
    const blankBlock = document.createElement("div");
    blankBlock.classList.add("calendar-day", "empty-day");
    calendarGrid.appendChild(blankBlock);
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dayBlock = document.createElement("div");
    dayBlock.classList.add("calendar-day");
    dayBlock.textContent = day;
    calendarGrid.appendChild(dayBlock);
  }
}

init();