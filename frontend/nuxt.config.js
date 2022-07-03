export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - SEI 2.0',
    title: 'SEI 2.0',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css', // https://fontawesome.com/search?m=free
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/typescript
    '@nuxtjs/vuetify', // https://go.nuxtjs.dev/vuetify
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/toast', // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org/status/
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {},

  toast: {
    position: 'top-right',
    duration: 6000,
  },

  router: {
    // middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: {
        token: {
          type: 'Token',
          maxAge: 18000,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: '/accounts/login/',
            method: 'post',
          },
          logout: {
            url: '/accounts/logout/',
            method: 'get',
          },
          user: {
            url: '/accounts/users/me/',
            method: 'get',
          },
        },
      },
    },
    rewriteRedirects: false,
    redirect: {
      login: '/login',
      logout: '/login',
      home: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
		host: '0.0.0.0',
		port: process.env.VUE_PORT || 3000,
	},
}
