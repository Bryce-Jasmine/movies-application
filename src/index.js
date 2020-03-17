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

// get movies function that populates the .json
function loadMovies() {
    getMovies().then((movies) => {
        $("#movies").html(/*'Here are all the movies:'*/'');
        let list = "";  //<div class='movies container'>
        movies.forEach(({title, genre, rating, id}) => {
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
             </div>`);
            $("#moviesOutput").html(`id#${id} - ${title} - rating: ${rating}`);
        });
        // list += "</div>";
        $("#moviesOutput").html(list);
        // click event listener that deletes movie from database
        $(".deleteMovie").click((evt) => getDeleteMovie(evt).then(() => refreshMovies()));
        // click event listener that edits movie in database
        $('#editMovie').click(function (evt) {
            console.log("test");
            let id = $(evt.target).siblings('#idEdit')[0].value;                                    //var for id value
            let movie = {
                title: $('#titleEdit').val(),
                genre: $('#genreEdit').val(),
                rating: $('#ratingEdit').val()
            };     //var for info being edited



            editMovie(id, movie).then(loadMovies)         //execute the edit movie function
        });
        // click event listener that picks the movie to edit based on the value of the id field
        $('.getEditMovie').click(function (evt) {
            // console.log('hello im working'); //working/loading message.
            getEditMovie(evt)          //movie to edit picker
                .then((data) => {
                    $('#titleEdit').val(data.title);
                    $("#genreEdit").val(data.genre);
                    $('#ratingEdit').val(data.rating);
                    $('#idEdit').val(data.id);
                });  // result from the promise resolution
        });

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

// click event listener to add a new movie
$("#addMovie").click((evt) => addMovie(evt).then(() => refreshMovies()));

// click event listener to refresh the movies list
$("#refresh").click(refreshMovies);


// click event listener that grabs movie to delete
// $(".deleteMovie").click(getDeleteMovie);
