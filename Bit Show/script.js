const showList = document.querySelector(".show-list");
const boxInput = document.querySelector("input");
const listDropdown = document.querySelector("ul");
const dropDown = document.querySelector(".dropDown");

/////   Lista na prvoj strani   //////

const createListShows = (show) => {
  const showEl = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("h3");

  img.setAttribute("src", show.image.medium);
  title.textContent = show.name;

  showEl.appendChild(img);
  showEl.appendChild(title);
  showList.appendChild(showEl);

  showEl.addEventListener("click", () => {
    window.open("./showPage.html");
    localStorage.setItem("id", show.id);
  });
};

const listShows = (shows) => {
  shows.forEach((show) => createListShows(show));
};

fetch("http://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((res) => listShows(res));

////    Dropdown Lista ///////

const createlistDrpdShows = (show) => {
  const listItem = document.createElement("li");

  listItem.textContent = show.show.name;
  listDropdown.appendChild(listItem);

  listItem.addEventListener("click", () => {
    window.open("./showPage.html");
    localStorage.setItem("id", show.show.id);
  });
};

const listDrpdShows = (shows) => {
  shows.forEach((show) => createlistDrpdShows(show));
};

const boxSearch = () => {
  boxInput.value == ""
    ? document.querySelector(".dropDown").setAttribute("hidden", "")
    : document.querySelector(".dropDown").removeAttribute("hidden");
  boxInput.value === "";
  listDropdown.innerHTML = "";

  fetch("http://api.tvmaze.com/search/shows?q=" + boxInput.value)
    .then((response) => response.json())
    .then((res) => listDrpdShows(res));
};

boxInput.addEventListener("keyup", boxSearch);
