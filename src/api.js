const $ = require("jquery");
const {enableEditBtn, enableAddBtn} = require('./index.js');

module.exports = {

    //pull db.json
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },

    //pru new movie to db.json
    addMovie: (e) => {

        if ($('#title').val() !== '' && $('#rating').val() !== '') {
            e.preventDefault();
            const newMovie = {title: $("#title").val(), rating: $("#rating").val(), genre: $("#genre").val()};
            console.log(newMovie);
            const url = "/api/movies";
            const options = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newMovie)
            };
            return fetch(url, options)
                .then(() => {
                    $('#title').val('');
                    $('#genre').val('');
                    $('#rating').val('');
                    document.getElementById('addMovie').disabled = true;
                })
                .catch()
        }
    },

    //gets the id for editing a movie in db.json
    getEditMovie: (evt) => {
        console.log(evt);
        let id = $(evt.currentTarget).parent().parent().parent()[0].id;
        console.log(id);
        return fetch(`/api/movies/${id}`)
            .then(response => response.json());
    },

    //edits the movie associated with the edit movie grabber
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

    //gets the id for deleting a movie
    getDeleteMovie: (evt) => {
        // let target = $(evt.currentTarget);
        let id = $(evt.currentTarget).parent().parent().parent()[0].id;
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


