// Live content hooks.
//
// Both hooks fall back to the static data in src/data/content.js when
// Firebase isn't configured yet (firebaseEnabled === false), or if a
// Firestore read fails — so the site always renders something sensible,
// live data or not.

import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";
import { galleryItems as staticGalleryItems, org as staticOrg } from "../data/content";

export function useGallery() {
  const [items, setItems] = useState(firebaseEnabled ? null : staticGalleryItems);

  useEffect(() => {
    if (!firebaseEnabled) return;

    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => {
        console.error("Failed to load live gallery, using static fallback:", err);
        setItems(staticGalleryItems);
      }
    );
    return unsub;
  }, []);

  return items;
}

export function useContactSettings() {
  const [settings, setSettings] = useState({
    phone: staticOrg.phone,
    email: staticOrg.email,
    location: staticOrg.location,
  });

  useEffect(() => {
    if (!firebaseEnabled) return;

    getDoc(doc(db, "settings", "site"))
      .then((snap) => {
        if (snap.exists()) {
          setSettings((s) => ({ ...s, ...snap.data() }));
        }
      })
      .catch((err) => {
        console.error("Failed to load live settings, using static fallback:", err);
      });
  }, []);

  return settings;
}

export function useTeam() {
  const [team, setTeam] = useState(firebaseEnabled ? null : []);

  useEffect(() => {
    if (!firebaseEnabled) return;

    const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => setTeam(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => {
        console.error("Failed to load team:", err);
        setTeam([]);
      }
    );
    return unsub;
  }, []);

  return team;
}

export function useStories() {
  const [stories, setStories] = useState(firebaseEnabled ? null : []);

  useEffect(() => {
    if (!firebaseEnabled) return;

    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) =>
        setStories(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((s) => s.published)
        ),
      (err) => {
        console.error("Failed to load stories:", err);
        setStories([]);
      }
    );
    return unsub;
  }, []);

  return stories;
}

// Returns a { [programSlug]: photoPublicId } map. Falls back to an empty
// object (no photos yet) rather than null, since Programs/ProgramDetail
// render fine with no photo assigned.
export function useProgramPhotos() {
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    if (!firebaseEnabled) return;

    const unsub = onSnapshot(
      collection(db, "programPhotos"),
      (snap) => {
        const map = {};
        snap.docs.forEach((d) => {
          map[d.id] = d.data().photoPublicId || null;
        });
        setPhotos(map);
      },
      (err) => {
        console.error("Failed to load program photos:", err);
      }
    );
    return unsub;
  }, []);

  return photos;
}

export function useEvents() {
  const [events, setEvents] = useState(firebaseEnabled ? null : []);

  useEffect(() => {
    if (!firebaseEnabled) return;

    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setEvents(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((e) => e.date && new Date(e.date) >= today)
        );
      },
      (err) => {
        console.error("Failed to load events:", err);
        setEvents([]);
      }
    );
    return unsub;
  }, []);

  return events;
}

export function usePrayerRequests() {
  const [requests, setRequests] = useState(firebaseEnabled ? null : []);

  useEffect(() => {
    if (!firebaseEnabled) return;

    const q = query(collection(db, "prayerRequests"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => {
        console.error("Failed to load prayer requests:", err);
        setRequests([]);
      }
    );
    return unsub;
  }, []);

  return requests;
}
