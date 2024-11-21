const Joi = require('joi');
const Order = require('../models/Order');
const { Op } = require('sequelize');
const { logger } = require('../utils/logger');

const validateQuery = (query) => {
  logger.debug(`Checking the input fields`);
  const schema = Joi.object({
    cursor: Joi.string().optional(),
    limit: Joi.number().integer().min(1).max(100).default(50),
    sort: Joi.string().valid('id', 'customerName', 'orderAmount', 'status', 'createdAt').default('id'),
    sortDirection: Joi.string().valid('asc', 'desc').default('asc'),
  });
  return schema.validate(query);
};


exports.getOrders = async (req, res, next) => {
    logger.info('Received request at GET /api/orders');
  
    const { error, value } = validateQuery(req.query);
    if (error) {
      logger.error('Validation Error', { error: error.details });
      return res.status(400).json({ error: error.message });
    }
  
    const { cursor, limit, sort, sortDirection } = value;
    logger.debug(`cursor : ${cursor}`);
    logger.debug(`limit : ${limit}`);
    logger.debug(`sort : ${sort}`);
    logger.debug(`sortDirection : ${sortDirection}`);
    try {
      const validSortColumns = ['id', 'customerName', 'orderAmount', 'status', 'createdAt'];
      if (!validSortColumns.includes(sort)) {
        logger.error(`Invalid sort column: ${sort}`);
        return res.status(400).json({ error: 'Invalid sort column' });
      }
  
      const where = cursor
        ? { id: { [Op.gt]: cursor } }
        : {};
      
      const orders = await Order.findAll({
        where,
        order: [[sort, sortDirection]],
        limit,
      });

      // const role_record = await Order.findOne({ where: { role_key: userRole } });
  
      const nextCursor = orders.length > 0 ? orders[orders.length - 1].id : null;
  
      const totalCount = await Order.count();
  
      res.json({
        data: orders,
        nextCursor,
        totalCount,
      });
    } catch (err) {
      logger.error('Database Error', {
        error: err.message,
        stack: err.stack,
        query: req.query,
      });
      next(err);
    }
  };