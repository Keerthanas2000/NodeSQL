let express = require("express");
let mysql = require("mysql2");
let app = express();

const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// MySQL Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  port: 3306, // Ensure MySQL is running on this port
  password: "Samsung@2000",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Function to insert user data into the database
const register_function = (customer_name, email, address) => {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO customers (customer_name, email, address) VALUES (?, ?, ?)";
    
    connection.query(query, [customer_name, email, address], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};

// API Route to Register User
app.post("/login", async (req, res) => {
  console.log("req", req.body);

  let { customer_name, email, address } = req.body;

  try {
    let output = await register_function(customer_name, email, address);
    res.send(output === "Success" ? "User is registered successfully" : "User creation failed");
  } catch (error) {
    res.status(500).send("Error in user registration: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
