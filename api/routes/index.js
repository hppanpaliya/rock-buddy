const home = require('./home')

const constructorMethod = (app) => {
  //middleware function
    app.use('/', home);
    app.use('*', (req, res) => {
      res.status(404).json({error: "404: Page not found"});
    });
  };
  
  module.exports = constructorMethod;