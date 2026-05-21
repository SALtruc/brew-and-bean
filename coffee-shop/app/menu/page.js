import { menuItems, formatVND } from '@/lib/menu-data';
import { s3Url } from '@/lib/s3';

export const metadata = {
  title: 'Menu — Brew & Bean',
};

export default function MenuPage() {
  return (
    <div className="container">
      <div className="page-title">
        <span className="eyebrow">Our Menu</span>
        <h1>Mỗi ly một câu chuyện</h1>
        <p>Hạt rang trong tuần · Pha thủ công · Giá đã bao gồm VAT</p>
      </div>

      <div className="menu-grid">
        {menuItems.map((item) => {
          const imgUrl = s3Url(item.image);
          return (
            <article key={item.id} className="menu-card">
              <div className="menu-card-img">
                {imgUrl ? (
                  <img src={imgUrl} alt={item.name} loading="lazy" />
                ) : (
                  <div className="menu-card-img-placeholder">
                    {item.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="menu-card-body">
                <div className="menu-card-head">
                  <h3>{item.name}</h3>
                  <span className="menu-card-price">{formatVND(item.price)}</span>
                </div>
                <p className="menu-card-desc">{item.desc}</p>
                <span className="menu-card-tag">{item.tag}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
