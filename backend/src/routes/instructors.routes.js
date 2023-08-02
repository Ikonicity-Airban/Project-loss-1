const instructorRouter = require("express").Router();

const {
  GetAllInstructors,
  UpdateOneInstructorInfo,
  DeleteOneInstructor,
  GetOneInstructorStats,
} = require("../controllers/instructor.controller");
const { authorizeRoles } = require("../middlewares/auth");

instructorRouter
  .route("/")
  .get(authorizeRoles("admin", "instructor"), GetAllInstructors);

instructorRouter
  .route("/:instructorId")
  .get(GetOneInstructorStats)
  .patch(authorizeRoles("admin", "instructor"), UpdateOneInstructorInfo)
  .delete(authorizeRoles("admin"), DeleteOneInstructor);

//export
module.exports = instructorRouter;
