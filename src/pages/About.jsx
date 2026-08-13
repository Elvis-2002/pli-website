import { PageHero, Eyebrow } from "../components/Bits";
import Container from "../components/Container";
import { org, vision, mission, background, coreValues, objectives, structure, partners } from "../data/content";
import { useTeam } from "../lib/liveContent";
import { cloudinaryImage } from "../lib/cloudinary";
import usePageSEO from "../lib/useSEO";

export default function About() {
  const team = useTeam();
  const visionBearer = team?.find((m) => m.isVisionBearer);
  const otherMembers = team?.filter((m) => !m.isVisionBearer) || [];

  usePageSEO(
    "About",
    "Founded to bridge the spiritual, emotional and practical gaps facing children, youth and vulnerable communities in Uganda.",
    "/about"
  );
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`The story behind ${org.name}`}
        lead="Founded to bridge the spiritual, emotional and practical gaps facing children, youth and vulnerable communities in Uganda."
      />

      {visionBearer && (
        <section className="py-16">
          <Container>
            <Eyebrow>Vision Bearer</Eyebrow>
            <div className="mt-6 grid gap-8 rounded-card border border-navy/10 bg-cream p-6 sm:p-10 md:grid-cols-[280px_1fr] md:items-center">
              {visionBearer.photoPublicId ? (
                <img
                  src={cloudinaryImage(visionBearer.photoPublicId, { width: 600 })}
                  alt={visionBearer.name}
                  className="mx-auto aspect-square w-48 rounded-full object-cover md:mx-0 md:w-full"
                />
              ) : (
                <div className="mx-auto flex aspect-square w-48 items-center justify-center rounded-full bg-navy/10 font-display text-4xl text-navy/40 md:mx-0 md:w-full">
                  {visionBearer.name?.[0]}
                </div>
              )}
              <div>
                <p className="font-display text-2xl font-semibold text-navy md:text-3xl">
                  {visionBearer.name}
                </p>
                <p className="mt-1 font-eyebrow text-xs text-crimson">
                  {visionBearer.role}
                </p>
                {visionBearer.bio && (
                  <p className="mt-4 text-base leading-relaxed text-ink/75">
                    {visionBearer.bio}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="py-16">
        <Container className="max-w-3xl space-y-5">
          <Eyebrow>Background</Eyebrow>
          {background.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-ink/75 md:text-lg">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section className="bg-sand-2 py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow tone="sky">Vision</Eyebrow>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-navy">
              {vision}
            </p>
          </div>
          <div>
            <Eyebrow tone="navy">Mission</Eyebrow>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              {mission}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Eyebrow>Core Values</Eyebrow>
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v) => (
              <div key={v} className="border-b border-navy/10 pb-3">
                <p className="font-display text-lg text-navy">{v}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {otherMembers.length > 0 && (
        <section className="bg-sand-2 py-16">
          <Container>
            <Eyebrow tone="navy">Founders & Members</Eyebrow>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherMembers.map((m) => (
                <div key={m.id} className="text-center sm:text-left">
                  {m.photoPublicId ? (
                    <img
                      src={cloudinaryImage(m.photoPublicId, { width: 300 })}
                      alt={m.name}
                      className="mx-auto aspect-square w-32 rounded-full object-cover sm:mx-0"
                    />
                  ) : (
                    <div className="mx-auto flex aspect-square w-32 items-center justify-center rounded-full bg-navy/10 font-display text-2xl text-navy/40 sm:mx-0">
                      {m.name?.[0]}
                    </div>
                  )}
                  <p className="mt-4 font-display text-lg font-semibold text-navy">
                    {m.name}
                  </p>
                  <p className="text-sm text-crimson">{m.role}</p>
                  {m.bio && <p className="mt-2 text-sm text-ink/70">{m.bio}</p>}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-navy/[0.03] py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow tone="navy">Objectives</Eyebrow>
            <ul className="mt-5 space-y-3">
              {objectives.map((o) => (
                <li key={o} className="flex gap-3 text-sm text-ink/75 md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow tone="navy">How We're Organised</Eyebrow>
            <ul className="mt-5 space-y-3">
              {structure.map((s, i) => (
                <li key={s} className="flex items-center gap-3 border-b border-navy/10 pb-3 text-sm md:text-base">
                  <span className="font-mono text-xs text-crimson/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-eyebrow text-xs text-navy/70">We Partner With</p>
            <p className="mt-3 text-sm text-ink/70">{partners.join(" · ")}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
