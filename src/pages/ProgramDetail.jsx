import { Link, useParams, Navigate } from "react-router-dom";
import Container from "../components/Container";
import Swoosh from "../components/Swoosh";
import { Eyebrow } from "../components/Bits";
import { programs } from "../data/content";
import { useProgramPhotos } from "../lib/liveContent";
import { cloudinaryImage } from "../lib/cloudinary";
import usePageSEO from "../lib/useSEO";

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);
  const photos = useProgramPhotos();

  usePageSEO(
    program?.name || "Program",
    program?.summary || "Explore our programs at Promised Land Initiative.",
    `/programs/${slug}`
  );

  if (!program) return <Navigate to="/programs" replace />;

  const index = programs.findIndex((p) => p.slug === slug);
  const next = programs[(index + 1) % programs.length];
  const photoPublicId = photos[slug];

  return (
    <>
      <section className="relative overflow-hidden bg-navy pb-16 pt-14 text-cream md:pt-20">
        <Container>
          <Link to="/programs" className="font-eyebrow text-xs text-sky-light hover:text-cream">
            ← All Programs
          </Link>
          <p className="mt-6 font-mono text-xs text-cream/50">
            {String(index + 1).padStart(2, "0")} / {String(programs.length).padStart(2, "0")}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
            {program.name}
          </h1>
          <p className="mt-5 max-w-xl text-base text-cream/75 md:text-lg">{program.goal}</p>
        </Container>
        <Swoosh className="absolute -bottom-6 left-0 h-10 w-full md:-bottom-8 md:h-14" flip />
      </section>

      {photoPublicId && (
        <Container className="relative -mt-8 md:-mt-10">
          <img
            src={cloudinaryImage(photoPublicId, { width: 1000 })}
            alt={program.name}
            className="aspect-[16/7] w-full rounded-card object-cover shadow-lg"
          />
        </Container>
      )}

      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow>Activities</Eyebrow>
            <ul className="mt-5 space-y-4">
              {program.activities.map((a) => (
                <li key={a} className="flex gap-3 border-b border-navy/10 pb-4 text-base text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {a}
                </li>
              ))}
            </ul>
            {program.note && (
              <p className="mt-6 border-l-2 border-gold pl-4 text-sm italic text-ink/60">
                {program.note}
              </p>
            )}
          </div>

          <div className="rounded-card border border-navy/10 bg-sand-2 p-6">
            <Eyebrow tone="navy">Get Involved</Eyebrow>
            <p className="mt-3 text-sm text-ink/70">
              Support this program through volunteering, partnership, or giving.
            </p>
            <Link
              to="/get-involved"
              className="mt-5 inline-block rounded-sm bg-navy px-5 py-2.5 font-eyebrow text-xs text-cream hover:bg-navy-2"
            >
              Get Involved
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-navy/10 py-10">
        <Container className="flex items-center justify-between">
          <p className="font-eyebrow text-xs text-navy/50">Next Program</p>
          <Link
            to={`/programs/${next.slug}`}
            className="font-display text-lg text-navy hover:text-crimson"
          >
            {next.name} →
          </Link>
        </Container>
      </section>
    </>
  );
}
