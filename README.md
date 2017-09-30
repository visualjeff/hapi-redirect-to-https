hapi-require-https-with-port-option [![Build Status](https://travis-ci.org/bendrucker/hapi-require-https.svg?branch=master)](https://travis-ci.org/bendrucker/hapi-require-https)
==================

> hapi plugin that adds http to https redirection (extends npm package hapi-require-https)

By default, any incoming request with `'http'` in `X-Forwarded-Proto` will be redirected (301) to the same host and path with `'https'` as the protocol. You can optionally disable proxy mode and redirect based on the actual request protocol.  You can also override the tls port which is useful for development. 

## Usage

Just [load the plugin](http://hapijs.com/tutorials/plugins#loading-a-plugin) and go!

Route tls port 443:

```js
server.register({
  register: require('hapi-require-https-with-port-option'),
  options: {
  }
})
```

Route to tls port 4000

```js
server.register({
  register: require('hapi-require-https-with-port-option'),
  options: {
    proxy: false,
    tlsPort: 4000
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

###### tlsPort

Type: `integer`  
Default: `443`

Indicates whether the server expects requests coming from a reverse proxy (a common Node web server setup) or directly from the Internet. Set this to `false` if you'd like to redirect based on the *actual* protocol instead of the [`X-Forwarded-Proto`](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Common_non-standard_response_fields) header.

## License

MIT © [visualjeff](http://github.com/visualjeff)
