const fs = require('fs');
const path = require('path');

const mappings = {
  '/components/common/Skeleton': '/components/ui/Skeleton',
  '/components/common/ScrollToTop': '/components/ui/ScrollToTop',
  '/components/common/ShopSphereLogo': '/components/ui/ShopSphereLogo',
  '/components/common/ProductCard': '/components/features/ProductCard',
  '/components/layout/CartDrawer': '/components/features/CartDrawer',
  '/components/common/CategoryCard': '/components/features/CategoryCard',
  '/components/layout/Footer': '/components/common/Footer',
  '/components/layout/Navbar': '/components/common/Navbar',
  '/components/layout/Layout': '/components/common/Layout',
  '/components/layout/ExploreMenu': '/components/common/ExploreMenu',
  '/components/location/LocationManager': '/components/features/LocationManager',
  '/components/location/MapComponent': '/components/features/MapComponent'
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      Object.keys(mappings).forEach(oldPath => {
        const newPath = mappings[oldPath];
        if (content.includes(oldPath)) {
          content = content.split(oldPath).join(newPath);
          changed = true;
        }
      });
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  });
}

walk('./client/src');
