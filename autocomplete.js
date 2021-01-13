const autoComplete = ({ root, renderOptions }) => {
  // select autocomplete from html page and html through JS

  root.innerHTML = `
    <label> <b> Search a movie :<b/> </label>
    <input class = "input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>

`;
  // select autocomplete html and make dynamic list elements
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  // event onInput change when user type in
  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);
    resultsWrapper.innerHTML = "";

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    //   iterate movie over array of movies
    for (const movie of movies) {
      dropdown.classList.add("is-active");
      const options = document.createElement("a");

      // adding dropdown list items
      options.classList.add("dropdown-item");
      options.innerHTML = renderOptions(movie);
      // add event on click movie title
      options.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = movie.Title;
        getMovieDetails(movie);
      });
      // append to root elements
      resultsWrapper.appendChild(options);
    }
  };
  input.addEventListener("input", debounce(onInput));

  // add event on click dropdown movie list
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
