import { Request, Response, Router } from 'express';
import { authController } from '../controllers/auth/auth.controller';
import { addProduct, getAllProducts, getProductById } from '../controllers/product/product.controller';
import { addCategory, getAllCategories, getCategoryById } from '../controllers/category/category.controller';
import { getUserById } from '../controllers/user/user.controller';
import { createOrder, getListOrders } from '../controllers/order/order.controller';
import { createPayment, updatePaymentStatus } from '../controllers/payment/payment.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { authValidation } from '../utils/validation';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.get('/user/:id', getUserById);

router.post('/auth/login', validateRequest({ body: authValidation.login }), authController.login);
router.post('/auth/register', validateRequest({ body: authValidation.register }), authController.register);

router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);
router.post('/category/add', addCategory);

router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/product/add', addProduct);

router.get('/order', getListOrders);
router.post('/order/add', createOrder);

router.post('/payment/add', createPayment);
router.put('/payment/status/:id', updatePaymentStatus);

export default router;
