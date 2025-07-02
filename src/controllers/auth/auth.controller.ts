import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { authSerive } from '../../services/auth.service';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<Response | any> => {
  const { username, password } = req.body;

  try {
    const handleLogin = await authSerive.login({ username, password });
    return res.status(200).json({
      status: 200,
      message: 'login successfully',
      data: {
        id: handleLogin.user.id,
        role: handleLogin.user.name,
        access_token: handleLogin.jwtToken,
      },
    });
  } catch (error: any) {
    console.log('Error = ', error);
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};

export const register = async (req: Request, res: Response): Promise<Response | any> => {
  const { name, username, password, role } = req.body;

  try {
    // const checkUser = await prisma.user.findFirst({
    //   where: {
    //     username,
    //   },
    // });

    // if (checkUser) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: 'An account has been registered',
    //     data: null,
    //   });
    // } else {
    //   const salt = await bcrypt.genSalt();
    //   const hashedPassword = await bcrypt.hash(password, salt);

    //   const newUser = await prisma.user.create({
    //     data: {
    //       name: name,
    //       username: username,
    //       password: hashedPassword,
    //       role: role,
    //     },
    //   });

    //   return res.status(201).json({
    //     status: 201,
    //     message: 'an account successfully register',
    //     data: newUser,
    //   });
    // }

    const newUser = await authSerive.register({ name, username, password, role });

    return res.status(201).json({
      status: 201,
      message: 'an account successfully register',
      data: newUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};
