import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
import ApiRequest from "@/services/ApiRequest"
import * as auth from '@/services/auth';
import axios from 'axios';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {

    const userStr = localStorage.getItem("currentUser")
    if(userStr){
      const user = JSON.parse(userStr);
      setAuthorization(user.access_token);
      return user;
    }else{
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  //用户登录
  const login = async (values, type) => {
    const result = {};
    try {
      values.client_id = CLIENT_ID;
      values.client_secret = CLIENT_SECRET;
      values.grant_type = "password";

      const msg = await auth.login(values);

      if (msg.code === "00000") {
        const defaultLoginSuccessMessage = '登录成功！';
        result.success = true;
        result.message = defaultLoginSuccessMessage;
        result.data = msg.data;

        localStorage.setItem('currentUser', JSON.stringify(msg.data));

        //api请求增加header Authorization
        setAuthorization(msg.data.access_token);
        /** 此方法会跳转到 redirect 参数所在的位置 */

        return result;
      }
      result.success = false;
      result.message = "登录失败，code："+msg.code+"，原因：" + msg.message;
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';

      result.success = false;
      result.message = defaultLoginFailureMessage;
    }

    return result;
  }

  //用户登出
  const logout = async () => {
    localStorage.removeItem("currentUser");
    //api请求删除header Authorization
    removeAuthorization();
  }

  const setAuthorization = (token) => {
    ApiRequest.extendOptions({ headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  const removeAuthorization = () => {
    ApiRequest.extendOptions({ headers: {
        'Authorization': '',
      }
    });
    axios.defaults.headers.common['Authorization'] = '';
  }

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      logout,
      login,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    logout,
    login,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    /*waterMarkProps: {
      content: initialState?.currentUser?.name,
    },*/
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
