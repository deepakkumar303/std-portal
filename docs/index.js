const path = require('path');
const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

function fileDisplay(filePath, locations) {
    const files = fs.readdirSync(filePath);
    files.forEach((filename) => {
        locations.push(`./api/${filename}/route.js`);
        locations.push(`./api/${filename}/index.js`);
        const subFilepath = fs.readdirSync(`${filePath}/${filename}`);
        subFilepath.forEach((fname) => {
            if (fname === 'Analytics') {
                locations.push(`./api/${filename}/${fname}/route.js`);
            }
        });
    });
}

const filePath = path.resolve(__dirname, '../api');
const locations = [];

fileDisplay(filePath, locations);

const swaggerDefinition = {
    openapi: '3.0.0',
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                name: 'Authorization',
                in: 'header',
                bearerFormat: 'JWT',
            },
        },
    },
    info: {
        title: 'Zaven API',
        version: '1.0.0',
        // eslint-disable-next-line no-useless-escape
        description: 'Zaven API Documentation. Header for all the APIs: Authorization: Bearer \"Auth0 user access token\"',
    },
    host: `${process.env.SERVER_DOMAIN}api`,
    servers: [{
        url: `${process.env.SERVER_DOMAIN}api`,
    },
    ],
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: locations,
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;