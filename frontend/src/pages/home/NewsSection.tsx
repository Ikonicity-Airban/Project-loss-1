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
          <p className="">October 10-12, 2023</p>
          <p className="">
            Join us for the annual Tech Conference, where industry experts and
            researchers will share insights and advancements in the field of
            computer science. Explore emerging technologies and network with
            professionals from leading companies.
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
