import { Link } from "react-router-dom";
import Container from "../components/Container";
import HeroCarousel from "../components/HeroCarousel";
import { Eyebrow, ProgramCard } from "../components/Bits";
import { org, vision, mission, coreValues, programs, beneficiaries } from "../data/content";
import { useProgramPhotos } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

export default function Home() {
  const photos = useProgramPhotos();
  usePageSEO(
    null,
    "Promised Land Initiative carries the Gospel and practical support into schools, hospitals and communities across Uganda — restoring dignity to children, youth and families.",
    "/"
  );
  return (
    <>
      <HeroCarousel />

      {/* Vision / Mission */}
      <section className="py-20">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-navy md:text-3xl">
              “{vision}”
            </p>
          </div>
          <div>
            <Eyebrow tone="sky">Our Mission</Eyebrow>
            <p className="mt-4 text-base leading-relaxed text-ink/75 md:text-lg">
              {mission}
            </p>
          </div>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="bg-sand-2 py-16">
        <Container>
          <Eyebrow tone="navy">Who We Serve</Eyebrow>
          <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {beneficiaries.map((b) => (
              <p key={b} className="border-l-2 border-sky py-1 pl-4 text-sm text-ink/75">
                {b}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Programs preview */}
      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>What We Do</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">
                Eight programs, one purpose
              </h2>
            </div>
            <Link
              to="/programs"
              className="hidden font-eyebrow text-xs text-navy/60 hover:text-crimson md:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 6).map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} photoPublicId={photos[p.slug]} />
            ))}
          </div>
          <Link
            to="/programs"
            className="mt-8 block font-eyebrow text-xs text-navy/60 hover:text-crimson md:hidden"
          >
            View all programs →
          </Link>
        </Container>
      </section>

      {/* Core values */}
      <section className="border-y border-navy/10 bg-navy/[0.03] py-16">
        <Container>
          <Eyebrow tone="navy">What Guides Us</Eyebrow>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            {coreValues.map((v) => (
              <li key={v} className="font-display text-lg text-navy">
                {v}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20">
        <Container className="flex flex-col items-start justify-between gap-8 rounded-card bg-navy px-8 py-12 text-cream md:flex-row md:items-center md:px-14">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Join the work in Uganda
            </h2>
            <p className="mt-3 max-w-md text-cream/75">
              Volunteer your time, partner as a church or school, or give
              toward a program that moves you.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="shrink-0 rounded-sm bg-crimson px-6 py-3 font-eyebrow text-xs text-cream transition-colors hover:bg-crimson/90"
          >
            Get Involved
          </Link>
        </Container>
      </section>
    </>
  );
}
