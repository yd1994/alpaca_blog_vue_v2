// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'utils',
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },
    devServer: {
      proxy: {
        // 将所有以/api开头的请求代理到jsonplaceholder
        '/api1': {
          target: 'http://localhost:9042',
          changeOrigin: true,
          pathRewrite: {
            '^/api1': ''
          }
        },
        '/api2': {
          target: 'http://localhost:9041',
          changeOrigin: true,
          pathRewrite: {
            '^/api2': ''
          }
        }
      },
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QAjaxBar',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QBtnGroup',
        'QBtn',
        'QBtnDropdown',
        'QCard',
        'QCardActions',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardTitle',
        'QCheckbox',
        'QChip',
        'QDatetime',
        'QIcon',
        'QInfiniteScroll',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QJumbotron',
        'QLayout',
        'QLayoutDrawer',
        'QLayoutHeader',
        'QList',
        'QListHeader',
        'QModal',
        'QPageContainer',
        'QPage',
        'QPageSticky',
        'QPagination',
        'QPullToRefresh',
        'QRadio',
        'QRouteTab',
        'QScrollArea',
        'QSearch',
        'QSelect',
        'QSpinnerDots',
        'QStep',
        'QStepper',
        'QStepperNavigation',
        'QTab',
        'QTable',
        'QTableColumns',
        'QTabs',
        'QTabPane',
        'QTd',
        'QTimeline',
        'QTimelineEntry',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip',
        'QTr'
      ],
      directives: [
        'BackToTop',
        'CloseOverlay',
        'GoBack',
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'ActionSheet',
        'AppFullscreen',
        'Dialog',
        'LocalStorage',
        'Notify',
        'Screen'
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
      i18n: 'zh-hans'
    },
    // animations: 'all' --- includes all animations
    animations: [
      'bounceInLeft',
      'bounceOutRight'
    ],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        name: 'ALPACA BLOG',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
        extendWebpack (cfg) {
          cfg.module.rules.push({
            resourceQuery: /blockType=i18n/,
            use: [
              {loader: '@kazupon/vue-i18n-loader'},
              {loader: 'yaml-loader'}
            ]
          })
        }
      }
    }
  }
}
