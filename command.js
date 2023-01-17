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
app.get("/commands/ping", (req,res) =>{
    res.status(200).json({message:'pong'});
});


app.post("/commands/send", (req,res)=>{
    console.log(req.body)
    var newCommand = new Object()
    if('deliveryId' in req.body){
        var newCommand = {
            id:req.body.id,
            customerId:req.body.customeId,
            restorantId:req.body.restorantId,
            date:req.body.date,
            isPaid:req.body.isPaid,
            deliveryId:req.body.deliveryId,
            articles:req.body.articles
        }
    }
    else{
        var newCommand = {
            id:req.body.id,
            customerId:req.body.customeId,
            restorantId:req.body.restorantId,
            date:req.body.date,
            isPaid:req.body.isPaid,
            articles:req.body.articles
        }
    }

    //sensors.push(newSensor);
    db.commands.insertMany(newCommand)

    res.status(200).json({message:`la command a bien été passée, numéro de commande: ${newCommand.id_user}`})
    //console.log(items)

    
});




app.listen(process.env.SERVER_PORT, ()=>{
    console.log('server is running on port'  + process.env.SERVER_PORT)
});