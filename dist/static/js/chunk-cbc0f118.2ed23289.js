(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cbc0f118"],{1477:function(e,t,r){},3679:function(e,t,r){},"924e":function(e,t,r){"use strict";var n=r("3679"),i=r.n(n);i.a},ac34:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main"},[r("div",{staticClass:"regiter-box"},[e._m(0),r("div",{staticClass:"weChat-image"},[r("img",{ref:"image",staticStyle:{width:"0"},attrs:{id:"image"}})])])])},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"weChat-text"},[r("i",{staticClass:"iconfont iconweixin",staticStyle:{color:"#212121"}}),e._v("  扫码关注即可登录\n      ")])}],a=(r("8e6e"),r("ac6a"),r("456d"),r("96cf"),r("3b8d")),c=r("bd86"),s=r("bc3a"),o=r.n(s),u=r("2f62");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(c["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f={data:function(){return{requestResult:null,timer:null}},computed:h({},Object(u["c"])(["user"])),created:function(){this.$route.query.token?(this.Token(this.$route.query.token),this.UserInfo(this.user),this.$router.push("/blog")):this.show()},methods:h({},Object(u["b"])(["Token","UserInfo"]),{show:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(this.user),this.user||(clearInterval(this.timer),this.timer=null,this.getWeChatImage());case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getWeChatImage:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get("http://wx.project-driven.xyz/api/get_qrcode");case 3:t=e.sent,console.log(t.data),console.log(t.data.data.qrcode_url),this.setWeChatImage(t.data.data.qrcode_url),this.listenUserLogin(t.data.data.wechat_flag),e.next=12;break;case 10:e.prev=10,e.t0=e["catch"](0);case 12:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}(),setWeChatImage:function(e){var t=this;setTimeout((function(){t.$refs.image.src=e,t.$refs.image.style="width: 5px, height: 5px;"}),500)},listenUserLogin:function(e){var t=this;this.$Notice.info({title:"等待扫码提示",desc:"扫描二维码关注即可登录",duration:6}),this.timer=setInterval(Object(a["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$get("/api/check_login?wechat_flag="+e).then((function(e){t.$Notice.success({title:"亲爱的"+e.data.user.nickname,desc:"欢迎回来！！！",duration:3}),console.log(e.data),t.Token(e.data.user.access_token),t.UserInfo(e.data.user),t.cancel(),t.$route.query.redirect?t.$router.push(t.$route.query.redirect):t.$router.push("/blog")})).catch((function(e){t.loading=!1}));case 1:case"end":return r.stop()}}),r)}))),2e3)},cancel:function(){clearInterval(this.timer),this.timer=null,this.$emit("cancel")},showTip:function(e,t,r){this.$store.dispatch("SHOW_TIP",{type:e,title:t,message:r})}}),beforeDestroy:function(){clearInterval(this.timer),this.timer=null},components:{}},p=f,d=(r("baa3"),r("924e"),r("2877")),g=Object(d["a"])(p,n,i,!1,null,"3786052f",null);t["default"]=g.exports},baa3:function(e,t,r){"use strict";var n=r("1477"),i=r.n(n);i.a}}]);