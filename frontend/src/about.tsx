import { BreadcrumbComponents } from "./components";
import FacultySection from "./pages/home/FacultySection";
import Heading from "./components/Heading";
import React from "react";
import Section from "./components/Section";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-screen-laptop mx-auto">
      <BreadcrumbComponents />
      <Heading section_title="" />
      <Section subtitle="Mission and Vision">
        <p>
          Our mission is to provide a world-class education in computer science
          and foster cutting-edge research in collaboration with industry and
          academia. We aim to equip our students with the knowledge, skills, and
          mindset needed to thrive in a rapidly evolving technological
          landscape. Our vision is to be a leading hub of innovation, producing
          creative problem solvers and thought leaders in the field of computer
          science.
        </p>
      </Section>

      <Section subtitle="Departmental Overview">
        <p>
          Established in [year], the Computer Science Department at [NACEST] is
          renowned for its excellence in teaching and research. With a faculty
          team of [number] experienced educators and [number] dedicated staff
          members, we are committed to providing a stimulating and supportive
          learning environment for our students. Our department offers a wide
          range of academic programs, cutting-edge research opportunities, and
          state-of-the-art facilities.
        </p>
      </Section>

      <FacultySection></FacultySection>
      <Section>
        <h2>Academic Programs</h2>
        <p>
          Our department offers a range of academic programs designed to cater
          to diverse interests and career goals. Whether you are an
          undergraduate or graduate student, we have programs that will equip
          you with the skills and knowledge necessary for success in the field
          of computer science.
        </p>
        <h3>National Diploma in Computer Science</h3>
        <p>
          Our undergraduate program in Computer Science provides a solid
          foundation in core computer science concepts and programming. Students
          gain expertise in areas such as algorithms, data structures, software
          development, and computer architecture. With a comprehensive
          curriculum, hands-on projects, and industry internships, graduates are
          well-prepared for careers in software engineering, systems analysis,
          and more.
        </p>
        <h3>Higher National Diploma [HND] in Computer Science</h3>
        <p>
          Our graduate program in Computer Science offers advanced coursework
          and research opportunities in specialized areas of computer science.
          Students can choose from a variety of tracks, including artificial
          intelligence, data science, cybersecurity, and more. The program
          provides a platform for in-depth exploration of cutting-edge topics
          and prepares students for leadership roles in industry or further
          research in academia.
        </p>
      </Section>
    </div>
  );
};

export default AboutPage;
