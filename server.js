const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const db = require('./dModels/models.js')
const sequelize = require('./dModels/models.js').sequelize;
const Product = require('./dModels/models.js').Product;
const app = express();
const compiler = webpack(config);
const axios = require('axios');
const eventbriteAPI = require('node-eventbrite');


const token = process.env.OAUTH_TOKEN;

try {
    var api = eventbriteAPI({
      token: token,
      version : 'v3'
    });
} catch (error) {
    console.log(error.message); // the options are missing, this function throws an error.
}


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
    Product.create({
      product_name: req.body.name,
      product_description: req.body.description,
      product_price: req.body.price,
      product_location: req.body.location,
      product_phonenumber: req.body.phoneNumber,
      eventbrite: false,
      event_start_timezone: req.body.timezone,
      event_end_timezone: req.body.timezone,
      event_start_time: req.body.startTime,
      event_end_time: req.body.endTime,
      currency: 'USD',
      online_event: true
    })
    .then(()=>res.send('Success!'))
    .catch(err=>console.log(err));
});

setInterval(
  function() {
      Product.findAll({where: {eventbrite: false}})
      .then((product)=>{
        product.map(event => {
          api.create_event({
            "event.name.html": event.product_name,
            "event.description.html": event.product_description,
            "event.start.utc": new Date(event.event_start_time).toJSON().replace(".000Z", "Z"),
            "event.start.timezone": event.event_start_timezone,
            "event.end.utc": new Date(event.event_end_time).toJSON().replace(".000Z", "Z"),
            "event.end.timezone": event.event_end_timezone,
            "event.currency": event.currency,
            "event.online_event": event.online_event
          }, function (error, data) {
            if (error){
              console.log(error.message)
            } else {

              event.update({eventbrite: true})
              .catch(err=>console.log(err))
            }
          })
        })
        .catch(err=>console.log(err));
    })},1000 * 60 * 60)

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`🌎\nListening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
