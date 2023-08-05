import { Card } from "flowbite-react";
import React from "react";
import Section from "../../components/Section";

const FacultySection: React.FC = () => {
  const facultyMembers = [
    {
      name: "John Doe",
      title: "Professor",
      area: "Artificial Intelligence",
      image: "https://example.com/john-doe.jpg",
    },
    {
      name: "Jane Smith",
      title: "Associate Professor",
      area: "Data Science",
      image: "https://example.com/jane-smith.jpg",
    },
    {
      name: "Michael Johnson",
      title: "Assistant Professor",
      area: "Software Engineering",
      image: "https://example.com/michael-johnson.jpg",
    },
  ];

  return (
    <Section subtitle="Our Department Colossus">
      <div className="container mx-auto px-4">
        <p className="my-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          nisi tempora neque, impedit, cum eum quia quos provident, animi magnam
          dolore. Nulla omnis sit provident doloribus qui maiores, possimus
          quibusdam!
        </p>
        <h2 className="text-2xl font-bold mb-4">Department Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty, index) => (
            <Card key={index}>
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-bold">{faculty.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {faculty.title}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{faculty.area}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FacultySection;
