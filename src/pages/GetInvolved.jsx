import { Link } from "react-router-dom";
import { PageHero, Eyebrow } from "../components/Bits";
import Container from "../components/Container";
import { involvementOptions, programs } from "../data/content";
import usePageSEO from "../lib/useSEO";

export default function GetInvolved() {
  usePageSEO(
    "Get Involved",
    "Volunteer, partner as a church or school, or give toward a Promised Land Initiative program — three ways to stand with us in Uganda.",
    "/get-involved"
  );
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Three ways to stand with us"
        lead="Whichever way fits you best, it moves a real program forward — in a school, a hospital ward, or a family's home."
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {involvementOptions.map((o, i) => (
              <div key={o.title} className="border-t-2 border-navy pt-5">
                <span className="font-mono text-xs text-crimson/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-navy">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{o.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand-2 py-16">
        <Container>
          <Eyebrow tone="navy">Donate Toward a Specific Program</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {programs.map((p) => (
              <Link
                key={p.slug}
                to={`/programs/${p.slug}`}
                className="rounded-full border border-navy/20 px-4 py-2 text-sm text-navy transition-colors hover:border-crimson hover:text-crimson"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col items-start justify-between gap-8 rounded-card bg-navy px-8 py-12 text-cream md:flex-row md:items-center md:px-14">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Ready to take the next step?
            </h2>
            <p className="mt-3 max-w-md text-cream/75">
              Tell us how you'd like to help and our team will follow up.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-sm bg-crimson px-6 py-3 font-eyebrow text-xs text-cream transition-colors hover:bg-crimson/90"
          >
            Contact Us
          </Link>
        </Container>
      </section>
    </>
  );
}
