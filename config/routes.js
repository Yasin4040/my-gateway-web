export default [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/route',
    name: '路由配置管理',
    icon: 'smile',
    component: './Route',
  },
  {
    path: '/whiteList',
    name: '白名单管理',
    icon: 'smile',
    component: './WhiteList',
  },
  {
    path: '/ipBlack',
    name: 'Ip黑名单管理',
    icon: 'smile',
    component: './IpBlack',
  },
  {
    path: '/',
    redirect: '/route',
  },
  {
    component: './404',
  },
];
