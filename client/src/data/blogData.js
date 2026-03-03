export const blogPosts = [
  {
    slug: 'how-we-achieve-8-minute-delivery',
    title: 'How We Achieve 8-Minute Delivery',
    date: 'Oct 12, 2024',
    readTime: '6 min read',
    category: 'Engineering',
    categoryColor: 'text-purple-600 bg-purple-50 border-purple-100',
    author: { name: 'Arjun Mehta', role: 'Head of Engineering', avatar: 'AM' },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    excerpt:
      'Behind every 8-minute delivery is a finely tuned machine of predictive inventory, optimised routing, and real-time dispatch. Here\'s how we built it.',
    content: [
      {
        type: 'paragraph',
        text: 'When we first announced our 8-minute delivery promise, most people thought it was a marketing stunt. Eighteen months later, we average 7.4 minutes across all of Gomti Nagar — and we\'re just getting started.'
      },
      {
        type: 'heading',
        text: 'The Dark Store Model'
      },
      {
        type: 'paragraph',
        text: 'Traditional e-commerce warehouses are built for scale, not speed. ShopSphere dark stores — neighbourhood-scale fulfilment centres spaced at most 2 km apart — are designed around a single obsession: time. Each dark store stocks the top 2,000 SKUs demanded in that micro-market, replenished every 4 hours based on live sell-through data.'
      },
      {
        type: 'heading',
        text: 'Predictive Picking'
      },
      {
        type: 'paragraph',
        text: 'Our ML model analyses 90 days of order history, day-of-week patterns, local events (IPL match → cold drink surge), and weather data to pre-position pickers near the right aisles before the orders even arrive. Average pick time: 82 seconds.'
      },
      {
        type: 'callout',
        text: 'We process over 14,000 orders per day across 12 dark stores — with a 99.3% on-time rate.'
      },
      {
        type: 'heading',
        text: 'Real-Time Dispatch Routing'
      },
      {
        type: 'paragraph',
        text: 'Our proprietary routing engine assigns delivery partners using a modified travelling-salesman algorithm that accounts for traffic, rider fatigue, and weather — recalculating every 30 seconds. Riders receive step-by-step navigation optimised for two-wheelers, not cars.'
      },
      {
        type: 'heading',
        text: 'What\'s Next'
      },
      {
        type: 'paragraph',
        text: 'We\'re testing drone deliveries for orders under 500g in select areas. If trials succeed, we expect to cut average delivery time to under 5 minutes by Q2 2025. The 8-minute promise was just the beginning.'
      }
    ],
    related: ['fresh-picks-from-local-farms', 'scaling-to-50-dark-stores']
  },
  {
    slug: 'fresh-picks-from-local-farms',
    title: 'Introducing Fresh Picks from Local Farms',
    date: 'Oct 10, 2024',
    readTime: '4 min read',
    category: 'Product',
    categoryColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    author: { name: 'Priya Sharma', role: 'Head of Product', avatar: 'PS' },
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1200',
    excerpt:
      'We partnered with 200+ local organic farms across Uttar Pradesh to bring hyper-fresh produce to your doorstep — harvested within 24 hours of delivery.',
    content: [
      {
        type: 'paragraph',
        text: 'Freshness has always been our north star. Today we\'re taking a giant leap towards it: introducing Fresh Picks — a curated selection of produce sourced directly from 200+ certified organic farms within 150 km of Lucknow.'
      },
      {
        type: 'heading',
        text: 'Farm to Doorstep in Under 24 Hours'
      },
      {
        type: 'paragraph',
        text: 'Conventional grocery supply chains move produce through 3–5 intermediaries before it reaches a store shelf — a journey that can take 5–7 days. Fresh Picks cuts that to a single hop: farm → our cold storage → your door, in under 24 hours.'
      },
      {
        type: 'callout',
        text: 'Produce in Fresh Picks retains up to 40% more vitamins compared to supermarket equivalents, according to independent lab testing.'
      },
      {
        type: 'heading',
        text: 'Supporting Local Farmers'
      },
      {
        type: 'paragraph',
        text: 'Our platform gives participating farmers real-time demand signals so they can harvest to order rather than to speculation. Farmers receive 30% higher margins compared to selling through traditional mandis, with guaranteed same-day payment.'
      },
      {
        type: 'heading',
        text: 'How to Access Fresh Picks'
      },
      {
        type: 'paragraph',
        text: 'Look for the green "Farm Fresh" badge on product listings. Fresh Picks items are available every morning between 7 AM and 12 PM, restocked daily based on that morning\'s harvest. Limited quantities ensure you always get the freshest batch.'
      }
    ],
    related: ['how-we-achieve-8-minute-delivery', 'scaling-to-50-dark-stores']
  },
  {
    slug: 'scaling-to-50-dark-stores',
    title: 'Scaling to 50 Dark Stores Across North India',
    date: 'Oct 08, 2024',
    readTime: '7 min read',
    category: 'Operations',
    categoryColor: 'text-orange-600 bg-orange-50 border-orange-100',
    author: { name: 'Rahul Gupta', role: 'VP Operations', avatar: 'RG' },
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200',
    excerpt:
      'We went from 3 dark stores in Lucknow to 50 across 8 cities in 14 months. This is the operational playbook that made it possible.',
    content: [
      {
        type: 'paragraph',
        text: 'Fourteen months ago, we operated 3 dark stores — all within Gomti Nagar, Lucknow. Today we run 50 across Lucknow, Kanpur, Agra, Varanasi, Prayagraj, Gorakhpur, Meerut, and Aligarh. This is how we scaled without breaking.'
      },
      {
        type: 'heading',
        text: 'The Playbook: Standardise First, Scale Second'
      },
      {
        type: 'paragraph',
        text: 'Before expanding to a new city, we spend 6 weeks in a "standardisation sprint" — documenting every process down to the shelf-level planogram. This ensures every new dark store opens with an identical operational blueprint, reducing training time from 3 weeks to 5 days.'
      },
      {
        type: 'heading',
        text: 'Inventory Intelligence at Scale'
      },
      {
        type: 'paragraph',
        text: 'Each city has different tastes. Varanasi over-indexes on sweets and paan masala; Agra on dairy and tourist snacks. Our city-specific demand model calibrates SKU selection independently for each micro-market, so a dark store in Varanasi and one in Meerut carry very different product mixes despite using the same infrastructure.'
      },
      {
        type: 'callout',
        text: 'Our average new city launch time has dropped from 11 weeks to 19 days across the last 4 expansions.'
      },
      {
        type: 'heading',
        text: 'People: The Real Constraint'
      },
      {
        type: 'paragraph',
        text: 'Technology is replicable; great people are not. We\'ve invested heavily in a regional operations manager programme — each ROM manages 4–6 stores and lives within 5 km of their cluster. This hyper-local accountability has been the single biggest driver of our 99.1% SLA adherence across all stores.'
      },
      {
        type: 'heading',
        text: 'What\'s Next: 100 Stores by 2025'
      },
      {
        type: 'paragraph',
        text: 'We\'re targeting 100 dark stores across North and Central India by end of 2025. New cities on our roadmap include Jaipur, Bhopal, Indore, and Patna. If you\'re a city ops leader who wants to build the future of instant commerce, we\'re hiring.'
      }
    ],
    related: ['how-we-achieve-8-minute-delivery', 'fresh-picks-from-local-farms']
  }
];

export const getBlogBySlug = (slug) =>
  blogPosts.find((p) => p.slug === slug) || null;

export const getRelatedPosts = (slugs) =>
  slugs.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean);
