
const mysql = require("mysql");


const mysqlConfig = {
    host: "localhost", 
    port: 3306,
    user: "testuser", 
    password: "mypassword",
    database: "assign3",
    debug: false // Connection debugging mode is ON
};

const dbConnection = mysql.createConnection(mysqlConfig);
dbConnection.connect(function(err) {
    // unsucessful: handle any errors that might occur during connection
    if (err) {
        console.error('Opps. There was an error connecting to the database: ', err.stack);
        return;
    }
    // successful: output on the screen a message that connection was successful
    console.log('Backend is now connected to: ' + dbConnection.config.database + '.');
});


module.exports = dbConnection;
