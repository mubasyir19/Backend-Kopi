import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const products = await prisma.product.findMany();

    return res.status(200).json({
      status: 200,
      message: 'success get all products',
      data: products,
    });
  } catch (error) {
    // console.log("Error => ", error)
    return res.status(500).json({
      status: 500,
      message: 'failed get all produts',
      data: null,
    });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<Response | any> => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success get the product',
      data: product,
    });
  } catch (error) {
    // console.log("Error => ", error)
    return res.status(500).json({
      status: 500,
      message: 'failed get produt',
      data: null,
    });
  }
};

export const addProduct = async (req: Request, res: Response): Promise<Response | any> => {
  const { categoryId, name, description, price } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        categoryId: categoryId,
        name: name,
        description: description,
        price: price,
      },
    });

    return res.status(201).json({
      status: 201,
      message: 'Success add product',
      data: newProduct,
    });
  } catch (error) {
    // console.log("Error => ", error)
    return res.status(500).json({
      status: 500,
      message: 'failed get all produts',
      data: null,
    });
  }
};
