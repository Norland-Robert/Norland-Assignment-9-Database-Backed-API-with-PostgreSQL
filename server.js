//File for all server code

//Creation of express server
const express = require("express")
const app = express()

//Sets application to utilize view engine
app.set('view engine', 'ejs')

//Allows for the parsing of JSON data
app.use(express.json())


//Static Display for home page
app.use(express.static("public"))


//Allows for API router and routes
const apiRouter = require('./routes/api')

//calls the router for use
app.use('/api/items', apiRouter)

//Assigns the port for the server to start on and prints to the console to let users know it 
//launched successfully
app.listen(3000, () => {
    console.log("Server Successfully Started on Port 3000")
})

