import { PageHero } from "../components/Bits";
import { ProgramCard } from "../components/Bits";
import Container from "../components/Container";
import { programs } from "../data/content";
import { useProgramPhotos } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

export default function Programs() {
  const photos = useProgramPhotos();
  usePageSEO(
    "Programs",
    "Eight programs meeting spiritual, physical, and educational needs — evangelism, education, hospital ministry, and dignity programs across Uganda.",
    "/programs"
  );
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Eight programs, one purpose"
        lead="Each program meets a specific need — spiritual, physical, or educational — while working toward the same vision of dignity and hope."
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} photoPublicId={photos[p.slug]} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
