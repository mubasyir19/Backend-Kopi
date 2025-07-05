import { NextFunction, Request, Response } from 'express';
import { authService } from '../../services/auth.service';
import { ResponseUtil } from '../../utils/response';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const handleLogin = await authService.login({ username, password });
      res.json(
        ResponseUtil.success(
          {
            id: handleLogin.user.id,
            role: handleLogin.user.name,
            access_token: handleLogin.jwtToken,
          },
          'Login successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dataUser = req.body;
      const result = await authService.register(dataUser);

      res.status(201).json(ResponseUtil.success(result, 'Registration successfully'));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

// export const login = async (req: Request, res: Response): Promise<Response | any> => {
//   const { username, password } = req.body;

//   if (!username || username.trim() === '') {
//     return res.status(400).json(ResponseUtil.error('Username is required'));
//   }

//   if (!password || password.trim() === '') {
//     return res.status(400).json(ResponseUtil.error('Password is required'));
//   }

//   try {
//     const handleLogin = await authService.login({ username, password });
//     return res.status(400).json(
//       ResponseUtil.success(
//         {
//           id: handleLogin.user.id,
//           role: handleLogin.user.name,
//           access_token: handleLogin.jwtToken,
//         },
//         'Login successfully'
//       )
//     );
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 500,
//       message: error.message,
//       data: null,
//     });
//   }
// };

// export const register = async (req: Request, res: Response): Promise<Response | any> => {
//   const { name, username, password, role } = req.body;

//   try {
//     const newUser = await authService.register({ name, username, password, role });

//     return res.status(400).json(ResponseUtil.success(newUser, 'An account successfully register'));
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 500,
//       message: error.message,
//       data: null,
//     });
//   }
// };
