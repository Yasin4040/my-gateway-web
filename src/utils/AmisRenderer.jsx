import { render as renderSchema, makeTranslator } from 'amis';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import {message } from 'antd';

import '../../node_modules/amis/lib/themes/cxd.css';
import '../../node_modules/amis/lib/helper.css';
import '../../node_modules/amis/sdk/iconfont.css';
import attachmentAdpator from 'amis/lib/utils/attachmentAdpator';
import {history} from "umi";

axios.defaults.baseURL = BASE_API

axios.interceptors.response.use(
  response => {
    if(response.data.code === "A0230"){
      history.push('/login');
      return;
    }

    if(response.config.responseType === "blob"){
      return attachmentAdpator(response, makeTranslator());
    }

    const result = {};
    if(response.data.code === "00000"){
      result.status = 0;
      result.msg = response.data.message;
    }else{
      result.status = -1;
      result.msg = response.data.message + "(" + response.data.code + ")";
    }
    result.data = response.data.data;
    response.data = result;
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
    // 返回接口返回的错误信息
  });

const defaultOptions = {
  // 下面三个接口必须实现
  fetcher: ({
              url, // 接口地址
              method, // 请求方法 get、post、put、delete
              data, // 请求数据
              responseType,
              config, // 其他配置
              headers // 请求头
            }) => {
    config = config || {};
    config.withCredentials = true;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
      config.cancelToken = new (axios).CancelToken(
        config.cancelExecutor
      );
    }

    config.headers = headers || {};

    if (method !== 'post' && method !== 'put' && method !== 'patch') {
      if (data) {
        config.params = data;
      }

      return (axios)[method](url, config);
    } else if (data && data instanceof FormData) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (
      data &&
      typeof data !== 'string' &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json';
    }

    return (axios)[method](url, data, config);
  },
  isCancel: (value) => (axios).isCancel(value),
  copy: content => {
    copy(content);
    message.success('内容已复制到粘贴板');
  },
  // notify: (
  //   type, msg
  // ) => {
  //   message[type]
  //     ? message[type](msg)
  //     : console.warn('[Notify]', type, msg);
  // },
  theme: 'cxd' // cxd 或 antd
};

export default ( schema, props, env ) => {
  return renderSchema(schema, props, {...defaultOptions, ...env });
};
