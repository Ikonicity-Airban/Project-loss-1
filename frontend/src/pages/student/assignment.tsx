import { useQuery } from "react-query";
import { getAssignment } from "../../api/resource/assignment";

function AssignmentPage() {
  const { data } = useQuery("assignment", getAssignment);
  return <div>{JSON.stringify(data)}</div>;
}

export default AssignmentPage;
