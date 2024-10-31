import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getListOrders = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const listOrder = await prisma.order.findMany({
      include: {
        OrderItem: true,
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

    const addOrder = await prisma.order.create({
      data: {
        userId,
        invoice: `KBB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        OrderItem: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
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
    return res.status(500).json({
      status: 500,
      message: 'failed create order',
      data: null,
    });
  }
};

export const createPayment = async (req: Request, res: Response): Promise<Response | any> => {
  const { orderId, amount } = req.body;
  try {
    const checkOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!checkOrder) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found',
        data: null,
      });
    }

    const checkPayment = await prisma.payment.findFirst({
      where: {
        orderId,
      },
    });

    if (checkPayment) {
      return res.status(404).json({
        status: 404,
        message: 'Payment already exists for this order',
        data: null,
      });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount,
        status: 'Pending',
      },
    });

    return res.status(201).json({
      status: 201,
      message: 'Success create payment',
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed create payment',
      data: null,
    });
  }
};

export const updatePaymentStatus = async (req: Request, res: Response): Promise<Response | any> => {
  const { paymentId, status } = req.body;

  try {
    if (!['Pending', 'Complete', 'Failed'].includes(status)) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid payment',
        data: null,
      });
    }

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
      },
    });

    return res.status(201).json({
      status: 201,
      message: 'Success update status payment',
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed update payment',
      data: null,
    });
  }
};
