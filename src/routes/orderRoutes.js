const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Dummy login to get JWT token
 *     responses:
 *       200:
 *         description: JWT Token
 */
router.post('/login', (req, res) => {
  // Dummy authentication
  const user = { id: 1, username: 'admin' };
  const token = jwt.sign(user, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
  res.json({ token });
});

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 */
router.post('/order', auth, orderController.createOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: List all orders
 *     security:
 *       - bearerAuth: []
 */
router.get('/order/list', auth, orderController.listOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     security:
 *       - bearerAuth: []
 */
router.get('/order/:orderId', auth, orderController.getOrderById);

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update an order
 *     security:
 *       - bearerAuth: []
 */
router.put('/order/:orderId', auth, orderController.updateOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     security:
 *       - bearerAuth: []
 */
router.delete('/order/:orderId', auth, orderController.deleteOrder);

module.exports = router;
