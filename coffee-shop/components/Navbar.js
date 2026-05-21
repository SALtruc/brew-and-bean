import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo">
          Brew <span>&</span> Bean
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/order">Order</Link></li>
        </ul>
      </div>
    </nav>
  );
}
