const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=19bf0d5fa3b972b2ed62e1b35a15c41d&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=19bf0d5fa3b972b2ed62e1b35a15c41d&query=`;

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

const getMovies = async (url) => {
  const response = await fetch(url);
  const movies = await response.json();
  listMovies(movies.results);
};

const listMovies = (movies) => {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;

    main.appendChild(movieElement);
  });
};

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
};

(async () => {
  await getMovies(API_URL);
})();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
