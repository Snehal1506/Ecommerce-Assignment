var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');

//Get product model
var Product = require('../models/product');
// Get Category model
var Category = require('../models/category');

//Get Product Index
router.get('/', function (req, res) {

    var count;
    Product.count(function (err, c) {
        count = c;
    });
    Product.find(function (err, products) {
        res.json({
            products: products,
            count: count
        });
    });
});

//GET add product
router.get('/add-product', function (req, res) {

   Category.find(function (err, categories) {
       res.send(categories);
   });
});

//POST add product
router.post('/add-product', function (req, res) {

    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var desc = req.body.desc;
    var price = req.body.price;
    var category = req.body.category;

    Product.findOne({slug: slug}, function (err, product) {
        if (product) {
            req.flash('danger', 'Product title exists, choose another.');
            Category.find(function (err, categories) {
                res.json({
                    title: title,
                    desc: desc,
                    categories: categories,
                    price: price
                });
            });
        } else {

            var price2 = parseFloat(price).toFixed(2);

            var product = new Product({
                title: title,
                slug: slug,
                desc: desc,
                price: price2,
                category: category,
                image: imageFile
            });

            product.save(function (err) {
                if (err)
                    return console.log(err);

                mkdirp('public/product_images/' + product._id, function (err) {
                    return console.log(err);
                });

                mkdirp('public/product_images/' + product._id + '/gallery', function (err) {
                   return console.log(err);
                });

                mkdirp('public/product_images/' + product._id + '/gallery/thumbs', function (err) {
                    return console.log(err);
                });

                if (imageFile != "") {
                    var productImage = req.files.image;
                    var path = 'public/product_images/' + product._id + '/' + imageFile;

                    productImage.mv(path, function (err) {
                       return console.log(err);
                    });
                }
                console.log(req.files.image);
               // res.json(product);
                req.flash('success', 'Product added!');
              //  res.redirect('/admin/products');
            });
        }
    });
});


module.exports = router;