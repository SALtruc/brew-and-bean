import { galleryImages } from '@/lib/menu-data';
import { s3Url } from '@/lib/s3';

export const metadata = {
  title: 'Gallery — Brew & Bean',
};

export default function GalleryPage() {
  return (
    <div className="container">
      <div className="page-title">
        <span className="eyebrow">Gallery</span>
        <h1>Khoảnh khắc tại quán</h1>
        <p>Ánh sáng, hương cà phê, và những câu chuyện chưa kể.</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((img, i) => {
          const url = s3Url(img.key);
          return (
            <div key={img.key} className={`gallery-item gallery-item-${i + 1}`}>
              {url ? (
                <img src={url} alt={img.alt} loading="lazy" />
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
