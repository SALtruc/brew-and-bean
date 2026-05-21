import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Brew & Bean — Cafe nhỏ xinh',
  description: 'Quán cafe nhỏ với hương vị thủ công, không gian ấm áp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer>
          <div className="container">
            Brew & Bean Coffee · 2026 · Crafted with <span className="heart">♥</span> in Sài Gòn
          </div>
        </footer>
      </body>
    </html>
  );
}
