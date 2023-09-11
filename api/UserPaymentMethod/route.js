/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const controller = require('./controller');
const schema = require('./schema');
const authorize = require('../../system/middleware/authorize');

/**
 * @swagger
 * /user-payment-method:
 *   post:
 *     tags:
 *       - UserPaymentMethod
 *     summary: add user payment method
 *     description: user payment method
 *     produces:
 *       - application/json
 *     requestBody:
 *         description: add user payment method details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   description: user id of the user
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: 5fc0c40d8edf8d0c24dfad69
 *                 legal_service_id:
 *                   description: legal service id
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: 5fc0c3a08edf8d0c24dfad57
 *                 type:
 *                   description: payment method type (Card/BankAccount)
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: card
 *                 country_code:
 *                   description: country code (send as "ALL" for Card type and for BankAccount get from country dropdown)
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: ALL
 *                 success_url:
 *                   description: after payment method success redirect to this url
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: https://zaven.com/success
 *                 cancel_url:
 *                   description: after payment method failed redirect to this url
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: https://zaven.com/failure
 *     responses:
 *       200:
 *         description: payment method added successfully
 *       500:
 *         description: Internal Server Error
 *     security :
 *       - BearerAuth: []
 */

router.post('/', authorize('create:userPaymentMethod'), celebrate(schema.addUserPaymentMethod, schema.options), c(controller.addUserPaymentMethod, (req, res, next) => [req.body]));

/**
 * @swagger
 * /user-payment-method/{user_id}:
 *   get:
 *     tags:
 *       - UserPaymentMethod
 *     summary: Get the User Payment method by Id
 *     description: Get the User Payment method by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: type id
 *         in: path
 *         required: true
 *         type: string
 *         example: 5fc0c40d8edf8d0c24dfad69
 *     responses:
 *       200:
 *         description: An array of User Payment Method Details
 *       500:
 *         description: Internal Server Error
 *     security :
 *       - BearerAuth: []
 */

router.get('/:user_id', authorize('get:userPaymentMethod'), celebrate(schema.getByUserId, schema.options), c(controller.getByUserId, (req, res, next) => [req.params]));

/**
 * @swagger
 * /user-payment-method:
 *   put:
 *     tags:
 *       - UserPaymentMethod
 *     summary: Update User Payment method
 *     description: Update User Payment method
 *     produces:
 *       - application/json
 *     requestBody:
 *         description: add user payment method details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   description: user id of the user
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: 5fc0c40d8edf8d0c24dfad69
 *                 legal_service_id:
 *                   description: legal service id
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: 5fc0c3a08edf8d0c24dfad57
 *                 type:
 *                   description: payment method type (Card/BankAccount)
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: card
 *                 country_code:
 *                   description: country code (send as "ALL" for Card type and for BankAccount get from country dropdown)
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: ALL
 *                 success_url:
 *                   description: after payment method success redirect to this url
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: https://zaven.com/success
 *                 cancel_url:
 *                   description: after payment method failed redirect to this url
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: https://zaven.com/failure
 *     responses:
 *       200:
 *         description: An array of User Payment Method Details
 *       500:
 *         description: Internal Server Error
 *     security :
 *       - BearerAuth: []
 */

router.put('/', authorize('update:userPaymentMethod'), celebrate(schema.updateUserPaymentMethod, schema.options), c(controller.updateUserPaymentMethod, (req, res, next) => [req.body]));

/**
 * @swagger
 * /user-payment-method:
 *   delete:
 *     tags:
 *       - UserPaymentMethod
 *     summary: Delete User Payment method
 *     description: Delete User Payment method
 *     produces:
 *       - application/json
 *     requestBody:
 *         description: add user payment method details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   description: user id of the user
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: 5fc0c40d8edf8d0c24dfad69
 *                 legal_service_id:
 *                   description: legal service id
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: 5fc0c3a08edf8d0c24dfad57
 *                 type:
 *                   description: payment method type (Card/BankAccount)
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: card
 *                 country_code:
 *                   description: country code (send as "ALL" for Card type and for BankAccount get from country dropdown)
 *                   in: body
 *                   required: true
 *                   type: string
 *                   example: ALL
 *     responses:
 *       200:
 *         description: An array of User Payment Method Details
 *       500:
 *         description: Internal Server Error
 *     security :
 *       - BearerAuth: []
 */

router.delete('/', authorize('delete:userPaymentMethod'), celebrate(schema.removeUserPaymentMethod, schema.options), c(controller.removeUserPaymentMethod, (req, res, next) => [req.body]));

module.exports = router;