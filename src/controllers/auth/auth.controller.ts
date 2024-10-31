import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<Response | any> => {
  const { username, password } = req.body;

  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
        data: null,
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid password',
        data: null,
      });
    }

    const user = {
      id: checkUser.id,
      name: checkUser.name,
      username: checkUser.username,
      role: checkUser.role,
    };

    const token = jwt.sign(user, process.env.SECRET_KEY as string);

    return res.status(200).json({
      status: 200,
      message: 'login successfully',
      data: {
        id: user.id,
        role: user.role,
        access_token: token,
      },
    });
  } catch (error) {
    console.log('Error = ', error);
    return res.status(500).json({
      status: 500,
      message: 'failed login',
      data: null,
    });
  }
};

export const register = async (req: Request, res: Response): Promise<Response | any> => {
  const { name, username, password, role } = req.body;

  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUser) {
      return res.status(400).json({
        status: 400,
        message: 'An account has been registered',
        data: null,
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          username: username,
          password: hashedPassword,
          role: role,
        },
      });

      return res.status(201).json({
        status: 201,
        message: 'an account successfully register',
        data: newUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'failed register account',
      data: null,
    });
  }
};
