const mongoose = require('mongoose');
const UserPaymentMethod = require('./index');

const { ObjectId } = mongoose.Types;

const create = async(params) => {
    const newUserPaymentMethod = await UserPaymentMethod.create(params);
    return newUserPaymentMethod;
};

const getByUserId = async(params) => {
    const result = await UserPaymentMethod.aggregate(
        [
            {
                $match: {
                    user_id: {
                        $eq: ObjectId(params.user_id.toString()),
                    },
                    status: {
                        $eq: 1,
                    },
                },
            },
        ],
    );
    return result;
};

const deleteByPaymentMethodDetailId = async(params) => {
    const result = await UserPaymentMethod.deleteOne({
        'payment_method_type_details.id': params.payment_method_type_details_id,
    });
    return result;
};

const updateStatusByPaymentMethodDetailId = async(params) => {
    const result = await UserPaymentMethod.update({
        'payment_method_type_details.id': params.payment_method_type_details_id,
    }, {
        status: params.status,
    });
    return result;
};

module.exports = {
    create,
    getByUserId,
    deleteByPaymentMethodDetailId,
    updateStatusByPaymentMethodDetailId,
};