const mongoose= require('mongoose');

const commands = mongoose.model(
    "commands",
    new mongoose.Schema({
        customerId:{
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
        articles:{
            menus:{
                type:Array
            },
            items:{
                type:Array
            }
        },
        price:{
            type: Number,
            required:true
        },
        isPaid:{
            type:Boolean,
            required:true
        }, 
        isAcceptedByRestaurateur:{
            type:Boolean,
            required:true
        },
        isInDelivery:{
            type:Boolean,
            required:true
        }
    })
);

module.exports = commands;