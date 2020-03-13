/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie} = require('./api.js');
const $ = require("jquery");

getMovies().then((movies) => {
  $("#movies").html('Here are all the movies:');
  let list = "<ul>";
  movies.forEach(({title, rating, id}) => {
    list += (`<li> id#${id} - ${title} - rating: ${rating} </li>`);
    // $("#moviesOutput").html(`id#${id} - ${title} - rating: ${rating}`);
  });
  list += "</ul>";
  $("#moviesOutput").html(list);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$("#addMovie").click(addMovie);
$("#refresh").click(getMovies);
