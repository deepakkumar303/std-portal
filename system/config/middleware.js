const jwks = require('jwks-rsa');
const isEmpty = require('lodash.isempty');

// eslint-disable-next-line max-len
const originWhitelist = ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:8083', 'https://dev.gaiusone.com', 'https://devapi.gaiusone.com', 'https://staging.gaiusone.com', 'https://stagingapi.gaiusone.com', 'https://dev.zavenlegal.com', 'https://devapi.zavenlegal.com', 'https://staging.zavenlegal.com', 'https://stagingapi.zavenlegal.com', 'https://app.zavenlegal.com', 'https://zavenlegal.com', 'https://api.zavenlegal.com'];

function checkCorsOrigin(origin, callback) {
    if (originWhitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

const cors = {
    origin: checkCorsOrigin,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
};

const jwt = {
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN_URL}/.well-known/jwks.json`
    }),
    credentialsRequired: true,
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN_URL}/`,
    algorithms: ['RS256']
};

const morganRequestFormat = function (tokens, req, res) {
    return '[' + [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res)
    ].join('][') + ']';
};

module.exports = {
    cors: cors,
    jwt: jwt,
    morganRequestFormat,
};
