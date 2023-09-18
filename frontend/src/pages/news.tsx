import { BreadcrumbComponents } from "../components";
import EventList from "./home/EventList";
import NewsSection from "./home/NewsSection";
import Section from "../components/Section";

function NewsPage() {
  return (
    <section className="my-6 max-w-screen-desktop mx-auto">
      <BreadcrumbComponents />
      <Section
        title="Latest News and events"
        subtitle="Recent happenings in the department"
      >
        <NewsSection />
      </Section>
      <Section subtitle="Events">
        <EventList />
      </Section>
    </section>
  );
}

export default NewsPage;
