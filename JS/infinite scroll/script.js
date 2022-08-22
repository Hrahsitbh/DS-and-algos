let listSize = 20;
let DBSize = 200;
let DB = [];
let currentIndex = 0;
let topSentinelPreviousY = 0;
let topSentinelPreviousRatio = 0;
let bottomSentinelPreviousY = 0;
let bottomSentinelPreviousRatio = 0;

const getImages = () => {
  const randomNum = () => {
    return Math.floor(Math.random() * 100000);
  };
  const url = "https://source.unsplash.com/collection/139386/100x100/?sig=";
  return url + randomNum();
};

const initDB = (num) => {
  const db = [];
  for (let i = 0; i < num; i++) {
    db.push({
      catCounter: i,
      title: `cat image number ${i}`,
      imgSrc: getImages(),
    });
  }
  return db;
};

const initList = (num) => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < num; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "cat-tile");
    li.setAttribute("id", "cat-tile-" + i);
    const title = document.createElement("H3");
    const t = document.createTextNode(DB[i].title);
    title.appendChild(t);
    li.appendChild(title);
    const img = document.createElement("IMG");
    img.setAttribute("src", DB[i].imgSrc);
    li.appendChild(img);
    frag.appendChild(li);
  }
  document.querySelector(".cat-list").appendChild(frag);
};

const getSlidingWindow = (isScrollDown) => {
  const increment = listSize / 2;
  let firstIndex;
  if (isScrollDown) {
    firstIndex = currentIndex + increment;
  } else {
    firstIndex = currentIndex - increment - listSize;
  }
  if (firstIndex < 0) {
    firstIndex = 0;
  }
  return firstIndex;
};

const recycleDOM = (firstIndex) => {
  for (let i = 0; i < listSize; i++) {
    const tile = document.querySelector("#cat-tile-" + i);
    tile.firstElementChild.innerText = DB[i + firstIndex].title;
    tile.lastChild.setAttribute("src", DB[i + firstIndex].imgSrc);
  }
};

const getNumFromStyle = (numStr) =>
  Number(numStr.substring(0, numStr.length - 2));

const adjustPaddings = (isScrollDown) => {
  const container = document.querySelector(".cat-list");
  const currentPaddingTop = getNumFromStyle(container.style.paddingTop);
  const currentPaddingBottom = getNumFromStyle(container.style.paddingBottom);
  const remPaddingsVal = 170 * (listSize / 2);
  if (isScrollDown) {
    container.style.paddingTop = currentPaddingTop + remPaddingsVal + "px";
    container.style.paddingBottom =
      currentPaddingBottom === 0
        ? "0px"
        : currentPaddingBottom - remPaddingsVal + "px";
  } else {
    container.style.paddingBottom =
      currentPaddingBottom + remPaddingsVal + "px";
    container.style.paddingTop =
      currentPaddingTop === 0
        ? "0px"
        : currentPaddingTop - remPaddingsVal + "px";
  }
};

const topSentCallback = (entry) => {
  if (currentIndex === 0) {
    const container = document.querySelector(".cat-list");
    container.style.paddingTop = "0px";
    container.style.paddingBottom = "0px";
  }
  const currentY = entry.boundingClientRect.top;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;

  if (
    currentY > topSentinelPreviousY &&
    isIntersecting &&
    currentRatio >= topSentinelPreviousRatio &&
    currentIndex
  ) {
    const firstIndex = getSlidingWindow(false);
    adjustPaddings(false);
    recycleDOM(firstIndex);
    currentIndex = firstIndex;
  }
  topSentinelPreviousY = currentY;
  topSentinelPreviousRatio = currentRatio;
};

const bottomSentCallback = (entry) => {
  if (currentIndex === DBSize - listSize) return;

  const currentY = entry.boundingClientRect.top;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;

  if (
    currentY < bottomSentinelPreviousY &&
    isIntersecting &&
    currentRatio > bottomSentinelPreviousRatio
  ) {
    const firstIndex = getSlidingWindow(true);
    adjustPaddings(true);
    recycleDOM(firstIndex);
    currentIndex = firstIndex;
  }
  bottomSentinelPreviousY = currentY;
  bottomSentinelPreviousRatio = currentRatio;
};

const initIntersectionObserver = () => {
  const options = {
    /* root: document.querySelector(".cat-list") */
  };
  const cb = (entries) => {
    entries.forEach((entry) => {
      if (entry.target.id === "cat-tile-0") topSentCallback(entry);
      else if (entry.target.id === `cat-tile-${listSize - 1}`)
        bottomSentCallback(entry);
    });
  };

  const observer = new IntersectionObserver(cb, options);
  observer.observe(document.querySelector("#cat-tile-0"));
  observer.observe(document.querySelector(`#cat-tile-${listSize - 1}`));
};

const start = () => {
  DB = initDB(DBSize);
  initList(listSize);
  initIntersectionObserver();
  document.querySelector("#start-btn").style.display = "none";
};
