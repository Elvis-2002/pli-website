import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { PageHero, Eyebrow } from "../components/Bits";
import Container from "../components/Container";
import { db, firebaseEnabled } from "../lib/firebase";
import { usePrayerRequests } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

function timeAgo(timestamp) {
  if (!timestamp?.toDate) return "";
  const diff = Date.now() - timestamp.toDate().getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return timestamp.toDate().toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function PrayerRequests() {
  const requests = usePrayerRequests();
  const [form, setForm] = useState({ name: "", request: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  usePageSEO(
    "Prayer Requests",
    "Share a prayer request with the Promised Land Initiative community in Uganda, or pray over requests from others.",
    "/prayer-requests"
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!firebaseEnabled) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await addDoc(collection(db, "prayerRequests"), {
        name: form.name.trim() || "Anonymous",
        request: form.request.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ name: "", request: "" });
      setStatus("done");
    } catch (err) {
      console.error("Failed to submit prayer request:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Prayer Requests"
        title="Share a prayer request"
        lead="Tell us what's on your heart — our community prays over every request shared here."
      />

      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow tone="navy">Submit a Request</Eyebrow>
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div>
                <label htmlFor="name" className="font-eyebrow text-xs text-navy/60">
                  Name (optional)
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Leave blank to stay anonymous"
                  className="mt-2 w-full rounded-sm border border-navy/20 bg-cream px-4 py-3 text-sm outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label htmlFor="request" className="font-eyebrow text-xs text-navy/60">
                  Your Request
                </label>
                <textarea
                  id="request"
                  required
                  rows={5}
                  maxLength={800}
                  value={form.request}
                  onChange={(e) => setForm((f) => ({ ...f, request: e.target.value }))}
                  className="mt-2 w-full rounded-sm border border-navy/20 bg-cream px-4 py-3 text-sm outline-none focus:border-crimson"
                />
              </div>
              <p className="text-xs text-ink/50">
                This request will be visible publicly on this page. Please
                avoid sharing sensitive personal or identifying details.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-sm bg-navy px-6 py-3 font-eyebrow text-xs text-cream transition-colors hover:bg-navy-2 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit Request"}
              </button>
              {status === "done" && (
                <p className="text-sm text-crimson">Thank you — your request has been shared.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-crimson">
                  Something went wrong. Please try again in a moment.
                </p>
              )}
            </form>
          </div>

          <div>
            <Eyebrow>Community Requests</Eyebrow>
            <div className="mt-5 space-y-4">
              {requests === null ? (
                <p className="text-sm text-ink/40">Loading…</p>
              ) : requests.length === 0 ? (
                <div className="rounded-card border border-dashed border-navy/20 px-6 py-12 text-center">
                  <p className="text-sm text-ink/60">
                    No requests shared yet — be the first.
                  </p>
                </div>
              ) : (
                requests.map((r) => (
                  <div key={r.id} className="rounded-card border border-navy/10 bg-cream p-5">
                    <p className="text-sm leading-relaxed text-ink/80">{r.request}</p>
                    <p className="mt-3 font-eyebrow text-[11px] text-navy/50">
                      {r.name || "Anonymous"} · {timeAgo(r.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
