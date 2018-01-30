var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
const bodyParser = require('body-parser');
let db = require('./dModels/models.js')
let sequelize = require('./dModels/models.js').sequelize;
const PORT = process.env.PORT || 3000;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`🌎\nListening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
