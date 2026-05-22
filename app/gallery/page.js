import { galleryImages } from '@/lib/menu-data';
import { getS3ImageUrl } from '@/lib/s3';

export const metadata = {
  title: 'Gallery — Brew & Bean',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const images = await Promise.all(
    galleryImages.map(async (img) => ({
      ...img,
      url: await getS3ImageUrl(img.key, img.fallbackImage),
    }))
  );

  return (
    <div className="container">
      <div className="page-title">
        <span className="eyebrow">Gallery</span>
        <h1>Khoảnh khắc tại quán</h1>
        <p>Ánh sáng, hương cà phê, và những câu chuyện chưa kể.</p>
      </div>

      <div className="gallery-grid">
        {images.map((img, i) => {
          return (
            <div key={img.key} className={`gallery-item gallery-item-${i + 1}`}>
              {img.url ? (
                <img src={img.url} alt={img.alt} loading="lazy" />
              ) : (
                <div className="gallery-placeholder">{img.alt}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
