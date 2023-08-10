import { Button, Card, Label, ListGroup, TextInput } from "flowbite-react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import { ICourse } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { TypeEditInfo } from "@inovua/reactdatagrid-community/types";
import { Types } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const CoursePage = () => {
  const { register, handleSubmit, reset } = useForm<ICourse>();
  const { dispatch } = useContext(AppContext);
  const http = useAxiosPrivate();

  const fetchCourses = async (): Promise<{
    count: number;
    courses: ICourse[];
  }> => {
    const response = await http.get(`/courses`);
    return response.data;
  };

  const createCourse = async (data: ICourse): Promise<ICourse> => {
    const response = await http.post<ICourse>(`/courses`, data);
    return response.data;
  };

  const updateCourse = async (data: ICourse): Promise<ICourse> => {
    const response = await http.patch<ICourse>(`/courses/${data._id}`, data);
    return response.data;
  };

  const deleteCourse = async (id: string): Promise<void> => {
    await http.delete(`/courses/${id}`);
  };
  const { data, isLoading } = useQuery<{ count: number; courses: ICourse[] }>(
    "courses",
    fetchCourses
  );

  const createMutation = useMutation("courses", createCourse, {
    onSuccess: () => {
      toast.success("Created successfully");
      reset();
    },
  });

  const updateMutation = useMutation("courses", updateCourse, {
    onSuccess: () => {
      toast.success("Updated successfully");
      reset();
    },
  });

  const deleteMutation = useMutation(deleteCourse, {
    onSuccess: () => {
      toast.success("Deleted successfully");
    },
  });

  const onSubmit = (data: ICourse) => {
    if (data._id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
  const handleEdit = (course) => {
    dispatch({
      type: Types.open,
      payload: {
        header: "Course Registration",
        buttonOK: "Submit",
        content: <RegisterForm />,
      },
    });
    reset(course);
  };

  function handleTableEdit(editInfo: TypeEditInfo) {
    console.log(
      "🚀 ~ file: courses.tsx:78 ~ handleTableEdit ~ editInfo:",
      editInfo
    );
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns: TypeColumns = [
    { name: "_id", header: "ID", defaultWidth: 80, defaultFlex: 1 },
    { name: "title", header: "Course Name", defaultFlex: 1 },
    { name: "code", header: "Course Code", defaultFlex: 1 },
    {
      name: "actions",
      header: "Actions",
      defaultWidth: 100,
      render: ({ data }) => (
        <div className="flex items-center gap-4 justify-around p-2">
          <FaPen onClick={() => handleEdit(data)} />
          <FaTrash onClick={() => handleDelete(data.id)} />
        </div>
      ),
    },
  ];

  const RegisterForm = () => (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-tablet w-full mx-auto"
    >
      <Card>
        <input type="hidden" {...register("_id")} />

        <div>
          <Label>Course Title</Label>
          <TextInput type="text" {...register("title", { required: true })} />
        </div>

        <div>
          <Label>Course Code</Label>
          <TextInput type="text" {...register("code", { required: true })} />
        </div>

        <div>
          <Label>Course Description</Label>
          <TextInput
            type="text"
            {...register("description", { required: true })}
          />
        </div>
        <Button type="submit">Save</Button>
      </Card>
    </form>
  );

  return (
    <Section title="Courses">
      <Button gradientDuoTone="greenToBlue" onClick={() => handleEdit({})}>
        <FaPlus /> Add a new course
      </Button>
      <ListGroup>
        <ReactDataGrid
          idProperty="id"
          loading={isLoading}
          dataSource={data?.courses || []}
          columns={columns}
          editable={true}
          style={{
            minHeight: 500,
          }}
          onEditComplete={handleTableEdit}
          pagination
          defaultLimit={10}
        />
      </ListGroup>
    </Section>
  );
};

export default CoursePage;
