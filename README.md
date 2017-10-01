hapi-redirect-to-https [![Build Status](https://travis-ci.org/visualjeff/hapi-redirect-to-https.svg?branch=master)](https://travis-ci.org/visualjeff/hapi-redirect-to-https)
==================

> hapi plugin that adds http to https redirection (NOTE: This plugin extends the functionality of hapi-require-https)

By default, any incoming request with `'http'` in `X-Forwarded-Proto` will be redirected (301) to the same host and path with `'https'` as the protocol. You can optionally disable proxy mode and redirect based on the actual request protocol.  This plugin pays attention to the port that is being used for https (in case your using a port other than 443). 

## Usage

Just [load the plugin](http://hapijs.com/tutorials/plugins#loading-a-plugin) and go!

```js
server.register({
  register: require('hapi-redirect-to-https'),
  options: {
  }
})
```

or if your running without a proxy (local development):

```js
server.register({
  register: require('hapi-redirect-to-https'),
  options: {
    proxy: false,
  }
})
```
## API

#### `plugin.register(server, [options], next)`

Registers the plugin to run `onRequest` in the [request lifecycle](http://hapijs.com/api#request-lifecycle). 

##### options

Type: `object`  
Default: `{}`

###### proxy

Type: `boolean`  
Default: `true`

Indicates whether the server expects requests coming from a reverse proxy (a common Node web server setup) or directly from the Internet. Set this to `false` if you'd like to redirect based on the *actual* protocol instead of the [`X-Forwarded-Proto`](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Common_non-standard_response_fields) header.

## License

MIT © [visualjeff](http://github.com/visualjeff)
