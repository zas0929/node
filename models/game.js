// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our game model

var gameSchema = mongoose.Schema({
    cards: [],
    cardsOnTable: [],
    bank: Number,
    minCash: Number,
    player1: {
        id1: String,
        cards: [],
        smBl: Boolean,
        bigBl: Boolean,
        step: Boolean,
        button: Boolean
    },
    player2: {
        id2: String,
        cards: [],
        smBl: Boolean,
        bigBl: Boolean,
        step: Boolean,
        button: Boolean
    },
    // player3: {
    //     id3: String,
    //     cards: [],
    //     smBl: Boolean,
    //     bigBl: Boolean,
    //     step: Boolean,
    //     button: Boolean
    // },
    // player4: {
    //     id4: String,
    //     cards: [],
    //     smBl: Boolean,
    //     bigBl: Boolean,
    //     step: Boolean,
    //     button: Boolean
    // }

})

module.exports = mongoose.model('GameTable', gameSchema);
