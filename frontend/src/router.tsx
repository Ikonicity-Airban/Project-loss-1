import {
  AdminLayout,
  InstructorLayout,
  StudentLayout,
} from "./layouts/DashboardLayout";
import { LoginLayout, SignUpLayout } from "./layouts/AuthLayout";

import AboutPage from "./about";
import App from "./App";
import AssignmentPage from "./pages/student/assignment";
import ContactPage from "./contact";
import { HomePage } from "./components";
import InstructorAssignmentPage from "./pages/instructor/assignment";
import InstructorCoursesPage from "./pages/instructor/courses";
import InstructorDashboard from "./pages/instructor/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NewsPage from "./pages/news";
import ResultPage from "./pages/student/result";
import SignUpPage from "./pages/signup";
import StudentCoursesPage from "./pages/student/courses";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfilePage from "./pages/student/profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "latest-news",
            element: <NewsPage />,
          },
          {
            path: "contact-us",
            element: <ContactPage />,
          },
          {
            path: "about-us",
            element: <AboutPage />,
          },
        ],
      },
      {
        path: "",
        element: <MainLayout></MainLayout>,
        children: [
          {
            path: "login",
            element: <LoginLayout />,
          },
          {
            path: "create-account",
            element: <SignUpLayout />,
            children: [
              {
                path: "student",
                element: <SignUpPage />,
              },
              {
                path: "instructor",
                element: <SignUpPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/student",
        element: <StudentLayout />,
        children: [
          {
            path: "",
            element: <StudentDashboard />,
          },
          {
            path: "my-courses",
            element: <StudentCoursesPage />,
          },
          {
            path: "assignment",
            element: <AssignmentPage />,
          },
          {
            path: "result",
            element: <ResultPage />,
          },
          {
            path: "my-profile",
            element: <StudentProfilePage />,
          },
        ],
      },
      {
        path: "/instructor",
        element: <InstructorLayout />,
        errorElement: <div>Error</div>,
        children: [
          {
            path: "dashboard",
            element: <InstructorDashboard />,
          },
          {
            path: "courses",
            element: <InstructorCoursesPage />,
          },
          {
            path: "assignments",
            element: <InstructorAssignmentPage />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <div>Error</div>,
        children: [
          {
            path: "",
            element: <StudentDashboard />,
          },
          {
            path: "courses",
            element: <div>All course</div>,
          },
          {
            path: "assignments",
            element: <div>All Assignments</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
