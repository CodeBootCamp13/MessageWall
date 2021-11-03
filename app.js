const express = require('express');
const app = express();

const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'messagewall',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

// serve public files - static
app.use( express.static('static_files') );
app.use( express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	// get all of my records from the database
	connection.query('SELECT id,user,message,dtg FROM wall ORDER BY id DESC', (err, results) => {
		// THEN render the page
		console.log(results);
		res.render('index', {messages: results});
	});
});

app.post('/', (req, res) => {
	// insert this record into the database
	connection.query('INSERT INTO wall (user, message) VALUES (?, ?)', 
		[ req.body.user, req.body.message ],
		(err, results) => {
			// inside the callback function
			res.redirect('/');
		}
	);
});

app.listen(3000);