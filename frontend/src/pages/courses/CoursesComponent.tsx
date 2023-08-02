import { Button, Card, Label, TextInput } from "flowbite-react";
import { ICourse } from "../../api/@types";
import { useContext } from "react";
import { AppContext } from "../../api/context";
import { Types } from "../../api/reducer";
import { useMutation } from "react-query";
import { Form } from "react-hook-form";
interface ICoursesProps {
  course: ICourse;
}

export const RegisterCourseForm = ({ courses }: { courses: ICourse }) => {
  return (
    <Form>
      {Object.entries(courses).map((course) => (
        <>
          <Label title={course[0]} />
          <TextInput value={course[1]} />
        </>
      ))}
    </Form>
  );
};

export default function CoursesComponent({ course }: ICoursesProps) {
  const { dispatch } = useContext(AppContext);

  const { mutate } = useMutation("course", {});
  const handleRegister = () => {
    console.log("hello");
  };
  const handleClick = () => {
    dispatch({
      type: Types.open,
      payload: {
        show: true,
        header: "Register course",
        type: "Success",
        content: "",
        buttonOK: "Register",
        onOk: handleRegister,
      },
    });
  };

  return (
    <>
      <Card className="max-h-54 justify-between flex flex-col">
        <div className="text-center font-thin">
          <h4 className="font-medium">{course.title}</h4>
        </div>
        <hr />
        <div className="justify-center space-y-4">
          <span className="text-center text-xs font-robo">Course CODE:</span>
          <h3>{course.code}</h3>
        </div>
        <hr />
        <div className="flex justify-between items-center space-y-3 flex-wrap">
          <Button
            outline
            gradientDuoTone="greenToBlue"
            className="w-full"
            onClick={handleClick}
          >
            View More
          </Button>
        </div>
      </Card>
    </>
  );
}
