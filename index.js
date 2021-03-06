// fetch movies data from API
const fetchData = async (searchData) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a7531fed",
      s: searchData,
    },
  });

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

// autocomplete
autoComplete({
  root: document.querySelector(".autocomplete"),
  renderOptions(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src = "${imgSrc}"  />  
        ${movie.Title}
    `;
  },
});

// get movie details
const getMovieDetails = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a7531fed",
      i: movie.imdbID,
    },
  });

  document.getElementById("summery").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
      <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="${movieDetail.Poster}" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1>${movieDetail.Title}</h1>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
          </div>
        </div>
      </article>
      <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};
