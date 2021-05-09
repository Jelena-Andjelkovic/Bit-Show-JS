const ID = localStorage.getItem("id");
const url = "http://api.tvmaze.com/shows/" + ID;
const castLink = "/cast";
const seasonsLink = "/seasons";

const all = document.querySelector(".container");
const content = document.querySelector("#content");
const details = document.querySelector("#details");
const showSeasCast = document.querySelector("#showSeasCast");
const showCast = document.querySelector("#showCast");
const showSeasons = document.querySelector("#showSeasons");
const backButton = document.querySelector("button");

///////////    Name Poster Summary      ////////////////////

const createShowPage = (show) => {
  const title = document.createElement("p");
  const poster = document.createElement("img");
  const summary = document.createElement("div");

  title.textContent = show.name;
  poster.setAttribute("src", show.image.original);
  summary.innerHTML = show.summary;
  console.log(show.summary);

  all.insertBefore(title, content);
  content.insertBefore(poster, showSeasCast);
  details.appendChild(summary);
};

fetch(url)
  .then((response) => response.json())
  .then((res) => createShowPage(res));

///////////       SeasonInfo    /////////////////////

const createSeasonInfo = (season) => {
  const seasonItem = document.createElement("li");
  const seasonStart = document.createElement("span");
  const seasonEnd = document.createElement("span");

  seasonStart.textContent = season.premiereDate;
  seasonEnd.textContent = season.endDate;
  seasonItem.appendChild(seasonStart);
  seasonItem.appendChild(seasonEnd);
  showSeasons.appendChild(seasonItem);
};

const createSeasonsList = (seasons) => {
  seasons.forEach((season) => createSeasonInfo(season));
  const seasonBlock = document.createElement("p");
  const numberSeasons = document.createElement("span");
  seasonBlock.textContent = "Seasons";
  numberSeasons.textContent = seasons.length;
  seasonBlock.appendChild(numberSeasons);
  showSeasons.prepend(seasonBlock);
  seasonBlock.classList.add("seasonBlock");
};

fetch(url + seasonsLink)
  .then((response) => response.json())
  .then((res) => createSeasonsList(res));

/////////       CastList     //////////////

const createCastName = (cast) => {
  const castItem = document.createElement("li");

  castItem.textContent = cast.person.name;
  showCast.appendChild(castItem);
};

const createCastList = (casts) => {
  casts.forEach((cast) => createCastName(cast));
};

fetch(url + castLink)
  .then((response) => response.json())
  .then((res) => createCastList(res));

backButton.addEventListener("click", () => {
  window.open("./index.html");
});
