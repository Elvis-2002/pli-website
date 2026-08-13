import { NavLink } from "react-router-dom";
import Container from "./Container";
import Swoosh from "./Swoosh";
import { org } from "../data/content";
import { useContactSettings } from "../lib/liveContent";

export default function Footer() {
  const settings = useContactSettings();
  return (
    <footer className="relative mt-24 bg-navy text-cream">
      <Swoosh className="absolute -top-10 left-0 h-10 w-full md:-top-14 md:h-14" />
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt={org.name}
              className="h-10 w-auto rounded-sm bg-cream p-0.5"
            />
            <span className="font-display text-lg font-semibold">{org.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/70">{org.tagline}</p>
        </div>

        <div>
          <p className="font-eyebrow text-xs text-sky-light">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><NavLink to="/about" className="text-cream/80 hover:text-cream">About</NavLink></li>
            <li><NavLink to="/programs" className="text-cream/80 hover:text-cream">Programs</NavLink></li>
            <li><NavLink to="/get-involved" className="text-cream/80 hover:text-cream">Get Involved</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="font-eyebrow text-xs text-sky-light">Community</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><NavLink to="/gallery" className="text-cream/80 hover:text-cream">Gallery</NavLink></li>
            <li><NavLink to="/stories" className="text-cream/80 hover:text-cream">Stories</NavLink></li>
            <li><NavLink to="/events" className="text-cream/80 hover:text-cream">Events</NavLink></li>
            <li><NavLink to="/prayer-requests" className="text-cream/80 hover:text-cream">Prayer Requests</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="font-eyebrow text-xs text-sky-light">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>{settings.location || org.location}</li>
            {settings.email && <li>{settings.email}</li>}
            {settings.phone && <li>{settings.phone}</li>}
            <li>
              <NavLink to="/contact" className="hover:text-cream">
                Send a message →
              </NavLink>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-cream/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} {org.name}. All rights reserved.</p>
          <p>Founded by {org.founder}</p>
        </Container>
      </div>
    </footer>
  );
}
