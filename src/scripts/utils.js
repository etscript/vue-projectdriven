import store from '@/vuex/store';

export default {
    /*
        @function isIE(): 判断浏览器是否IE
    */
    isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            return true;
        } else {
            return false;
        }
    },
    /*
        @function cloneObj(): 深拷贝对象数据
        @param obj Array or Object: 拷贝数据
    */
    cloneObj(obj) {
        let str, 
            newobj = obj.constructor === Array ? [] : {};

        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj),
            newobj = JSON.parse(str); 
        } else {
            for(let i in obj){
                newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
            }
        }
        return newobj;
    },
    /*
        @function toggleCheckAll(): 列表单选
        @param _data Object: vm的所有data数据
        @param isCheckAll Bool: 当前项选中状态
    */
    toggleCheckAll(_data, isCheckAll) {
        if(isCheckAll) {
            let arr = [];

            _data.list.map(item => {
                item.checked = true;
                arr.push(item);
            });

            _data.checked = arr;
        } else {
            _data.list.map(item => {
                item.checked = false;
            });

            _data.checked = [];
        }
    },
    /*
        @function changeCheckItem(): 列表全选
        @param _data Object: vm的所有data数据
        @param item Object: 当前项
    */
    changeCheckItem(_data, item) {
        if(item.checked){
            _data.checked.push(item);
        } else {
            let _index = _data.checked.findIndex( i => {
                return i.id === item.id;
            });
            _data.checked.splice(_index, 1); 
        }
    },
    /*
        @function buildOptionsData(): 添加列表项label value字段
        @param originList Array: 原始数据
        @param label String: 字段名
        @param value String: 字段值
    */
    buildOptionsData(originList, label, value) {
        if(!originList) {
            console.warn('originList is not defined');
            return [];
        }
        if(!(originList instanceof Array)) {
            console.warn('originList is not a Array');
            return [];
        }

        let finalData = originList.filter((item) => {
            if(label) {
                item.label = item[label];
            } else {
                if(item.name && item.name.length) {
                    item.label = item.name;
                } else {
                    item.label = item.id;
                }
            }
            item.value = value ? item[value] : item.id;
            return true;
        });

        return finalData;
    },
    /*
        @function filterList(): 列表过滤
        @param originList Array: 原始数据
        @param searchKeys Array: 过滤字段
        @param search Object: 字段值
    */
    filterList(originList, searchKeys, search) {

        if(!originList.length) return [];

        if(!Array.isArray(originList)) {
            console.warn('the originList is not an array!');
            return [];
        }

        let filterList = [];

        for(let i = 0; i < originList.length; i++) {
            let obj = {};
            
            for(let j = 0; j < searchKeys.length; j++) {
                let inclusePoint = searchKeys[j].includes('.'),
                    value = inclusePoint ? this.getObjDeepVal(originList[i], searchKeys[j]) : originList[i][searchKeys[j]];

                obj[searchKeys[j]] = value;
            }

            let isInclude = false;
            for(let key in search) {
                let value = obj[key],
                    valueString = value;

                if(key === 'searchText') {
                    valueString = JSON.stringify(obj);
                    if(search[key].length) {
                        for(let val in obj) {
                            try {
                                if(obj[val] &&obj[val].includes(search[key])) {
                                    isInclude = true;
                                }
                            } catch(e) {
                                console.log('search error', val, obj);
                            }
                        } 
                    } else {
                        isInclude = true;
                    }
                } else {
                    if(typeof value === 'object' && !Array.isArray(value)) {
                        valueString = JSON.stringify(value);
                    }

                    if(search[key] && search[key].length) {
                        isInclude = valueString ? valueString.includes(search[key]) : false;
                    } else {
                        isInclude = true;
                    }
                }
                if(!isInclude) break;
            }

            if(isInclude) {
                filterList.push(originList[i]);
            }
        }

        return filterList;
    },
    /*
        @function sortList(): 列表排序
        @param originList Array: 原始数据
        @param key String: 参照字段
        @param sortBy String: 顺序 ('up', 'down')
    */
    sortList(originList, key, sortBy) {

        let data = Array.from(originList),
            list = [],
            inclusePoint = key.includes('.'),
            currentSt,
            nextSt;

        data.map( item => {
            item.checked = false;
        });

        list = data.sort((current, next) => {
            if(inclusePoint) {
                currentSt = String(this.getObjDeepVal(current, key));
                nextSt = String(this.getObjDeepVal(next, key));
                return currentSt.localeCompare(nextSt)
            } else {
                currentSt = String(current[key]);
                nextSt = String(next[key]);
                return currentSt.localeCompare(nextSt);
            }
        }); 

        return sortBy == 'up' ? list : list.reverse();
    },
    /*
        @function getObjDeepVal(): 获取深层数据
        @param obj Object: 深层对象
        @param key String: 字段名
    */
    getObjDeepVal(obj, key) {
        let keys = key.split('.');

        if(!obj[keys[0]]) {
            return '';
        }

        if(keys.length > 1) {
            let pointIndex = key.indexOf('.')
            return this.getObjDeepVal(obj[keys[0]], key.substring(pointIndex + 1));
        } else if(keys.length === 1) {
            return obj[keys[0]] || '';
        } else {
            return '';
        }
    },

}