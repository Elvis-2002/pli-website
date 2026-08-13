import { Link } from "react-router-dom";
import Container from "./Container";
import Swoosh from "./Swoosh";
import { cloudinaryImage } from "../lib/cloudinary";

export function Eyebrow({ children, tone = "crimson" }) {
  const color = tone === "sky" ? "text-sky" : tone === "navy" ? "text-navy" : "text-crimson";
  return <p className={`font-eyebrow text-xs ${color}`}>{children}</p>;
}

export function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-14 text-cream md:pt-20">
      <Container>
        {eyebrow && (
          <p className="font-eyebrow text-xs text-sky-light">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-xl text-base text-cream/75 md:text-lg">{lead}</p>
        )}
      </Container>
      <Swoosh className="absolute -bottom-6 left-0 h-10 w-full md:-bottom-8 md:h-14" flip />
    </section>
  );
}

export function ProgramCard({ program, index, photoPublicId }) {
  return (
    <Link
      to={`/programs/${program.slug}`}
      className="group flex flex-col justify-between overflow-hidden rounded-card border border-navy/10 bg-cream transition-colors hover:border-crimson/40"
    >
      {photoPublicId && (
        <img
          src={cloudinaryImage(photoPublicId, { width: 500 })}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="font-mono text-xs text-crimson/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-navy">
            {program.name}
          </h3>
          <p className="mt-2 text-sm text-ink/70">{program.summary}</p>
        </div>
        <span className="mt-6 font-eyebrow text-[11px] text-navy/60 group-hover:text-crimson">
          Learn more →
        </span>
      </div>
    </Link>
  );
}

export function StatBlock({ value, label }) {
  return (
    <div className="border-l-2 border-sky pl-4">
      <p className="font-display text-3xl font-semibold text-navy">{value}</p>
      <p className="mt-1 text-sm text-ink/60">{label}</p>
    </div>
  );
}
