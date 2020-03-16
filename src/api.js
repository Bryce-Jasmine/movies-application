const $ = require("jquery");

module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },
    addMovie: (e) => {

        if ($('#title').val() !== '' && $('#rating').val() !== '') {
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
    },
    getEditMovie: (evt) => {
        let id = $(evt.target).parent().parent()[0].id;
        return fetch(`/api/movies/${id}`)
            .then(response => response.json());
    },
    editMovie: (id, movie) => {
        // let conf = confirm('Editing movies will permanently change them \nAre you sure?');

        return fetch(`api/movies/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
            .then(response => {
                console.log(response);
                return response.json()
            });

    },

    getDeleteMovie: (evt) => {
        let target = $(evt.target);
        let id = target.parent().parent()[0].id;
        let conf = confirm('Are you sure you want to delete this movie');

        if (conf === true) {
            return fetch(`api/movies/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    alert('Movie permanently deleted.');
                    return response.json();
                });
        }
    }
};


