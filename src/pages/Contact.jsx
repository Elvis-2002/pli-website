import { useState } from "react";
import { PageHero, Eyebrow } from "../components/Bits";
import Container from "../components/Container";
import { org } from "../data/content";
import { useContactSettings } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const settings = useContactSettings();
  usePageSEO(
    "Contact",
    "Get in touch with Promised Land Initiative — questions about volunteering, partnership, or our programs in Uganda.",
    "/contact"
  );

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const to = settings.email || "";
    const subject = encodeURIComponent(`Message from ${form.name || "the website"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        lead="Questions about volunteering, partnership, or a program? Send us a message."
      />

      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow tone="navy">Reach Us</Eyebrow>
            <p className="mt-4 text-sm text-ink/70">
              {org.name} is based in {settings.location || org.location}. Use
              the form to send a message directly to our team.
            </p>
            <dl className="mt-8 space-y-4 border-t border-navy/10 pt-6 text-sm">
              <div>
                <dt className="font-eyebrow text-xs text-navy/50">Location</dt>
                <dd className="mt-1 text-ink/80">{settings.location || org.location}</dd>
              </div>
              {settings.phone && (
                <div>
                  <dt className="font-eyebrow text-xs text-navy/50">Phone</dt>
                  <dd className="mt-1 text-ink/80">{settings.phone}</dd>
                </div>
              )}
              {settings.email && (
                <div>
                  <dt className="font-eyebrow text-xs text-navy/50">Email</dt>
                  <dd className="mt-1 text-ink/80">{settings.email}</dd>
                </div>
              )}
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="font-eyebrow text-xs text-navy/60">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={update("name")}
                className="mt-2 w-full rounded-sm border border-navy/20 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-crimson"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-eyebrow text-xs text-navy/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                className="mt-2 w-full rounded-sm border border-navy/20 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-crimson"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-eyebrow text-xs text-navy/60">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                className="mt-2 w-full rounded-sm border border-navy/20 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-crimson"
              />
            </div>
            <button
              type="submit"
              className="rounded-sm bg-navy px-6 py-3 font-eyebrow text-xs text-cream transition-colors hover:bg-navy-2"
            >
              Send Message
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
