import { useEffect } from "react";

const SITE_NAME = "Promised Land Initiative";
// TODO: replace with the real production domain once it's live — must
// match the domain in index.html and public/sitemap.xml.
const SITE_URL = "https://www.promisedlandinitiative.org";

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", `${SITE_URL}${path}`);
}

/**
 * Sets a unique document title + meta description (and matching Open
 * Graph / Twitter tags) for the current page. Falls back to the
 * defaults already in index.html if a page doesn't call this.
 *
 * Usage: usePageSEO("About", "Founded to bridge...", "/about")
 * Pass noindex: true for pages that shouldn't appear in search results
 * (e.g. a 404 page).
 */
export default function usePageSEO(title, description, path = "/", { noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("property", "og:title", fullTitle);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setCanonical(path);
  }, [title, description, path, noindex]);
}
