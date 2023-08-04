import { getAssignment } from "../../api/resource/assignment";
import { useQuery } from "react-query";

function InstructorAssignmentPage() {
  const { data } = useQuery("assignment", getAssignment);
  return <div>{JSON.stringify(data)}</div>;
}

export default InstructorAssignmentPage;
