
var aws = require('aws-sdk');
var path = require('path');

// Exporting Routes 
module.exports = function(app) {


// Home Page
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname+'/index.html'));
});



// S3 List
var s3 = new aws.S3;
app.get('/s3', function (req, res) {
  s3.listBuckets(function (err, data) {
  	var setArray = [];

  for (var i = 0; i < data.Buckets.length; ++i) { 
  	// setArray.push(data.Buckets[i].Name + " ==================== " + data.Buckets[i].CreationDate); 
   //  res.write(setArray.toString());
    res.write(data.Buckets[i].Name + " ==================== " + data.Buckets[i].CreationDate + "\n");
  }
    res.end();
   });

 });

};
