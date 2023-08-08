import "../App.css";

import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import { Link, NavLink, Outlet, redirect } from "react-router-dom";

import { useEffect, useState } from "react";

import { BreadcrumbComponents } from "../components";
import LogoComponent from "../components/LogoComponent";
import { FaBookOpen, FaBoxOpen, FaDiceFour, FaReceipt } from "react-icons/fa";
import useAxiosPrivate from "../api/hooks/useAxiosPrivate";
import { IStudent } from "../api/@types";
import useLocalStorage from "../api/hooks/useLocalStorage";
import { defaultStudent } from "../api/reducer";

const studentSideLinks = [
  { name: "Dashboard", link: "", icon: <FaDiceFour /> },
  { name: "Courses", link: "my-courses", icon: <FaBookOpen /> },
  { name: "Assignment", link: "assignment", icon: <FaBoxOpen /> },
  { name: "Result", link: "result", icon: <FaReceipt /> },
];
export const StudentLayout = () => {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const http = useAxiosPrivate();
  const [student, setStudent] = useLocalStorage<IStudent>(
    "student",
    defaultStudent
  );

  useEffect(() => {
    let fetched = false;
    const fetchUser = async () => {
      const res = await http.get<IStudent>("students/my-profile");
      const user = res.data;
      setStudent(user);
    };

    !fetched && fetchUser();
    return () => {
      fetched = true;
    };
  }, [http]);

  useEffect(() => {
    function resize(e: UIEvent) {
      setWidth(e.view?.innerWidth || window.innerWidth);
      window.innerWidth > 640 && setToggle(false);
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!student.userId) {
    redirect("/login");
  }

  return (
    <section
      className="h-screen mx-auto w-full relative"
      // onClick={() => setToggle(false)}
    >
      {/* header */}

      <Navbar
        fluid
        rounded
        className="fixed -ml-1 top-0 w-full z-50 bg-[#ffffffaa] backdrop-blur-lg"
      >
        <div className="flex-[1.9]">
          <div className="tablet:hidden px-2">
            <Navbar.Toggle onClick={() => setToggle(!toggle)} />
          </div>
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <div className="p-2 md:pr-4">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                bordered
                placeholderInitials={
                  student.userId
                    ? student.userId?.email.slice(0, 2).toUpperCase()
                    : ""
                }
                status="online"
              />
            }
          >
            <Link to="my-profile">
              <Dropdown.Item>
                <div className="px-4">Profile</div>
              </Dropdown.Item>
            </Link>
            <Dropdown.Item href="/login">
              <div className="px-4">Logout</div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      {/* main section */}
      <Sidebar
        id="logo-sidebar"
        aria-label="Sidebar" /* className="h-screen fixed shadow-lg" */
        className="float-left fixed -mt-1 left-0 z-40 mobile:w-3/5 sm:w-64  transition-transform h-screen border-r border-gray-100 dark:border-gray-800"
        style={{
          transform:
            toggle || width > 639 ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        <Sidebar.ItemGroup>
          {studentSideLinks.map(({ name, icon, link }) => (
            <div className="p-4 mt-10" key={name}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "text-gray-500"}`
                }
                onClick={() => setToggle(false)}
              >
                <div className="text-xs sm:text-sm flex items-center gap-6 ">
                  <span>{icon}</span>
                  <span>{name}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar>
      <main className="min-h-screen tablet:ml-64 p-4 relative mt-16 dark:bg-gray-900">
        {toggle && (
          <div
            className="inset-0 absolute bg-[#1129] select-none"
            onClick={() => setToggle(!toggle)}
            onFocus={() => setToggle(!toggle)}
          ></div>
        )}
        <BreadcrumbComponents />
        <Outlet />
      </main>
      {/* </div> */}
    </section>
  );
};

export const InstructorLayout = () => {
  return (
    <>
      <Navbar
        fluid
        rounded
        className="fixed -ml-1 top-0 w-full z-50 bg-[#ffffffaa] backdrop-blur-lg"
      >
        <div className="flex-[1.9]">
          <div className="tablet:hidden px-2">
            <Navbar.Toggle />
          </div>
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <div className="p-2 md:pr-4">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                bordered
                // placeholderInitials={user.email.slice(0, 2).toUpperCase()}
                status="online"
              />
            }
          >
            <Link to="my-profile">
              <Dropdown.Item>
                <div className="px-4">Profile</div>
              </Dropdown.Item>
            </Link>
            <Dropdown.Item href="/login">
              <div className="px-4">Logout</div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export const AdminLayout = () => {
  return (
    <>
      <Navbar
        fluid
        rounded
        className="fixed -ml-1 top-0 w-full z-50 bg-[#ffffffaa] backdrop-blur-lg"
      >
        <div className="flex-[1.9]">
          <div className="tablet:hidden px-2">
            <Navbar.Toggle />
          </div>
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <div className="p-2 md:pr-4">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                bordered
                // placeholderInitials={user.email.slice(0, 2).toUpperCase()}
                status="online"
              />
            }
          >
            <Link to="my-profile">
              <Dropdown.Item>
                <div className="px-4">Profile</div>
              </Dropdown.Item>
            </Link>
            <Dropdown.Item href="/login">
              <div className="px-4">Logout</div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <main className="min-h-screen p-4 relative mt-16 dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};
