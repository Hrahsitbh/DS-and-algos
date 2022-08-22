const data = new Array().fill(10);
let paginationSize = 5;
let prev;
let nextItems;

function renderPagination(start = 1, end = 5) {
  const pagination = document.getElementsByClassName("pagination")[0].children;
  for (let i = start; i < end; i++) {
    pagination[i].innerText = i;
  }
  return;
}
renderPagination(prev, nextItems);

function paginationClick(event) {
  if (!event.target.closest("a")) return;
  if (["prev", "next"].includes(event.target.id)) {
    if (event.target.id === "next") {
      nextItems = paginationSize + 2;
      prev = paginationSize - 2 < 0 ? 1 : paginationSize - 2;
      renderPagination(prev, nextItems);
    }
  }
  document.getElementById("content").innerHTML = event.target.innerText;
}

// document.getElementsByClassName('pagination')[0].addEventListener('click', paginationClick)
