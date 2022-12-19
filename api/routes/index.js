const home = require('./home');
const search = require('./search');
const info = require('./info');
const events = require('./events');
const users = require('./users');

const constructorMethod = (app) => {
  //middleware function
    app.use('/', home);
    app.use('/search', search);
	app.use('/info', info);
    app.use('/events', events);
	app.use('/users', users);
    app.use('*', (req, res) => {
      res.status(404).json({error: "404: Page not found"});
    });
  };
  
  module.exports = constructorMethod;