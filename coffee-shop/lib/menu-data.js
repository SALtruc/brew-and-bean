// Menu items. The `image` field is an S3 object key — combined with
// NEXT_PUBLIC_S3_BASE_URL it becomes a full URL. If S3 isn't configured,
// the UI falls back to a styled placeholder.

export const menuItems = [
  {
    id: 'espresso',
    name: 'Espresso',
    price: 35000,
    desc: 'Một shot 30ml, đậm đặc, crema vàng nâu. Hạt Arabica Cầu Đất.',
    tag: 'Signature',
    image: 'menu/espresso.jpg',
  },
  {
    id: 'ca-phe-sua-da',
    name: 'Cà phê sữa đá',
    price: 32000,
    desc: 'Phin truyền thống Việt Nam, sữa đặc, đá viên. Đậm đà, ngọt nhẹ.',
    tag: 'Classic',
    image: 'menu/ca-phe-sua-da.jpg',
  },
  {
    id: 'latte-rose',
    name: 'Latte Hoa Hồng',
    price: 65000,
    desc: 'Espresso, sữa tươi hấp, syrup hoa hồng nhà làm, latte art.',
    tag: 'Specialty',
    image: 'menu/latte-rose.jpg',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew 12h',
    price: 55000,
    desc: 'Ủ lạnh 12 tiếng, vị sạch, hậu ngọt như trà. Hạt Sơn La.',
    tag: 'Slow',
    image: 'menu/cold-brew.jpg',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 55000,
    desc: 'Tỉ lệ vàng 1:1:1 — espresso, sữa hấp, foam dày.',
    tag: 'Classic',
    image: 'menu/cappuccino.jpg',
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    price: 60000,
    desc: 'Matcha Uji Nhật Bản, sữa tươi nóng hoặc đá.',
    tag: 'Non-coffee',
    image: 'menu/matcha-latte.jpg',
  },
  {
    id: 'bac-xiu',
    name: 'Bạc Xỉu',
    price: 35000,
    desc: 'Phiên bản nhẹ của sữa đá — nhiều sữa, ít cà phê, ngọt dịu.',
    tag: 'Classic',
    image: 'menu/bac-xiu.jpg',
  },
  {
    id: 'affogato',
    name: 'Affogato',
    price: 70000,
    desc: 'Một viên kem vanilla Ý, ngập trong shot espresso nóng.',
    tag: 'Dessert',
    image: 'menu/affogato.jpg',
  },
];

export const galleryImages = [
  { key: 'gallery/shop-interior.jpg', alt: 'Không gian quán' },
  { key: 'gallery/barista-pour.jpg', alt: 'Barista rót cà phê' },
  { key: 'gallery/beans.jpg', alt: 'Hạt cà phê' },
  { key: 'gallery/latte-art.jpg', alt: 'Latte art' },
  { key: 'gallery/morning-light.jpg', alt: 'Ánh sáng buổi sớm' },
  { key: 'gallery/customer.jpg', alt: 'Khách hàng' },
  { key: 'gallery/dessert.jpg', alt: 'Bánh ngọt' },
];

export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
