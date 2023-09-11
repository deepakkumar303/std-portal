const joi = require('celebrate').Joi;

const options = {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
};

const addUserPaymentMethod = {
    body: joi.object().keys({
        user_id: joi.string().required(),
        legal_service_id: joi.string().required(),
        type: joi.string().valid('Card', 'BankAccount').required(),
        country_code: joi.string().required(),
        success_url: joi.string().required(),
        cancel_url: joi.string().required(),
    }),
};

const getByUserId = {
    params: joi.object().keys({
        user_id: joi.string().required(),
    }),
};

const updateUserPaymentMethod = {
    body: joi.object().keys({
        user_id: joi.string().required(),
        legal_service_id: joi.string().required(),
        type: joi.string().valid('Card', 'BankAccount').required(),
        country_code: joi.string().required(),
        success_url: joi.string().required(),
        cancel_url: joi.string().required(),
    }),
};

const removeUserPaymentMethod = {
    body: joi.object().keys({
        user_id: joi.string().required(),
        legal_service_id: joi.string().required(),
        type: joi.string().required(),
        country_code: joi.string().required(),
    }),
};

module.exports = {
    options,
    addUserPaymentMethod,
    getByUserId,
    updateUserPaymentMethod,
    removeUserPaymentMethod,
};