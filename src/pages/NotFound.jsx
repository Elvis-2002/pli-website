import { Link } from "react-router-dom";
import Container from "../components/Container";
import usePageSEO from "../lib/useSEO";

export default function NotFound() {
  usePageSEO("Page Not Found", null, "/404", { noindex: true });
  return (
    <section className="py-32">
      <Container className="text-center">
        <p className="font-eyebrow text-xs text-crimson">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-navy">
          Page not found
        </h1>
        <Link to="/" className="mt-6 inline-block font-eyebrow text-xs text-navy/60 hover:text-crimson">
          ← Back to Home
        </Link>
      </Container>
    </section>
  );
}
