var express = require('express');
var router = express.Router();
var axios = require('axios');

var categories;

/*
 * GET category index
 */
axios.get('http://localhost:3000/admin/categories')
    .then(res =>{
        categories = res.data;
        console.log(categories);
    })
    .catch(err =>{
        console.log(err);
    });

router.get('/', function(req,res){
    res.render('admin/categories', {
            categories: categories
        });
});


/*
 * GET add category
 */
router.get('/add-category', function (req, res) {

    var title = "";

    res.render('admin/add_category', {
        title: title
    });

});

/*
 * POST add category
 */
router.post('/add-category', function (req, res) {
    res.redirect('/admin/categories');
});

/*
 * GET edit category
 */
router.get('/edit-category/:id', function (req, res) {
    res.render('admin/edit_category');
});

/*
 * POST edit category
 */
router.post('/edit-category/:id', function (req, res) {
    req.checkBody('title', 'Title must have a value.').notEmpty();
    res.redirect('/admin/categories/edit-category/' + id);
});  

/*
 * GET delete category
 */
router.get('/delete-category/:id', function (req, res) {
        req.flash('success', 'Category deleted!');
        res.redirect('/admin/categories/');
});



// Exports
module.exports = router;
