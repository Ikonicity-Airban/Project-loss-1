import { BreadcrumbComponents } from "../components";
import NewsSection from "./home/NewsSection";
import Section from "../components/Section";

function NewsPage() {
  return (
    <div className="my-6">
      <BreadcrumbComponents />
      <Section subtitle="Latest News">
        <NewsSection />
      </Section>
    </div>
  );
}

export default NewsPage;
