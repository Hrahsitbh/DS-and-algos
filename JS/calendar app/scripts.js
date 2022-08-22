const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  const firstDayofMonth = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  const calendarTable = document.getElementById("calendar-body");
  calendarTable.innerHTML = "";

  monthAndYear.innerHTML = months[month] + " " + year;
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayofMonth) {
        const td = document.createElement("td");
        const textNode = document.createTextNode("");
        td.append(textNode);
        row.appendChild(td);
      } else if (date > daysInMonth) break;
      else {
        const td = document.createElement("td");
        const textNode = document.createTextNode(date);
        if (date === today.getDate()) {
          td.classList.add("bg-info");
        }
        td.append(textNode);
        row.appendChild(td);
        date++;
      }
    }
    calendarTable.appendChild(row);
  }
}

// function debounce(fn, delay) {
//   let timeout;
//   return function excecutedFn() {
//     const context = this;
//     const args = arguments;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn.apply(context, args);
//     }, delay);
//   };
// }

// // const debouncedSearch = debounce((e) => console.log(e.target.value), 500);

// const sarchInput = document.getElementById("search-input");
// sarchInput.addEventListener(
//   "input",
//   debounce((e) => console.log(e.target.value), 500)
// );



// function logger1(string) {
//   console.log("logger1");

//   Promise.resolve().then(() => {
//     console.log("promise logger 1");
//   });

//   setTimeout(() => {
//     console.log('adad');
//   }, 0)
// }

// function logger2(string) {
//   console.log("logger 2");

//   Promise.resolve().then(() => {
//     console.log("promise logger 2");
//   });
// }

// document.getElementById("btn").addEventListener("click", logger1);
// document.getElementById("btn").addEventListener("click", logger2);