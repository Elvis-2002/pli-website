import { PageHero, Eyebrow } from "../components/Bits";
import Container from "../components/Container";
import { useEvents } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function Events() {
  const events = useEvents();
  usePageSEO(
    "Upcoming Events",
    "Upcoming outreaches, services, and community events from Promised Land Initiative in Uganda.",
    "/events"
  );

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Upcoming events"
        lead="Outreaches, services, and community gatherings — join us."
      />

      <section className="py-16">
        <Container>
          {events === null ? (
            <p className="py-10 text-center text-sm text-ink/40">Loading…</p>
          ) : events.length === 0 ? (
            <div className="rounded-card border border-dashed border-navy/20 px-8 py-20 text-center">
              <p className="font-display text-xl text-navy">
                No events scheduled right now
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
                Check back soon, or follow our programs to hear about the
                next outreach.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-navy/10 border-t border-navy/10">
              {events.map((e) => (
                <div key={e.id} className="grid gap-2 py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
                  <div>
                    <Eyebrow tone="navy">{formatDate(e.date)}</Eyebrow>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-navy">
                      {e.title}
                    </p>
                    {e.location && (
                      <p className="mt-1 text-sm text-crimson">{e.location}</p>
                    )}
                    {e.description && (
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">
                        {e.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
