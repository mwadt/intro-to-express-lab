const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Route to greet the user
app.get('/greetings/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Hello there, ${username}!`);
});

// Route to roll the dice
app.get('/roll/:number', (req, res) => {
    const { number } = req.params;

    // Check if the parameter is a number
    if (isNaN(number)) {
        return res.send("You must specify a number.");
    }

    // Generate a random number between 0 and the given number
    const randomNumber = Math.floor(Math.random() * (parseInt(number) + 1));

    res.send(`You rolled a ${randomNumber}.`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});