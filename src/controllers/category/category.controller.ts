import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllCategories = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const categories = await prisma.categoryProduct.findMany();

    return res.status(200).json({
      status: 200,
      message: 'Success get all categories',
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed get categories',
      data: null,
    });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<Response | any> => {
  const { id } = req.params;
  try {
    const category = await prisma.categoryProduct.findFirst({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'Success get category',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed get category',
      data: null,
    });
  }
};

export const addCategory = async (req: Request, res: Response): Promise<Response | any> => {
  const { name } = req.body;
  try {
    const check = await prisma.categoryProduct.findFirst({
      where: {
        name,
      },
    });

    if (check) {
      return res.status(400).json({
        status: 400,
        message: 'Data has been added',
        data: null,
      });
    }

    const result = await prisma.categoryProduct.create({
      data: {
        name,
      },
    });

    return res.status(201).json({
      status: 201,
      message: 'Success add category',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed get category',
      data: null,
    });
  }
};
