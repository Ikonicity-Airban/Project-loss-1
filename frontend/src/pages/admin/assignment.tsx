import { Button, Card, Label, ListGroup, TextInput } from "flowbite-react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import { IAssignment } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { TypeEditInfo } from "@inovua/reactdatagrid-community/types";
import { Types } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const AssignmentPage = () => {
  const { register, handleSubmit, reset } = useForm<IAssignment>();

  const { dispatch } = useContext(AppContext);
  const http = useAxiosPrivate();

  const fetchAssignment = async (): Promise<{
    count: number;
    assignment: IAssignment[];
  }> => {
    const response = await http.get(`/assignment`);
    return response.data;
  };

  const createCourse = async (data: IAssignment): Promise<IAssignment> => {
    const response = await http.post<IAssignment>(`/assignment`, data);
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
    await http.delete(`/Assignment/${id}`);
  };

  const { data, isLoading } = useQuery<{
    count: number;
    assignment: IAssignment[];
  }>("assignment", fetchAssignment);

  const createMutation = useMutation("assignment", createCourse, {
    onSuccess: () => {
      toast.success("Created successfully");
      reset();
    },
  });

  const updateMutation = useMutation("assignment", updateCourse, {
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

  const handleEdit = (assignment) => {
    dispatch({
      type: Types.open,
      payload: {
        header: "Register assignment",
        buttonOK: "Submit",
        content: <RegisterForm />,
      },
    });
    reset(assignment);
  };

  function handleTableEdit(editInfo: TypeEditInfo) {
    console.log(
      "🚀 ~ file: assignment.tsx:81 ~ handleTableEdit ~ editInfo:",
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-tablet w-full mx-auto"
    >
      <Card>
        <input type="hidden" {...register("_id")} />

        <div>
          <Label>Title</Label>
          <TextInput type="text" {...register("title", { required: true })} />
        </div>

        <div>
          <Label>Description</Label>
          <TextInput
            type="text"
            {...register("description", { required: true })}
          />
        </div>

        <div>
          <Label> Course Code</Label>
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
    <Section title="Assignment">
      <Button onClick={() => handleEdit({})}>
        <FaPlus />
      </Button>

      <ListGroup>
        <ReactDataGrid
          idProperty="id"
          dataSource={data?.assignment || []}
          columns={columns}
          loading={isLoading}
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

export default AssignmentPage;
