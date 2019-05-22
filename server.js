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
				var new_college = new College({
					college: data[0], 
					tuitionInState: isNaN(data[1]) ? 0 : parseFloat(data[1]), 
					tuitionOutState: isNaN(data[2]) ? 0 : parseFloat(data[2]), 
					roomAndBoard: isNaN(data[3]) ? 0 : parseFloat(data[3])});
				new_college.save();
    		}

		})
    }
    catch(err) {
        console.log('ERR: ', err);
    }
})
.on('end',function(){
    console.log('CSV entries Processing');
});

app.listen(port);

console.log('College RESTful API server started on: ' + port);
