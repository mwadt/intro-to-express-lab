const express = require('express');
const app = express();
const validator = require('validator');
app.listen(3000, () => {
    console.log('listening on port 3000');
})

// Route to greet the user
app.get('/greetings/:username', (req, res) => {
    const username  = req.query.username;
    res.send(`Hello there, ${req.params.username}!  What a delight to see you again!`);
});

//Rolling the Dice Route
app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    if(!validator.isNumeric(number)) {
    res.send('You must specify a number');
    };  
    if(validator.isNumeric(number)) {
        const randomNumber = Math.floor(Math.random() * req.params.number + 1);
    res.send(`<h1>You rolled a ${randomNumber}</h1>`)
    }
})

//I want THAT one! Route
app.get('/collectibles/:indexNumber', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
    if(req.params.indexNumber >0 && req.params.indexNumber < 3){
        res.send(`So, you want the ${collectibles[req.params.indexNumber].name}?  For $${collectibles[req.params.indexNumber].price}, it can be yours!"`);
    } else {
        res.send('That Item is not in stock yet!  Check back soon!');
    }
    

});

//Filter shoes by query parameters
app.get('/shoes/', (req, res) => {
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
const {minPrice, maxPrice, type} = req.query
    let shoeFilter = shoes.filter(shoe => {
        if(minPrice && shoe.price < req.query.minPrice) return false;
        if(maxPrice && shoe.price > req.query.maxPrice) return false;
        if(type && shoe.type !== type) return false;
        return true;
    })
    res.send(shoeFilter);

})
