require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || '0.0.0.0',
  apiPort: process.env.APIPORT,
  domain: environment.isProduction ? 'https://speedvocab2.herokuapp.com' : 'http://localhost:3000',
  app: {
    title: 'SpeedVocab',
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//assets.juicer.io/embed.css',
        media: 'all'
      }
    ],
    script: [
      {
        src: '//assets.juicer.io/embed.js',
        type: 'text/javascript'
      },
      {
        src: '/ga.js',
        type: 'text/javascript'
      }
    ],
    description: 'Quizlet complementary',
    head: {
      titleTemplate: 'SpeedVocab: %s',
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1'},
        {name: 'description', content: 'Quizlet complementary'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Quizlet complementary'},
        {property: 'og:image', content: 'https://speedvocab2.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'fi_FI'},
        {property: 'og:title', content: 'SpeedVocab'},
        {property: 'og:description', content: 'Quizlet complementary'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@chuson1996'},
        {property: 'og:creator', content: '@chuson1996'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
