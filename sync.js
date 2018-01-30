var models = require('./dModels/models');
let sequelize = require('./dModels/models.js').sequelize;

models.sequelize.sync({ force: true })
  .then(function() {
    console.log('Successfully updated database tables!');
    process.exit(0);
  })
  .catch(function(error) {
    console.log('Error updating database tables', error);
    process.exit(1);
  });
