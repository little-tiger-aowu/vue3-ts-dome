import Mock from 'mockjs';
import loginAPI from './interface/login';
import menuApi from './interface/menu'
import userApi from './interface/user'
import tokenApi from './interface/token'

Mock.setup({
    timeout: '300-600'
});

Mock.mock(/\/api\/login/, 'post', loginAPI.login);
Mock.mock(/\/menu\/list/, 'get', menuApi.list)
Mock.mock(/\/user\/list/, 'get', userApi.list)
Mock.mock(/\/token\/data/, 'get', tokenApi.data)
