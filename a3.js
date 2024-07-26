$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:2000/movies/', // Adjust the URL if necessary
        method: 'GET',
        success: function(data) {
            const movieList = $('#movie-list');
            movieList.empty(); // Clear existing content
            data.forEach(movie => {
                const movieCard = `
                    <div class="col-md-4 mb-3 d-flex justify-content-center">
                        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
                            <div class="card-header">${movie.movieNames}</div>
                            <div class="card-body">
                                <h4 class="card-title">${movie.genre}</h4>
                                <p class="card-text">
                                    Year: ${movie.year}<br>
                                    Film Rating: ${movie.filmRating}<br>
                                    Rotten Tomato Score: ${movie.score}<br>
                                    Director: ${movie.director}
                                </p>
                                <button class="btn btn-primary update-btn" 
                                    data-movieNames="${encodeURIComponent(movie.movieNames)}"
                                    data-director="${encodeURIComponent(movie.director)}"
                                    data-filmRating="${encodeURIComponent(movie.filmRating)}"
                                    data-year="${encodeURIComponent(movie.year)}"
                                    data-genre="${encodeURIComponent(movie.genre)}"
                                    data-score="${encodeURIComponent(movie.score)}">Update</button>
                               
                                <button class="btn btn-secondary view-btn" 
                                    data-movieNames="${movie.movieNames}"
                                    data-director="${movie.director}"
                                    data-filmRating="${movie.filmRating}"
                                    data-year="${movie.year}"
                                    data-genre="${movie.genre}"
                                    data-score="${movie.score}">View</button>
                                <button class="btn btn-danger delete-btn" data-movie="${movie.movieNames}">Delete</button>
                            </div>
                        </div>
                    </div>`;
                movieList.append(movieCard);
            });

            // Add event listeners for the buttons
            $('.update-btn').on('click', function() {
                const movieName = $(this).data('movienames');
                const movieDirector = $(this).data('director');
                const movieRating = $(this).data('filmrating');
                const movieYear = $(this).data('year');
                const movieGenre = $(this).data('genre');
                const movieScore = $(this).data('score');
                // Handle view logic
                window.location.href = `update.html?movieNames=${movieName}&director=${movieDirector}&filmRating=${movieRating}&year=${movieYear}&genre=${movieGenre}&score=${movieScore}`;
            
            });

            $('.view-btn').on('click', function() {
                const movieName = $(this).data('movienames');
                const movieDirector = $(this).data('director');
                const movieRating = $(this).data('filmrating');
                const movieYear = $(this).data('year');
                const movieGenre = $(this).data('genre');
                const movieScore = $(this).data('score');
                // Handle view logic
                window.location.href = `view.html?movieNames=${movieName}&director=${movieDirector}&filmRating=${movieRating}&year=${movieYear}&genre=${movieGenre}&score=${movieScore}`;
            });

            $('.delete-btn').on('click', function() {
                const movieName = $(this).data('movie');
                if (confirm("Are you sure you want to delete the record for " + movieName + "?")) {
                    $.ajax({
                        url: "http://localhost:2000/movies/" + movieName,
                        type: "DELETE",
                        success: function(response) {
                            alert("Record deleted successfully!");
                            location.reload(); 
                        },
                        error: function() {
                            alert("Error deleting record. Please try again.");
                        }
                    });
                }
            });
        },
        error: function(error) {
            console.error("There was an error fetching the movie data:", error);
        }
    });

    function deleteMovie(movieName) {
        $.ajax({
            url: `http://localhost:2000/movies/${movieName}`,
            method: 'DELETE',
            success: function() {
                location.reload(); // Reload the page to fetch updated movie list
            },
            error: function(error) {
                console.error("There was an error deleting the movie:", error);
            }
        });
    }
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    function populateUpdateForm() {
        var movieNames = getUrlParameter('movieNames');
        var genre = getUrlParameter('genre');
        var filmRating = getUrlParameter('filmRating');
        var year = getUrlParameter('year');
        var director = getUrlParameter('director');
        var score = getUrlParameter('score');
        $('#title').val(movieNames);
        $('#genre').val(genre).attr('placeholder', genre);
        $('#releaseYear').val(year).attr('placeholder', year);
        $('#rating').val(filmRating).attr('placeholder', filmRating);
        $('#director').val(director).attr('placeholder', director);
        $('#score').val(score).attr('placeholder', score);
    }   
    if(window.location.pathname.indexOf('update.html') > -1) {
        populateUpdateForm();
    }

    $('#createForm').on('submit', function(event) {
        event.preventDefault();
        const movieNames = $('#title').val();
        const genre = $('#genre').val();
        const year = $('#releaseDate').val();
        const filmRating = $('#rating').val();
        const score = $('#score').val();
        const director = $('#director').val();
        $.ajax({
            url: 'http://localhost:2000/movies/' + movieNames,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ movieNames, genre, filmRating, year, score, director }),
            success: function() {
                alert('Movie added successfully!');
                $('#createForm').trigger('reset');
                location.reload(); // Reload the page to fetch updated movie list
            },
            error: function(error) {
                console.error("There was an error adding the movie:", error);
            }
        });
    });
    $('#updateForm').on('submit', function(event) {
        event.preventDefault();
        const movieNames = $('#title').val();
        const genre = $('#genre').val();
        const year = $('#releaseYear').val();
        const filmRating = $('#rating').val();
        const score = $('#score').val();
        const director = $('#director').val();
        $.ajax({
            url: 'http://localhost:2000/movies/' + movieNames,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ movieNames, genre, filmRating, year, score, director }),
            success: function() {
                alert('Movie added successfully!');
                $('#createForm').trigger('reset');
                window.location.href = 'read.html'; // Redirect to the movie list page
            },
            error: function(error) {
                console.error("There was an error adding the movie:", error);
            }
        });
    });
});
