var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  models = require('./api/models/myModel'),
  College = mongoose.model('College'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/collegeDB', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/myRoutes');
routes(app);

const fs = require('fs'); 
const csv = require('fast-csv');

fs.createReadStream('./college_costs.csv')
.pipe(csv())
.on('data', function(data){
    try{

    	College.find().byName(data[0]).exec(function(err, college) {
    		if(college.length <= 0) {
				var new_college = new College({college: data[0], tuitionInState: data[1], tuitionOutState: data[2], roomAndBoard: data[3]});
				new_college.save();
    		}

		})
    }
    catch(err) {
        console.log('RAGE!: ', err);
    }
})
.on('end',function(){
    console.log('CSV entries Loaded');
});

app.listen(port);

console.log('College RESTful API server started on: ' + port);
