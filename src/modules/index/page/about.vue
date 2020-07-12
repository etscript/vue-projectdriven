<template>
  <div class="home" >
    <!-- <div class="about-bg">
      <img :src="$staticUrl + banners[0].url">
      <img src="../../../assets/Big-Hero-6-Baymax.jpg">
      <div class="bg bg2"></div>
      <div class="title">
        <h2>写在还年轻的时候</h2>
        <em>感谢有你们的陪伴和照护</em>
      </div>
    </div> -->
    <div class="about">
      <p>90后，在一家公司一待便是四年，也干过创业公司。</p>
      <p>上海电力大学信息安全本科、华东师范大学计算机硕士，红帽认证架构师。</p>
      <p>干着开发的活，管着12个开发的开发环境，负责着上线和维护项目。</p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p>该项目分为Vue前端和Flask后端，分别由两个非常棒的github项目更改而来。</p>
      <p>对你有帮助，希望可以给本项目和源项目star。</p>
      <p></p>
      <p></p>
      <h4>本站尝试使用如下技术构建</h4>
      
      <div class="make">
        <div>
          <img src="../../../assets/flask.png" alt="">
          <p class="flask">Flask
          </p>
          <a href="https://github.com/sweida/laravel-blog-api" target="_blank" class="flask">
            <Icon type="logo-github" />
          </a>

        </div>
        <i class="iconfont lv-icon-aixin"></i>
        <div>
          <img src="../../../assets/vue.jpg" alt="">
          <p class="vue">Vue</p> 
          <a href="https://github.com/sweida/vue-blog-index" target="_blank" class="vue">
            <Icon type="logo-github" />
          </a>
        </div>
      </div>
      

      
      
    </div>


    <div class="about-bg">
      <!-- <img :src="$staticUrl + banners[1].url" > -->
      <img src="../../../assets/Big-Hero-6-Baymax.jpg">
      <div class="bg"></div>
      <div class="title">
        <h2>特别鸣谢</h2>
        <em></em>
        <h2>集技术和颜值于一身的程序猿的施伟达 <a href="https://github.com/sweida/vue-blog-index" target="_blank" class="vue">
            (github:sweida)  <Icon type="logo-github" />
        </a></h2>
        <h2>csdn的那些年踩过的坑丶 <a href="https://github.com/qzq1111/flask-restful-example" target="_blank" class="vue">
            (github:qzq1111)  <Icon type="logo-github" />
        </a></h2>
      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  data () {
    return {
      skills: []
    }
  },
  computed: {
    ...mapGetters([
      'banners'
    ])
  }, 
  created() {
    this.getSkills()
  },
  methods: {
    async getSkills() {
      const res = await this.$post('/api/ad', {type: '技能'})
      this.skills = res.data
    },
  }
}
</script>

<style lang="stylus" scoped>
// .home
//   margin 20px auto
  .banner
    max-width: 800px
    margin 0 auto
    img 
      width 100%

.webbase
  text-align center
  padding 50px 20px
  h2
    font-weight 300
    font-size 28px
  h3
    font-weight 300
    font-size 22px
.make
  padding 40px 0
  display: flex;
  align-items: center;
  justify-content: center;
  text-align center
  font-size 20px
  line-height 30px
  font-family: cursive;
  font-weight: bold;
  img 
    max-width 100px
  a i
    font-size 28px
  .lv-icon-aixin
    margin -30px 40px 0
    color red
    font-size 26px
  .laravel
    font-family: none;
    color: #fa5039;
  .flask
    font-family: none;
    color: #000000;
  .vue
    font-family: none;
    color: #3cb884

.about-bg
  width 100%
  height 600px
  position relative
  img 
    width: 100%;
    position absolute
    top 0
    -o-object-fit: cover;
    object-fit: cover;
    height: 100%;
  .bg
    background: #8a8588
    mix-blend-mode: multiply
    height: 100%
  .bg2
    background #a3b0bf
  .title
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    h2
      position: relative;
      font-size: 34px;
      font-weight: 300;
      padding-bottom: 30px;
      margin-bottom: 30px;
    h2:after
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 80px;
      height: 2px;
      margin-left: -40px;
      content: '';
      background-color: #ffffff
    em
      color: #d0d6da
      font-size 16px
      font-style: oblique;
      line-height: 40px;

.about
  text-align center
  position relative
  line-height 26px
  font-size 18px 
  padding 60px 20px
  max-width 700px
  margin auto
  p
    padding-bottom 10px
  em
    color: #9eabb3;
    font-size 16px
    font-style: oblique;
    line-height: 40px;
  a
    margin 0 10px
  h3
    font-size 20px
    font-weight 400
    padding-top 30px
    color #f7576c
.skills
  max-width 800px
  text-align center
  margin auto
  p
    font-size 20px
    color #f7576c
  img
    max-width 88px
    margin 3px



@media screen and (max-width: 750px)
  .about-bg
    height 300px
  .about 
    padding 40px 20px
    font-size 16px
    em
      font-family: cursive;
      font-size 24px

  .make .laravel, .make .vue
    font-family: cursive;

  .about-bg .title 
    h2
      font-size: 26px;
      padding-bottom: 20px;
      margin-bottom: 20px;
    em
      font-family: cursive;    
  .skills img
    max-width 66px

@media screen and (min-width: 1368px)
  .about-bg:first-child
    height 700px
@media screen and (min-width: 1660px)
  .about-bg:first-child
    height 830px      
</style>
