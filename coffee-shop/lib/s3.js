// Build a full S3 URL from an object key.
// If NEXT_PUBLIC_S3_BASE_URL is not set, returns null so the UI can
// show a styled placeholder. This keeps local dev working without AWS.

export function s3Url(key) {
  const base = process.env.NEXT_PUBLIC_S3_BASE_URL;
  if (!base || !key) return null;
  return `${base.replace(/\/$/, '')}/${key}`;
}
