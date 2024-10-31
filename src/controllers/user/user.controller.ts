import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response): Promise<Response | any> => {
  const { id } = req.params;
  try {
    const dataUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!dataUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Success get user',
      data: dataUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed get user',
      data: null,
    });
  }
};
