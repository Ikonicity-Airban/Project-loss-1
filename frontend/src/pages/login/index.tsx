import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { CustomError, ILoginResponse } from "../../api/@types";
import { FaEnvelope, FaLock } from "react-icons/fa";
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
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

const formFields = [
  {
    name: "email",
    label: "Email",
    icon: <FaEnvelope />,
  },
  {
    name: "password",
    label: "Password",
    icon: <FaLock />,
  },
];
function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [showPass, setShowPass] = useState(false);

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
      retry: 3,
      useErrorBoundary: true,
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
        {formFields.map(({ name, label, icon }) => (
          <div key={name} className="relative">
            <div className="mb-2 block ">
              <Label htmlFor={name}>{label}</Label>
            </div>
            <span className="absolute z-10 right-4 bottom-[20%] text-gray-500">
              {icon}
            </span>
            <TextInput
              required
              disabled={isLoading}
              className="placeholder:capitalize placeholder:mx-10"
              type={showPass ? "text" : name}
              value={state?.email}
              id={name}
              // placeholder={label}
              {...register(name as keyof IFormInput)}
            />
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Checkbox
            id="showPass"
            onChange={(e) => setShowPass(e.target.checked)}
          />
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
