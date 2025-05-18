export default defineNitroConfig({
  compatibilityDate: '2024-12-05',
  srcDir: 'server',
  routeRules: {
    '/**': { cors: true },
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
