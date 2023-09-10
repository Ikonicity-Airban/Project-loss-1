import { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import https from "../../api/https";

type IEvent = {
  title: string;
  content: string;
};
function EventList() {
  const [events, setEvents] = useState<IEvent[]>();

  const fetchAssignment = async () => await https.get("/events");

  useEffect(() => {
    fetchAssignment().then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <main>
      {events ? (
        events?.map((event) => (
          <div>
            <Card>
              <h2>{event.title}</h2>
              <p>{event.content}</p>
            </Card>
          </div>
        ))
      ) : (
        <Card className="m-6">
          <center>No new event for now</center>
        </Card>
      )}
    </main>
  );
}

export default EventList;
