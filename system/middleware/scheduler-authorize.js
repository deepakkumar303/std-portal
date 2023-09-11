const boom = require('@hapi/boom');
const configController = require('../../api/Config/controller');
const AwsSecretsManager = require('../lib/aws/secret-manager');

async function schedulerAuthorize(req, res, next) {
    try {
        if (!req.headers) {
            next(boom.unauthorized('Invalid Headers'));
        }
        if (!req.headers.secret || req.headers.secret === '') {
            next(boom.unauthorized('Invalid Secret'));
        }
        const schedulerSecretName = await configController.getValueByKey('AWS_SCHEDULER_SECRET_KEY'); // get aws scheduler secret key name
        const awsSecretsManagerInitialize = await AwsSecretsManager.initialize();
        const schedulerSecretKey = await awsSecretsManagerInitialize.get(schedulerSecretName);
        if (req.headers.secret !== schedulerSecretKey) {
            next(boom.unauthorized('Invalid Secret'));
        }
        next();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        next(boom.internal('Something went wrong.'));
    }
}

module.exports = schedulerAuthorize;