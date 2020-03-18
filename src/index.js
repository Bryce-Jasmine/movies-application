/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */

// establish our imports
const {getMovies, addMovie, editMovie, getEditMovie, getDeleteMovie} = require('./api.js');
const $ = require("jquery");
const fas = require("@fortawesome/fontawesome-free");


$(document).ready(loadMovies());

function refreshMovies() {
    $('#moviesOutput').html(`<div id="movies" class="d-flex justify-content-center"><img src="./img/Dual_Ball-1s-141px.svg" alt="loading"></div>`);
    loadMovies();
}

function populate(arr) {
    $("#movies").html(/*'Here are all the movies:'*/'');
    let list = "";  //<div class='movies container'>
    arr.forEach(({title, genre, rating, id}) => {
        list += (`<div class = "movies" id="${id}"> 
                 <h5>${title}</h5>
                 <div class="d-flex justify-content-between align-items-baseline">
                 <p style="width: 130px">Genre: ${genre}</p> <p>Rating: ${rating}</p>
                    <div class="d-flex justify-content-end"> 
                    <button type="submit" class=" btn getEditMovie justify-content-end">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button type="submit" class="btn deleteMovie justify-content-end">
                        <i class="fas fa-minus-circle"></i>
                    </button>
                    </div>
                    </div>
                    <hr>
             </div>`);
        $("#moviesOutput").html(`id#${id} - ${title} - rating: ${rating}`);
    });
    $("#moviesOutput").html(list);
    // click event listener that deletes movie from database
    $(".deleteMovie").click((evt) => getDeleteMovie(evt).then(() => refreshMovies()));
    // click event listener that edits movie in database
    $('#editMovie').click(function (evt) {
        // console.log("test");
        let id = $(evt.target).siblings('#idEdit')[0].value;                                    //var for id value
        let movie = {
            title: $('#titleEdit').val(),
            genre: $('#genreEdit').val(),
            rating: $('#ratingEdit').val()
        };     //var for info being edited

        editMovie(id, movie).then(loadMovies)         //execute the edit movie function
            .then(() => {
                $('#titleEdit').val('');
                $('#genreEdit').val('');
                $('#ratingEdit').val('');
                document.getElementById('editMovie').disabled = true;
            })
    });
    // click event listener that picks the movie to edit based on the value of the id field
    $('.getEditMovie').click(function (evt) {
        getEditMovie(evt)          //movie to edit picker
            .then((data) => {
                $('#titleEdit').val(data.title);
                $("#genreEdit").val(data.genre);
                $('#ratingEdit').val(data.rating);
                $('#idEdit').val(data.id);
            })  // result from the promise resolution
            .then(enableEditBtn);
    });
}

// get movies function that populates the .json
let sortArr = [];

function loadMovies() {
    getMovies()
        .then((movies) => {
            sortArr = movies;
            populate(movies);
        })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
}

// click event listener to add a new movie
$("#addMovie").click((evt) => addMovie(evt).then(() => refreshMovies()));

// click event listener to refresh the movies list
$("#refresh").click(refreshMovies);

function enableAddBtn() {
    if ($('#title').val() !== '' && $('#rating').val() !== '') {
        document.getElementById('addMovie').disabled = false;
    } else {
        document.getElementById('addMovie').disabled = true;
    }
}

function enableEditBtn() {
    document.getElementById('editMovie').disabled = !($('#titleEdit').val() !== '' && $('#ratingEdit').val() !== '');
}

$('#newMovie input').blur(enableAddBtn);

// sort functionality
$("#sort").click(function () {
    let method = $('#sortSelect').val();
    console.log(method);

    if (method.toLowerCase() === "title ascending") {
        populate(sortArr.sort(compareTitle));
    } else if (method.toLowerCase() === "genre descending") {
        populate(sortArr.sort(compareGenre).reverse());
    } else if (method.toLowerCase() === "rating ascending") {
        populate(sortArr.sort(compareRating));
    } else if (method.toLowerCase() === "title descending") {
        populate(sortArr.sort(compareTitle).reverse());
    } else if (method.toLowerCase() === "genre ascending") {
        populate(sortArr.sort(compareGenre));
    } else if (method.toLowerCase() === "rating descending") {
        populate(sortArr.sort(compareRating).reverse());
    }
});

$('#search').click(function (){
    let comp = $('#searchBar').val();
    let myName = sortArr.filter(movie => movie.title.includes(comp));
    populate(myName);
});
// sort comparator function
function compareTitle(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

function compareGenre(a, b) {
    if (a.genre < b.genre) {
        return -1;
    }
    if (a.genre > b.genre) {
        return 1;
    }
    return 0;
}

function compareRating(a, b) {
    if (a.rating < b.rating) {
        return -1;
    }
    if (a.rating > b.rating) {
        return 1;
    }
    return 0;
}

// function search(a) {
//     if ()
// }
//
// // create an array
// const names = ['John', 'Peter', 'James', 'Pammy'];
//
// // Filter the array for names having 'am'
// const myName = names.filter(name => name.includes('am'));
//
// // Output new array
// console.log(myName)