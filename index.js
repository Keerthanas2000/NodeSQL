// Get the MySQL client
const mysql = require("mysql2");
const express = require("express");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Database connection settings
const connection_str = {
  host: "localhost",
  user: "root",
  password: "Samsung@2000",
  database: "world",
};

// Create a connection pool (better than single connection)
const pool = mysql.createPool(connection_str);

// Function to get cities
const getCity = (req, res) => {
  const query_string = "SELECT * FROM city LIMIT 10";

  pool.query(query_string, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
};

// Define route to get city data
app.get("/getcity", getCity);

// Start Express server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
