// Cloudinary helper.
//
// Set VITE_CLOUDINARY_CLOUD_NAME in a `.env` file (see .env.example) once
// the Cloudinary account exists. The admin app should upload images/videos
// there and store the returned `public_id` (not the full URL) in Firestore
// — this helper turns a stored public_id back into a delivery URL, so
// resizing/format can be changed here in one place later.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function cloudinaryImage(publicId, { width, quality = "auto", format = "auto" } = {}) {
  if (!CLOUD_NAME || !publicId) return null;
  const transforms = ["f_" + format, "q_" + quality, width ? `w_${width}` : null]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function cloudinaryVideo(publicId, { quality = "auto" } = {}) {
  if (!CLOUD_NAME || !publicId) return null;
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_${quality}/${publicId}`;
}
