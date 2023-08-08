// type Props = {};

import { Button, Carousel, ListGroup } from "flowbite-react";

import { BreadcrumbComponents } from "../../components";
import FacultySection from "./FacultySection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgramsSection from "./ProgramSection";
import Section from "../../components/Section";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function HomeComponent() {
  return (
    <main>
      <main className="min-h-[60vh] md:min-h-[80vh] relative rounded-2xl overflow-hidden">
        <div className="relative inset-0 -z-1">
          <Carousel
            className="h-[60vh] md:h-screen object-fill"
            indicators={false}
            slideInterval={7000}
          >
            {[1, 2, 3, 4].map((num, idx) => (
              <img
                src={`carousel/${num}.jpg`}
                className="h-auto"
                key={idx}
                alt={idx.toString()}
                style={{ objectFit: "cover", height: "100%" }}
                loading="lazy"
              />
            ))}
          </Carousel>
        </div>
        <div className="absolute p-2 min-h-[60vh] inset-0 bg-[#023c] grid place-items-center">
          <div
            id="title"
            className="flex flex-col space-y-20 max-w-6xl z-[10] p-3 font-semibold"
          >
            <h2 className="font-robo md:text-6xl logo-clipped text-center title-design text-white ">
              Computer Science Departmental Portal
            </h2>
            <a
              href="/login"
              className="mx-auto flex items-center justify-center text-white"
            >
              <Button
                gradientDuoTone={"greenToBlue"}
                size="sm"
                className="text-white"
              >
                Go to Login
                <FontAwesomeIcon icon={faArrowRightLong} className="mx-3" />
              </Button>
            </a>
          </div>
        </div>
      </main>
      <BreadcrumbComponents />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 ">
            <ListGroup>
              <ListGroup.Item>
                <h2 title="">Top links</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="#staffs">link 1</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="#programs">link 2</a>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Section
            title=""
            subtitle="Welcome to the Computer Departmental Portal!"
          >
            <p className="text-base leading-loose">
              We're glad you're here and hope you find our website to be a
              valuable resource for all your academic needs. Our department is
              dedicated to providing students with a comprehensive and engaging
              education that prepares them for success in their chosen careers.
            </p>
          </Section>{" "}
        </div>

        <p className="text-base leading-loose"></p>
        <ProgramsSection />

        <FacultySection />
      </div>
    </main>
  );
}
