import storage from '@/scripts/storage';
import store from '@/vuex/store';

let request401 = (data) => {
    if(!store.state.components.alert.show || store.state.components.alert.message.indexOf('会话已过期') === -1) {
        store.dispatch('SHOW_ALERT', {
            message: '会话已过期，请重新登录',
            hideCancel: 'YES',
            callbacks: {
                onConfirm () {
                    store.dispatch('HIDE_ALERT');
                    window.location.href = window.localStorage.getItem('proAndHost');
                    return;
                }
            }
        });
    }
};

let request403 = (data) => {
    let message = data && data.message ? data.message : '数据请求失败';
    store.dispatch('SHOW_ALERT', {
        hideCancel: 'YES',
        message,
    })
};

let request500 = (data) => {
    let message = data && data.message  ? data.message : '服务器出错，请求失败';
    store.dispatch('SHOW_ALERT', {
        hideCancel: 'YES',
        message,
    })
};

let defaultOpts = {
    method: 'GET',
    url: '',
    headers: {
        'Cache-Control': 'no-store'
    },
    data: null,
    timeout: 1000 * 60,
    alert: true,
    blob: false,
};

let request = (options) => {
    let opts = Object.assign({}, defaultOpts, options),
        params,
        xhr,
        promise;

    opts.url = opts.url.replace(/\r|\n|\\s/g,'');

    if(opts.method === 'GET' ){
        let time = new Date().getTime();
        opts.url = (opts.url.indexOf('?') > -1)
            ? opts.url +'&_time=' + time
            : opts.url +'?_time=' + time;
    }
    
    promise = new Promise((resolve, reject) => {

        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new ActiveXObject("Msxml2.XMLHTTP") || new ActiveXObject("Microsoft.XMLHTTP");
        }

        if(!xhr) {
            store.dispatch('SHOW_ALERT', {
                message: '请求创建失败!',
            });
            return false;
        }

        xhr.open(opts.method, encodeURI(opts.url), true);

        xhr.onload = (response) => {

            let data = xhr.response,
                status = xhr.status;

            try {
                data = JSON.parse(data);
            } catch(e) {
                console.log('response信息无法被JSON.parse转义');
            }
            
            if(status >= 200 && status < 400) {
                resolve({data, response, xhr});
                return;
            }
            
            switch(status) {
                case 401:
                    if(opts.alert) {
                        request401(data);
                    }
                    reject({
                        status,
                        data, 
                        response,
                        defaultMsg: '会话已过期，请重新登录',
                    });
                    break;
                case 403:
                    if(opts.alert) {
                        request403(data);
                    } 
                    reject({
                        status,
                        data, 
                        response,
                        defaultMsg: '数据请求失败',
                    });
                    break;
                case 500:
                    if(opts.alert) {
                        request500(data);
                    }
                    reject({
                        status,
                        data, 
                        response,
                        defaultMsg: '服务器出错,数据请求失败',
                    });
                    break;
                default:
                    if(opts.alert) {
                        store.dispatch('SHOW_ALERT', {
                            hideCancel: 'YES',
                            message: data.message ? data.message : '数据请求出错',
                        });
                    }
                    reject({
                        status,
                        data, 
                        response,
                    });
                    break;
            }
        };

        xhr.onabort = (response) => {
            reject({
                status,
                response,
            });
        };

        xhr.onerror = (response) => {
            store.dispatch('SHOW_ALERT', {
                message: '服务器出错,数据请求失败',
            });
            reject({
                status,
                response,
            });
        };

        if(opts.timeout) {
            xhr.timeout = opts.timeout;
        }

        xhr.ontimeout = (response) => {
            store.dispatch('SHOW_ALERT', {
                message: '获取数据超时'
            });
            reject({
                status,
                response,
            });
        };

        for(let key in opts.headers) {
            xhr.setRequestHeader(key, opts.headers[key]);
        }

        if(!opts.blob) {
            try {
                params = JSON.stringify(opts.data);
            } catch(e) {
                params = opts.data;
            }
        } else {
            params = opts.data;
        }

        opts.data ? xhr.send(params) : xhr.send();
    });

    promise.xhr = xhr;
    return promise;
};

export default request