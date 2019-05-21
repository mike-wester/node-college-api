'use strict';

var mongoose = require('mongoose'),
  College = mongoose.model('College'),
  Colleges = mongoose.model('Colleges');

// Colleges
exports.list_all_colleges = function(req, res) {
  Colleges.find({}, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.create_colleges = function(req, res) {
  var new_colleges = req.body,
      response = [];
  new_colleges.map((x) => {
    var temp = new College(x);
    temp.save(function(err, college) {
      if (err) {
        response.push(err);
      }
      response.push(college);
    });
  });
  res.json(response);
};

// Single College by ID
exports.create_a_college = function(req, res) {
  var new_college = new College(req.body);
  new_college.save(function(err, college) {
    if (err) {
      res.send(err);
    }
    res.json(college);
  });
};

exports.read_a_college = function(req, res) {
  if(req.params.collegeId === null || req.params.collegeId === '') {
    res.status(400);
    res.send('ERROR: College ID is Required');
  }

  College.findById(req.params.collegeId, function(err, college) {
    if (err) {
      res.send(err);
    } else if (college.length <= 0) {
      res.status(404);
      res.send('ERROR: College Not Found');
    }
    res.json(college);
  });
};

exports.update_a_college = function(req, res) {
  if(req.params.collegeId === null || req.params.collegeId === '') {
    res.status(400);
    res.send('ERROR: College ID is Required');
  }

  College.findOneAndUpdate({_id: req.params.collegeId}, req.body, {new: true}, function(err, college) {
    if (err) {
      res.send(err);
    }
    res.json(college);
  });
};

exports.delete_a_college = function(req, res) {
  if(req.params.collegeId === null || req.params.collegeId === '') {
    res.status(400);
    res.send('ERROR: College ID is Required');
  }

  College.remove({_id: req.params.collegeId}, function(err, college) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'College successfully deleted' });
  });
};

// Single College by Name
exports.read_a_college_by_name = function(req, res) {
  if(req.params.collegeName === null || req.params.collegeName === '') {
    res.status(400);
    res.send('ERROR: College Name is Required');
  }

  College.find().byName(req.params.collegeName).exec(function(err, college) {
    if (err) {
      res.send(err);
    } else if (college.length <= 0) {
      res.status(404);
      res.send('ERROR: College Not Found');
    }

    res.json(college);
  });
};

exports.update_a_college_by_name = function(req, res) {
  if(req.params.collegeName === null || req.params.collegeName === '') {
    res.status(400);
    res.send('ERROR: College Name is Required');
  }

  College.findOneAndUpdate({college: req.params.collegeName}, req.body, {new: true}, function(err, college) {
    if (err) {
      res.send(err);
    }
    res.json(college);
  });
};

exports.delete_a_college_by_name = function(req, res) {
  if(req.params.collegeName === null || req.params.collegeName === '') {
    res.status(400);
    res.send('ERROR: College Name is Required');
  }

  College.remove({college: req.params.collegeName}, function(err, college) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'College successfully deleted' });
  });
};