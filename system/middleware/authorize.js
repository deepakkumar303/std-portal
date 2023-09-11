const boom = require('@hapi/boom');
const intersection = require('lodash.intersection');
const configController = require('../../api/Config/controller');
const utilsChecks = require('../utils/checks');

function authorize(grant) {
    return async(req, res, next) => {
        try {
            const grants = await configController.getValueByKey('GRANTS');
            const roles = await configController.getValueByKey('ROLES');

            if (!req.user) {
                next(boom.unauthorized('Invalid req user role'));
            }
            if (!roles.includes(req.user.role)) {
                next(boom.unauthorized('Invalid role'));
            }
            const grantArr = Array.isArray(grant) ? grant : [grant];
            const grantsIntersectionArr = intersection(grants[req.user.role], grantArr);
            if (utilsChecks.isEmptyArray(grantsIntersectionArr)) {
                next(boom.unauthorized('Role is unauthorized to access resource'));
            }
            next();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            next(boom.internal('Something went wrong.'));
        }
    };
}

module.exports = authorize;