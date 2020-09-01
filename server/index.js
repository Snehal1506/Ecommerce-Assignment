var express = require('express');
var path = require('path');

var app = express();

var fileupload = require('express-fileupload');
app.use(fileupload());

app.post("/upload",function(req,res,next){
    // console.log(req.files)
    const file = req.files.photo;
    file.mv("./uploads/" + file.name, function(err, result){
        if(err)
            throw err;
    
        res.send({
             success: true,
             message: "image uploaded!"
    });
 });

})





var port = 3000;
app.listen(port, function() {
    console.log('Server started on port '+ port)
});