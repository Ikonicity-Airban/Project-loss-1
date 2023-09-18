import AssignmentPage from "./assignment";
import CoursePage from "./courses";
import Heading from "../../components/Heading";
import { ListGroup } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { assignmentColumns } from "../../api/resource/columns";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

// const defaultStyle: { [key: string]: string | number } = {
//   maxWidth: "960px",
// };

function AdminDashboard() {
  const http = useAxiosPrivate();
  const { data } = useQuery("courses", async () => await http.get("/courses"));
  console.log("🚀 ~ file: Dashboard.tsx:18 ~ AdminDashboard ~ data:", data);

  return (
    <div className="space-y-6">
      <hr />
      <ListGroup>
        <ListGroup.Item>
          <Section title="User">
            <div className="overflow-auto w-full">
              <Heading heading="Staff" />
              <ReactDataGrid
                emptyText="No assignment for now 🚀"
                style={{
                  minWidth: "100%",
                }}
                columns={assignmentColumns}
                dataSource={[]}
              />
              <Heading heading="Student" />
              <ReactDataGrid
                emptyText="No assignment for now 🚀"
                style={{
                  minWidth: "100%",
                }}
                columns={assignmentColumns}
                dataSource={[]}
              />
            </div>
          </Section>
        </ListGroup.Item>
        <ListGroup.Item>
          <AssignmentPage />
        </ListGroup.Item>
        <ListGroup.Item>
          <CoursePage />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default AdminDashboard;
