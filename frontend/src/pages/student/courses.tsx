import { Button, ListGroup } from "flowbite-react";

import { AppContext } from "../../api/context";
import CoursesList from "../courses/CoursesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { baseGet } from "../../api/base";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useState } from "react";

const gridStyle = { minHeight: 550, minWidth: 860 };

const columns = [
  {
    name: "id",
    header: "Id",
    type: "number",
    defaultWidth: 80,
  },
  { name: "title", defaultFlex: 1.5, header: "Title" },
  {
    name: "Code",
    defaultFlex: 1,
    header: "code",
    // render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: "description", defaultFlex: 1, header: "Description" },
  { name: "department", defaultFlex: 1, header: "Department" },
  { name: "instructor", defaultFlex: 1, header: "Instructor" },
];

function StudentCoursesPage() {
  const [activateRowOnFocus] = useState(true);

  const {
    state: { tokenUser },
  } = useContext(AppContext);

  const { data } = useQuery(
    "user",
    async () => baseGet(`/${tokenUser.role}/${tokenUser._id}`),
    {
      cacheTime: 78600,
    }
  );
  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <div className="w-full p-2 ">
            <Button>
              <FontAwesomeIcon icon={faPlus} className="mr-4" />
              register
            </Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <Section title="Registered Courses">
            <div className="overflow-auto z-10">
              {/* add new course */}
              <ReactDataGrid
                idProperty="id"
                style={gridStyle}
                activateRowOnFocus={activateRowOnFocus}
                columns={columns}
                dataSource={data?.coursesOffered || []}
              />
            </div>
            {/* all courses semester by semester list add and delete */}
          </Section>
        </ListGroup.Item>
        <ListGroup.Item>
          <Section title="Available courses">
            <CoursesList />
          </Section>
        </ListGroup.Item>
      </ListGroup>
    </main>
  );
}

export default StudentCoursesPage;
