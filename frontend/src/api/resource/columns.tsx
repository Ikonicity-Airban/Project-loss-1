import { Button } from "flowbite-react";
import { FaDownload } from "react-icons/fa";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";

export const courseColumns: TypeColumns = [
  { name: "title", defaultFlex: 1.5, header: "Title" },
  {
    name: "code",
    defaultFlex: 0.5,
    header: "Code",
    editable: true,
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
  {
    name: "action",
    header: "",
    draggable: false,
    editable: true,
    // defaultLocked: true,
    render: () => (
      <Button size="xs" className="mx-auto">
        Unregister
      </Button>
    ),
  },
];

export const assignmentColumns: TypeColumns = [
  {
    name: "_id",
    header: "Id",
    defaultFlex: 1,
  },
  { name: "title", defaultFlex: 1, header: "Title" },
  {
    defaultFlex: 1,
    name: "description",
    header: "Description",
    // render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: "course", defaultFlex: 1, header: "Course" },
  {
    name: "file",
    header: "File",
    render: ({ value }) => {
      const [fullMatch, mimeType, base64Data] = value.match(
        /^data:(.+);base64,(.+)$/
      );
      let fileName = "assignment.pdf";

      const nameRegex = /filename=([^;]*)/;
      const nameMatch = mimeType.match(nameRegex);
      if (nameMatch && nameMatch.length > 1) {
        fileName = nameMatch[1];
      }

      return (
        <center>
          <a href={value} download={fileName}>
            <FaDownload />
          </a>
        </center>
      );
    },
  },
];

export const resultColumns: TypeColumns = [
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
