'use strict';
module.exports = function(app) {
  var collegeList = require('../controllers/myController');

  app.route('/colleges')
    .get(collegeList.list_all_colleges)
    .post(collegeList.create_colleges);

  app.route('/college')
    .post(collegeList.create_a_college);

  app.route('/college/:collegeId')
    .get(collegeList.read_a_college)
    .put(collegeList.update_a_college)
    .delete(collegeList.delete_a_college);

  app.route('/collegeByName/:collegeName')
    .get(collegeList.read_a_college_by_name)
    .put(collegeList.update_a_college_by_name)
    .delete(collegeList.delete_a_college_by_name);
};