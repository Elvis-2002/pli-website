import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Swoosh from "./Swoosh";
import { org } from "../data/content";
import { useHeroSlides } from "../lib/liveContent";
import { cloudinaryImage } from "../lib/cloudinary";

const AUTO_ADVANCE_MS = 6000;

// The fixed hero shown when no admin-added slides exist yet (or while
// they're still loading) — so the homepage never looks broken.
function FallbackHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <Swoosh className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" />
      <Container className="relative py-20 md:py-28">
        <p className="font-eyebrow text-xs text-sky-light">
          {org.location} · Est. {org.yearFounded}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
          {org.tagline}.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/80">
          {org.name} carries the Gospel and practical support into schools,
          hospitals and communities across Uganda — restoring dignity to
          children, youth, and families who need it most.
        </p>
        <HeroCTAs />
      </Container>
    </section>
  );
}

function HeroCTAs() {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      <Link
        to="/get-involved"
        className="rounded-sm bg-crimson px-6 py-3 font-eyebrow text-xs text-cream transition-colors hover:bg-crimson/90"
      >
        Get Involved
      </Link>
      <Link
        to="/programs"
        className="rounded-sm border border-cream/30 px-6 py-3 font-eyebrow text-xs text-cream/90 transition-colors hover:border-cream"
      >
        See Our Programs
      </Link>
    </div>
  );
}

export default function HeroCarousel() {
  const slides = useHeroSlides();
  const [index, setIndex] = useState(0);

  const count = slides?.length ?? 0;

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [count]);

  // Still loading (null), or loaded with nothing in it — show the fixed
  // fallback hero rather than an empty/broken carousel.
  if (!slides || slides.length === 0) {
    return <FallbackHero />;
  }

  const safeIndex = index % count;
  const active = slides[safeIndex];

  function goTo(i) {
    setIndex(((i % count) + count) % count);
  }

  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      {/* Slide backgrounds — all rendered, cross-faded by opacity so the
          transition is smooth and only one is ever interactive. */}
      {slides.map((slide, i) => {
        const url = cloudinaryImage(slide.publicId, { width: 1600 });
        return (
          <div
            key={slide.id}
            aria-hidden={i !== safeIndex}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              i === safeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={url ? { backgroundImage: `url(${url})` } : undefined}
          />
        );
      })}
      <div className="absolute inset-0 bg-navy/60" />

      <Container className="relative py-20 md:py-28">
        <p className="font-eyebrow text-xs text-sky-light">
          {org.location} · Est. {org.yearFounded}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
          {active.heading || org.tagline}
        </h1>
        {active.subtext && (
          <p className="mt-6 max-w-xl text-lg text-cream/80">{active.subtext}</p>
        )}
        <HeroCTAs />

        {count > 1 && (
          <div className="mt-10 flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === safeIndex ? "w-6 bg-gold" : "w-2 bg-cream/40 hover:bg-cream/60"
                }`}
              />
            ))}
          </div>
        )}
      </Container>

      {count > 1 && (
        <>
          <button
            onClick={() => goTo(safeIndex - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-navy/50 p-3 text-cream backdrop-blur transition-colors hover:bg-navy/70 sm:flex"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(safeIndex + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-navy/50 p-3 text-cream backdrop-blur transition-colors hover:bg-navy/70 sm:flex"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
}
