const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(morgan('dev'));

const API_SERVICE_URL = process.env.API_SERVICE_URL;

app.get('/info', (req, res, next) => {
  res.send(
    `This is a proxy service which proxies to Billing account and Account API's`
  );
});

// Authorization
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

// Proxy endpoints
app.use(
  '/json_placeholder',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/json_placeholder`]: '',
    },
  })
);

module.exports = app;
