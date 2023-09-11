const boom = require('@hapi/boom');
const service = require('./service');
const userService = require('../User/service');
const legalServiceService = require('../LegalService/service');
const paymentMethodTypeService = require('../PaymentMethodType/service');
const paymentGatewayStripeController = require('../PaymentGateway/Stripe/controller');
const utilsChecks = require('../../system/utils/checks');

const addUserPaymentMethod = async(params) => {
    const getUser = await userService.getById({ user_id: params.user_id });
    if (!utilsChecks.isArray(getUser) || utilsChecks.isEmptyArray(getUser)) {
        throw boom.badRequest('User not found.');
    }

    const getLegalService = await legalServiceService.getLegalServiceById({ legal_service_id: params.legal_service_id });
    if (getLegalService[0].primary_user_id.toString() !== params.user_id.toString()) {
        throw boom.badRequest('User not authorized to add payment method.');
    }

    const userPaymentmethodlist = await service.getByUserId(params);

    if (userPaymentmethodlist.length > 0) {
        throw boom.badRequest('Already payment method added. Please remove existing payment method and try again.');
    }

    const getPaymentMethodTypeList = await paymentMethodTypeService.list();
    const getPaymentMethodType = getPaymentMethodTypeList.filter((e) => e.code === params.type && e.country_code === params.country_code).map((s) => s.value)[0];

    if (!getPaymentMethodType) {
        throw boom.badRequest('Payment Method Type not found.');
    }

    params.email = getUser[0].email;
    params.type = getPaymentMethodType;

    const add = await paymentGatewayStripeController.createAddPaymentMethodSession(params);
    const result = {
        message: 'Payment Method Session',
        detail: add,
    };
    return result;
};

const getByUserId = async(params) => {
    const list = await service.getByUserId(params);
    if (!utilsChecks.isArray(list) || utilsChecks.isEmptyArray(list)) {
        throw boom.notFound('No Payment Method Found');
    }
    const result = {
        message: 'User Payment Method Details',
        detail: list,
    };
    return result;
};

const updateUserPaymentMethod = async(params) => {
    const getUser = await userService.getById({ user_id: params.user_id });
    if (!utilsChecks.isArray(getUser) || utilsChecks.isEmptyArray(getUser)) {
        throw boom.badRequest('User not found.');
    }

    const getLegalService = await legalServiceService.getLegalServiceById({ legal_service_id: params.legal_service_id });
    if (getLegalService[0].primary_user_id.toString() !== params.user_id.toString()) {
        throw boom.badRequest('User not authorized to update payment method.');
    }

    const userPaymentmethodlist = await service.getByUserId(params);

    if (userPaymentmethodlist.length === 0) {
        throw boom.badRequest('No payment method found.');
    }

    userPaymentmethodlist.forEach((v) => {
        if (v.payment_method_type_details.type !== 'card') {
            v.payment_method_type_details.type = 'bankaccount';
        }
    });

    const paymentMethodTypeCount = userPaymentmethodlist.filter((v) => v.payment_method_type_details.type.toLowerCase() === params.type.toLowerCase());

    if (paymentMethodTypeCount.length === 0) {
        throw boom.badRequest('No payment method of this type found.');
    }

    const getPaymentMethodTypeList = await paymentMethodTypeService.list();
    const getPaymentMethodType = getPaymentMethodTypeList.filter((e) => e.code === params.type && e.country_code === params.country_code).map((s) => s.value)[0];

    params.email = getUser[0].email;
    params.type = getPaymentMethodType;

    const update = await paymentGatewayStripeController.createUpdatePaymentMethodSession(params);
    const result = {
        message: 'Payment Method Session',
        detail: update,
    };
    return result;
};

const removeUserPaymentMethod = async(params) => {
    const getUser = await userService.getById({ user_id: params.user_id });
    if (!utilsChecks.isArray(getUser) || utilsChecks.isEmptyArray(getUser)) {
        throw boom.badRequest('User not found.');
    }

    const getLegalService = await legalServiceService.getLegalServiceById({ legal_service_id: params.legal_service_id });
    if (getLegalService[0].primary_user_id.toString() !== params.user_id.toString()) {
        throw boom.badRequest('User not authorized to add payment method.');
    }

    const userPaymentmethodlist = await service.getByUserId(params);

    if (userPaymentmethodlist.length === 0) {
        throw boom.badRequest('No payment method found.');
    }

    userPaymentmethodlist.forEach((v) => {
        if (v.payment_method_type_details.type !== 'card') {
            v.payment_method_type_details.type = 'bankaccount';
        }
    });

    const paymentMethodTypeDetailId = userPaymentmethodlist.filter((v) => v.payment_method_type_details.type.toLowerCase() === params.type.toLowerCase()).map((s) => s.payment_method_type_details.id)[0];

    if (!paymentMethodTypeDetailId) {
        throw boom.badRequest('No payment method found.');
    }

    const update = await paymentGatewayStripeController.detachStripePaymentMethod({ payment_method_type_details_id: paymentMethodTypeDetailId });

    const result = {
        message: 'Payment Method Removed Successfully.',
        detail: update,
    };
    return result;
};

module.exports = {
    addUserPaymentMethod,
    getByUserId,
    updateUserPaymentMethod,
    removeUserPaymentMethod,
};