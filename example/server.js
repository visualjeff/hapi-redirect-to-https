'use strict';

const Hapi = require('hapi');
const Fs = require('fs');

const server = new Hapi.Server();

//To avoid a self-signed certificate issue.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const tlsOptions = {
    passphrase: '',
    //Self signed certs for example only
    key: Fs.readFileSync('certs/server.key'),
    cert: Fs.readFileSync('certs/server.crt')
};

//Configure http
server.connection({
    host: '0.0.0.0',
    port: 3000
});

//Configure https
server.connection({
    host: '0.0.0.0',
    port: 4000,
    tls: tlsOptions
});

//Register the plugin and a simple hello world route
server.register([{
    register: require('../'),
    options: {
        proxy: false
    }
}, {
    register: require('./routes/applicationRoutes')
}], (err) => {

    if (err) {
        throw err;
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    server.connections.forEach((connection) => {

        const protocol = connection.info.protocol;
        const host = connection.info.host;
        const port = connection.info.port;
        console.dir(`Server listening at ${protocol}://${host}:${port}`, {
            colors: true
        });
    });
});
