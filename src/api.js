const $ = require("jquery");
module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());

  },
  addMovie:(e) => {
    e.preventDefault();
    const newMovie = {title: $("#title").val(), rating: $("#rating").val()};
    console.log(newMovie);
    const url = "/api/movies";
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newMovie)
    };
    return fetch(url, options)
        .then()
        .catch()
  }
};
