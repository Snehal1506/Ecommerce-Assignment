var express = require('express');
var router = express.Router();

//GET CATEGORY MODEL

var Category = require('../models/category');

//Get Category Index
router.get('/',function(req,res){
	Category.find(function(err,categories){
		if (err) return console.log(err);
		res.send(categories);
	})
})

//Add Category
router.post('/add-category', function(req, res) {

	var title = req.body.title;
	var slug = title.replace(/\s+/g, '-').toLowerCase();

	Category.findOne({slug: slug}, function (err, category) {
		if (category) {
			req.flash('danger', 'Category title exists, choose another.');
			res.json({title: title});
		} else {
			var category = new Category({
				title: title,
				slug: slug
			});
			category.save(function (err) {
				if (err)
					return console.log(err);

				Category.find(function (err, categories) {
					if (err) {
						console.log(err);
					} else {
						req.app.locals.categories = categories;
					}
				});

				req.flash('success', 'Category added!');
				res.redirect('/admin/categories');
			});
		}
	});
});

//Edit Category
router.post('/edit-category/:id', function (req, res) {
	
	var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
	var id = req.params.id;
	
	Category.findOne({slug: slug, _id: {'$ne': id}}, function (err, category) {
		if (category) {
			req.flash('danger', 'Category title exists, choose another.');
			res.json({
				title: title,
				id: id
			});
		} else {
			Category.findById(id, function (err, category) {
				if (err)
					return console.log(err);

				category.title = title;
				category.slug = slug;

				category.save(function (err) {
					if (err)
						return console.log(err);

					Category.find(function (err, categories) {
						if (err) {
							console.log(err);
						} else {
							req.app.locals.categories = categories;
						}
					});
					res.json(category);
					req.flash('success', 'Category edited!');
				});
			});
		}
	});
});

//Delete Category
router.get('/delete-category/:id', function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return console.log(err);

        Category.find(function (err, categories) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.categories = categories;
            }
        });

        req.flash('success', 'Category deleted!');
        res.redirect('/admin/categories/');
    });
});

module.exports = router;