import { IAssignment, IInstructor } from "../../api/@types";

import { AxiosResponse } from "axios";
import { Helmet } from "react-helmet";
import { ListGroup } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { assignmentColumns } from "../../api/resource/columns";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

// const defaultStyle: { [key: string]: string | number } = {
//   maxWidth: "960px",
// };

function InstructorDashboard() {
  const http = useAxiosPrivate();

  const { data: assignment, isLoading } = useQuery(
    "assignments",
    async (): Promise<{
      count: number;
      assignments: IAssignment[];
    }> => {
      const response = await http.get(`/assignments`);
      return response.data;
    },
    {
      cacheTime: 3600000,
      refetchInterval: 3600000,
    }
  );
  console.log(
    "🚀 ~ file: Dashboard.tsx:20 ~ InstructorDashboard ~ data:",
    assignment
  );
  const { data: userInfo } = useQuery<AxiosResponse<IInstructor>>(
    "instructor",
    async () => await http.get("/instructors/my-profile")
  );

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard | {userInfo?.data.lastName || "instructor"}</title>
      </Helmet>

      <hr />
      <div className="h1 my-4">
        <h1 className="tablet:text-xl text-lg font-semibold leading-normal cursor-pointer border-l-2 border-red-700 pl-4">
          Welcome to your Portal Dashboard
        </h1>
        <h1 className="font-robo text-4xl border-l-2 font-thin logo-clipped border-indigo-300 pl-4">
          {userInfo?.data.lastName || "Enoch"}
        </h1>
      </div>
      <hr />
      <ListGroup>
        <Section title="Assignments">
          <div className="overflow-auto w-full">
            <ReactDataGrid
              emptyText="No assignment for now 🚀"
              style={{
                minWidth: "100%",
              }}
              loading={isLoading}
              columns={assignmentColumns}
              dataSource={assignment?.assignments || []}
            />
          </div>
        </Section>
        <Section title="Notification">
          <center>No notification</center>
        </Section>
      </ListGroup>
    </div>
  );
}

export default InstructorDashboard;
