import { ReactNode } from "react";

type dataResponse = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type IUser = {
  email: string;
  role: string;
  id?: string;
} & dataResponse;

export type IStudent = {
  firstName?: string;
  lastName?: string;
} & dataResponse &
  IUser;

export type GenericResponse = {
  status: string;
  message: string;
};

export type ILoginResponse = {
  accessToken: string;
  tokenUser: IUser;
};

export type ICourse = {
  title: string;
  code: string;
  description?: string;
  department?: IDepartment;
} & dataResponse;

export type IDepartment = {
  name: string;
  description?: string;
  headOfDepartment?: string;
  coursesOffered?: ICourse[];
  students?: string[];
  instructors?: string[];
} & dataResponse;

export type IAssignment = {
  title?: string;
  description?: string;
  course: ICourse;
} & dataResponse;

export type IInstructor = {
  user: IUser;
  name?: string;
  coursesTeaching?: ICourse[];
  assignment: IAssignment[];
  department?: IDepartment;
} & dataResponse;

export type ISubmission = {
  student: string;
  assignment: string;
  linkOrFile?:
    | {
        data: Buffer;
        contentType: string;
      }
    | string;
} & dataResponse;

export type CustomError = {
  message: string;
  response: { data: { msg: string } };
};

export type IModal = {
  type: "Success" | "Error";
  show: boolean;
  header?: string;
  content?: ReactNode;
  buttonOK: "OK" | "Submit" | "Register";
  onOk?: () => undefined | void;
};
