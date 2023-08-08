import { IAssignment } from "../../api/@types";
import { ListGroup } from "flowbite-react";
import Section from "../../components/Section";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

// const gridStyle = { minHeight: 550, minWidth: 860 };
function AssignmentPage() {
  const http = useAxiosPrivate();
  const { data: assignment } = useQuery(
    "assignment",
    async () => await http.get("/assignment")
  );
  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <Section title="Registered Courses">
            <div className="overflow-auto z-10">
              {/* add new course */}
              <div className="grid mobile:grid-cols-2 tablet:grid-cols-3">
                {assignment?.data.map((ass: IAssignment) => (
                  <>{ass.title}</>
                ))}
              </div>
            </div>
            {/* all courses semester by semester list add and delete */}
          </Section>
        </ListGroup.Item>
      </ListGroup>
    </main>
  );
}

export default AssignmentPage;
