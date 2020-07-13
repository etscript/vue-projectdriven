<template>
<div> 
  <div class="header">
    <img src="../../assets/nav-map.jpg" class="footer-bg">

    <div class="menu">
      <div class="left">
        <div class="logo">
          <img src="../../assets/logo.png" alt="">
        </div>
        <div class="search" >
          <el-form class="searchform">
            <!-- <el-input :model="keyword" placeholder="请输入关键字..." @blur='queryData' @input="queryData"/> -->
            <el-input v-model="keyword" type="text" placeholder="请输入关键字..." @keyup.enter.native="search"/>
          </el-form>

          <el-button class="searchbutton" @click="search">
            <span>SEARCH</span>
          </el-button>
        </div>
        <!-- 菜单 -->
        <!-- <li v-for="(item, index) in nav" :key="index" :class="{active:$route.path==item.url}">
          <a @click="goRouter(item.url)">{{item.name}}</a>
        </li> -->
        <!-- <li>
          <a href="http://blog-doc.golang365.com" target="_blank"> API文档 </a>
        </li> -->
        
      </div>

      <div class="user" v-if="user">
        <Dropdown @on-click="changeMenu">
          <a href="javascript:void(0)" class="user-info">
            <img :src="user.headimgurl ? user.headimgurl : `https://avatars.dicebear.com/v2/identicon/id-${user.id}.svg`">
            {{user.name}}
            <Icon type="md-arrow-dropdown" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="person"><Icon type="md-person" />个人中心</DropdownItem>
            <DropdownItem name="admin" v-if="user.admin=='1'"><Icon type="logo-xbox" />后台管理</DropdownItem>
            <!-- <DropdownItem name="changePasswd"><Icon type="md-settings" />修改密码</DropdownItem> -->
            <DropdownItem name="logout"><Icon type="md-exit" />退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div class="right" v-else>
        <router-link to="/login">登录</router-link>
        <!-- <span class="register">/</span>
        <router-link to="/register">注册</router-link> -->
      </div>

    </div>
  </div>

  <div class="header2">
    <img src="../../assets/nav-map.jpg" class="footer-bg">

    <div class="menu2">
      <div class="left">
        <!-- 菜单 -->
        <li v-for="(item, index) in nav" :key="index" :class="{active:$route.path==item.url}">
          <a @click="goRouter(item.url)">{{item.name}}</a>
        </li>
        <!-- <li>
          <a href="http://blog-doc.golang365.com" target="_blank"> API文档 </a>
        </li> -->
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  data () {
    return {
      nav: [
        {name: '首页', url: '/blog', icon: 'ios-book'},
        {name: 'Kubernetes', url: '/search?q=kubernetes', icon: 'logo-octocat'},
        {name: 'Flask', url: '/search?q=flask', icon: 'logo-usd'},
        {name: 'Vue', url: '/search?q=vue', icon: 'md-chatboxes'},
        {name: 'ML', url: '/search?q=ml', icon: 'md-chatboxes'},
        {name: 'Finance', url: '/search?q=finance', icon: 'md-chatboxes'},
        {name: '友链', url: '/link', icon: 'logo-octocat'},
        // {name: '打赏', url: '/donate', icon: 'logo-usd'},
        {name: '留言', url: '/message', icon: 'md-chatboxes'},
        {name: '我', url: '/about', icon: 'md-beer'},
      ],
      mobnav: '2',
      keyword: ''
    }
  },
  
  computed: {
    ...mapGetters([
      'user'
    ]),
  },
  created(){
    console.log("看下user的数据"),
    console.log(this.user)
  },
  watch:{
    $route(to,from){
      this.mobnav = '2'
    }
  },
  methods: {
    ...mapActions(['Logout']),
    goRouter(item) {
      // 当有选择标签或者分类时点击博客自动选择
      if (item == '/blog') {
        if (this.classify && this.classify!='all') {
          this.$router.push({path:'/blog', query:{classify: this.classify}})
        } else if (this.tag) {
          this.$router.push({path:'/blog', query:{tag: this.tag}})
        } else {
          this.$router.push({path:'/blog'})
        }
      } else {
        this.$router.push({ path: item})
      }
    },
    changeMenu(item) {
      if (item == 'changePasswd') {
        this.$router.push('/password')
      } 
      if (item == 'person') {
        this.$router.push('/person')
      } 
      if (item == 'admin') {
        // window.href = "/manage.html/#/articlelist"
        // let routeData = this.$router.resolve({ path: '/manage.html/#/articlelist'});
        window.open('/manage.html#/articlelist', '_blank');
      }
      if (item == 'logout') {
        this.$post('/api/logout').then(res => {
          this.$Notice.success({
            title: res.message,
            desc: '欢迎下次再来👏',
            duration: 3,
          });
          // this.$Message.success(res.message)
          this.$router.push('/')
          this.Logout()
        }).catch(() => {
          this.$router.push('/')
          this.Logout()
        })
      }
    },
    search() {
      // 当有选择标签或者分类时点击博客自动选择
      if (this.keyword == '') {
        this.$router.push({ path:'/search'})
      } else {
        this.$router.push({ path:'/search', query:{q: this.keyword}})
        this.keyword = ''
      }
    }
  },
  components: {
    // loginView,
  }

}
</script>

<style scoped lang="stylus">
.header
  display: flex
  min-height: 70px
  background-color: #2B2B2B
  color #fff
  position relative
  width 100%
  z-index: 10
  .nav
    display: flex
    justify-content: flex-end
    flex: 1
  .logo
    width 200px
    height 60px
    margin-right 20px
    img
      width 100%
  .search
    margin-left 100px
  .searchform
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color #f1f1f3
    width 250px
  .searchbutton
    width 95px
    background-color #f1f1f3
    margin-left 20px

.header2
  box-shadow: 8px 14px 38px #e7eeef
  width: 100%;
  display: flex
  min-height: 50px
  background-color: #2B2B2B
  color #fff
  position relative
  width 100%
  z-index: 9
  .nav
    display: flex
    justify-content: flex-end
    flex: 1
  .logo
    width 200px
    height 60px
    margin-right 20px
    img
      width 100%


.footer-bg, .nav-bg
  position: absolute;
  opacity: .25;
  height: 100%;
  width: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
.footer-bg
  width: 100%
.nav-bg
  top: 0
  display none

.header .menu
  z-index 20px
  position relative
  width 1000px
  margin 0 auto
  display flex
  color #fff
  justify-content space-between
  font-size 14px
  padding: 0 20px
  font-size 16px
  div
    display flex
    align-items center
    a 
      color #fff
  .left li
    padding 1px 15px
    margin 0 2px
  .left li.active
    background: #C0C0C0;
    border-radius: 3px;
  .left li a:hover
    border-bottom: 1px solid;
    // text-decoration
  .user-login
    color  #fff
    font-size  15px
    font-weight  600
    cursor  pointer


.header2 .menu2
  z-index 20px
  position relative
  width 1000px
  margin 0 auto
  display flex
  color #fff
  justify-content space-between
  font-size 14px
  padding: 0 20px
  font-size 16px
  div
    display flex
    align-items center
    a 
      color #fff
  .left li
    padding 1px 15px
    margin 0 2px
  .left li.active
    background: #C0C0C0;
    border-radius: 3px;
  .left li a:hover
    border-bottom: 1px solid;
    // text-decoration
  .user-login
    color  #fff
    font-size  15px
    font-weight  600
    cursor  pointer
    
// 更改element-UI按钮样式 
.el-button--primary 
  color: #fff;
  background-color: #fff;
  border-color: #fff;

.el-button--primary:hover
  background-color: #fff;
  border-color: #fff;  

.el-button--primary:focus
  background-color: #fff;
  border-color: #fff;  
    
 

.register
  margin 0 10px

// 手机菜单
.nav-content
  z-index 11
  display none
  position: relative;
  background: transparent;
  border: 0 !important;
  span
    background: #fff;
    margin: 2.5px;
    display: table;
    width: 25px;
    height: 3px;
    border-radius: 18%;


.mobliNav-main
  width 100%
  position relative
  overflow hidden
  background-image: linear-gradient(167deg,#2b274b,#771787 49%,rgba(201,28,136,.91));
  li
    display flex
    position relative
    z-index 20
    align-items center
    padding 10px 20px
    color #fff
    .user-img
      width 20px
      border-radius 50%
      margin-right 8px
    i
      font-size 18px
      margin-right 10px
    a
      width: 100%
      color #fff
      font-size 14px
    a:hover
      color: #6289ad
  li.active
    background rgba(166, 37, 141, .4)
  .second
    padding-left 40px

.phone-logo
  display none

.user
  .user-info
    display flex
    align-items center
  img
    width 40px
    height 40px
    margin-right 10px
    border-radius 50%
  .ivu-dropdown-item
    font-size 14px !important
    i 
      margin-right 10px


@media screen and (max-width: 750px)
  .header 
    .footer-bg, .menu
      display none
  .nav-bg, .nav-content
    display block
  .phone-logo
    display block
    position: absolute;
    top: 9px;
    z-index: 20;
    width: 100px;
    left: 20px
    img
      width 100%
</style>
