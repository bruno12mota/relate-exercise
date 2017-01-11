var rc = require('rc');

module.exports = rc('config', {
  port: process.env.PORT || 8080,
  devPort: process.env.DEV_PORT || 8181,
  db: {
    uri: 'mongodb://localhost/relate-example-app'
  }
});
