const express = require('express');
const cors = require('cors');

function templateMiddleware(app){
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
} 

module.exports = {
    templateMiddleware,
}