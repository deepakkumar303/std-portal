const axios = require('axios');
const configController = require('../../../api/Config/controller');
const secretsManager = require('../aws/secret-manager');

const getRequestHeaders = (headers) => ({ 'content-type': 'application/json', ...headers });

const getAuth0Config = async() => {
    const auth0Configs = await configController.getValueByKey('AUTH0_CONFIG');
    const secretManagerClient = await secretsManager.initialize('AWS_SECRETS_MANAGER_CONFIG');
    const awsAuth0ClientSecretName = await configController.getValueByKey('AWS_AUTH0_CLIENT_SECRET_NAME');
    const auth0ClientSecret = await secretManagerClient.get(awsAuth0ClientSecretName);
    auth0Configs.AUTH0_CLIENT_SECRET = auth0ClientSecret;
    return auth0Configs;
};

const processError = (e) => {
    if (e.response) {
        return e.response.data;
    }
    if (e.request) {
        return e.request;
    }
    return e.message;
};

const sendRequest = async(params) => {
    try {
        const options = {
            method: params.method,
            url: params.url,
            headers: getRequestHeaders(params.headers),
            data: params.data,
            responseType: 'json',
        };
        const axiosResponse = await axios(options);
        return axiosResponse;
    } catch (e) {
        throw processError(e);
    }
};

const sendPasswordResetEmail = async(userEmail, reqUser) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const auth0Config = await getAuth0Config(reqUser);
        const options = {
            method: 'POST',
            url: `https://${auth0Config.AUTH0_DOMAIN_URL}/dbconnections/change_password`,
            data: {
                client_id: auth0Config.auth0ClientId,
                connection: auth0Config.auth0ConnectionName,
                email: userEmail,
            },
        };
        const response = await sendRequest(options);
        const resetEmail = response.data;
        // console.log('Password reset email sent: ' + JSON.stringify(resetEmail));
        return resetEmail;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    sendPasswordResetEmail,
};