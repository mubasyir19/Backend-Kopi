import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CreateUserData {
  name: string;
  username: string;
  password: string;
  role: 'SuperAdmin' | 'Barista' | 'Cashier' | 'Customer';
}
interface LoginData {
  username: string;
  password: string;
}

const prisma = new PrismaClient();

class AuthService {
  async findUserByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
  }

  async login(data: LoginData) {
    if (!data.username) {
      throw new Error('Username is required');
    }

    if (!data.password) {
      throw new Error('Password is required');
    }

    const existing = await this.findUserByUsername(data.username);
    if (!existing) {
      throw new Error('Account not found');
    }

    const checkPassword = await bcrypt.compare(data.password, existing.password);
    if (!checkPassword) {
      throw new Error('Invalid Password');
    }

    const user = {
      id: existing.id,
      username: existing.username,
      name: existing.name,
      role: existing.role,
    };

    const jwtToken = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { user, jwtToken };
  }

  async register(data: CreateUserData) {
    const user = await this.findUserByUsername(data.username);
    if (user) {
      throw new Error('An Account already exist');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: hashedPassword,
        role: data.role,
      },
    });

    return { newUser };
  }
}

export const authSerive = new AuthService();
