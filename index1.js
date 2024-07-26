
// retrieve necessary files (express and cors)
const express = require("express")
const cors = require("cors")
// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config")
// use this library for parsing HTTP body requests
var bodyParser = require('body-parser');



var app = express(express.json); 


app.use(cors());
app.use(bodyParser.json());


app.get('/movies', (request, response) => {
    const sqlQuery = "SELECT * FROM movies;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Error in the SQL statement. Please check."});
        }
        response.setHeader('SQLQuery', sqlQuery);
        return response.status(200).json(result);
    });
});

app.get('/movies/:movieNames', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "SELECT * FROM movies WHERE MOVIENAMES = '" + name +"';";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Error in the SQL statement. Please check."});
        }
        response.setHeader('MovieName', name);
        return response.status(200).json(result);
    });
});
app.get('/movies/:movieNames/genre', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "SELECT genre FROM movies WHERE MOVIENAMES = ?;";
    
    dbConnection.query(sqlQuery, [name], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: "Movie not found." });
        }
        response.setHeader('MovieName', name);
        return response.status(200).json(result[0]);
    });
});
app.get('/movies/:movieNames/director', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "SELECT director FROM movies WHERE MOVIENAMES =?;";
    
    dbConnection.query(sqlQuery, [name], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: "Movie not found." });
        }
        response.setHeader('MovieName', name);
        return response.status(200).json(result[0]);
    });
});
app.get('/movies/:movieNames/year', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "SELECT year FROM movies WHERE MOVIENAMES =?;";
    
    dbConnection.query(sqlQuery, [name], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: "Movie not found." });
        }
        response.setHeader('MovieName', name);
        return response.status(200).json(result[0]);
    });
})
app.get('/movies/:movieNames/score', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "SELECT score FROM movies WHERE MOVIENAMES =?;";
    
    dbConnection.query(sqlQuery, [name], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: "Movie not found." });
        }
        response.setHeader('MovieName', name);
        return response.status(200).json(result[0]);
    });
})
app.get('/movies/:movieNames/rating', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "SELECT filmRating FROM movies WHERE MOVIENAMES =?;";
    
    dbConnection.query(sqlQuery, [name], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: "Movie not found." });
        }
        response.setHeader('MovieName', name);
        return response.status(200).json(result[0]);
    });
})

app.post('/movies/:movieNames', (request, response) => {
    const sqlQuery = 'INSERT INTO movies (movieNames, genre, filmRating, year, score, director) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [request.body.movieNames, request.body.genre, request.body.filmRating, request.body.year, request.body.score, request.body.director];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Failed: Record was not added."});
        }
        return response.status(200).json({Success: "Successful: Record was added!."});
    });
});
app.put('/movies/:movieNames', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = `UPDATE movies SET movieNames = ?, genre = ?,
    filmRating = ?, year = ?, score = ?, director = ?
    WHERE MOVIENAMES = ? ;`;
    const values = [request.body.movieNames, request.body.genre, request.body.filmRating, request.body.year, request.body.score, request.body.director];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values, name], (err, result) => {
    if (err) {
        return response.status(400).json({Error: "Failed: Record was not added."});
    }
    return response.status(200).json({Success: "Successful: Record was updated!."});
    });
});
app.delete('/movies/:movieNames', (request, response) => {
    const name = request.params.movieNames;
    const sqlQuery = "DELETE FROM movies WHERE MOVIENAMES = ? ; ";
    dbConnection.query(sqlQuery, name, (err, result) => {
    if (err) {
        return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
    return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
});

app.listen(2000, () => {
    console.log("Express server is running and listening");
}); 



