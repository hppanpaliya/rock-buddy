const home = require('./home');
const search = require('./search');
const info = require('./info');
const events = require('./events');
const users = require('./users');
const express = require('express');
const path = require('path');

const constructorMethod = (app) => {
    //middleware function
    app.use(express.static('public'));

    app.use(express.json());

    app.use(express.static(path.resolve(__dirname, '../public')));
    
    app.use('/api', home);
    app.use('/api/search', search);
    app.use('/api/info', info);
    app.use('/api/events', events);
    app.use('/api/users', users);

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
    });
};

module.exports = constructorMethod;
