import { Card, ListGroup, Progress } from "flowbite-react";
import { useContext, useMemo } from "react";

import { AppContext } from "../../api/context";
import Heading from "../../components/Heading";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { getCourse } from "../../api/resource/course";
import { useQuery } from "react-query";

// const defaultStyle: { [key: string]: string | number } = {
//   maxWidth: "960px",
// };

const courseColumns = [
  {
    name: "_id",
    header: "Id",
    defaultVisible: true,
    type: "number",
    defaultWidth: 80,
  },
  { name: "title", header: "Title" },
  {
    name: "description",
    defaultFlex: 1,
    header: "Description",
  },
  { name: "code", defaultWidth: 120, header: "code" },
  { name: "instructor", defaultFlex: 1, header: "Instructor" },
  // { name: "department", defaultFlex: 1, header: "Department" },
];

const assignmentColumns = [
  {
    name: "_id",
    header: "Id",
    defaultVisible: false,
    type: "number",
    defaultWidth: 40,
  },
  { name: "title", defaultFlex: 1, header: "Title" },
  {
    name: "description",
    defaultFlex: 1,
    header: "Description",
    // render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: "Course", defaultFlex: 1, header: "course" },
  { name: "Date", defaultFlex: 1, type: "date", header: "Date" },
  { name: "Action", defaultWidth: 100, header: "Action" },
];

function StudentDashboard() {
  const { data, isLoading } = useQuery("course", getCourse, {
    cacheTime: 3600,
  });
  const {
    state: { tokenUser },
  } = useContext(AppContext);

  const cards = useMemo(
    () => [
      {
        id: "1",
        title: "Expert System",
        course: "com 423",
        progress: Math.floor(Math.random() * 80 + 20),
        className: "bg-gradient-to-r from-cyan-800 to-indigo-600",
      },
      {
        id: "2",
        title: "I.T Professtioal practice",
        course: "com 424",
        progress: Math.floor(Math.random() * 80 + 20),
        className: "bg-gradient-to-tr from-cyan-700 to-green-600",
      },
      {
        id: "3",
        title: "Computer graphics",
        course: "com 422",
        progress: Math.floor(Math.random() * 80 + 20),
        className: "bg-gradient-to-br from-indigo-900 to-blue-600",
      },
      {
        id: "4",
        title: "Computer security",
        course: "com 426",
        progress: Math.floor(Math.random() * 100 + 20),
        className: "bg-gradient-to-r from-red-300 to-pink-800",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <hr />
      <div className="h1 my-4">
        <h1 className="tablet:text-xl text-lg font-semibold leading-normal cursor-pointer border-l-2 border-red-700 pl-4">
          Welcome to your Portal Dashboard
        </h1>
        <h1 className="font-robo text-4xl border-l-2 font-thin logo-clipped border-indigo-300 pl-4">
          {tokenUser.role || "Enoch"}
        </h1>
      </div>
      <hr />
      <ListGroup>
        <ListGroup.Item>
          <Section title="My course progress">
            <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 w-full align-item-center text-white">
              {cards.map(({ className, title, course, id, progress }, i) => (
                <div
                  className={`block ${
                    i == 3 ? "laptop:hidden desktop:block" : ""
                  }`}
                  key={id}
                >
                  <Card className={className}>
                    <div className="flex justify-between">
                      <span className="my-1 space-y-2">
                        <h4>{title}</h4>
                        <p className="text-sm">{course}</p>
                      </span>
                    </div>
                    <Progress
                      progress={progress}
                      color={
                        progress < 40
                          ? "red"
                          : progress < 60
                          ? "yellow"
                          : "green"
                      }
                    />
                    <div className="flex justify-between">
                      <p>Progress</p>
                      <p>{progress}%</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Section>
        </ListGroup.Item>
        <Section title="Assignments">
          <div className="overflow-auto w-full">
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
        <Section>
          <div className="overflow-auto w-full p-2">
            <Heading section_title="All Courses" />
            <ReactDataGrid
              style={{
                minWidth: "960px",
              }}
              emptyText="No Courses to view"
              loading={isLoading}
              columns={courseColumns}
              dataSource={data?.courses || []}
            />
          </div>
        </Section>
      </ListGroup>
    </div>
  );
}

export default StudentDashboard;
