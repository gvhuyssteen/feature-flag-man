'use strict';

module.exports = [
  { method: 'GET', path: '/', config: require('./modules/home/config') },

  // Authentication
  { method: 'POST', path: '/auth/login', config: require('./modules/auth/login/config') },
  { method: 'POST', path: '/auth/register', config: require('./modules/auth/register/config') },
  { method: 'POST', path: '/auth/reset', config: require('./modules/auth/reset/config') },

  // API Key Management
  { method: 'POST', path: '/api-key', config: require('./modules/api-key/generate/config') },
  { method: 'POST', path: '/api-key/destroy', config: require('./modules/api-key/destroy/config') },

  // Feature Flag Management
  { method: 'GET', path: '/flags', config: require('./modules/flag/list/config') },
  { method: 'POST', path: '/flags', config: require('./modules/flag/create/config') }
];