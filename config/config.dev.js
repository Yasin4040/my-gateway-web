// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    // BASE_API: 'http://localhost:8182',
    BASE_API: 'http://192.168.31.99:11001/',
    CLIENT_ID: 'client4',
    CLIENT_SECRET: '123456',
  },
});
