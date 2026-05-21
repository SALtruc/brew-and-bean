import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-eyebrow fade-in">Since 2024</div>
        <h1 className="fade-in fade-in-delay-1">
          A small café <br />
          with <em>big</em> heart
        </h1>
        <p className="hero-sub fade-in fade-in-delay-2">
          Cà phê thủ công, không gian yên tĩnh, hạt rang mới mỗi tuần.
          Một nơi để bạn chậm lại giữa nhịp sống Sài Gòn.
        </p>
        <Link href="/menu" className="hero-cta fade-in fade-in-delay-3">
          Xem menu →
        </Link>
      </section>

      <section className="container">
        <div className="features">
          <div className="feature">
            <div className="feature-num">01</div>
            <h3>Hạt rang thủ công</h3>
            <p>Nhập từ Đà Lạt và Sơn La, rang mới mỗi tuần để giữ trọn hương.</p>
          </div>
          <div className="feature">
            <div className="feature-num">02</div>
            <h3>Pha chế tỉ mỉ</h3>
            <p>Mọi ly cà phê được pha thủ công bởi barista có chứng chỉ SCA.</p>
          </div>
          <div className="feature">
            <div className="feature-num">03</div>
            <h3>Không gian ấm</h3>
            <p>Một góc nhỏ với ánh sáng vàng, sách cũ, và nhạc jazz nhẹ.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">Hôm nay</span>
          <h2>Món được yêu thích</h2>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--ink-soft)', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.1rem' }}>
          Espresso · Cà phê sữa đá · Latte hoa hồng · Cold brew 12h
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/menu" className="hero-cta">
            Khám phá đầy đủ →
          </Link>
        </div>
      </section>
    </>
  );
}
