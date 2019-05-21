'use strict';
module.exports = function(app) {
  var collegeList = require('../controllers/myController');

  app.route('/colleges')
    .get(collegeList.list_all_colleges)
    .post(collegeList.create_colleges);

  app.route('/college')
    .post(collegeList.create_a_college);

  app.route('/college/:collegeId')
    .delete(collegeList.delete_a_college)
    .get(collegeList.read_a_college)
    .put(collegeList.update_a_college);

  app.route('/collegeByName/:collegeName')
    .delete(collegeList.delete_a_college_by_name)
    .get(collegeList.read_a_college_by_name)
    .put(collegeList.update_a_college_by_name);
};