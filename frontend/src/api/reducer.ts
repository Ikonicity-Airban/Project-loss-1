import { IInstructor, ILoginResponse, IModal } from "./@types";

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  login = "LOGIN",
  logout = "LOGOUT",
  open = "OPEN",
  close = "CLOSE",
  toggle = "TOGGLE",
}

type AuthPayload = {
  [Types.login]: {
    [key in keyof ILoginResponse]: ILoginResponse[key];
  };
  [Types.logout]: unknown;
};

type ModalPayload = {
  [Types.open]: IModal;
  [Types.close]: IModal;
};

export type ModalActions =
  ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];

export type authActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const defaultStudent = {
  _id: "",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  role: "student",
};
export const defaultInstructor: IInstructor = {
  _id: "",
  firstName: "John",
  lastName: "Doe",
  assignment: [],
  department: "Computer Science",
};

export const authReducer = <S>(
  state: S,
  action: ModalActions | authActions
) => {
  switch (action.type) {
    case Types.login:
      localStorage.setItem("user", JSON.stringify(action.payload.tokenUser));
      localStorage.setItem(
        "access_token",
        JSON.stringify(action.payload.accessToken)
      );
      return {
        ...state,
        ...action.payload,
      };

    case Types.logout:
      localStorage.clear();
      return {
        ...state,
        user: null,
      };
    case Types.open:
      return {
        ...state,
        modal: { ...action.payload, show: true },
      };
    case Types.close:
      return {
        ...state,

        modal: { ...action.payload, show: false },
      };

    default:
      return state;
  }
};
