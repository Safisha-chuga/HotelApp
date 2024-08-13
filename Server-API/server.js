const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
// Create an Express app
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel_app'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Route to insert a new region
app.post('/regions/create', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO region set ?';

  connection.execute(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting region:', err);
      res.status(500).send('Error inserting region');
      return;
    }
    res.status(201).send({ id: results.insertId, name });
  });
});

// Route to get all regions
app.get('/regions', (req, res) => {
  const query = 'SELECT * from region';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching regions:', err);
      res.status(500).send('Error fetching regions');
      return;
    }
    res.status(200).json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Route to insert a new location

app.post("/location/create", (req,res)=>{
  let details = {
    name: req.body.name,
    region_id: req.body.region_id
  };

  let qry = "insert into location set ?";
  connection.query(qry,details,(error) =>{
    if (error) {
      res.send({ status: false, message: "location failed to be added"});
    }
    res.send({ status: true, message: "location added successful"});
  });

});
// Route to get all locations
app.get('/location', (req, res) => {
  const query = 'SELECT * from location';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching location:', err);
      res.status(500).send('Error fetching location');
      return;
    }
    res.status(200).json(results);
  });
});
app.post("/hotel/create", (req,res)=>{
  let details = {
    name: req.body.name,
    region_id: req.body.region_id
  };

  let qry = "insert into hotel set ?";
  connection.query(qry,details,(error) =>{
    if (error) {
      res.send({ status: false, message: "Hotel failed to be added"});
    }
    res.send({ status: true, message: "Hotel added successful"});
  });

});

// Route to get all hotel
app.get('/hotel', (req, res) => {
  const query = 'SELECT * from hotel';
booking
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching hotel:', err);
      res.status(500).send('Error fetching hotel');
      return;
    }
    res.status(200).json(results);
  });
});

//post api for booking for create
app.post("/booking/create", (req,res)=>{
  let details = {
    room: req.body.room,
    bk_status: req.body.bk_status,
    region_id: req.body.region_id,
    book_no: req.body.book_no,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };

  let qry = "insert into booking set ?";
  connection.query(qry,details,(error) =>{
    if (error) {
      res.send({ status: false, message: "booking failed to be added"});
    }
    res.send({ status: true, message: "booking added successful"});
  });

});
app.get("/booking", (req,res) => {
  var qry = "select * from booking";

    connection.query(qry, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Booking cannot be viewed" });
    } else {
      res.send({ status: true, data: result });
    }
  });

});




