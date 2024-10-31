import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getListOrders = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const listOrder = await prisma.order.findMany({
      select: {
        id: true,
        invoice: true,
        userId: true,
        date: true,
        OrderItem: {
          select: {
            id: true,
            orderId: true,
            productId: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'Success get list order',
      data: listOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed get list order',
      data: null,
    });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<Response | any> => {
  const { userId, items } = req.body;

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Order items are required',
        data: null,
      });
    }

    const productIds = items.map((item: { productId: string }) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        price: true,
      },
    });

    const productPriceMap: Record<string, number> = {};
    products.forEach((product) => {
      productPriceMap[product.id] = product.price;
    });

    const addOrder = await prisma.order.create({
      data: {
        userId,
        invoice: `KBB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        OrderItem: {
          create: items.map((item: { productId: string; quantity: number }) => {
            const productPrice = productPriceMap[item.productId];
            const totalPrice = productPrice * item.quantity; // Menghitung total price

            return {
              productId: item.productId,
              quantity: item.quantity,
              price: totalPrice,
            };
          }),
        },
      },
      include: {
        OrderItem: true,
      },
    });

    return res.status(201).json({
      status: 201,
      message: 'Success create order',
      data: addOrder,
    });
  } catch (error) {
    console.log('Error => ', error);
    return res.status(500).json({
      status: 500,
      message: 'failed create order',
      data: null,
    });
  }
};
