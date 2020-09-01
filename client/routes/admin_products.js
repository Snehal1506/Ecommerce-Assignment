var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');

/*
 * GET product index
 */
 router.get('/', function (req, res) {
    res.render('admin/products');
});

/*
 * GET add product
 */
 router.get('/add-product', function (req, res) {

    var title = "";
    var desc = "";
    var price = "";

    res.render('admin/add_product', {
        title: title,
        desc: desc,
        price: price
    });

});

/*
 * POST add product
 */
router.post('/add-product', function (req, res) {
	req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('desc', 'Description must have a value.').notEmpty();
    req.checkBody('price', 'Price must have a value.').isDecimal();
    req.checkBody('image', 'You must upload an image').isImage(imageFile);
 	res.redirect('/admin/products');
});

/*
 * GET edit product
 */
router.get('/edit-product/:id', function (req, res) {
    res.render('admin/edit_product');
});

/*
 * POST edit product
 */
router.post('/edit-product/:id', function (req, res) {
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('desc', 'Description must have a value.').notEmpty();
    req.checkBody('price', 'Price must have a value.').isDecimal();
    req.checkBody('image', 'You must upload an image').isImage(imageFile);
    res.redirect('/admin/products/edit-product/' + id);
}); 

/*
 * POST product gallery
 */
router.post('/product-gallery/:id', function (req, res) {
	res.sendStatus(200);
});

/*
 * GET delete image
 */
router.get('/delete-image/:image', function (req, res) {
	res.redirect('/admin/products/edit-product/' + req.query.id);
});

/*
 * GET delete product
 */
router.get('/delete-product/:id', isAdmin, function (req, res) {
	res.redirect('/admin/products');
});

// Exports
module.exports = router;

