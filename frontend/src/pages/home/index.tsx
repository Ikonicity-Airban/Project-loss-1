// type Props = {};

import { Button, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "../../components/Section";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function HomeComponent(/* {}: Props */) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages([
      "https://media.istockphoto.com/id/1366798987/photo/interior-of-a-traditional-school-classroom-with-wooden-floor-and-furniture.webp?b=1&s=170667a&w=0&k=20&c=1g8wPFZm_FWK_RmqxtcS2_CN6cNF4uRtDb_PhODUXXk=",
      "https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=",
      "https://plus.unsplash.com/premium_photo-1682787495017-a8f4c7584868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
      "https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.webp?b=1&s=170667a&w=0&k=20&c=wmjzzESyHcSDFXYI1qzngse-EIj7aBMfebEaqjT8cjM=",
    ]);
  }, []);

  return (
    <main>
      <main className="min-h-[60vh] md:min-h-[85vh] relative rounded-2xl overflow-hidden">
        <div className="relative inset-0 -z-1">
          <Carousel
            className=""
            indicators={false}
            slideInterval={7000}
            // leftControl={<></>}
            // rightControl={<></>}
          >
            {images.map((image, idx) => (
              <img
                src={image}
                key={idx}
                alt={idx.toString()}
                style={{ objectFit: "cover", height: "100%" }}
                loading="lazy"
              />
            ))}
          </Carousel>
        </div>
        <div className="absolute min-h-[60vh] inset-0 bg-[#023c] grid place-items-center">
          <div
            id="title"
            className="flex flex-col space-y-20 max-w-6xl z-[10] p-3 font-semibold"
          >
            <h2 className="font-robo text-2xl md:text-6xl logo-clipped text-center title-design text-white ">
              Computer Science Air Force Base Portal
            </h2>
            <a
              href="/login"
              className="mx-auto flex items-center justify-center text-white"
            >
              <Button gradientDuoTone={"greenToBlue"} className="text-white">
                Go to Login
                <FontAwesomeIcon icon={faArrowRightLong} className="mx-3" />
              </Button>
            </a>
          </div>
        </div>
      </main>
      <div className="max-w-6xl mx-auto">
        <Section
          title=""
          subtitle="Welcome to the academic departmental portal!"
        >
          <p className="first-letter:text-4xl first-letter:font-semibold">
            We're glad you're here and hope you find our website to be a
            valuable resource for all your academic needs. Our department is
            dedicated to providing students with a comprehensive and engaging
            education that prepares them for success in their chosen careers.
          </p>
        </Section>
        <Section title="What We Offer?">
          <p className=" first-letter:text-4xl first-letter:font-semibold">
            We offer a range of programs and courses that are designed to meet
            the needs of students at all levels, from undergraduate to graduate
            and beyond. On our website, you'll find information about our
            faculty members, their research interests, and their contact
            information. You can also browse our course offerings, view our
            academic calendar, and stay up-to-date with the latest news and
            events happening in our department. Whether you're a current
            student, a prospective student, or just interested in learning more
            about our department, we invite you to explore our website and
            discover all that we have to offer. Thank you for visiting and we
            look forward to hearing from you soon!
          </p>
        </Section>
      </div>
    </main>
  );
}
