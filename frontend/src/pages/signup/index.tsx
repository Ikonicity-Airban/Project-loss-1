import { useContext } from "react";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import LogoComponent from "../../components/LogoComponent";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { httpPrivate } from "../../api/https";
import { CustomError, ILoginResponse } from "../../api/@types";
import { AppContext } from "../../api/context";
import { Types } from "../../api/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type field =
  | "firstName"
  | "lastName"
  | "password"
  | "confirmPassword"
  | "email";

const formFields = [
  {
    name: "firstName",
    label: "First Name",
    icon: "",
  },
  {
    name: "lastName",
    label: "Last Name",
    icon: "",
  },
  {
    name: "email",
    label: "Email",
    icon: "",
  },
  {
    name: "password",
    label: "Password",
    icon: "",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    icon: "",
    type: "password",
  },
];

function SignUpPage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const { mutate, isLoading } = useMutation(
    "login",
    async (formData: IFormInput) => {
      const response = await httpPrivate.post<ILoginResponse>(
        `http://localhost:6986/api/v1/create-account/${currentUser}`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        navigate("/login", {
          replace: true,
          state: {
            email: data.tokenUser?.email,
          },
        });
        dispatch({
          type: Types.open,
          payload: {
            show: true,
            header: "Success",
            content: (
              <div>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="5x"
                ></FontAwesomeIcon>
              </div>
            ),
            buttonOK: "OK",
            type: "Success",
          },
        });
      },

      onError: (error: CustomError) => {
        dispatch({
          type: Types.open,
          payload: {
            show: true,
            header: "Success",
            content: (
              <div>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  size="5x"
                ></FontAwesomeIcon>
                <p>{error.response.data.msg}</p>
              </div>
            ),
            type: "Error",
            buttonOK: "OK",
          },
        });
      },
    }
  );

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate(data);
  };

  const { pathname } = useLocation();
  const currentUser = pathname.split("/")[2];
  //return
  return (
    <Card className="min-w-[315px] w-full md:max-w-md">
      <div className="mx-auto">
        <LogoComponent />
      </div>
      <span className="flex place-content-center">
        <h3 className="logo-clipped max-w-md my-6 font-semibold">
          Create an Account
        </h3>
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 capitalize">
        {formFields.map(({ name, label, type }) => (
          <div key={name}>
            <div className="mb-2 block ">
              <Label htmlFor={name}>{label}</Label>
            </div>
            <TextInput
              className="placeholder-shown:capitalize"
              type={type || name || "text"}
              id={"firstName"}
              placeholder={`${currentUser} ${label}`}
              {...register(name as field)}
            />
          </div>
        ))}

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="cursor-pointer">
            Remember me
          </Label>
        </div>
        <Button
          disabled={isLoading}
          gradientDuoTone={"greenToBlue"}
          className="w-full"
          type="submit"
        >
          {isLoading ? (
            <center>
              <Spinner />
            </center>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Card>
  );
}

export default SignUpPage;
