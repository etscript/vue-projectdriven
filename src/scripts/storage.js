import store from '@/vuex/store';

// token
function token() {
    try {
        let token = store.state.common.token ? store.state.common.token : window.localStorage.token;

        if(!token || token === 'null') return null;

        return token;
    } catch(e) {
        return null;
    }
}

// 用户登录账户
function getUserAccount() {
    try {
        let userAccount = store.state.common.userAccount ? store.state.common.userAccount : window.localStorage.userAccount;

        if(!userAccount || userAccount == 'null') return null;
        if(typeof userAccount === 'object') return userAccount;
        if(typeof userAccount === 'string') return JSON.parse(userAccount);
    } catch(e) {
        return null;
    }
}

// 用户信息
function getUserInfo() {
    try {
        let user = store.state.common.user ? store.state.common.user : window.localStorage.user;

        if(!user || user == 'null') return null;
        if(typeof user === 'object') return user;
        if(typeof user === 'string') return JSON.parse(user);
    } catch(e) {
        return null;
    }
}

export default {
    token,
    getUserAccount,
    getUserInfo,
}