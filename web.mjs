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
const calendarGrid = document.getElementById("calendar-grid")
const prevBtn = document.getElementById("previous-month-btn");
const nextBtn = document.getElementById("next-month-btn");;

function init() {
  createMonthOptions();
  createYearOptions();
  createDaysOptions();
  updateSelectorsAndRender();
  monthSelect.value = MONTHS[CURRENT_MONTH];
  yearSelect.value = CURRENT_YEAR;
  renderCalendar(monthSelect.value, yearSelect.value);
}

monthSelect.addEventListener("change", (e) => {
  if (!e.isTrusted) return;
  CURRENT_MONTH = MONTHS.indexOf(monthSelect.value);
  renderCalendar(monthSelect.value, yearSelect.value);
});

yearSelect.addEventListener("change", (e) => {
  if (!e.isTrusted) return;
  CURRENT_YEAR = parseInt(yearSelect.value);
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

function createYearOptions() {
  yearSelect.innerHTML = "";
  for (let year = FIXED_START_YEAR; year <= FIXED_END_YEAR; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year}`;
    yearSelect.appendChild(option);
  }
}

function createDaysOptions() {
  DAYS.forEach((id) => {
    const divOption = document.createElement("div");
    divOption.value = id;
    divOption.textContent = `${id}`;
    divOption.classList.add("day-header");
    calendarGrid.appendChild(divOption);
  });
}

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

init();