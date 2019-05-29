# College nodejs API

How to get started:

	* Git the current repo - git clone https://github.com/benderCO/advincent.git
	* Install the associated packages - npm install
	* Start up the server - npm start

Currently Implmented API endpoints:
	
	* GET - http://localhost:3000/colleges
	* POST - http://localhost:3000/colleges - Requires an array of college objects

	* GET - http://localhost:3000/college - Requires a object with college and associated name for lookup
	* POST - http://localhost:3000/colleges - Requires a college object

	* DELETE - http://localhost:3000/college/:collegeId - College ID is a unique identifier PK of the database record
	* GET - http://localhost:3000/college/:collegeId - College ID is a unique identifier PK of the database record
	* PUT - http://localhost:3000/college/:collegeId - College ID is a unique identifier PK of the database record

	* DELETE - http://localhost:3000/collegeByName/:collegeName - College Name is the associated database college column
	* GET - http://localhost:3000/collegeByName/:collegeName - College Name is the associated database college column
	* PUT - http://localhost:3000/collegeByName/:collegeName - College Name is the associated database college column
