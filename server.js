const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const db = require('./dModels/models.js')
const sequelize = require('./dModels/models.js').sequelize;
const Product = require('./dModels/models.js').Product;
const Test = require('./dModels/models.js').Test;
const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/addProduct', function(req, res) {
    // validation step
    console.log('inside signup');
    Product.create({
      product_name: req.body.name,
      product_description: req.body.discription,
      product_price: req.body.price,
      product_location: req.body.location,
      product_phonenumber: req.body.phoneNumber,
    })
      .then(()=>res.send('Success!'))
      .catch(err=>console.log(err));
  });


app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`🌎\nListening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
