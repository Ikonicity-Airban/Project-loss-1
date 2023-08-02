import { FooterComponent, NavbarComponent } from "../components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      {" "}
      {/* header */}
      <NavbarComponent />
      {/* main body */}
      <div className="min-h-[70vh] w-full">
        {/* the children auth */}
        <Outlet />
      </div>
      <FooterComponent />
      {/* footer */}
    </div>
  );
}

export default MainLayout;
