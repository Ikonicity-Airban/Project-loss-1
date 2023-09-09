import { BreadcrumbComponents } from "../components";
import NewsSection from "./home/NewsSection";
import Section from "../components/Section";

function NewsPage() {
  return (
    <section className="my-6 max-w-screen-desktop mx-auto">
      <BreadcrumbComponents />
      <Section subtitle="Latest News">
        <NewsSection />
      </Section>
    </section>
  );
}

export default NewsPage;
