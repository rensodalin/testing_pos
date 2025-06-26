// const createHttpError = require("http-errors");
// const { Order, Table } = require("../models");

// const addOrder = async (req, res, next) => {
//   try {
//     const order = await Order.create(req.body);
//     res
//       .status(201)
//       .json({ success: true, message: "Order created!", data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// const getOrderById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const order = await Order.findByPk(id);
//     if (!order) {
//       const error = createHttpError(404, "Order not found!");
//       return next(error);
//     }

//     res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// const getOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });
//     res.status(200).json({ data: orders });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateOrder = async (req, res, next) => {
//   try {
//     const { orderStatus } = req.body;
//     const { id } = req.params;

//     const order = await Order.findByPk(id);
//     if (!order) {
//       const error = createHttpError(404, "Order not found!");
//       return next(error);
//     }

//     await order.update({ orderStatus });

//     res
//       .status(200)
//       .json({ success: true, message: "Order updated", data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { addOrder, getOrderById, getOrders, updateOrder };
//trov
// const createHttpError = require("http-errors");
// const { Order, Table } = require("../models");

// const addOrder = async (req, res, next) => {
//   try {
//     console.log("Creating order with data:", req.body);
//     const order = await Order.create(req.body);
    
//     // Fetch the created order with table information
//     const orderWithTable = await Order.findByPk(order.id, {
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });
    
//     console.log("Order created successfully:", orderWithTable);
//     res
//       .status(201)
//       .json({ success: true, message: "Order created!", data: orderWithTable });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     next(error);
//   }
// };

// const getOrderById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const order = await Order.findByPk(id, {
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });
    
//     if (!order) {
//       const error = createHttpError(404, "Order not found!");
//       return next(error);
//     }

//     res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// const getOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       include: [{
//         model: Table,
//         as: 'table'
//       }],
//       order: [['createdAt', 'DESC']], // Get newest orders first
//       limit: 20 // Limit to recent 20 orders for performance
//     });
    
//     console.log("Fetched orders:", orders.length);
//     console.log("Sample order data:", orders[0] ? {
//       id: orders[0].id,
//       customerDetails: orders[0].customerDetails,
//       table: orders[0].table,
//       orderStatus: orders[0].orderStatus
//     } : "No orders found");
    
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     next(error);
//   }
// };

// const updateOrder = async (req, res, next) => {
//   try {
//     const { orderStatus } = req.body;
//     const { id } = req.params;

//     const order = await Order.findByPk(id);
//     if (!order) {
//       const error = createHttpError(404, "Order not found!");
//       return next(error);
//     }

//     await order.update({ orderStatus });

//     // Fetch updated order with table information
//     const updatedOrder = await Order.findByPk(id, {
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });

//     res
//       .status(200)
//       .json({ success: true, message: "Order updated", data: updatedOrder });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     next(error);
//   }
// };

// module.exports = { addOrder, getOrderById, getOrders, updateOrder };


// const createHttpError = require("http-errors");
// const { Order, Table } = require("../models");

// const addOrder = async (req, res, next) => {
//   try {
//     console.log("Creating order with data:", req.body);
//     const order = await Order.create(req.body);
    
//     // Fetch the created order with table information
//     const orderWithTable = await Order.findByPk(order.id, {
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });
    
//     console.log("Order created successfully:", orderWithTable);
//     res
//       .status(201)
//       .json({ success: true, message: "Order created!", data: orderWithTable });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     next(error);
//   }
// };

// const getOrderById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const order = await Order.findByPk(id, {
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });
    
//     if (!order) {
//       const error = createHttpError(404, "Order not found!");
//       return next(error);
//     }

//     res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// const getOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       include: [{
//         model: Table,
//         as: 'table',
//         attributes: ['id', 'tableNo', 'status', 'seats'] // Explicitly specify table attributes
//       }],
//       order: [['createdAt', 'DESC']], // Get newest orders first
//       limit: 20 // Limit to recent 20 orders for performance
//     });
    
//     console.log("Fetched orders:", orders.length);
    
//     // Enhanced logging for table data
//     if (orders.length > 0) {
//       console.log("Sample order data:", {
//         id: orders[0].id,
//         customerDetails: orders[0].customerDetails,
//         tableId: orders[0].tableId,
//         table: orders[0].table,
//         orderStatus: orders[0].orderStatus
//       });
      
//       // Log each order's table information
//       orders.forEach((order, index) => {
//         console.log(`Order ${index + 1}:`, {
//           orderId: order.id,
//           tableId: order.tableId,
//           tableData: order.table,
//           hasTable: !!order.table
//         });
//       });
//     }
    
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     next(error);
//   }
// };

// const updateOrder = async (req, res, next) => {
//   try {
//     const { orderStatus } = req.body;
//     const { id } = req.params;

//     const order = await Order.findByPk(id);
//     if (!order) {
//       const error = createHttpError(404, "Order not found!");
//       return next(error);
//     }

//     await order.update({ orderStatus });

//     // Fetch updated order with table information
//     const updatedOrder = await Order.findByPk(id, {
//       include: [{
//         model: Table,
//         as: 'table'
//       }]
//     });

//     res
//       .status(200)
//       .json({ success: true, message: "Order updated", data: updatedOrder });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     next(error);
//   }
// };

// module.exports = { addOrder, getOrderById, getOrders, updateOrder };
const createHttpError = require("http-errors");
const { Order, Table } = require("../models");

// Create a new order
const addOrder = async (req, res, next) => {
  try {
    console.log("Creating order with data:", req.body);

    const order = await Order.create(req.body);

    // Return newly created order with table info
    const orderWithTable = await Order.findByPk(order.id, {
      include: [
        {
          model: Table,
          as: "table",
          attributes: ["id", "tableNo", "status", "seats"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Order created!",
      data: orderWithTable,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};

// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Table,
          as: "table",
          attributes: ["id", "tableNo", "status", "seats"],
        },
      ],
    });

    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error getting order by ID:", error);
    next(error);
  }
};

// Get all recent orders
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Table,
          as: "table",
          attributes: ["id", "tableNo", "status", "seats"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(error);
  }
};

// Update order status
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    await order.update({ orderStatus });

    const updatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: Table,
          as: "table",
          attributes: ["id", "tableNo", "status", "seats"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Order updated",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    next(error);
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getOrders,
  updateOrder,
};
