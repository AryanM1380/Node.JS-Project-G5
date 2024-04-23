const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const CarModel = require("./models/Cars");

const app = express()
app.use(cors())
app.use(express.json())

const dbURI =
"mongodb+srv://" + process.env.DBUSERNAME + ":" + process.env.DBPASSWORD + 
"@" + process.env.CLUSTOR + ".mongodb.net/" + process.env.DB + 
"?retryWrites=true&w=majority&appName=Cluster0";



    console.log(dbURI);
    mongoose
    .connect(dbURI)
    .then((result) => {
        console.log("Connected to DB");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log("Listening on " + PORT));
    })
    .catch((err) => {
        console.log(err);
    });

    
    // Use Mongoose to fetch all cars
    app.get("/", (req, res) => {
        CarModel.find()  
        .then(cars => res.json(cars))
        .catch(err => res.status(400).json('Error: ' + err));
    });


    // Get the car data by ID in order to update 
    app.get("/getCar/:id", (req, res) => {
        const id = req.params.id;
        CarModel.findById({_id:id}) 
        .then(car => res.json(car))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    // Update the car data
    app.put("/updateCar/:id", (req, res) => {
        const id = req.params.id;
        CarModel.findByIdAndUpdate({_id:id}, {
            cars_id: req.body.cars_id, 
            car_name: req.body.car_name, 
            brand: req.body.brand, 
            releasedDate: req.body.releasedDate, 
            price: req.body.price, 
            available_count: req.body.available_count, 
            summary: req.body.summary})
        .then(car => res.json(car))
        .catch(err => res.status(400).json('Error: ' + err));
    })

    
    // Delete the car data
    app.delete("/deleteCar/:id", (req, res) => {
        const id = req.params.id;
        CarModel.findByIdAndDelete({_id:id})
        .then(cars => res.json(cars))
        .catch(err => res.status(400).json('Error: ' + err));
    })


    // Create a new car data
    app.post("/CreateCar", (req, res) => {
        CarModel.create(req.body)
        .then(cars => res.json(cars))
        .catch(err => res.status(400).json('Error: ' + err));
        })