import { Card } from "flowbite-react";
import Section from "../../components/Section";

const NewsSection = () => {
  return (
    <Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
        <Card>
          <h3 className="text-lg font-bold mb-2 logo-clipped">
            Tech Conference 2023
          </h3>
          <h3>Artificial Intelligence</h3>
          <p className="">Augst 10-12, 2023</p>
          <p className="">NACEST CHAPTER</p>
          <p className="">
            Artificial intelligence (AI) transforming the way business make
            decisions with AI, business can analyze large amount of data and
            make informed decisions quickly and accurately. AI can help business
            improve their operations, increase efficiency and reduce costs.
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-bold mb-2 logo-clipped">
            CPN Certificate 2023
          </h3>
          <p className="">October 10-12, 2023</p>
          <p className="">
            Computer Professionals Nigeria (CPN) was established by Act 49 of
            1993 to regulate, control and supervise the IT industry in Nigeria.
            The Act establishing the Council was passed into law on 10th of June
            and gazetted on the 9th of August that year. It is also charged with
            the responsibility of determining the standard
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-bold mb-2 logo-clipped">
            Tech Conference 2023
          </h3>
          <p className="">October 10-12, 2023</p>
          <p className="">
            Join us for the annual Tech Conference, where industry experts and
            researchers will share insights and advancements in the field of
            computer science. Explore emerging technologies and network with
            professionals from leading companies.
          </p>
        </Card>
        {/* Add more event cards here */}
      </div>
    </Section>
  );
};

export default NewsSection;
