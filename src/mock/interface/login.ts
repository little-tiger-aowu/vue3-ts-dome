import Mock from 'mockjs';

const Users = [
    {
        username: 'admin',
        password: '123456',
        name: 'Admin'
    },
    {
        username: 'user1',
        password: 'password1',
        name: 'User 1'
    },
    {
        username: 'user2',
        password: 'password2',
        name: 'User 2'
    }
];

export default {
    login: (config: any) => {
        const {username, password} = JSON.parse(config.body);
        const user = Users.find(item => item.username === username && item.password === password);
        if (user) {
            return {
                code: 200,
                message: '登录成功',
                data: Mock.mock({
                    token: '@guid',
                    user: user
                })
            }
        } else {
            return {
                code: 400,
                message: '用户名或密码错误'
            }
        }
    }
}
