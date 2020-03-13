/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */

// establish our imports
const {getMovies, addMovie, editMovie, getEditMovie} = require('./api.js');
const $ = require("jquery");

// get movies function that populates the .json

getMovies().then((movies) => {
    $("#movies").html('Here are all the movies:');
    let list = "<ul>";
    movies.forEach(({title, rating, id}) => {
        list += (`<li>${id}.)  <strong>${title}</strong>, Rating: ${rating} </li>`);
        // $("#moviesOutput").html(`id#${id} - ${title} - rating: ${rating}`);
    });
    list += "</ul>";
    $("#moviesOutput").html(list);
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

// click event listener to add a new movie
$("#addMovie").click(addMovie);
// click event listener to refresh the movies list...doesnt work
$("#refresh").click(getMovies);
// click event listener that picks the movie to edit based on the value of the id field
$('#this-must-work').click(function () {
    console.log('hello im working') //working/loading message.
    getEditMovie()          //movie to edit picker
        .then((data) => {$('#titleEdit').val(data.title);$('#ratingEdit').val(data.rating)});  // result from the promise resolution
});


// click event listener that edits movie in database
$('#editMovie').click(function (){
    let x = $('#idEdit').val();         //var for id value
    let y = {title: $('#titleEdit').val(), rating: $('#ratingEdit').val()}; //var for info being edited

    editMovie(x,y);         //execute the edit movie function
})

