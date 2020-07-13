<template>
  <div class="main flex">
    <TextLoading v-if="loading"></TextLoading>
    <div class="article" v-else>

      <router-link :to="{path:`/blog/${item.id}`}" class="list animate03" v-for="(item, index) in articles" :key="index">
        <div class="classifybox">
          <div class="classify">{{item.classify}}</div>
        </div>

        <div class="list-img">
          <img :src="item.img" class="footer-bg animate03">
        </div>

        <div class="list-main">
          <!-- <router-link :to="{path:`/blog/${item.id}`}" class="tag">postman</router-link> -->
          <h3 v-html="item.title"></h3>
          <!-- <h3> <vue-markdown :source="item.title" v-highlight></vue-markdown> </h3>-->
          <div class="content-short"> {{item.content_short}}</div>
          <!-- <div class="creattime">
            <i class="iconfont lv-icon-kalendar"></i>
            发布于 {{item.created_at.substring(0,10)}}
          </div> -->
          
           <!-- 有标签才显示 -->
          <!-- <div class="tag-box" v-if="item.tags && item.tags.length">
            <i class="iconfont lv-icon-biaoqian6"></i>
            <span v-for="(tagli, index) in item.tags" :key="index" :class="{active:tag==tagli}">
              {{tagli}}
            </span>
          </div> -->

          <div class="comment">
            <div class="group-left">
              <span><i class="iconfont lv-icon-huore">{{item.view_count}}</i> 热度</span>
              <span><i class="iconfont lv-icon-xiaoxi3">{{item.commentCount}} 评论</i></span>
            </div>
            <div class="group-right iconfont lv-icon-kalendar"> {{item.created_at.substring(0,10)}}</div>
            <!-- <span><i class="iconfont lv-icon-huore"></i>{{item.view_count}}热度</span>
            <span><i class="iconfont lv-icon-xiaoxi3"></i>{{item.commentCount}}条评论</span> -->
            
            <!-- <span class="creattime"><i class="creattime iconfont lv-icon-kalendar"></i>
            发布于 {{item.created_at.substring(0,10)}}
            </span> -->
          </div>
        </div>

      </router-link>


      <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>6"></MyPage>
    </div>
    <!-- <common 
      :pageModel="pageModel"
      @getArticles="getArticles"
      @ArticlesOrderByClassify="ArticlesOrderByClassify" 
      @ArticlesOrderByTag="ArticlesOrderByTag">
    </common> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import common from '../common'

export default {
  components: {
    common
  },
  data() {
    return {
      show: true,
      loading: false,
      checked: true,
      articles: [],
      classifys: [],
      pageModel: {
        page: Number(this.$route.query.page) || 1,
        sumCount: 6
      }
    }
  },
  computed: {
    ...mapGetters([
        'classify', 'tag'
    ])
  },
  created() {
    if (this.$route.query.tag) {
      this.ArticlesOrderByTag()
    } else if (this.$route.query.classify) {
      this.ArticlesOrderByClassify()
    } else {
      this.getArticles()
    }
  },
  watch: {
    $route(to, from) {
      // 在mounted函数执行的方法，放到该处
      this.getArticles()
      }
    },
  methods: {
    ...mapActions([
      'Tag', 'Classify'
    ]),
    getArticles() {
      let q = this.$route.query.q
      let page = 1
      let per_page = 10
      let path
      this.loading = true
      if (typeof q != 'undefined') {
        path = `/api/search/?q=${q}&page=${page}&per_page=${per_page}`
      } else {
        path = `/api/search/?page=${page}&per_page=${per_page}`
      }
      this.$get(path).then(res => {
        this.pageModel.sumCount = res.data._meta.total_items
        this.articles = res.data.items
        this.AddStaticUrl()
        this.Classify('all')
        this.loading = false
      })
    },
    selectRoleList() {
      if (this.$route.query.classify) {
        this.ArticlesOrderByClassify()
        this.$router.push({path:'/blog', query:{
          classify: this.$route.query.classify,
          page: this.pageModel.page
        }})
        console.log('请求分类分页')
      } else if (this.$route.query.tag) {
        this.ArticlesOrderByTag()
        this.$router.push({path:'/blog', query:{
          tag: this.$route.query.tag,
          page: this.pageModel.page
        }})
        console.log('请求标签分页')
      } else {
        this.getArticles()
        this.$router.push({path:'/blog', query:{
          page: this.pageModel.page
        }})
        console.log('请求正常分页')
      }
      window.scrollTo(0,0);
    },
    // 按标签获取
    ArticlesOrderByTag() {
      this.loading = true
      let param = {
        tag: this.$route.query.tag
      }
      this.$post('api/tag/list', Object.assign(param, this.pageModel)).then(res => {
        this.pageModel.sumCount = res.data.total

        this.articles = []
        res.data.data.forEach(item => {
          this.articles.push(item.article)
        })
        this.AddStaticUrl()
        this.Tag(this.$route.query.tag)
        this.loading = false
      })
    },
    // 按分类获取
    ArticlesOrderByClassify() {
      this.loading = true
      let param = {
        classify: this.$route.query.classify
      }
      this.$post('/api/article/list', Object.assign(param, this.pageModel)).then(res => {
        this.pageModel.sumCount = res.data.total
        this.articles = res.data.data
        this.AddStaticUrl()
        this.Classify(this.$route.query.classify)
        this.loading = false
      })
    },
    // 为静态图片添加域名
    AddStaticUrl() {
      this.articles.forEach(item => {
        if (item.img && item.img.indexOf("http")<0) {
          item.img = this.$staticUrl + item.img
        }
      });
    }

  }
}
</script>

<style lang="stylus">
// markmown样式
.article 
  .v-note-wrapper .v-note-panel
    border none !important
  .v-show-content
    background #fff !important
</style>

<style scoped lang="stylus">
.main 
  flex-direction: column
.article, a 
  font-family: 'Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;
  color #34495e
.topTab
  font-size 16px
  margin-bottom 20px
  padding 12px 20px
  box-shadow: 2px 2px 14px #c0dbe6

.typeTitle
  padding: 5px 15px 5px;
  margin-bottom: 17px;
  background: #ecf0f1
  font-size: 16px;

.article
  flex 1
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

.created
  color #888
  font-size 12px
  i
    color #959595
    margin-right 4px
    font-size 14px
.title
  color #34495e
  line-height 30px
  font-size 18px

  


    
.desc
  margin 5px 0 10px
.tag-box
  line-height 24px
  font-size 14px
  span
    padding 0 4px
  i 
    font-size 12px 
  .tag
    display: inline-block;
    padding 2px 8px
    border-radius 3px
    background #e8e8e8
    margin 5px 5px   
  span.active
    color #ea546e



.list
  position relative
  display flex
  // 元素圆角边框
  border-radius 10px
  // 元素的下外边距
  margin-bottom 40px
  // 横着的大框高度变化
  height 300px
  font-size 14px
  // 阴影效果
  box-shadow: 8px 14px 38px #e7eeef
  width: 100%;
  .list-main
    flex 0 1 358px
    padding 25px 40px
    .tag
      display inline-block
      margin-bottom 4px
      color #738a94
      font-size 10px
      line-height 14px
      font-weight 500 
      letter-spacing .5px
      text-transform uppercase
    .creattime
      text-align right
      margin-bottom 5px
    h3
      font-size 18px
      font-weight 400
      margin-bottom 25px
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    .content-short
      font-size 14px
      height 140px
    .comment
      height 10%
      display flex 
      justify-content  space-between
      line-height 30px
      .group-left 
        justify-content  flex-start 
        font-size 12px
        span
          margin-right 15px
          font-size 12px
        i 
          margin-right 4px
          font-size 14px 

      .group-left text
        font-size 14px 

      .group-right
        justify-content  flex-end
        font-size 12px

      .group-right text
        justify-content  flex-end
        font-size 14px 

  .list-img
    flex 1
    img
      width 100%
      height 100%
      object-fit: cover
      mix-blend-mode: multiply
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
  .group-right
    display: flex;
    align-items: center;
    height: 40rpx;
  .classifybox
    position absolute
    left -8px
    top -8px
    width 100px
    height 100px
    overflow hidden
    z-index: 30;
  .classify
    width: 220px;
    left: -70px;
    top: 25px;
    text-align: center
    padding 4px 15px
    position relative
    color #fff
    font-weight 600
    background-image: linear-gradient(90deg,#23a6d5,#23d5ab);
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    transform: rotate(-45deg);
  .classifybox:after, .classifybox:before
    position: absolute;
    z-index: -1;
    content: "";
    display: block;
    border: 4px solid #3d4852;
    border-top-color: transparent;
    border-left-color: transparent;
    border-color: #2779bd;
  .classifybox:before
    top: 0;
    right: 0;
  .classifybox:after
    bottom : 0;
    left: 0;

.list:hover
  box-shadow:1 1px 20px -6px rgba(0,0,0,.5)
  transition: transform .5s
  transform: scale(1.02)
  color #34495e
.list:nth-child(2), .list:nth-child(3), .list:nth-child(4)
  width 30.76%
  flex-direction: column
  height auto
  .classify
    background linear-gradient(30deg,#ee7752,#e73c7e)
  .classifybox:after, .classifybox:before
    border-color: #621b18;
  .list-img
    flex: 1 0 220px
    height: 220px
    img
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0
  .list-main
    flex 0 1 220px

.list:nth-child(5), .list:nth-child(6)
  width 49.01%
  flex-direction: column
  height auto
  .classify
    background linear-gradient(30deg,#ee7752,#e73c7e)
  .classifybox:after, .classifybox:before
    border-color: #621b18;
  .list-img
    flex: 1 0 220px
    height: 200px
    img
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0
  .list-main
    flex 0 1 200px

@media screen and (max-width: 850px)
  #index .content .main 
    flex-direction: column
  .common
    margin-left 0px
    width 100%

  .list .list-main h4
    font-size 18px
    font-family: cursive;
  
  .list, .list:nth-child(3n-1), .list:nth-child(3n)
    width 100%
    flex-direction: column
    height auto
    .list-img
      flex: 1 0 220px
      height: 220px
      img
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0
    .list-main
      flex 0 1 220px
      padding 30px
</style>
