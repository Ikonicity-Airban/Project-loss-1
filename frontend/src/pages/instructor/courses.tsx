import { Button, ListGroup } from "flowbite-react";

import { AppContext } from "../../api/context";
import CoursesList from "../courses/CoursesList";
import { FaPlus } from "react-icons/fa";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { baseGet } from "../../api/base";
import { courseColumns } from "../../api/resource/columns";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useState } from "react";

const gridStyle = { minHeight: 550, minWidth: 860 };

function InstructorCoursesPage() {
  const [activateRowOnFocus] = useState(true);

  const {
    state: { user },
  } = useContext(AppContext);

  const { data } = useQuery(
    "user",
    async () => baseGet(`/${user.role}/${user._id}`),
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
              <FaPlus className="mr-4" />
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
                columns={courseColumns}
                shareSpaceOnResize
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

export default InstructorCoursesPage;
