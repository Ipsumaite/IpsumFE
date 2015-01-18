exports.config = {
  directConnect: true,
    
  baseUrl: 'http://127.0.0.1:9000',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
    //'browserName': 'phantomjs',
    //'phantomjs.cli.args': ['--ignore-ssl-errors=true',  '--web-security=false']
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};