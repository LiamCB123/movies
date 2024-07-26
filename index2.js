

const express = require("express")
const cors = require("cors")

const dbConnection = require("./config")

var bodyParser = require('body-parser');



var app = express(express.json); 


app.use(cors());
app.use(bodyParser.json());




app.get('/movies/genre/:genre', (request, response) => {
    const genre = request.params.genre;
    const sqlQuery = "SELECT * FROM movies WHERE genre LIKE ?;";
    dbConnection.query(sqlQuery, [`%${genre}%`], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});

app.get('/movies/director/:director', (request, response) => {
    const director = request.params.director;
    const sqlQuery = "SELECT * FROM movies WHERE director LIKE ?;";
    dbConnection.query(sqlQuery, [`%${director}%`], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});

app.get('/movies/year/:year', (request, response) => {
    const year = request.params.year;
    const sqlQuery = "SELECT * FROM movies WHERE year LIKE ?;";
    dbConnection.query(sqlQuery, [`%${year}%`], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});
app.get('/movies/rating/:rating', (request, response) => {
    const rating = request.params.rating;
    const sqlQuery = "SELECT * FROM movies WHERE filmRating >=?;";
    dbConnection.query(sqlQuery, [rating], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        return response.status(200).json(result);
    });
});

app.listen(2000, () => {
    console.log("Express server is running and listening");
}); 



