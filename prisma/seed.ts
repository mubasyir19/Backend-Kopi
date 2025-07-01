import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [{ name: 'Coffee' }, { name: 'Non-Coffee' }, { name: 'Tea' }];

  for (const category of categories) {
    const existing = await prisma.categoryProduct.findFirst({
      where: { name: category.name },
    });

    if (existing) {
      await prisma.categoryProduct.update({
        where: { id: existing.id },
        data: category,
      });
    } else {
      await prisma.categoryProduct.create({
        data: category,
      });
    }
  }

  const coffee = await prisma.categoryProduct.findFirst({
    where: { name: 'Coffee' },
  });

  const nonCoffee = await prisma.categoryProduct.findFirst({
    where: { name: 'Non-Coffee' },
  });

  const tea = await prisma.categoryProduct.findFirst({
    where: { name: 'Tea' },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Kopi Susu Gula Aren',
        categoryId: coffee?.id ?? '',
        description: 'Perpaduan Kopi, susu, dan manisnya gula aren',
        price: 12000,
        image: '/images/coffee-milk.png',
      },
      {
        name: 'Kopi Susu Gula Karamel',
        categoryId: coffee?.id ?? '',
        description: 'Perpaduan Kopi, susu, dan manisnya karamel',
        price: 12000,
        image: '/images/coffee-milk.png',
      },
      {
        name: 'Kopi Susu Gula Hazelnut',
        categoryId: coffee?.id ?? '',
        description: 'Perpaduan Kopi, susu, dan gurihnya hazelnut',
        price: 12000,
        image: '/images/coffee-milk.png',
      },
      {
        name: 'Es Coklat Susu',
        categoryId: nonCoffee?.id ?? '',
        description: 'Perpaduan bubuk coklat asli dengan susu murni',
        price: 12000,
        image: '/images/chocolate-milk.png',
      },
      {
        name: 'Es Taro Susu',
        categoryId: nonCoffee?.id ?? '',
        description: 'Perpaduan bubuk taro dengan susu murni',
        price: 12000,
        image: '/images/taro-milk2.png',
      },
      {
        name: 'Es Teh Lemon',
        categoryId: tea?.id ?? '',
        description: 'Perpaduan teh dengan perasan lemon segar',
        price: 12000,
        image: '/images/ice-lemon-tea.png',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
