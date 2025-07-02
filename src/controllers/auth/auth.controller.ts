import { Request, Response } from 'express';
import { authSerive } from '../../services/auth.service';
import { ResponseUtil } from '../../utils/response';

export const login = async (req: Request, res: Response): Promise<Response | any> => {
  const { username, password } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json(ResponseUtil.error('Username is required'));
  }

  if (!password || password.trim() === '') {
    return res.status(400).json(ResponseUtil.error('Password is required'));
  }

  try {
    const handleLogin = await authSerive.login({ username, password });
    return res.status(400).json(
      ResponseUtil.success(
        {
          id: handleLogin.user.id,
          role: handleLogin.user.name,
          access_token: handleLogin.jwtToken,
        },
        'Login successfully'
      )
    );
  } catch (error: any) {
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
    const newUser = await authSerive.register({ name, username, password, role });

    return res.status(400).json(ResponseUtil.success(newUser, 'An account successfully register'));
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
};
