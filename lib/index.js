'use strict';

const Url = require('url');
const Joi = require('joi');

// Declare internals
const internals = {};

// JOI Schema for validation and default values
internals.schema = Joi.object().keys({
    proxy: Joi.boolean().default(true),
    tlsPort: Joi.number().default(443)
});


const hapiRequireHttpsWithPortOptionPlugin = {
    register: (server, options, next) => {

        // Validate options agains the JOI schema above
        const validateOptions = internals.schema.validate(options);
        if (validateOptions.error) {
            return next(validateOptions.error);
        }

        server.ext('onRequest', (request, reply) => {

            const redirect = options.proxy !== false ? request.headers['x-forwarded-proto'] === 'http' : request.connection.info.protocol === 'http';
            const host = (request.headers['x-forwarded-host'] || request.headers.host).split(':')[0];
            if (redirect) {
                return reply()
                    .redirect(
                        Url.format({
                            protocol: 'https',
                            hostname: host,
                            pathname: request.url.path,
                            port: options.tlsPort !== 443 ? options.tlsPort : ''
                        })).code(301);
            }
            reply.continue();
        });
        next();
    }
};

hapiRequireHttpsWithPortOptionPlugin.register.attributes = {
    pkg: require('../package.json')
};

module.exports = hapiRequireHttpsWithPortOptionPlugin;
