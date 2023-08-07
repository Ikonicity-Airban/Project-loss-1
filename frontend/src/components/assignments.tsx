import { FaDownload } from "react-icons/fa";
import { IAssignment } from "../api/@types";
import Section from "./Section";
import { Card } from "flowbite-react";

type Props = {
  assignments: IAssignment[];
};

const handleClick = (assId: string) => {
  console.log(assId);
};

const assignmentsList = ({ assignments }: Props) => {
  return (
    <Section>
      <div className="grid-card">
        {assignments.map((assignment) => (
          <Card
            className="flex items-center justify-between"
            key={assignment.title}
          >
            <span>{assignment.title}</span>
            <span onClick={() => handleClick(assignment._id)}>
              <FaDownload />
            </span>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default assignmentsList;
