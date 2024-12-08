export default defineNitroConfig({
  compatibilityDate: '2024-12-05',
  srcDir: 'server',
  routeRules: {
    '/**': { cors: true, headers: { 'access-control-allow-methods': 'GET,PUT,POST,DELETE' } },
  },
  storage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
  },
  runtimeConfig: {
    app: {
      version: '',
    },
    apiUrl: '',
    corsUrl: '',
    authAccessSecret: '',
    authRefreshSecret: '',
    authSecret: '',
    authWebhook: '',
    oauthGoogleId: '',
    oauthGoogleSecret: '',
    oauthGoogleRedirect: '',
    smsSecret: '',
    smsSend: '',
    testPhone: '',
    testOTP: '',
  },
})
