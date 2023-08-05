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
    <Footer
      container
      className="text-sm bg-gradient-to-t from-blue-950 to-green-900 text-white"
    >
      <div className="w-full">
        <div className="">
          <div className="mx-0 mb-10">
            <LogoComponent />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 text-sm">
            <div>
              <Footer.Title title="about" className="text-white text-sm" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-white text-sm" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-white text-sm" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Ikoncity Airban™"
            href="#"
            year={2022}
            className="text-white text-sm"
          />
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
