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


muthaFunction();

// get movies function that populates the .json
function muthaFunction() {
    getMovies().then((movies) => {
        $("#movies").html('Here are all the movies:');
        let list = "";  //<div class='movies container'>
        movies.forEach(({title, rating, id}) => {
            list += (`<div id="${id}"> ${id}.) 
                 <strong>${title}</strong>
                , Rating: ${rating} 
                    <button type="submit" class="getEditMovie" style="border:none">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button type="submit" class="deleteMovie" style="border:none">
                        <i class="fas fa-minus-circle"></i>
                    </button>
             </div>`);
            // $("#moviesOutput").html(`id#${id} - ${title} - rating: ${rating}`);
        });
        // list += "</div>";
        $("#moviesOutput").html(list);
        // click event listener that deletes movie from database
        $(".deleteMovie").click((evt) => {
            getDeleteMovie(evt).then(response => {
                getMovies();
                return response;
            });
        });
        // click event listener that edits movie in database
        $('#editMovie').click(function (evt) {
            let id = $(evt.target).siblings('#idEdit')[0].value;                                    //var for id value
            let movie = {title: $('#titleEdit').val(), rating: $('#ratingEdit').val()};     //var for info being edited

            editMovie(id, movie).then(muthaFunction)         //execute the edit movie function
        });
        // click event listener that picks the movie to edit based on the value of the id field
        $('.getEditMovie').click(function (evt) {
            console.log('hello im working'); //working/loading message.
            getEditMovie(evt)          //movie to edit picker
                .then((data) => {
                    $('#titleEdit').val(data.title);
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
$("#addMovie").click(addMovie);
// click event listener to refresh the movies list...doesnt work
$("#refresh").click(getMovies);


// click event listener that grabs movie to delete
// $(".deleteMovie").click(getDeleteMovie);

