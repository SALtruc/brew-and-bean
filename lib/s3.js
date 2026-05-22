// S3 helpers run on the server. Pages use them to build image URLs from
// object keys in lib/menu-data.js.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = process.env.AWS_REGION || 'ap-southeast-1';
const bucket = process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;
const publicBaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
const signedUrlTtl = Number.parseInt(
  process.env.S3_PRESIGNED_URL_TTL_SECONDS || '3600',
  10
);

let s3Client;

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({ region });
  }

  return s3Client;
}

export function getPublicS3Url(key) {
  if (!publicBaseUrl || !key) return null;
  return `${publicBaseUrl.replace(/\/$/, '')}/${key}`;
}

export async function getS3ImageUrl(key, fallbackUrl = null) {
  if (!key) return fallbackUrl;
  if (/^https?:\/\//.test(key)) return key;

  // Public buckets/CDN are fastest. If this is not set, fall back to
  // presigned URLs from the SDK so private S3 buckets also work.
  const publicUrl = getPublicS3Url(key);
  if (publicUrl) return publicUrl;

  if (!bucket) return fallbackUrl;

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return await getSignedUrl(getS3Client(), command, {
      expiresIn: Number.isFinite(signedUrlTtl) ? signedUrlTtl : 3600,
    });
  } catch (err) {
    console.warn(`[s3] Failed to create image URL for "${key}":`, err.message);
    return fallbackUrl;
  }
}

export const s3Url = getPublicS3Url;
