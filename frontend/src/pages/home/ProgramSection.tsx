import React from "react";
import Section from "../../components/Section";
import { Card } from "flowbite-react";

const ProgramsSection: React.FC = () => {
  const programs = [
    {
      title: "Bachelor of Science in Computer Science",
      description:
        "Our undergraduate program provides a comprehensive education in computer science, covering topics such as algorithms, data structures, software engineering, artificial intelligence, and more.",
    },
    {
      title: "Master of Science in Computer Science",
      description:
        "Our master's program offers advanced coursework and research opportunities for students interested in deepening their knowledge and expertise in computer science.",
    },
    {
      title: "Ph.D. in Computer Science",
      description:
        "Our Ph.D. program focuses on cutting-edge research in various areas of computer science. Students work closely with faculty mentors to pursue their research interests.",
    },
  ];

  return (
    <Section subtitle="Our Programs">
      <div className="container mx-auto px-4">
        <div className="my-6">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
            ea dolore porro, facilis asperiores, fugiat adipisci molestias neque
            esse obcaecati corrupti natus nesciunt eum. Animi aut excepturi
            rerum maiores. Repudiandae?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index}>
              <h3 className="text-lg font-bold mb-4 logo-clipped">
                {program.title}
              </h3>
              <p className="text-base leading-loose">{program.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProgramsSection;
