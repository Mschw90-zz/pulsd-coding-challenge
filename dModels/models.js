var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URI, {dialect: 'postgres'});

sequelize.authenticate()
.then(() => {
    console.log('Connection to your database has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

var Product = sequelize.define( 'products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    product_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    product_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    product_location: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    product_phonenumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

module.exports = {
    sequelize,
    Product
};
