import { request, extend } from 'umi-request';
import { history } from 'umi';

const extendRequest = extend({
  prefix: BASE_API,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

extendRequest.use(async (ctx, next) => {
  await next();
  const { res } = ctx;
  if(res.code === 'A0230'){
    history.push('/login');
  }
});

export default extendRequest;
