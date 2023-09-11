// const isEmpty = require('lodash.isempty');
// const boom = require('@hapi/boom');
// // const userService = require('../../api/User/service');
// const logger = require('../utils/logger');

// module.exports = async(req, res, next) => {
//     try {
//         let requestor = {};
//         const extId = req.user.sub.split('|')[1];
//         requestor = await userService.getByExtId(extId);
//         if (isEmpty(requestor)) {
//             return next(boom.unauthorized('Unauthorised requestor!'));
//         }
//         req.user.role = requestor.role;
//         req.req_user = requestor;
//     } catch (error) {
//         logger(error);
//         next(boom.unauthorized('Unauthorised requestor'));
//     }
//     next();
// };