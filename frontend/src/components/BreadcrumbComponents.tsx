import { Breadcrumb } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbComponents() {
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((item) => item != "");
  return (
    <Breadcrumb
      aria-label={location.pathname.toString()}
      aria-description="breadcrumb"
      className="p-4"
    >
      <Link to="/">
        <Breadcrumb.Item className="">
          <i className="fa fa-home px-2 text-primary dark:text-white"></i>
          <p className="font-robo text-[6px] md:text-xs font-semibold text-primary">
            Home
          </p>
        </Breadcrumb.Item>
      </Link>
      {pathArray.map((path, i) => (
        <Breadcrumb.Item key={i}>
          <Link
            to={`${i == pathArray.length - 1 ? "#" : "/" + path}`}
            className={
              "font-robo first-letter:capitalize text-[6px] md:text-xs font-semibold shadow-lg dark:bg-slate-700 bg-white py-1 px-4 rounded-full " +
              `${i == pathArray.length - 1 ? "text--600" : "text-primary"}`
            }
          >
            {path}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
