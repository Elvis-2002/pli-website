import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { org } from "../data/content";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/get-involved", label: "Get Involved" },
];

const communityLinks = [
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/events", label: "Events" },
  { to: "/prayer-requests", label: "Prayer Requests" },
];

const trailingLinks = [{ to: "/contact", label: "Contact" }];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const location = useLocation();
  const communityActive = communityLinks.some((l) => l.to === location.pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/assets/logo.png"
            alt={org.name}
            className="h-10 w-auto md:h-11"
          />
          <span className="hidden font-display text-lg font-semibold text-navy sm:block">
            {org.name}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `font-eyebrow text-xs tracking-widest transition-colors ${
                  isActive ? "text-crimson" : "text-ink/70 hover:text-navy"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCommunityOpen(true)}
            onMouseLeave={() => setCommunityOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCommunityOpen((v) => !v)}
              aria-expanded={communityOpen}
              className={`font-eyebrow text-xs tracking-widest transition-colors ${
                communityActive ? "text-crimson" : "text-ink/70 hover:text-navy"
              }`}
            >
              Community ▾
            </button>
            {communityOpen && (
              <div className="absolute left-1/2 top-full w-44 -translate-x-1/2 pt-3">
                <div className="rounded-card border border-navy/10 bg-cream py-2 shadow-lg">
                  {communityLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setCommunityOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 font-eyebrow text-xs tracking-widest ${
                          isActive ? "text-crimson" : "text-ink/70 hover:text-navy"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {trailingLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-eyebrow text-xs tracking-widest transition-colors ${
                  isActive ? "text-crimson" : "text-ink/70 hover:text-navy"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <NavLink
            to="/get-involved"
            className="rounded-sm bg-navy px-4 py-2 font-eyebrow text-xs text-cream transition-colors hover:bg-navy-2"
          >
            Donate
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block h-0.5 w-6 bg-navy" />
          <span className="block h-0.5 w-6 bg-navy" />
          <span className="block h-0.5 w-6 bg-navy" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-cream md:hidden">
          <ul className="flex flex-col px-6 py-2">
            {[...links, ...communityLinks, ...trailingLinks].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block border-b border-black/5 py-3 font-eyebrow text-xs tracking-widest ${
                      isActive ? "text-crimson" : "text-ink/70"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
