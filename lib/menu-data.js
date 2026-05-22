// Menu items. The `image` field is an S3 object key. `fallbackImage` keeps
// the UI visual while S3 is not configured yet.

const demoImages = {
  espresso: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
  icedCoffee: 'https://images.unsplash.com/photo-1764298490445-6add12301888?auto=format&fit=crop&w=1200&q=80',
  latte: 'https://images.unsplash.com/photo-1747852221932-296571135b7b?auto=format&fit=crop&w=1200&q=80',
  coldBrew: 'https://images.unsplash.com/photo-1765690835487-8da60d318d0f?auto=format&fit=crop&w=1200&q=80',
  cappuccino: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
  matcha: 'https://images.unsplash.com/photo-1560148196-df61132466ce?auto=format&fit=crop&w=1200&q=80',
  affogato: 'https://images.unsplash.com/photo-1589880442905-546b351e81dc?auto=format&fit=crop&w=1200&q=80',
  shopInterior: 'https://images.unsplash.com/photo-1749626588174-09f86a67a5aa?auto=format&fit=crop&w=1200&q=80',
  baristaPour: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  beans: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
  morningLight: 'https://images.unsplash.com/photo-1746040669847-d680018f7ecd?auto=format&fit=crop&w=1200&q=80',
  customer: 'https://images.unsplash.com/photo-1754783591348-81a3f23b9c22?auto=format&fit=crop&w=1200&q=80',
  dessert: 'https://images.unsplash.com/photo-1763647872237-c76e660cf38b?auto=format&fit=crop&w=1200&q=80',
};

export const menuItems = [
  {
    id: 'espresso',
    name: 'Espresso',
    price: 35000,
    desc: 'Một shot 30ml, đậm đặc, crema vàng nâu. Hạt Arabica Cầu Đất.',
    tag: 'Signature',
    image: 'menu/espresso.jpg',
    fallbackImage: demoImages.espresso,
  },
  {
    id: 'ca-phe-sua-da',
    name: 'Cà phê sữa đá',
    price: 32000,
    desc: 'Phin truyền thống Việt Nam, sữa đặc, đá viên. Đậm đà, ngọt nhẹ.',
    tag: 'Classic',
    image: 'menu/ca-phe-sua-da.jpg',
    fallbackImage: demoImages.icedCoffee,
  },
  {
    id: 'latte-rose',
    name: 'Latte Hoa Hồng',
    price: 65000,
    desc: 'Espresso, sữa tươi hấp, syrup hoa hồng nhà làm, latte art.',
    tag: 'Specialty',
    image: 'menu/latte-rose.jpg',
    fallbackImage: demoImages.latte,
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew 12h',
    price: 55000,
    desc: 'Ủ lạnh 12 tiếng, vị sạch, hậu ngọt như trà. Hạt Sơn La.',
    tag: 'Slow',
    image: 'menu/cold-brew.jpg',
    fallbackImage: demoImages.coldBrew,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 55000,
    desc: 'Tỉ lệ vàng 1:1:1 — espresso, sữa hấp, foam dày.',
    tag: 'Classic',
    image: 'menu/cappuccino.jpg',
    fallbackImage: demoImages.cappuccino,
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    price: 60000,
    desc: 'Matcha Uji Nhật Bản, sữa tươi nóng hoặc đá.',
    tag: 'Non-coffee',
    image: 'menu/matcha-latte.jpg',
    fallbackImage: demoImages.matcha,
  },
  {
    id: 'bac-xiu',
    name: 'Bạc Xỉu',
    price: 35000,
    desc: 'Phiên bản nhẹ của sữa đá — nhiều sữa, ít cà phê, ngọt dịu.',
    tag: 'Classic',
    image: 'menu/bac-xiu.jpg',
    fallbackImage: demoImages.icedCoffee,
  },
  {
    id: 'affogato',
    name: 'Affogato',
    price: 70000,
    desc: 'Một viên kem vanilla Ý, ngập trong shot espresso nóng.',
    tag: 'Dessert',
    image: 'menu/affogato.jpg',
    fallbackImage: demoImages.affogato,
  },
];

export const galleryImages = [
  {
    key: 'gallery/shop-interior.jpg',
    alt: 'Không gian quán',
    fallbackImage: demoImages.shopInterior,
  },
  {
    key: 'gallery/barista-pour.jpg',
    alt: 'Barista rót cà phê',
    fallbackImage: demoImages.baristaPour,
  },
  {
    key: 'gallery/beans.jpg',
    alt: 'Hạt cà phê',
    fallbackImage: demoImages.beans,
  },
  {
    key: 'gallery/latte-art.jpg',
    alt: 'Latte art',
    fallbackImage: demoImages.latte,
  },
  {
    key: 'gallery/morning-light.jpg',
    alt: 'Ánh sáng buổi sớm',
    fallbackImage: demoImages.morningLight,
  },
  {
    key: 'gallery/customer.jpg',
    alt: 'Khách hàng',
    fallbackImage: demoImages.customer,
  },
  {
    key: 'gallery/dessert.jpg',
    alt: 'Bánh ngọt',
    fallbackImage: demoImages.dessert,
  },
];

export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}
