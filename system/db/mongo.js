/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const { exit } = require('process');

let dbConn = {};
// if (
//     process.env.MONGO_CONN_STRING
//   && process.env.MONGO_DB_NAME
//   && process.env.MONGO_AUTH_SOURCE
// ) {
//     dbConn = mongoose.createConnection(
//         'mongodb+srv://kumard312:Deepak@123@cluster0.hpt151t.mongodb.net/?retryWrites=true&w=majority',
//         {
//             useCreateIndex: true,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//         },
//     );
// } else {
//     console.log('ERROR: DB CONNECTION NOT INITIALISED');
// }

dbConn = mongoose.createConnection(
    'mongodb+srv://kumard312:Deepak@123@cluster0.hpt151t.mongodb.net/?retryWrites=true&w=majority',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
);

function closeDbConn() {
    dbConn.close(() => {
        console.log('Closing mongo connection and exiting process');
        process.exit(0);
    });
}

module.exports = {
    dbConn,
    closeDbConn,
};
