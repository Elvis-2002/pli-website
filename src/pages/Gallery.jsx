import { PageHero } from "../components/Bits";
import Container from "../components/Container";
import { cloudinaryImage, cloudinaryVideo } from "../lib/cloudinary";
import { useGallery } from "../lib/liveContent";
import usePageSEO from "../lib/useSEO";

export default function Gallery() {
  const items = useGallery();
  usePageSEO(
    "Gallery",
    "Photos and video from Promised Land Initiative's outreaches, hospital visits, and school programs across Uganda.",
    "/gallery"
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the field"
        lead="Photos and video from outreaches, hospital visits, and school programs across Uganda."
      />

      <section className="py-16">
        <Container>
          {items === null ? (
            <p className="py-10 text-center text-sm text-ink/40">Loading…</p>
          ) : items.length === 0 ? (
            <div className="rounded-card border border-dashed border-navy/20 px-8 py-20 text-center">
              <p className="font-display text-xl text-navy">
                Photos are on their way
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
                Images and video uploaded from the admin app will appear
                here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <figure
                  key={item.id || item.publicId}
                  className="overflow-hidden rounded-card bg-sand-2"
                >
                  {item.resourceType === "video" ? (
                    <video
                      src={cloudinaryVideo(item.publicId)}
                      controls
                      className="aspect-[4/3] w-full bg-black object-cover"
                    />
                  ) : (
                    <img
                      src={cloudinaryImage(item.publicId, { width: 640 })}
                      alt={item.caption || ""}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  {item.caption && (
                    <figcaption className="p-3 text-sm text-ink/70">{item.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
