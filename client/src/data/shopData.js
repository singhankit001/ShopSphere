export const categories = [
  { id: 'c1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735332514-2', color: '#f0fdf4' },
  { id: 'c2', name: 'Dairy, Bread & Eggs', slug: 'dairy-bread-eggs', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735399723-3', color: '#fffbeb' },
  { id: 'c3', name: 'Snacks & Munchies', slug: 'snacks-munchies', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735447101-5', color: '#fdf2f8' },
  { id: 'c4', name: 'Cold Drinks & Juices', slug: 'cold-drinks-juices', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1708323450917-2', color: '#eff6ff' },
  { id: 'c5', name: 'Instant Food', slug: 'instant-food', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735496464-7', color: '#fff1f2' },
  { id: 'c6', name: 'Tea, Coffee & More', slug: 'tea-coffee-more', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1708323483984-4', color: '#fef3c7' },
  { id: 'c7', name: 'Bakery & Biscuits', slug: 'bakery-biscuits', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735366487-11', color: '#fff7ed' },
  { id: 'c8', name: 'Sweet Tooth', slug: 'sweet-tooth', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735520448-12', color: '#fdf2f2' },
  { id: 'c9', name: 'Atta, Rice & Dal', slug: 'atta-rice-dal', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735315410-15', color: '#fafaf9' },
  { id: 'c10', name: 'Oil, Ghee & Masala', slug: 'oil-ghee-masala', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735418146-17', color: '#fffcf0' },
  { id: 'c11', name: 'Personal Care', slug: 'personal-care', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735544498-19', color: '#f5f3ff' },
  { id: 'c12', name: 'Baby Care', slug: 'baby-care', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735567015-21', color: '#ecfeff' },
  { id: 'c13', name: 'Household Essentials', slug: 'household-essentials', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735588365-23', color: '#f8fafc' },
  { id: 'c14', name: 'Cleaning Needs', slug: 'cleaning-needs', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735609384-25', color: '#f0f9ff' },
  { id: 'c15', name: 'Pet Care', slug: 'pet-care', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735629471-27', color: '#fffafb' },
  { id: 'c16', name: 'Electronics', slug: 'electronics-accessories', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1708323506299-6', color: '#f1f5f9' },
  { id: 'c17', name: 'Beauty & Grooming', slug: 'beauty-grooming', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735650224-29', color: '#fdf2f8' },
  { id: 'c18', name: 'Health & Wellness', slug: 'health-wellness', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1707735671510-31', color: '#f0fdf4' }
];

export const products = [
  // Fruits & Veggies
  { _id: 'p1', name: 'Fresh Banana', brand: 'FarmDirect', price: 60, discountPrice: 48, weight: '1 dozen', category: 'Fruits & Vegetables', slug: 'fresh-banana', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=400', deliveryTime: '9', rating: 4.8, isBestseller: true },
  { _id: 'p2', name: 'Red Apple', brand: 'Royal Gala', price: 180, discountPrice: 159, weight: '4 units', category: 'Fruits & Vegetables', slug: 'red-apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?q=80&w=400', deliveryTime: '12', rating: 4.7 },
  { _id: 'p3', name: 'Tomato Hybrid', brand: 'FarmFresh', price: 40, discountPrice: 32, weight: '500g', category: 'Fruits & Vegetables', slug: 'tomato-hybrid', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400', deliveryTime: '10', rating: 4.6 },
  { _id: 'p4', name: 'Onion', brand: 'Local', price: 35, weight: '1kg', category: 'Fruits & Vegetables', slug: 'onion', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=400', deliveryTime: '11', rating: 4.5 },
  { _id: 'p5', name: 'Potato', brand: 'Jyoti', price: 30, weight: '1kg', category: 'Fruits & Vegetables', slug: 'potato', image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac10d5?q=80&w=400', deliveryTime: '10', rating: 4.4 },
  { _id: 'p6', name: 'Coriander Leaves', brand: 'Fresh', price: 15, weight: '100g', category: 'Fruits & Vegetables', slug: 'coriander', image: 'https://images.unsplash.com/photo-1514944651163-14975c74238e?q=80&w=400', deliveryTime: '8', rating: 4.7 },

  // Dairy & Bread
  { _id: 'p7', name: 'Amul Gold Milk', brand: 'Amul', price: 66, discountPrice: 64, weight: '1L', category: 'Dairy, Bread & Eggs', slug: 'amul-milk', image: 'https://images.unsplash.com/photo-1550583724-125581820ffb?q=80&w=400', deliveryTime: '8', rating: 4.9, isBestseller: true },
  { _id: 'p8', name: 'Brown Bread', brand: 'Harvest', price: 50, discountPrice: 45, weight: '400g', category: 'Dairy, Bread & Eggs', slug: 'brown-bread', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400', deliveryTime: '10', rating: 4.7 },
  { _id: 'p9', name: 'Fresh Paneer', brand: 'Amul', price: 120, discountPrice: 110, weight: '200g', category: 'Dairy, Bread & Eggs', slug: 'paneer', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400', deliveryTime: '9', rating: 4.8 },
  { _id: 'p10', name: 'Amul Butter', brand: 'Amul', price: 56, weight: '100g', category: 'Dairy, Bread & Eggs', slug: 'butter', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=400', deliveryTime: '8', rating: 4.9 },
  { _id: 'p11', name: 'Fresh Curd', brand: 'Mother Dairy', price: 35, weight: '200g', category: 'Dairy, Bread & Eggs', slug: 'curd', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400', deliveryTime: '9', rating: 4.7 },
  { _id: 'p12', name: 'Farm Fresh Eggs', brand: 'Eggoz', price: 84, discountPrice: 78, weight: '6 units', category: 'Dairy, Bread & Eggs', slug: 'eggs', image: 'https://images.unsplash.com/photo-1582722872445-44ad5c78a9dd?q=80&w=400', deliveryTime: '12', rating: 4.8 },

  // Snacks & Munchies
  { _id: 'p13', name: 'Lays Classic Salted', brand: 'Lays', price: 20, weight: '50g', category: 'Snacks & Munchies', slug: 'lays-classic', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=400', deliveryTime: '7', rating: 4.5, isBestseller: true },
  { _id: 'p14', name: 'Kurkure Masala Munch', brand: 'Kurkure', price: 20, weight: '90g', category: 'Snacks & Munchies', slug: 'kurkure', image: 'https://images.unsplash.com/photo-1621447509323-570a16e4f9c6?q=80&w=400', deliveryTime: '8', rating: 4.6 },
  { _id: 'p15', name: 'Cornitos Nachos', brand: 'Cornitos', price: 90, discountPrice: 75, weight: '150g', category: 'Snacks & Munchies', slug: 'nachos', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400', deliveryTime: '10', rating: 4.4 },
  { _id: 'p16', name: 'Aloo Bhujia', brand: 'Haldiram', price: 55, discountPrice: 48, weight: '200g', category: 'Snacks & Munchies', slug: 'bhujia', image: 'https://images.unsplash.com/photo-1599490659223-930b449970c3?q=80&w=400', deliveryTime: '9', rating: 4.7 },
  { _id: 'p17', name: 'Act II Popcorn', brand: 'Act II', price: 40, weight: '150g', category: 'Snacks & Munchies', slug: 'popcorn', image: 'https://images.unsplash.com/photo-1578912853046-01851345dc11?q=80&w=400', deliveryTime: '11', rating: 4.5 },

  // Cold Drinks
  { _id: 'p18', name: 'Coca-Cola', brand: 'Coke', price: 40, weight: '750ml', category: 'Cold Drinks & Juices', slug: 'coke', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400', deliveryTime: '8', rating: 4.7, isBestseller: true },
  { _id: 'p19', name: 'Sprite', brand: 'Sprite', price: 40, weight: '750ml', category: 'Cold Drinks & Juices', slug: 'sprite', image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=400', deliveryTime: '9', rating: 4.6 },
  { _id: 'p20', name: 'Real Orange Juice', brand: 'Real', price: 120, discountPrice: 99, weight: '1L', category: 'Cold Drinks & Juices', slug: 'orange-juice', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400', deliveryTime: '12', rating: 4.8 },
  { _id: 'p21', name: 'Tropicana Guava', brand: 'Tropicana', price: 110, discountPrice: 95, weight: '1L', category: 'Cold Drinks & Juices', slug: 'guava-juice', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400', deliveryTime: '10', rating: 4.7 },
  { _id: 'p22', name: 'Paper Boat Aam Panna', brand: 'Paper Boat', price: 60, weight: '200ml', category: 'Cold Drinks & Juices', slug: 'aam-panna', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=400', deliveryTime: '11', rating: 4.9 },

  // Personal Care
  { _id: 'p23', name: 'Colgate Strong Teeth', brand: 'Colgate', price: 120, discountPrice: 99, weight: '200g', category: 'Personal Care', slug: 'colgate', image: 'https://images.unsplash.com/photo-1559594418-7417f2f45422?q=80&w=400', deliveryTime: '10', rating: 4.8 },
  { _id: 'p24', name: 'Dove Cream Bar', brand: 'Dove', price: 65, weight: '100g', category: 'Personal Care', slug: 'dove-soap', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=400', deliveryTime: '12', rating: 4.9 },
  { _id: 'p25', name: 'Panting Shampoo', brand: 'Pantene', price: 199, discountPrice: 175, weight: '340ml', category: 'Personal Care', slug: 'shampoo', image: 'https://images.unsplash.com/photo-1535585209827-a15fefbc74a9?q=80&w=400', deliveryTime: '14', rating: 4.7 },
  { _id: 'p26', name: 'Himalaya Face Wash', brand: 'Himalaya', price: 150, discountPrice: 135, weight: '150ml', category: 'Personal Care', slug: 'face-wash', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400', deliveryTime: '11', rating: 4.8 },
  { _id: 'p27', name: 'Nivea Roll-On', brand: 'Nivea', price: 199, weight: '50ml', category: 'Personal Care', slug: 'deodorant', image: 'https://images.unsplash.com/photo-1594434297575-583848100735?q=80&w=400', deliveryTime: '13', rating: 4.6 },

  // Household
  { _id: 'p28', name: 'Surf Excel Matic', brand: 'Surf Excel', price: 250, discountPrice: 220, weight: '1kg', category: 'Household Essentials', slug: 'surf-excel', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400', deliveryTime: '15', rating: 4.9 },
  { _id: 'p29', name: 'Vim Liquid', brand: 'Vim', price: 105, discountPrice: 99, weight: '500ml', category: 'Cleaning Needs', slug: 'vim', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400', deliveryTime: '10', rating: 4.8 },
  { _id: 'p30', name: 'Harpic Blue', brand: 'Harpic', price: 90, weight: '500ml', category: 'Cleaning Needs', slug: 'harpic', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400', deliveryTime: '12', rating: 4.7 },
  { _id: 'p31', name: 'Garbage Bags', brand: 'Premium', price: 120, discountPrice: 99, weight: '30 units', category: 'Household Essentials', slug: 'garbage-bags', image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=400', deliveryTime: '14', rating: 4.5 },
  { _id: 'p32', name: 'Tissue Roll', brand: 'Selpak', price: 40, weight: '1 unit', category: 'Household Essentials', slug: 'tissue-roll', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400', deliveryTime: '9', rating: 4.6 },

  // Electronics
  { _id: 'p33', name: 'USB-C Cable', brand: 'Apple', price: 1900, discountPrice: 1599, weight: '1m', category: 'Electronics', slug: 'usb-cable', image: 'https://images.unsplash.com/photo-1586944210611-f1f3320c926c?q=80&w=400', deliveryTime: '18', rating: 4.9 },
  { _id: 'p34', name: 'Wired Earphones', brand: 'Boat', price: 499, discountPrice: 399, weight: '1 unit', category: 'Electronics', slug: 'earphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400', deliveryTime: '15', rating: 4.8 },
  { _id: 'p35', name: 'Power Bank', brand: 'Mi', price: 1599, discountPrice: 1299, weight: '10000mAh', category: 'Electronics', slug: 'power-bank', image: 'https://images.unsplash.com/photo-1609091839311-d53681962025?q=80&w=400', deliveryTime: '20', rating: 4.7 },
  { _id: 'p36', name: 'Wall Charger', brand: 'Samsung', price: 999, weight: '25W', category: 'Electronics', slug: 'charger', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=400', deliveryTime: '16', rating: 4.8 },
  { _id: 'p37', name: 'Bluetooth Speaker', brand: 'JBL', price: 2999, discountPrice: 2499, weight: '1 unit', category: 'Electronics', slug: 'speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400', deliveryTime: '22', rating: 4.9 },

  // Beauty
  { _id: 'p38', name: 'Face Moisturizer', brand: 'Neutrogena', price: 450, discountPrice: 399, weight: '50g', category: 'Beauty & Grooming', slug: 'moisturizer', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400', deliveryTime: '15', rating: 4.8 },
  { _id: 'p39', name: 'Sunscreen SPF 50', brand: 'La Shield', price: 790, discountPrice: 650, weight: '60g', category: 'Beauty & Grooming', slug: 'sunscreen', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400', deliveryTime: '14', rating: 4.9 },
  { _id: 'p40', name: 'Lip Balm', brand: 'Nivea', price: 199, weight: '4.8g', category: 'Beauty & Grooming', slug: 'lip-balm', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400', deliveryTime: '12', rating: 4.7 },
  { _id: 'p41', name: 'Kajal Magique', brand: 'LOreal', price: 299, weight: '1 unit', category: 'Beauty & Grooming', slug: 'kajal', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400', deliveryTime: '11', rating: 4.8 },
  { _id: 'p42', name: 'Premium Perfume', brand: 'Skinn', price: 1899, discountPrice: 1599, weight: '50ml', category: 'Beauty & Grooming', slug: 'perfume', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400', deliveryTime: '16', rating: 4.9 }
];

export const getProductsByCategory = (categoryName) => {
  if (categoryName === 'All') return products;
  return products.filter(p => p.category === categoryName);
};

export const getBestsellers = () => {
  return products.filter(p => p.isBestseller);
};
