import { Card } from "flowbite-react";
import { IEvent } from "../../api/@types";
import Section from "../../components/Section";

type Props = {
  events?: IEvent[];
};
function EventList({ events }: Props) {
  return (
    <Section title="Latest Events">
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
        {events ? (
          events?.map((event) => (
            <Card key={event._id}>
              <h3 className="text-lg font-bold mb-2 logo-clipped">
                {event.title}
              </h3>
              <p className="text-xs text-gray-400">
                {new Date(event.date || "").toDateString()}
              </p>
              <p className="">{event.content.slice(0, 150)}</p>
            </Card>
          ))
        ) : (
          <Card className="m-6">
            <center>No new event for now</center>
          </Card>
        )}
      </div>
    </Section>
  );
}

export default EventList;
