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
muthaFunction();
// get movies function that populates the .json
function muthaFunction() {
    getMovies().then((movies) => {
        $("#movies").html('Here are all the movies:');
        let list = "";
        movies.forEach(({title, rating, id}) => {
            list += (`<div> ${id}.)  <strong>${title}</strong>, Rating: ${rating} <button type="submit" class ="deleteMovie">Delete</button> </div>`);
            // $("#moviesOutput").html(`id#${id} - ${title} - rating: ${rating}`);
        });
        // list += "</div>";
        $("#moviesOutput").html(list);
        $(".deleteMovie").click(getDeleteMovie);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

// click event listener to add a new movie
$("#addMovie").click(addMovie);
// click event listener to refresh the movies list...doesnt work
$("#refresh").click(getMovies);
// click event listener that picks the movie to edit based on the value of the id field
$('#this-must-work').click(function () {
    console.log('hello im working'); //working/loading message.
    getEditMovie()          //movie to edit picker
        .then((data) => {$('#titleEdit').val(data.title);$('#ratingEdit').val(data.rating)});  // result from the promise resolution
});


// click event listener that edits movie in database
$('#editMovie').click(function (){
    let x = $('#idEdit').val();         //var for id value
    let y = {title: $('#titleEdit').val(), rating: $('#ratingEdit').val()}; //var for info being edited

    editMovie(x,y).then(muthaFunction)         //execute the edit movie function
});

// click event listener that grabs movie to delete
// $(".deleteMovie").click(getDeleteMovie);

