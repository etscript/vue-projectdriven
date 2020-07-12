(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f29fc21c"],{3001:function(e,t,a){},eee6:function(e,t,a){"use strict";var i=a("3001"),r=a.n(i);r.a},efad:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("main",[a("section",{directives:[{name:"loading",rawName:"v-loading",value:e.articleLoading,expression:"articleLoading"}],staticClass:"wrap scroll"},[a("el-form",{ref:"form",attrs:{"label-width":"70px","label-position":"left"},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[a("div",{staticClass:"leftbox"},[a("el-form-item",{attrs:{label:"文章标题"}},[a("el-input",{staticClass:"input_title",attrs:{size:"small"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),a("el-row",{attrs:{type:"flex"}},[a("el-form-item",{attrs:{label:"所属分类"}},[a("el-input",{attrs:{size:"small"},model:{value:e.form.classify,callback:function(t){e.$set(e.form,"classify",t)},expression:"form.classify"}})],1),a("el-form-item",{attrs:{label:"标签"}},[a("el-input",{attrs:{size:"small",placeholder:"多个标签用英文逗号隔开"},model:{value:e.form.tags,callback:function(t){e.$set(e.form,"tags",t)},expression:"form.tags"}})],1)],1),a("el-row",{attrs:{type:"flex"}},[a("el-form-item",{attrs:{label:"创建日期"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",size:"small",placeholder:"选择日期"},model:{value:e.form.created_at,callback:function(t){e.$set(e.form,"created_at",t)},expression:"form.created_at"}})],1),a("el-form-item",{attrs:{label:"浏览量"}},[a("el-input-number",{attrs:{size:"small",precision:0,min:0,controls:!1},model:{value:e.form.clicks,callback:function(t){e.$set(e.form,"clicks",t)},expression:"form.clicks"}})],1),a("el-form-item",{attrs:{label:"点赞量"}},[a("el-input-number",{attrs:{size:"small",precision:0,min:0,controls:!1},model:{value:e.form.like,callback:function(t){e.$set(e.form,"like",t)},expression:"form.like"}})],1)],1)],1),a("div",{staticClass:"rightbox"},[a("el-form-item",{attrs:{label:"文章封面"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/image/upload",name:"image",headers:e.headers,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.blogBanner?a("img",{staticClass:"avatar",attrs:{src:e.blogBanner}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)]),a("mavon-editor",{ref:"md",staticClass:"makedown",on:{imgAdd:e.$imgAdd},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),a("footer",[e.$route.params.id?a("el-button",{attrs:{type:"info",size:"small",loading:e.loading},on:{click:e.editBtn}},[e._v("保存修改")]):a("el-button",{attrs:{type:"primary",size:"small",loading:e.loading},on:{click:e.addBtn}},[e._v("保　存")]),e.$route.params.id?a("el-button",{attrs:{type:"danger",size:"small",loading:e.loading},on:{click:e.removeBtn}},[e._v("彻底删除")]):e._e()],1)])},r=[],s=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),o=a("bc3a"),n=a.n(o),l=a("2f62");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){Object(s["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var d={data:function(){return{title:"写博客",blogBanner:"",loading:!1,articleLoading:!1,form:{title:"",desc:"",img:"",content:"",classify:"",tags:"",clicks:"",like:"",deleted_at:!1,created_at:new Date}}},computed:m({},Object(l["c"])(["token"]),{headers:function(){return{Authorization:this.token,"X-Requested-With":"XMLHttpRequest"}}}),created:function(){this.$route.params.id&&this.getArticle()},watch:{$route:function(e,t){this.blogBanner="",this.form={title:"",desc:"",img:"",content:"",html_content:"",classify:"",tag:"",clicks:"",like:"",deleted_at:!1,created_at:new Date}}},methods:{addBtn:function(){var e=this;this.form.article_filter_content=this.$refs.md.d_render,this.loading=!0,this.$post("/api/article/add",this.form).then((function(t){e.$message.success(t.message),e.$router.push("/articlelist")}))},getArticle:function(){var e=this;this.articleLoading=!0;var t={id:this.$route.params.id,all:1};this.$post("/api/article",t).then((function(t){console.log(t.data),e.articleLoading=!1,e.form=t.data,e.form.tags=t.data.tags.join(","),e.form.img&&(e.blogBanner=e.$staticUrl+e.form.img)}))},editBtn:function(){var e=this;this.form.article_filter_content=this.$refs.md.d_render,this.loading=!0,this.$post("/api/article/edit",this.form).then((function(t){e.$message.success(t.message),e.$router.push("/articlelist")}))},removeBtn:function(){var e=this;this.$confirm("确认彻底删除吗?","提示",{type:"warning"}).then((function(){e.loading=!0,e.$post("/api/article/remove",e.form).then((function(t){e.$message.success(t.message),e.$router.push("/articlelist")}))})).catch((function(){}))},handleAvatarSuccess:function(e,t){this.form.img&&this.handleRemove(),this.blogBanner=URL.createObjectURL(t.raw),this.$message.success("图片上传成功"),this.form.img=e.data.url},handleRemove:function(){var e=this,t={image:this.form.img};this.$post("/api/image/delete",t).then((function(t){e.$message.success(t.message)}))},beforeAvatarUpload:function(e){var t="image/jpeg"==e.type||"image/png",a=e.size/1024/1024<3;return t||this.$message.error("上传图片只能是 JPG和png 格式!"),a||this.$message.error("上传头像图片大小不能超过 3MB!"),t&&a},$imgAdd:function(e,t){var a=this,i=new FormData;i.append("image",t),n()({url:"/api/image/upload",method:"post",data:i,headers:{Authorization:this.token,"X-Requested-With":"XMLHttpRequest"}}).then((function(i){console.log(111,i,i.data.data.url,t),a.$refs.md.$img2Url(e,a.$staticUrl+i.data.data.url)}))},$imgDel:function(e){var t=this;console.log(e,"图片名"),n()({url:"/api/image/delete",method:"post",data:{image:e},headers:{Authorization:this.token,"X-Requested-With":"XMLHttpRequest"}}).then((function(a){console.log(111,a,a.data.data.url,$file),t.$refs.md.$img2Url(e,t.$staticUrl+a.data.data.url)}))}}},f=d,u=(a("eee6"),a("2877")),p=Object(u["a"])(f,i,r,!1,null,"34eac2ec",null);t["default"]=p.exports}}]);