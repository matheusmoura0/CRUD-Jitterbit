const Order = require('../models/Order');
const { mapPortugueseToEnglish } = require('../utils/mapper');

// Create Order (POST)
exports.createOrder = async (req, res) => {
  try {
    const mappedData = mapPortugueseToEnglish(req.body);
    
    // Basic validation
    if (!mappedData.orderId || !mappedData.value) {
      return res.status(400).json({ 
        message: 'Invalid order data. numeroPedido and valorTotal are required.' 
      });
    }

    const newOrder = new Order(mappedData);
    await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Order ID already exists' });
    }
    res.status(500).json({ 
      message: 'Error creating order', 
      error: error.message 
    });
  }
};

// Get Order by ID (GET)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching order', 
      error: error.message 
    });
  }
};

// List All Orders (GET)
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error listing orders', 
      error: error.message 
    });
  }
};

// Update Order (PUT/PATCH)
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    // We don't map for updates to allow flexible partial updates if needed, 
    // but typically we'd map if the input is still in Portuguese.
    // Let's assume the user might send Portuguese update fields too.
    
    const updates = req.body;
    // Simple mapping for updates if fields exist
    const mappedUpdates = {};
    if (updates.valorTotal) mappedUpdates.value = updates.valorTotal;
    if (updates.items) {
        mappedUpdates.items = updates.items.map(item => ({
            productId: Number(item.idItem),
            quantity: Number(item.quantidadeItem),
            price: Number(item.valorItem)
        }));
    }

    const order = await Order.findOneAndUpdate(
      { orderId }, 
      { $set: mappedUpdates }, 
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating order', 
      error: error.message 
    });
  }
};

// Delete Order (DELETE)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting order', 
      error: error.message 
    });
  }
};
