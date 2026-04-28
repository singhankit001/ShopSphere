const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();

    // Create Categories
    const categoriesData = [
      { 
        name: 'Fruits & Veggies', 
        slug: 'fruits-vegetables', 
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Fresh from the farm vegetables and fruits.'
      },
      { 
        name: 'Snacks & Drinks', 
        slug: 'snacks-munchies', 
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527ec087?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Crispy snacks and refreshing munchies.'
      },
      { 
        name: 'Dairy & Bread', 
        slug: 'dairy-bread-eggs', 
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Daily essentials like milk, bread, and eggs.'
      },
      { 
        name: 'Beverages', 
        slug: 'cold-drinks-juices', 
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Cold drinks, juices, and energy drinks.'
      },
      { 
        name: 'Personal Care', 
        slug: 'personal-care', 
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Skin care, hair care, and hygiene products.'
      },
      { 
        name: 'Household', 
        slug: 'household-items', 
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Cleaning supplies and home essentials.'
      },
      { 
        name: 'Electronics', 
        slug: 'electronics', 
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Latest gadgets and electronic accessories.'
      },
      { 
        name: 'Beauty', 
        slug: 'beauty', 
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=300&h=300&auto=format&fit=crop',
        description: 'Cosmetics and premium beauty products.'
      }
    ];

    const categories = await Category.insertMany(categoriesData);
    const findCat = (slug) => categories.find(c => c.slug === slug)._id;

    // Create Products
    const products = [
      // Fruits & Veggies
      {
        name: 'Fresh Banana (Robusta)',
        description: 'Fresh yellow bananas, rich in potassium.',
        price: 60,
        discountPrice: 48,
        category: findCat('fruits-vegetables'),
        stock: 100,
        image: 'https://images.unsplash.com/photo-1571771894821-ad9958a3f747?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '8 min',
        brand: 'ShopSphere Fresh',
        weight: '6 units',
        rating: 4.5,
      },
      {
        name: 'Organic Red Tomato',
        description: 'Farm-fresh organic red tomatoes.',
        price: 40,
        discountPrice: 32,
        category: findCat('fruits-vegetables'),
        stock: 80,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '10 min',
        brand: 'Organic Greens',
        weight: '500g',
        rating: 4.4,
      },
      // Snacks
      {
        name: 'Lays Magic Masala Chips',
        description: "India's favorite spicy potato chips.",
        price: 20,
        discountPrice: 18,
        category: findCat('snacks-munchies'),
        stock: 500,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '10 min',
        brand: 'Lays',
        weight: '50g',
        rating: 4.8,
      },
      {
        name: 'Kurkure Masala Munch',
        description: 'Spicy and crunchy corn snacks.',
        price: 20,
        discountPrice: 18,
        category: findCat('snacks-munchies'),
        stock: 400,
        image: 'https://images.unsplash.com/photo-1621447508323-271225c758f0?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '10 min',
        brand: 'Kurkure',
        weight: '90g',
        rating: 4.7,
      },
      // Dairy
      {
        name: 'Amul Taaza Toned Milk',
        description: 'Pasteurized toned milk for a healthy start.',
        price: 54,
        discountPrice: 52,
        category: findCat('dairy-bread-eggs'),
        stock: 300,
        image: 'https://images.unsplash.com/photo-1550583724-1255818c053b?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '9 min',
        brand: 'Amul',
        weight: '1L',
        rating: 4.9,
      },
      {
        name: 'Harvest Gold White Bread',
        description: 'Soft and fresh white bread.',
        price: 45,
        discountPrice: 40,
        category: findCat('dairy-bread-eggs'),
        stock: 150,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '12 min',
        brand: 'Harvest Gold',
        weight: '400g',
        rating: 4.6,
      },
      // Beverages
      {
        name: 'Coca Cola 750ml',
        description: 'Refreshing carbonated soft drink.',
        price: 45,
        discountPrice: 40,
        category: findCat('cold-drinks-juices'),
        stock: 200,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '12 min',
        brand: 'Coca Cola',
        weight: '750ml',
        rating: 4.6,
      },
      {
        name: 'Tropicana Orange Juice',
        description: '100% pure orange juice.',
        price: 120,
        discountPrice: 100,
        category: findCat('cold-drinks-juices'),
        stock: 100,
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '15 min',
        brand: 'Tropicana',
        weight: '1L',
        rating: 4.5,
      },
      // Personal Care
      {
        name: 'Dove Cream Beauty Bar',
        description: 'Gentle on skin, Dove moisturizes while it cleans.',
        price: 70,
        discountPrice: 65,
        category: findCat('personal-care'),
        stock: 150,
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '15 min',
        brand: 'Dove',
        weight: '100g',
        rating: 4.7,
      },
      {
        name: 'Head & Shoulders Shampoo',
        description: 'Anti-dandruff shampoo for smooth hair.',
        price: 180,
        discountPrice: 165,
        category: findCat('personal-care'),
        stock: 80,
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '15 min',
        brand: 'Head & Shoulders',
        weight: '180ml',
        rating: 4.4,
      },
      // Household
      {
        name: 'Vim Dishwash Liquid',
        description: 'Powerful dishwashing liquid with lemon power.',
        price: 105,
        discountPrice: 95,
        category: findCat('household-items'),
        stock: 120,
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '20 min',
        brand: 'Vim',
        weight: '500ml',
        rating: 4.8,
      },
      // Electronics
      {
        name: 'Apple AirPods Pro 2',
        description: 'Active Noise Cancellation and personalized Spatial Audio.',
        price: 24900,
        discountPrice: 22900,
        category: findCat('electronics'),
        stock: 20,
        image: 'https://images.unsplash.com/photo-1588423770674-f2855ee476e7?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '30 min',
        brand: 'Apple',
        weight: '1 unit',
        rating: 4.9,
      },
      {
        name: 'Boat Bassheads 100',
        description: 'Wired earphones with super extra bass.',
        price: 999,
        discountPrice: 399,
        category: findCat('electronics'),
        stock: 100,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '25 min',
        brand: 'boAt',
        weight: '1 unit',
        rating: 4.3,
      },
      // Beauty
      {
        name: 'Lakme Absolute Lipstick',
        description: 'Matte finish long-lasting lipstick.',
        price: 850,
        discountPrice: 750,
        category: findCat('beauty'),
        stock: 50,
        image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=500&h=500&auto=format&fit=crop',
        deliveryTime: '20 min',
        brand: 'Lakme',
        weight: '3.7g',
        rating: 4.6,
      }
    ];

    await Product.insertMany(products);
    console.log('✅ Sample data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
