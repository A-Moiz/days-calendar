import { MONTHS, DAYS, calculateEventDay } from "./common.mjs";

let CURRENT_YEAR = new Date().getFullYear();
let CURRENT_MONTH = new Date().getMonth();
const FIXED_START_YEAR = CURRENT_YEAR - 100;
const FIXED_END_YEAR = CURRENT_YEAR + 100;
let daysData = [];

// DOM elements
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("previous-month-btn");
const nextBtn = document.getElementById("next-month-btn");

async function init() {
  createMonthOptions();
  createYearOptions();
  createDaysOptions();
  await loadDaysData();
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

function renderCurrentView() {
  updateSelectors();
  renderCalendar(monthSelect.value, yearSelect.value);
}

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
    divOption.textContent = `${id}`;
    divOption.classList.add("day-header");
    calendarGrid.appendChild(divOption);
  });
}

function getMonthDetails(monthName, year) {
  const monthIndex = MONTHS.indexOf(monthName);
  const firstDayOfWeek = new Date(year, monthIndex, 1);
  const startDayOfWeekIndex = firstDayOfWeek.getDay();
  const totalDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return { startDayOfWeekIndex, totalDaysInMonth };
}

function renderCalendar(monthName, year) {
  const headers = calendarGrid.querySelectorAll(".day-header");
  calendarGrid.innerHTML = "";
  headers.forEach((header) => calendarGrid.appendChild(header));
  const { startDayOfWeekIndex, totalDaysInMonth } = getMonthDetails(
    monthName,
    year,
  );

  for (let i = 0; i < startDayOfWeekIndex; i++) {
    const blankBlock = document.createElement("div");
    blankBlock.classList.add("calendar-day", "empty-day");
    calendarGrid.appendChild(blankBlock);
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dayBlock = document.createElement("div");
    dayBlock.classList.add("calendar-day");

    const numberLabel = document.createElement("span");
    numberLabel.textContent = day;
    dayBlock.appendChild(numberLabel);

    daysData.forEach((event) => {
      if (event.monthName === monthName) {
        const eventDay = calculateEventDay(
          parseInt(year, 10),
          event.monthName,
          event.dayName,
          event.occurrence,
        );

        if (eventDay === day) {
          const eventLabel = document.createElement("div");
          eventLabel.classList.add("event-label");
          eventLabel.textContent = event.name;
          dayBlock.appendChild(eventLabel);
        }
      }
    });

    calendarGrid.appendChild(dayBlock);
  }
}

async function loadDaysData() {
  try {
    const response = await fetch("days.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    daysData = await response.json();
  } catch (error) {
    alert("Failed to load days.json data file: " + error);
  }
}

init();
