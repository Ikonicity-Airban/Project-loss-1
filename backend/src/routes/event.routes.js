const eventRouter = require("express").Router();

const {
  GetAllEvents,
  CreateEvent,
  GetOneEventInfo,
  UpdateEventInfo,
  DeleteEventInfo,
} = require("../controllers/events.controller");
const { authorizeRoles } = require("../middlewares/auth");

eventRouter.route("/").post(authorizeRoles("admin", "instructor"), CreateEvent);

eventRouter
  .route("/:eventId")
  .get(GetOneEventInfo)
  .patch(authorizeRoles("admin", "instructor"), UpdateEventInfo)
  .delete(authorizeRoles("admin", "instructor"), DeleteEventInfo);

//export
module.exports = eventRouter;
