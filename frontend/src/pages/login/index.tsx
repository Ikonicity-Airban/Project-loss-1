import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { CustomError, ILoginResponse } from "../../api/@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../../api/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoComponent from "../../components/LogoComponent";
import { Types } from "../../api/reducer";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { httpPrivate } from "../../api/https";
import { useContext } from "react";
import { useMutation } from "react-query";

interface IFormInput {
  email: string;
  password: string;
}

type field = "email" | "password";

const formFields = [
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
];
function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const { state } = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useContext(AppContext);

  const { mutate, isLoading } = useMutation(
    "login",
    async (formData: IFormInput) => {
      const response = await httpPrivate.post<ILoginResponse>(
        "/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch({
          type: Types.login,
          payload: data,
        });
        const role = data.tokenUser.role;
        return navigate(`/${role}`, {
          replace: true,
        });
      },
      onError: (error: CustomError) => {
        dispatch({
          type: Types.open,
          payload: {
            show: true,
            buttonOK: "OK",
            header: "Error",
            content: (
              <div className="text-red-700 dark:text-yellow-600">
                <FontAwesomeIcon
                  // color="#651"
                  icon={faCircleExclamation}
                  size="4x"
                />
                <p className="text-xs my-3">{error.response.data.msg}</p>
              </div>
            ),
            type: "Error",
          },
        });
      },
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    mutate(data);
  };

  //return
  return (
    <Card className="min-w-[260px] my-10 max-w-sm w-full">
      <div className="mx-auto">
        <LogoComponent />
      </div>
      <span className="flex place-content-center my-6">
        <h3 className="logo-clipped max-w-md font-semibold">Login Form</h3>
      </span>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(({ name, label }) => (
          <div key={name}>
            <div className="mb-2 block ">
              <Label htmlFor={name}>{label}</Label>
            </div>
            <TextInput
              disabled={isLoading}
              className="placeholder:capitalize"
              type={name}
              value={state?.email}
              id={name}
              placeholder={label}
              {...register(name as field)}
            />
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Checkbox id="showPass" />
          <Label
            htmlFor="showPass"
            className="cursor-pointer text-xs my-3 pl-2"
          >
            Show password
          </Label>
        </div>
        <Button
          gradientDuoTone={"greenToBlue"}
          className="w-full"
          type="submit"
          disabled={isLoading}
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

export default LoginPage;