/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, getEditMovie} = require('./api.js');
const $ = require("jquery");

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

// getEditMovie().then((movie) => {
//     console.log(movie);
// })


$("#addMovie").click(addMovie);
$("#refresh").click(getMovies);
$('#this-must-work').click(function () {
    console.log('hello im working')
    getEditMovie()
        .then((data) => {$('#titleEdit').val(data.title);$('#ratingEdit').val(data.rating)});
});

$('#editMovie').click(function (){
    editMovie($('#titleEdit').val(),$('#ratingEdit').val());
})
// console.log(getEditMovie());
// .then((movie) => {
//     console.log(movie.title);
//     $('#ratingEdit').val(movie.rating)
// }));
