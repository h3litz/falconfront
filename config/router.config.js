export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
        ],
      },
      {
        name: 'asset',
        icon: 'cloud',
        path: '/asset',
        routes: [
          {
            name: 'originDomain',
            path: 'originDomain',
            component: './Asset/originDomain/index.js',
          },
          {
            name: 'domain',
            path: 'domain',
            component: './Asset/domain/index.js',
          },
          {
            name: 'domainDetail',
            path: 'domain/:id',
            hideInMenu: true,
            component: './Asset/domain/$id.js',
          },
          {
            name: 'ip',
            path: 'ip',
            component: './Asset/ip/index.js',
          },
          {
            name: 'port',
            path: 'port',
            component: './Asset/port/index.js',
          },
          {
          name: 'web',
          path: 'web',
          component: './Asset/web/index.js',
          }, 
          {
            name: 'cdn',
            path: 'cdn',
            component: './Asset/cdn/index.js',
          }, 
        ]
      },
      {
        name: 'risk',
        icon: 'money-collect',
        path: '/risk',
        routes: [
          {
            name: 'vuln',
            path: 'vuln',
            component: './Risk/vuln/index.js',
          },
        ]
      },
      {
        name: 'outband',
        icon: 'money-collect',
        path: '/outband',
        routes: [
          {
            name: 'xss',
            path: 'xss',
            component: './Outband/xss/index.js',
          },
          {
            name: 'dns',
            path: 'dns',
            component: './Outband/dns/index.js',
          },
          {
            name: 'http',
            path: 'http',
            component: './Outband/http/index.js',
          },
        ]
      },
      {
        name: 'scan-settings',
        icon: 'money-collect',
        path: '/settings',
        routes: [
          {
            name: 'awvs',
            path: 'awvs',
            component: './Settings/awvs/index.js',
          },
        ]
      },
      {
        component: '404',
      },
    ],
  },
];