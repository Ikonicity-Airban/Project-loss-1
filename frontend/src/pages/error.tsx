import { Link } from "react-router-dom";
import { ListGroup } from "flowbite-react";
import Section from "../components/Section";

function ErrorPage() {
  return (
    <Section subtitle="Oops an error occurred" title="Error">
      <ListGroup>
        <ListGroup.Item>
          <Link to="/" replace>
            Go back home
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Section>
  );
}

export default ErrorPage;
