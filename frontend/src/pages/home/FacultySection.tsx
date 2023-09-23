import { Card } from "flowbite-react";
import React from "react";
import Section from "../../components/Section";

const FacultySection: React.FC = () => {
  const facultyMembers = [
    {
      name: "Mr.Ike Innocent",
      title: "Professor",
      area: "Artificial Intelligence",
      image: "images/1.jpg",
    },
    {
      name: "Mr.Lubem Gafa",
      title: "Associate Professor",
      area: "Data Science",
      image: "images/2.jpg",
    },
    {
      name: "Doc.Chidinma Nwafor",
      title: "Assistant Professor",
      area: "Software Engineering",
      image: "images/3.jpg",
    },
  ];

  return (
    <Section subtitle="Our Department Staff">
      <div className="container mx-auto px-4">
        <p className="my-6">
          Our department boasts a team of highly qualified and accomplished
          faculty members who are passionate about computer science education
          and research. With expertise in various subfields of computer science,
          our faculty members actively contribute to advancements in the
          discipline. They are dedicated mentors who guide and inspire our
          students to reach their full potential. Our committed staff members
          ensure the smooth functioning of the department and provide valuable
          support to students and faculty.
        </p>
        <h2 className="text-2xl font-bold mb-4"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty, index) => (
            <Card
              key={index}
              imgSrc={faculty.image}
              className="animate-fade-in"
            >
              <h3 className="font-bold logo-clipped">{faculty.name}</h3>
              <p className="text-gray-600 text-sm dark:text-gray-400 mb-2">
                {faculty.title}
              </p>
              <p className="text-gray-700 dark:text-gray-200">{faculty.area}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FacultySection;
