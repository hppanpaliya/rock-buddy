const home = require('./home')
const search = require('./search')

const constructorMethod = (app) => {
  //middleware function
    app.use('/', home);
    app.use('/search', search);
    app.use('*', (req, res) => {
      res.status(404).json({error: "404: Page not found"});
    });
  };
  
  module.exports = constructorMethod;