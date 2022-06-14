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
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
