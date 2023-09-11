/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const axios = require('axios');
// const isEmpty = require('lodash.isempty');
const boom = require('@hapi/boom');
const configController = require('../../../api/Config/controller');
const secretsManager = require('../aws/secret-manager');
// const dateTimeUtil = require('../../utils/datetime');

const getRequestHeaders = (headers) => ({ 'content-type': 'application/json', ...headers });

async function getAuth0Config() {
    const auth0Configs = await configController.getValueByKey('AUTH0_CONFIG');
    const secretManagerClient = await secretsManager.initialize('AWS_SECRETS_MANAGER_CONFIG');
    const awsAuth0ClientSecretName = await configController.getValueByKey('AWS_AUTH0_CLIENT_SECRET_NAME');
    const auth0ClientSecret = await secretManagerClient.get(awsAuth0ClientSecretName);
    auth0Configs.AUTH0_CLIENT_SECRET = auth0ClientSecret;
    return auth0Configs;
}

const processError = (e) => {
    if (e.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        return e.response.data;
        // console.log(e.response.status);
        // console.log(e.response.headers);
    }
    if (e.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return e.request;
    }
    // Something happened in setting up the request that triggered an Error
    return e.message;
};

async function sendRequest(params, withAuthToken = true, auth0Config = {}) {
    // validate params, fill default, merge new
    try {
        const options = {
            method: params.method,
            url: params.url,
            headers: getRequestHeaders(params.headers),
            data: params.data,
            responseType: 'json',
        };
        if (withAuthToken) {
            // const token = reqUser['cached_auth0_management_token'];
            const token = await getAccessToken(auth0Config, true);
            options.headers.authorization = `Bearer ${token.access_token}`;
        }
        const axiosResponse = await axios(options);
        return axiosResponse;
    } catch (e) {
        throw processError(e);
    }
}

async function getAccessToken(auth0Config, includeExpire = false) {
    // ToDo: get access token from cache if exists
    console.log('Getting access token from auth0');
    const options = {
        method: 'POST',
        url: `https://${auth0Config.AUTH0_DOMAIN_URL}/oauth/token`,
        data: {
            grant_type: 'client_credentials',
            client_id: auth0Config.AUTH0_CLIENT_ID,
            client_secret: auth0Config.AUTH0_CLIENT_SECRET,
            audience: `https://${auth0Config.AUTH0_DOMAIN_URL}/api/v2/`,
        },
    };
    try {
        const response = await sendRequest(options, false);
        return (includeExpire) ? response.data : response.data.access_token;
    } catch (e) {
        console.log('Error: get_access_token');
        throw e;
    }
}

async function createUser(user) {
    console.log('Creating User in auth0');
    try {
        const auth0Config = await getAuth0Config();
        if (!user.password) {
            user.password = 'Randompassword.123';
        }
        const options = {
            method: 'POST',
            url: `https://${auth0Config.AUTH0_DOMAIN_URL}/api/v2/users`,
            data: {
                connection: auth0Config.AUTH0_CONNECTION_NAME,
                email: user.email,
                password: user.password,
                email_verified: true,
                verify_email: false,
            },
        };
        const response = await sendRequest(options, true, auth0Config);
        const createdUser = response.data;
        console.log(`Auth0User created: ${createdUser.user_id}, email: ${user.email}`);
        delete user.password;
        return createdUser;
    } catch (e) {
        if (e.error === 'Conflict') {
            return e;
        }
        throw boom.badImplementation('Unable to create user.');
    }
}

async function getUserByExtId(extId, reqUser) {
    try {
        const auth0Config = await getAuth0Config(reqUser);
        const options = {
            method: 'GET',
            // eslint-disable-next-line no-useless-concat
            url: `${`https://${auth0Config.AUTH0_DEFAULT_DOMAIN_URL}/api/v2/users/auth0` + '|'}${extId}`,
        };
        const response = await sendRequest(options, true, auth0Config, reqUser);
        const auth0User = response.data;
        return auth0User;
    } catch (e) {
        console.log(e);
        return {};
    }
}

async function getUserByEmail(userEmail, reqUser) {
    try {
        const auth0Config = await getAuth0Config(reqUser);
        const options = {
            method: 'GET',
            url: `https://${auth0Config.AUTH0_DEFAULT_DOMAIN_URL}/api/v2/users-by-email?email=${userEmail}`,
        };
        const response = await sendRequest(options, true, auth0Config, reqUser);
        const auth0User = response.data;
        return auth0User[0];
    } catch (e) {
        console.log(e);
        return {};
    }
}

async function getAuth0ResendPasswordLink(params) {
    const auth0Config = await getAuth0Config();
    try {
        const options = {
            method: 'POST',
            url: `https://${auth0Config.AUTH0_DOMAIN_URL}/api/v2/tickets/password-change`,
            data: {
                connection_id: auth0Config.AUTH0_CONNECTION_ID,
                email: params.email,
                result_url: auth0Config.AUTH0_SET_PASSWORD_REDIRECT_URL,
                ttl_sec: Number(auth0Config.AUTH0_INVITATION_URL_LIFETIME),
            },
        };
        const response = await sendRequest(options, true, auth0Config);
        return response.data.ticket;
    } catch (e) {
        console.log(e);
        throw boom.badImplementation('Unable to get auth0 reset password email.');
    }
}

async function blockUser(extId, email, reqUser) {
    console.log('Block User in auth0');
    try {
        const auth0Config = await getAuth0Config(reqUser);
        const options = {
            method: 'PATCH',
            // eslint-disable-next-line no-useless-concat
            url: `${`https://${auth0Config.AUTH0_DEFAULT_DOMAIN_URL}/api/v2/users/auth0` + '|'}${extId}`,
            data: {
                blocked: true,
            },
        };
        const response = await sendRequest(options, true, auth0Config, reqUser);
        console.log(`Auth0User blocked, extId: ${extId}, email: ${email}`);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function unblockUser(extId, email, reqUser) {
    console.log('Unblock User in auth0');
    try {
        const auth0Config = await getAuth0Config(reqUser);
        const options = {
            method: 'PATCH',
            // eslint-disable-next-line no-useless-concat
            url: `${`https://${auth0Config.AUTH0_DEFAULT_DOMAIN_URL}/api/v2/users/auth0` + '|'}${extId}`,
            data: {
                blocked: false,
            },
        };
        const response = await sendRequest(options, true, auth0Config, reqUser);
        console.log(`Auth0User unblocked, extId: ${extId}, email: ${email}`);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteUser(extId, email, reqUser) {
    console.log('Delete User in auth0');
    try {
        const auth0Config = await getAuth0Config(reqUser);
        const options = {
            method: 'DELETE',
            // eslint-disable-next-line no-useless-concat
            url: `${`https://${auth0Config.AUTH0_DOMAIN_URL}/api/v2/users/auth0` + '|'}${extId}`,
        };
        const response = await sendRequest(options, true, auth0Config, reqUser);
        console.log(`Auth0User deleted, extId: ${extId}, email: ${email}`);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

// async function getCacheToken() {
//     try {
//         const auth0Config = await get_auth0_config();
//         let tokenObj = JSON.parse(auth0Config.CACHED_AUTH0_MANAGEMENT_TOKEN);
//         if (isEmpty(tokenObj.access_token) || tokenObj.expires_at < dateTimeUtil.get_current_unix_timestamp()) {
//             tokenObj = await get_access_token(auth0Config, true);
//             await configController.update_config_value_by_key_and_tenant_id(metaConn, 'CACHED_AUTH0_MANAGEMENT_TOKEN', JSON.stringify({
//                 expires_at: dateTimeUtil.get_current_unix_timestamp() + tokenObj.expires_in - 600, // 10 minutes buffer for token expire
//                 created_at: dateTimeUtil.get_current_unix_timestamp(),
//                 access_token: tokenObj.access_token,
//             }));
//         }
//         return tokenObj.access_token;
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
// }

async function updatePassword(params) {
    try {
        const auth0Config = await getAuth0Config();
        const options = {
            method: 'PATCH',
            // eslint-disable-next-line no-useless-concat
            url: `${`https://${auth0Config.AUTH0_DOMAIN_URL}/api/v2/users/auth0` + '|'}${params.ext_id}`,
            data: {
                password: params.new_password,
            },
        };
        const response = await sendRequest(options, true, auth0Config);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = {
    createUser,
    getUserByExtId,
    getUserByEmail,
    getAuth0ResendPasswordLink,
    blockUser,
    unblockUser,
    deleteUser,
    updatePassword,
};