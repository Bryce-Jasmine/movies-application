const $ = require("jquery");

module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());

    },
    addMovie: (e) => {
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
    },
    getEditMovie: () => {
        let index = $('#idEdit').val();
        return fetch(`/api/movies/${index}`)
            .then(response => response.json());
    },
    editMovie: (id, movie) => {
        return fetch(`api/movies/${id}`, {
            method: 'Put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
            .then(response => response.json());
    }
};
