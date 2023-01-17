const mongoose= require('mongoose');

const commands = mongoose.model(
    "commands",
    new mongoose.Schema({
        id:{
            type:String,
            required:true
        },
        customer_id:{
            type:String,
            required:true
        },
        restorantId:{
            type:String,
            required:true
        },
        date:{
            type: Date,
            required: true
        },
        isPaid:{
            type: Boolean,
            required: true
        },
        deliveryId:{
            type: String,
        },
        articles:{
            type:Array,
            required:true
        }
    })
);

module.exports = commands;