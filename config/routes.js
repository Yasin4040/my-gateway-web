export default [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/database',
    name: '数据库配置管理',
    icon: 'smile',
    component: './Database',
  },
  {
    path: '/project',
    name: '项目配置管理',
    icon: 'smile',
    component: './Project',
  },
  {
    path: '/form',
    name: '表单配置管理',
    icon: 'smile',
    component: './Form',
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
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
