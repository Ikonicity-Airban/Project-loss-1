import Submission from "../models/submission.model";
import renderPage from "../utils/renderer.helper";

export async function getAllSubmittedAssignment(req, res) {
  const assignemt = Submission.find({});

  renderPage(
    res,
    "submission",
    "dashboard",
    { assignemt },
    { title: "Dashboard" }
  );
}

export async function getOneSubmittedAssignments(req, res) {
  const { submissionId } = req.params;
  res.status(200).json({ msg: submissionId });
}
