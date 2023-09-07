import {
  Button,
  Label,
  ListGroup,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaBook, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import FileUpload from "../../components/UploadFile";
import { IAssignment } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { TypeEditInfo } from "@inovua/reactdatagrid-community/types";
import { Types } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";

function InstructorAssignmentPage() {
  const http = useAxiosPrivate();
  const { handleSubmit, register, reset } = useForm<IAssignment>();

  const [file, setFile] = useState<string>("");

  const handleUpload = (dataURI: string) => {
    setFile(dataURI);
  };

  const { dispatch } = useContext(AppContext);

  const fetchAssignment = async (): Promise<{
    count: number;
    assignment: IAssignment[];
  }> => {
    const response = await http.get(`/assignments`);
    return response.data;
  };

  const createCourse = async (data: IAssignment): Promise<IAssignment> => {
    const response = await http.post<IAssignment>(`/assignments`, data);
    return response.data;
  };

  const updateCourse = async (data: IAssignment): Promise<IAssignment> => {
    const response = await http.patch<IAssignment>(
      `/assignment/${data._id}`,
      data
    );
    return response.data;
  };

  const deleteCourse = async (id: string): Promise<void> => {
    await http.delete(`/assignments/${id}`);
  };

  const { data, isLoading } = useQuery<{
    count: number;
    assignment: IAssignment[];
  }>("assignments", fetchAssignment);

  const createMutation = useMutation("assignments", createCourse, {
    onSuccess: (data) => {
      toast.success("Created successfully");
      reset();
    },
  });

  const updateMutation = useMutation("assignments", updateCourse, {
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

  const onSubmit = (data: IAssignment) => {
    if (data._id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (course: IAssignment) => {
    dispatch({
      type: Types.open,
      payload: {
        header: "Create and assignment",
        buttonOK: "Submit",
        content: <RegisterForm />,
        onOk: () => {
          return;
        },
      },
    });
    reset(course);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns: TypeColumns = [
    { name: "_id", header: "ID", defaultWidth: 80, defaultFlex: 1 },
    { name: "title", header: "Course Name", defaultFlex: 1 },
    { name: "code", header: "Course Code", defaultFlex: 1 },
    {
      name: "actions",
      header: "actions",
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
    <form action="" className="w-full " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 mx-auto w-full items-center">
        <div className="relative w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="">Assignment Title</Label>
          </div>
          <span className="absolute z-10 right-4 bottom-[20%] text-gray-500">
            <FaBook></FaBook>
          </span>
          <TextInput
            required
            className="placeholder:capitalize placeholder:mx-10"
            id="ass_title"
            // placeholder={label}
            {...register("title")}
          />
        </div>
        <div className="relative w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="">Assignment Description</Label>
          </div>
          <Textarea
            required
            className="placeholder:capitalize placeholder:mx-10 h-28"
            id="ass_title"
            // placeholder={label}
            {...register("description")}
          />
        </div>
        <div className="relative w-full ">
          <Select defaultValue={100} required {...register("level")}>
            {[100, 200, 300, 400].map((level) => (
              <option value={level} key={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
        <div className="relative w-full ">
          <FileUpload onFileUpload={handleUpload} />
        </div>
      </div>
      <div className="relative w-full my-6">
        <Button
          type="submit"
          className="w-full"
          disabled={!file}
          isProcessing={createMutation.isLoading}
          gradientDuoTone="greenToBlue"
        >
          Upload Assignment
        </Button>
      </div>
    </form>
  );
  return (
    <main className="my-10">
      <ListGroup>
        <Section subtitle="All assignments">
          <Button onClick={() => handleEdit({})} gradientDuoTone="greenToBlue">
            <FaPlus /> Add a new assignment
          </Button>
          <ReactDataGrid
            idProperty="id"
            dataSource={data?.assignment || []}
            columns={columns}
            loading={isLoading}
            editable={true}
            style={{
              minHeight: 500,
            }}
            pagination
            defaultLimit={10}
          />
        </Section>
      </ListGroup>
    </main>
  );
}
export default InstructorAssignmentPage;
