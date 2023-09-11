if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line global-require
    require('dotenv').config({
        path: `./${process.env.NODE_ENV}.env`,
    });
}

const express = require('express');

const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const userAgent = require('express-useragent');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const boom = require('@hapi/boom');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
const initScope = require('./system/middleware/init-scope');
// const initReqUser = require('./system/middleware/init-req-user');
const logError = require('./system/middleware/log-error');
const errorHandler = require('./system/error/handler');
// const swaggerSpec = require('./docs');
const middlewareConfig = require('./system/config/middleware');

// api routes folder path
// const userRoutes = require('./api/User/route');

// app.post(
//     '/api/payment-gateway/stripe/webhook-endpoint',
//     bodyParser.raw({
//         type: 'application/json',
//     }),
//     (request, response) => {
//         stripePaymentGatewayController.webhookEndpoint(request, response);
//     },
// );

// if (process.env.NODE_ENV !== 'local') {
//     scheduleJobIndex.initCrons();
// }

app.use(userAgent.express());
app.use(cors(middlewareConfig.cors));
app.use(helmet());
app.use(morgan(middlewareConfig.morganRequestFormat));
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

// public routes
app.get('/', (req, res) => {
    res.send({
        message: 'success',
    });
});
app.get('/api/health', (req, res) => {
    res.send('Health is A OK.');
});
// if (process.env.NODE_ENV.localeCompare('production') !== 0) {
//     app.use(
//         '/api-docs',
//         swaggerUi.serve,
//         swaggerUi.setup(swaggerSpec, {
//             explorer: true,
//         }),
//     );
// }
// app.use('/api/auth', authRoutes);
// app.use('/api/config', configRoutes);
// app.use('/api/country', countryRoutes);
// app.use('/api/enum-type', enumTypeRoutes);
// app.use('/api/enum', enumRoutes);
// app.use('/api/scheduler', schedulerRoutes);
// app.use('/api/contactUs', contactUs);

// protected routes
app.use(jwt(middlewareConfig.jwt));
app.use(initScope);
// app.use(initReqUser);
// app.use('/api/user', userRoutes);
// app.use('/api/corporate/analytics', corporateAnalyticsRoutes);
// app.use('/api/corporate', corporateRoutes);
// app.use('/api/scope-of-work', scopeOfWorkRoutes);
// app.use('/api/language', languageRoutes);
// app.use('/api/currency', currencyRoutes);
// app.use('/api/rfp', rfpRoutes);
// app.use('/api/email-template', emailTemplateRoutes);
// app.use('/api/legal-service/analytics', legalServiceAnalyticsRoutes);
// app.use('/api/legal-service', legalServiceRoutes);
// app.use('/api/proposal', proposalRoutes);
// app.use('/api/payment-plan', paymentPlanRoutes);
// app.use('/api/payment-method-type', paymentMethodTypeRoutes);
// app.use('/api/user-payment-method', userPaymentMethodRoutes);
// app.use('/api/rfp-template-bank', rfpTemplateBankRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/legal-service-provider-review', legalServiceProviderReviewRoutes);
// app.use('/api/proposal-template-bank', proposalTemplateBankRoutes);
// app.use('/api/master-proposal-template-bank', masterProposalTemplateBankRoutes);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
    throw boom.notFound('Endpoint Not Found');
});
app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);

module.exports = app;
