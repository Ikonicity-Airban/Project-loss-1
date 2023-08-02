import {
  faBaseball,
  faBasketball,
  faIcons,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "flowbite-react";
import LogoComponent from "./LogoComponent";

export default function FooterComponent() {
  return (
    <Footer container className="text-sm">
      <div className="w-full">
        <div className="">
          <div className="mr-6 mb-10">
            <LogoComponent />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="Ikoncity Airban™" href="#" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FontAwesomeIcon icon={faBasketball} />
            <FontAwesomeIcon icon={faBaseball} />
            <FontAwesomeIcon icon={faIcons} />
            <FontAwesomeIcon icon={faIcons} />
            <FontAwesomeIcon icon={faIcons} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
