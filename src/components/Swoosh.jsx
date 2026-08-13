// The organisation's mark is built from one gesture: a single sweeping
// arc, layered three times (navy, crimson, sky) with a slight offset.
// This component re-uses that exact gesture as the site's recurring
// structural device — section dividers, hero backdrop, footer edge —
// instead of a generic wave or blob.

export default function Swoosh({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M -20 90 C 250 10, 750 10, 1220 95"
        fill="none"
        stroke="var(--color-navy)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M -20 78 C 250 -2, 750 -2, 1220 83"
        fill="none"
        stroke="var(--color-crimson)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M -20 66 C 250 -14, 750 -14, 1220 71"
        fill="none"
        stroke="var(--color-sky)"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
