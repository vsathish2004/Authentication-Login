const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee.js");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                // Check password
                if (user.password === password) {
                    return res.json("success");
                } else {
                    return res.status(401).json("The password is incorrect"); // 401 Unauthorized
                }
            } else {
                return res.status(404).json("No record existed"); // 404 Not Found
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json("Internal server error"); // 500 Internal Server Error
        });
});

// Registration route
app.post("/register", (req, res) => {
    // Check if the email already exists
    const { email, password } = req.body;
    EmployeeModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json("Email already exists"); // 409 Conflict
            }

            // Create a new employee
            return EmployeeModel.create(req.body);
        })
        .then((employee) => res.status(201).json(employee)) // 201 Created
        .catch((err) => {
            console.error(err);
            return res.status(500).json("Internal server error"); // 500 Internal Server Error
        });
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
