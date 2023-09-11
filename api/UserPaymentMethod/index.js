const { Schema } = require('mongoose');
const { dbConn } = require('../../system/db/mongo');

/**
 * @swagger
 * tags:
 *   name: UserPaymentMethod
 *   description: Metadata list of the Application
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPaymentMethod:
 *       type: object
 *       required:
 *         - _id
 *         - gateway_name
 *         - user_id
 *         - customer_id
 *         - payment_method_type_id
 *         - payment_method_type_details
 *         - status
 *         - created_by
 *         - updated_by
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: user payment method Id
 *         gateway_name:
 *           type: string
 *           format: string
 *           description: name of payment method gateway name
 *         user_id:
 *           type: string
 *           format: ObjectId
 *           description: user id to whom payment method belongs
 *           $ref: '#/components/schemas/User'
 *         customer_id:
 *           type: string
 *           format: string
 *           description: customer id of stripe
 *         payment_method_type_id:
 *           type: string
 *           format: ObjectId
 *           description: payment method object id
 *         payment_method_type_details:
 *           type: object
 *           description: payment method detail
 *         status:
 *           type: Number
 *           format: 0/1
 *           description: inActive (0), Active (1)
 *         created_by:
 *           type: string
 *           format: ObjectId
 *           description: Id of the user who creates the record
 *           $ref: '#/components/schemas/User'
 *         updated_by:
 *           type: string
 *           format: ObjectId
 *           description: Id of the user who updates the record last
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record created date time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record last updated date time
 *       example:
 *          _id: 5f8e8aec08f60970124cc24f
 *          gateway_name: stripe
 *          user_id: 645dd3765551cd00115bbe8d
 *          customer_id: cus_bvnfkwbvjwv
 *          payment_method_type_id: 645b828130040c3f28e0c04f
 *          payment_method_type_details: {
 *             brand: "visa",
 *             checks: {
 *               address_line1_check: null,
 *               address_postal_code_check: null,
 *               cvc_check: "pass"
 *             },
 *             country: "US",
 *             exp_month: 10,
 *             exp_year: 2023,
 *             fingerprint: "RXVzzlxRBnMZ4CkR",
 *             funding: "credit",
 *             generated_from: null,
 *             last4: "4242",
 *             networks: {
 *               available: [
 *                 "visa"
 *               ],
 *               preferred: null
 *             },
 *             three_d_secure_usage: {
 *               supported: true
 *             },
 *             wallet: null
 *          }
 *          status: 1
 *          created_by: 1
 *          updated_by: 1
 *          createdAt: 2020-10-20T06:59:56.469+00:00
 *          updatedAt: 2020-10-20T07:59:56.469+00:00
 */

const userPaymentMethodSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    gateway_name: {
        type: String, // payment gateway name
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    legal_service_id: {
        type: Schema.Types.ObjectId,
        ref: 'LegalService',
    },
    customer_id: {
        type: String,
    },
    default_payment_method_type: {
        type: Boolean,
    },
    payment_method_type_id: {
        type: Schema.Types.ObjectId,
    },
    payment_method_type_details: {
        type: Object,
    },
    status: {
        type: Number,
        required: true,
        default: 1,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const UserPaymentMethod = dbConn.model('UserPaymentMethod', userPaymentMethodSchema, 'userPaymentMethods');

module.exports = UserPaymentMethod;