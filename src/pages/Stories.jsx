import { PageHero } from "../components/Bits";
import Container from "../components/Container";
import { cloudinaryImage } from "../lib/cloudinary";
import { useStories } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

export default function Stories() {
  const stories = useStories();
  usePageSEO(
    "Stories",
    "Stories of children and families whose lives are touched through Promised Land Initiative's programs, shared with family permission.",
    "/stories"
  );

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Children & families we support"
        lead="A few of the people whose lives are touched through our programs, shared with their family's permission."
      />

      <section className="py-16">
        <Container>
          {stories === null ? (
            <p className="py-10 text-center text-sm text-ink/40">Loading…</p>
          ) : stories.length === 0 ? (
            <div className="rounded-card border border-dashed border-navy/20 px-8 py-20 text-center">
              <p className="font-display text-xl text-navy">Stories coming soon</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
                We're gathering stories from the field, shared only with
                each family's permission.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((s) => (
                <article
                  key={s.id}
                  className="overflow-hidden rounded-card border border-navy/10 bg-cream"
                >
                  {s.photoPublicId ? (
                    <img
                      src={cloudinaryImage(s.photoPublicId, { width: 500 })}
                      alt={s.name}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-sand-2 font-display text-3xl text-navy/30">
                      {s.name?.[0]}
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-display text-lg font-semibold text-navy">
                      {s.name}
                      {s.age ? `, ${s.age}` : ""}
                    </p>
                    {s.program && (
                      <p className="mt-1 font-eyebrow text-[11px] text-crimson">
                        {s.program}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {s.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
