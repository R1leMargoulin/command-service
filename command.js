const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();

app.use(express.json());
app.use(cors())

//connection
const db = require('./models');

db.mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connexion sucess')
}).catch(err =>{
    console.log('connexion error')
    process.exit()
})

//routes
app.get("/notifs/ping", (req,res) =>{
    res.status(200).json({message:'pong'});
});


app.listen(process.env.SERVER_PORT, ()=>{
    console.log('server is running on port'  + process.env.SERVER_PORT)
});