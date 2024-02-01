const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// Connect To The Goose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-local-vocal-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log Quieries To The Goose
mongoose.set('debug', true);

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));