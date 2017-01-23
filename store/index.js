
let Vue = require('vue');
let Vuex = require('vuex');
let Video = require('./video');

Vue.use(Vuex)

module.exports = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        Video
    }
})
