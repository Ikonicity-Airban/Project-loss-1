import { Button, Card, Label, TextInput } from "flowbite-react";
import { CustomError, IInstructor } from "../../api/@types";
import { SubmitHandler, useForm } from "react-hook-form";

import LogoComponent from "../../components/LogoComponent";
import Section from "../../components/Section";
import { defaultInstructor } from "../../api/reducer";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import useLocalStorage from "../../api/hooks/useLocalStorage";
import { useMutation } from "react-query";

function InstructorProfilePage() {
  const { handleSubmit, register } = useForm<IInstructor>();
  const [instructor, setinstructor] = useLocalStorage<IInstructor>(
    "instructor",
    defaultInstructor
  );
  const http = useAxiosPrivate();
  const { mutate, isLoading } = useMutation(
    "instructor",
    async (data: IInstructor) =>
      await http.patch(`/instructors/${instructor._id}`, data),
    {
      onError: (error: CustomError) => {
        console.error(error.response.data.msg);
      },
      onSuccess: ({ data }) => {
        setinstructor(data);
      },
    }
  );

  const onSubmit: SubmitHandler<IInstructor> = async (data) => {
    mutate(data);
  };
  return (
    <main>
      <Section subtitle="My profile">
        <Card className="max-w-screen-tablet  mx-auto w-full">
          <div className="my-6 mx-auto">
            <LogoComponent />
          </div>
          <form
            action=""
            className="space-y-6 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <Label value="First Name" htmlFor="firstName" />
              <TextInput
                required
                defaultValue={instructor.firstName}
                {...register("firstName")}
              />
            </div>
            <div className="space-y-3">
              <Label value="Last Name" htmlFor="lastName" />
              <TextInput
                required
                defaultValue={instructor.lastName}
                {...register("firstName")}
              />
            </div>

            <div className="space-y-3">
              <Label value="Email" htmlFor="email" />
              <TextInput
                required
                disabled
                defaultValue={instructor.userId?.email}
                id="email"
              />
            </div>
            <div className="space-y-3">
              <Label value="Registration Number" htmlFor="reg_no" />
              <TextInput
                required
                disabled
                defaultValue={instructor.department}
                id="reg_no"
              />
            </div>

            <div className="md:col-span-2 py-6 w-full">
              <Button
                isProcessing={isLoading}
                className="w-full"
                type="submit"
                gradientDuoTone="greenToBlue"
              >
                Update
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </main>
  );
}

export default InstructorProfilePage;
