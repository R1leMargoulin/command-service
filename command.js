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


app.get("/commands/:id_user", (req,res)=>{
    var id_user = req.params.id_user;
    console.log(id_user)
    db.commands.find({customerId:id_user}).then((e)=>{
            res.status(200).json(e);
        }).catch(()=>{
            res.status(404).json({message: 'no command found'});
        })
});





app.post("/commands/send", (req,res)=>{
    console.log(req.body)

    var newCommand = {
        customerId:req.body.customerId,
        restorantId:req.body.restorantId,
        date:req.body.date,
        articles:req.body.articles,
        price:req.body.price
    }

    //sensors.push(newSensor);
    console.log(newCommand)
    db.commands.insertMany(newCommand).then(()=>{
    res.status(200).json({message:`la command a bien été passée`})
    }).catch(e=>{
        res.status(404).json({message:`problème`})
    })

   
    //console.log(items)

    
});




app.listen(process.env.SERVER_PORT, ()=>{
    console.log('server is running on port'  + process.env.SERVER_PORT)
});
