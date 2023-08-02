import { ReactNode } from "react";

export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  refreshToken: string;
  access_token: string;
  tokenUser: IUser;
}

export interface IUserResponse {
  data: {
    user: IUser;
  };
}

export interface ICourse {
  title: string;
  code: string;
  description?: string;
  department?: IDepartment;
}

export interface IDepartment {
  name: string;
  description?: string;
  headOfDepartment?: string;
  coursesOffered?: ICourse[];
  students?: string[];
  instructors?: string[];
}

export interface IAssignment {
  title?: string;
  description?: string;
  course?: ICourse;
}

export interface IInstructor {
  user: IUser;
  name?: string;
  coursesTeaching?: ICourse[];
  department?: IDepartment;
}

export interface ISubmission {
  student: string;
  assignment: string;
  linkOrFile?: {
    data: Buffer;
    contentType: string;
  };
}

export interface CustomError {
  message: string;
  response: { data: { msg: string } };
}

export type IModal = {
  type: "Success" | "Error";
  show: boolean;
  header?: string;
  content?: ReactNode;
  buttonOK: "OK" | "Submit" | "Register";
  onOk?: () => undefined | void;
};
