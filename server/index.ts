import { auth, ConfigParams } from 'express-openid-connect';
// Required for 'typedi' module
import 'reflect-metadata';
import { Container } from 'typedi';

import routes from './routes';
// Important to import like this for Service() decorators to be executed
import './services';


const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

// Load envs
require('dotenv').config();

// Set console as Logger
Container.set('Logger', console);

/** Auth0 */
const authConfig: ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET
};

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const host: string = nuxt.options.server.host;
    const port: string = nuxt.options.server.port;

    await nuxt.ready();
    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    // Auth0
    app.use(auth(authConfig));

    // Setup routes
    app.use('/api', routes);

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}
start();
