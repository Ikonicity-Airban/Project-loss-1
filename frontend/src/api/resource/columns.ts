import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";

export const courseColumns: TypeColumns = [
  { name: "title", defaultFlex: 1.5, header: "Title" },
  {
    name: "code",
    defaultFlex: 0.5,
    header: "Code",
    // render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: "description", defaultFlex: 1, header: "Description" },
  {
    name: "department",
    defaultFlex: 1,
    header: "Department",
    render: ({ value }) => value?.name,
  },
  {
    name: "instructor",
    header: "Instructor",
    render: ({ value }) => value?.name,
  },
];

export const assignmentColumns: TypeColumns = [
  {
    name: "_id",
    header: "Id",
    defaultVisible: false,
    type: "number",
    defaultWidth: 40,
  },
  { name: "title", defaultFlex: 1, header: "Title" },
  {
    name: "description",
    defaultFlex: 1,
    header: "Description",
    // render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: "Course", defaultFlex: 1, header: "course" },
  { name: "Date", defaultFlex: 1, type: "date", header: "Date" },
  { name: "Action", defaultWidth: 100, header: "Action" },
];
