export const categories = [
  { 
    id: 'c1', 
    name: 'Fruits & Vegetables', 
    slug: 'fruits-vegetables', 
    image: '/images/categories/fruits_veg.jpg', 
    color: '#F3FAF7', 
    description: 'Fresh from farms' 
  },
  { 
    id: 'c2', 
    name: 'Dairy, Bread & Eggs', 
    slug: 'dairy-bread-eggs', 
    image: '/images/categories/dairy_eggs.png', 
    color: '#FFF8E1', 
    description: 'Daily essentials' 
  },
  { 
    id: 'c3', 
    name: 'Snacks & Munchies', 
    slug: 'snacks-munchies', 
    image: '/images/categories/snacks.jpg', 
    color: '#FFF1F3', 
    description: 'Quick bites' 
  },
  { 
    id: 'c4', 
    name: 'Cold Drinks & Juices', 
    slug: 'cold-drinks-juices', 
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', 
    color: '#F0F7FF', 
    description: 'Stay refreshed' 
  },
  { 
    id: 'c5', 
    name: 'Instant Food', 
    slug: 'instant-food', 
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', 
    color: '#FFF1F3', 
    description: 'Ready in mins' 
  },
  { 
    id: 'c6', 
    name: 'Tea, Coffee & More', 
    slug: 'tea-coffee-more', 
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', 
    color: '#FFF8E1', 
    description: 'Premium brews' 
  },
  { 
    id: 'c7', 
    name: 'Bakery & Biscuits', 
    slug: 'bakery-biscuits', 
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 
    color: '#FDF2F8', 
    description: 'Freshly baked' 
  },
  { 
    id: 'c8', 
    name: 'Sweet Tooth', 
    slug: 'sweet-tooth', 
    image: 'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?w=400', 
    color: '#FFF1F2', 
    description: 'Desserts & more' 
  },
  { 
    id: 'c9', 
    name: 'Atta, Rice & Dal', 
    slug: 'atta-rice-dal', 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 
    color: '#FEFCE8', 
    description: 'Staple grains' 
  },
  { 
    id: 'c10', 
    name: 'Oil, Ghee & Masala', 
    slug: 'oil-ghee-masala', 
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 
    color: '#FFF7ED', 
    description: 'Cooking essentials' 
  },
  { 
    id: 'c11', 
    name: 'Personal Care', 
    slug: 'personal-care', 
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', 
    color: '#F0FDFA', 
    description: 'Self-care items' 
  },
  { 
    id: 'c12', 
    name: 'Baby Care', 
    slug: 'baby-care', 
    image: '/images/categories/baby_care.jpg', 
    color: '#F5F3FF', 
    description: 'For your little ones' 
  },
  { 
    id: 'c13', 
    name: 'Household Essentials', 
    slug: 'household-essentials', 
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400', 
    color: '#F8FAFC', 
    description: 'Home needs' 
  },
  { 
    id: 'c14', 
    name: 'Cleaning Needs', 
    slug: 'cleaning-needs', 
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', 
    color: '#F0F9FF', 
    description: 'Stay sparkling clean' 
  },
  { 
    id: 'c15', 
    name: 'Pet Care', 
    slug: 'pet-care', 
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', 
    color: '#FFF7ED', 
    description: 'For your furry friends' 
  },
  { 
    id: 'c16', 
    name: 'Electronics', 
    slug: 'electronics', 
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', 
    color: '#F1F5F9', 
    description: 'Gadgets & more' 
  },
  { 
    id: 'c17', 
    name: 'Beauty & Grooming', 
    slug: 'beauty-grooming', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400', 
    color: '#FDF2F8', 
    description: 'Look your best' 
  },
  { 
    id: 'c18', 
    name: 'Health & Wellness', 
    slug: 'health-wellness', 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', 
    color: '#F0FDF4', 
    description: 'Stay healthy' 
  }
];

export const productsByCategory = {
  'fruits-vegetables': [
    { 
      _id: 'p1', 
      name: 'Fresh Banana', 
      brand: 'FarmDirect', 
      price: 60, 
      discountPrice: 48, 
      weight: '1 dozen', 
      category: 'Fruits & Vegetables', 
      categorySlug: 'fruits-vegetables', 
      slug: 'fresh-banana', 
      image: '/assets/products/fresh-banana.jpg', 
      deliveryTime: '9', 
      rating: 4.8, 
      isBestseller: true, 
      description: 'Naturally ripened fresh bananas, perfect for breakfast.' 
    },
    { 
      _id: 'p2', 
      name: 'Royal Gala Apple', 
      brand: 'Royal Gala', 
      price: 180, 
      discountPrice: 159, 
      weight: '4 units', 
      category: 'Fruits & Vegetables', 
      categorySlug: 'fruits-vegetables', 
      slug: 'royal-gala-apple', 
      image: '/assets/products/royal-gala-apple.jpg', 
      deliveryTime: '12', 
      rating: 4.7, 
      description: 'Sweet and crunchy Royal Gala apples sourced from premium orchards.' 
    },
    { 
      _id: 'p3', 
      name: 'Tomato Hybrid', 
      brand: 'FarmFresh', 
      price: 40, 
      discountPrice: 32, 
      weight: '500g', 
      category: 'Fruits & Vegetables', 
      categorySlug: 'fruits-vegetables', 
      slug: 'tomato-hybrid', 
      image: '/assets/products/tomato-hybrid.jpg', 
      deliveryTime: '10', 
      rating: 4.6, 
      description: 'Fresh, juicy tomatoes perfect for salads and gravies.' 
    },
    { 
      _id: 'p4', 
      name: 'Onion', 
      brand: 'FarmFresh', 
      price: 50, 
      weight: '1kg', 
      category: 'Fruits & Vegetables', 
      categorySlug: 'fruits-vegetables', 
      slug: 'onion', 
      image: '/assets/products/onion.jpg', 
      deliveryTime: '10', 
      rating: 4.5 
    },
    { 
      _id: 'p5', 
      name: 'Potato', 
      brand: 'FarmFresh', 
      price: 40, 
      weight: '1kg', 
      category: 'Fruits & Vegetables', 
      categorySlug: 'fruits-vegetables', 
      slug: 'potato', 
      image: '/assets/products/potato.jpg', 
      deliveryTime: '10', 
      rating: 4.4 
    }
  ],
  'dairy-bread-eggs': [
    { 
      _id: 'p7', 
      name: 'Amul Gold Milk', 
      brand: 'Amul', 
      price: 66, 
      discountPrice: 64, 
      weight: '1L', 
      category: 'Dairy, Bread & Eggs', 
      categorySlug: 'dairy-bread-eggs', 
      slug: 'amul-gold-milk', 
      image: '/assets/products/amul-gold-milk.jpg', 
      deliveryTime: '8', 
      rating: 4.9, 
      isBestseller: true, 
      description: 'Rich and creamy full-cream milk.' 
    },
    { 
      _id: 'p8', 
      name: 'Brown Bread', 
      brand: 'Harvest', 
      price: 45, 
      weight: '400g', 
      category: 'Dairy, Bread & Eggs', 
      categorySlug: 'dairy-bread-eggs', 
      slug: 'brown-bread', 
      image: '/assets/products/brown-bread.jpg', 
      deliveryTime: '10', 
      rating: 4.7 
    },
    { 
      _id: 'p12', 
      name: 'Farm Fresh Eggs', 
      brand: 'Eggo', 
      price: 42, 
      weight: '6 units', 
      category: 'Dairy, Bread & Eggs', 
      categorySlug: 'dairy-bread-eggs', 
      slug: 'farm-fresh-eggs', 
      image: '/assets/products/farm-fresh-eggs.jpg', 
      deliveryTime: '10', 
      rating: 4.7 
    },
    { 
      _id: 'p10', 
      name: 'Amul Butter', 
      brand: 'Amul', 
      price: 250, 
      weight: '500g', 
      category: 'Dairy, Bread & Eggs', 
      categorySlug: 'dairy-bread-eggs', 
      slug: 'amul-butter', 
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=400', 
      deliveryTime: '8', 
      rating: 4.9 
    }
  ],
  'snacks-munchies': [
    { 
      _id: 'p13', 
      name: 'Lays Classic Salted', 
      brand: 'Lays', 
      price: 20, 
      weight: '50g', 
      category: 'Snacks & Munchies', 
      categorySlug: 'snacks-munchies', 
      slug: 'lays-classic-salted', 
      image: '/assets/products/lays-classic-salted.jpg', 
      deliveryTime: '7', 
      rating: 4.5, 
      isBestseller: true 
    },
    { 
      _id: 'p14', 
      name: 'Kurkure Masala Munch', 
      brand: 'Kurkure', 
      price: 20, 
      weight: '80g', 
      category: 'Snacks & Munchies', 
      categorySlug: 'snacks-munchies', 
      slug: 'kurkure-masala-munch', 
      image: '/assets/products/kurkure-masala-munch.jpg', 
      deliveryTime: '7', 
      rating: 4.4 
    },
    { 
      _id: 'p15', 
      name: 'Doritos Cheese', 
      brand: 'Doritos', 
      price: 50, 
      weight: '100g', 
      category: 'Snacks & Munchies', 
      categorySlug: 'snacks-munchies', 
      slug: 'doritos-cheese', 
      image: '/assets/products/doritos-cheese.jpg', 
      deliveryTime: '8', 
      rating: 4.6 
    }
  ],
  'cold-drinks-juices': [
    { 
      _id: 'p16', 
      name: 'Coca-Cola', 
      brand: 'Coke', 
      price: 40, 
      weight: '750ml', 
      category: 'Cold Drinks & Juices', 
      categorySlug: 'cold-drinks-juices', 
      slug: 'coke', 
      image: '/assets/products/coke.jpg', 
      deliveryTime: '8', 
      rating: 4.7, 
      isBestseller: true 
    }
  ],
  'instant-food': [
    { 
      _id: 'p44', 
      name: 'Maggi Noodles', 
      brand: 'Nestle', 
      price: 15, 
      weight: '70g', 
      category: 'Instant Food', 
      categorySlug: 'instant-food', 
      slug: 'maggi', 
      image: '/assets/products/maggi.jpg', 
      deliveryTime: '8', 
      rating: 4.9 
    }
  ]
};

export const products = Object.values(productsByCategory).flat();

export const getProductsByCategory = (categorySlug) => {
  return productsByCategory[categorySlug] || [];
};

export const getBestsellers = () => {
  return products.filter(p => p.isBestseller);
};
