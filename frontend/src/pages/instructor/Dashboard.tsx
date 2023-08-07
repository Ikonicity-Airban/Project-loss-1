import { AppContext } from "../../api/context";
import { AxiosError } from "axios";
import { IUser } from "../../api/@types";
import { ListGroup } from "flowbite-react";
import Section from "../../components/Section";
import { Types } from "../../api/reducer";
import { baseGet } from "../../api/base";
import { useContext } from "react";
import { useQuery } from "react-query";

// const defaultStyle: { [key: string]: string | number } = {
//   maxWidth: "960px",
// };

function InstructorDashboard() {
  const { dispatch } = useContext(AppContext);
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery<IUser>(
    "instructor",
    async () => await baseGet("/instructors/my-profile"),
    {
      onSuccess: (data) => {
        dispatch({
          type: Types.open,
          payload: {
            type: "Success",
            show: true,
            header: "Hello",
            content: <>Welcome {data?.email}</>,
            buttonOK: "OK",
          },
        });
      },
    }
  );
  console.log(
    "🚀 ~ file: Dashboard.tsx:22 ~ InstructorDashboard ~ data:",
    userInfo
  );
  return (
    <div className="space-y-6 mt-20 p-6 md:p-10">
      <hr />
      <div className="h1 my-4">
        <h1 className="tablet:text-xl text-lg font-semibold leading-normal cursor-pointer border-l-2 border-red-700 pl-4">
          Welcome to your Portal Dashboard
        </h1>
        <h1 className="font-robo text-4xl border-l-2 font-thin logo-clipped border-indigo-300 pl-4">
          {"Enoch"}
        </h1>
      </div>
      <hr />
      <ListGroup>
        <ListGroup.Item>
          <Section title="Assignments">""</Section>
        </ListGroup.Item>
        <ListGroup.Item>
          <Section title="Courses">""</Section>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default InstructorDashboard;
