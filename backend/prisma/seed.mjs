import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const products = [
  { sku: 'AURA-SHOE-001', slug: 'urban-runner', name: 'Urban Runner', category: 'Shoes', price: 4999, image: '👟', description: 'A modern everyday sneaker designed for comfort and style.', stock: 25 },
  { sku: 'AURA-BAG-001', slug: 'classic-leather-bag', name: 'Classic Leather Bag', category: 'Bags', price: 3499, image: '👜', description: 'A clean and elegant bag suitable for everyday use.', stock: 18 },
  { sku: 'AURA-WATCH-001', slug: 'minimal-watch', name: 'Minimal Watch', category: 'Watches', price: 6999, image: '⌚', description: 'A minimal watch with a timeless design.', stock: 12 },
  { sku: 'AURA-CLOTH-001', slug: 'essential-hoodie', name: 'Essential Hoodie', category: 'Clothing', price: 2499, image: '👕', description: 'A comfortable premium hoodie for everyday wear.', stock: 32 },
  { sku: 'AURA-ACC-001', slug: 'classic-sunglasses', name: 'Classic Sunglasses', category: 'Accessories', price: 1999, image: '🕶️', description: 'Classic sunglasses with a modern frame.', stock: 20 },
  { sku: 'AURA-BAG-002', slug: 'everyday-backpack', name: 'Everyday Backpack', category: 'Bags', price: 2999, image: '🎒', description: 'A practical backpack for work, travel and everyday use.', stock: 15 },
];

try {
  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product,
    });
  }

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL.toLowerCase() },
      update: {
        name: process.env.ADMIN_NAME ?? 'Store Admin',
        passwordHash: await hash(process.env.ADMIN_PASSWORD, 12),
        role: 'ADMIN',
      },
      create: {
        name: process.env.ADMIN_NAME ?? 'Store Admin',
        email: process.env.ADMIN_EMAIL.toLowerCase(),
        passwordHash: await hash(process.env.ADMIN_PASSWORD, 12),
        role: 'ADMIN',
        cart: { create: {} },
      },
    });
  }

  console.log(`Seeded ${products.length} products.`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (/authentication failed/i.test(message)) {
    console.error(
      'Seed failed: PostgreSQL rejected the DATABASE_URL credentials. Match the host, port, database, username, and password in backend/.env to the server you use in pgAdmin.',
    );
  } else {
    console.error(`Seed failed: ${message}`);
  }
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
