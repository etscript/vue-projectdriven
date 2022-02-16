<template>
  <div class="main">
    <div class="regiter-box">
      <!-- <div class="title">扫码关注即可登录</div> -->
      <div class="weChat-text">
          <i class="iconfont iconweixin" style="color:#212121;"></i>  扫码关注即可登录
        </div>
       <!-- <div class="weixin" @click="weChatLogin()"><i class="iconfont iconweixin"></i> 微信登录</div> -->
        <div class="weChat-image">
          <img id="image" ref="image" style="width: 0;">
        </div>
        <!-- <div class="weChat-text">
          <i class="iconfont iconweixin" style="color:#3eb94e;"></i> 微信扫码登录
        </div> -->
      
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from "vuex";  // 引入mapState 

  export default {
        data() {
            return {
                requestResult: null,
                timer: null,
            }
        },
        computed: {
          ...mapGetters([
            'user'
          ])
        },
        created(){
          if (this.$route.query.token){
            this.Token(this.$route.query.token)
            this.UserInfo(this.user)
            this.$router.push('/blog')
          }else{
            this.show()
          }
        },
        methods: {
          ...mapActions([
            'Token', 'UserInfo'
          ]),
          async show() {
            console.log(this.user)
                if(!this.user) {
                  clearInterval(this.timer);
                  this.timer = null;
                  this.getWeChatImage();
                  } 
                  // else {
                  //     this.setWeChatImage(this.user.qrcode_url);
                  //     this.listenUserLogin(this.user.wechat_flag);
                  // }
            },
            async getWeChatImage() {
                try {
                    // let result = await request({
                    //     method: 'GET',
                    //     url: config.rootPath + '/api/get_qrcode',
                    // });
                    
                    let result = await axios.get("https://projectdriven.cn/api/get_qrcode")
                    console.log(result.data)
                    console.log(result.data.data.qrcode_url)
                    // this.$store.dispatch('SET_USER_ACCOUNT', result.data.data);
                    this.setWeChatImage(result.data.data.qrcode_url);
                    this.listenUserLogin(result.data.data.wechat_flag);
                } catch(e) {}
            },
            setWeChatImage(qrcode_url) {
                setTimeout(() => {
                    this.$refs.image.src = qrcode_url;
                    this.$refs.image.style = "width: 5px, height: 5px;";
                }, 500);
            },
            listenUserLogin(flag) {
                this.$Notice.info({
                  title: '等待扫码提示',
                  desc: "扫描二维码关注即可登录",
                  duration: 6
                });
                this.timer = setInterval(async () => {
                  this.$get('/api/check_login?wechat_flag='+ flag).then(res => {
                      // this.$Message.success('登录成功！');
                      this.$Notice.success({
                        // title: '亲爱的 '+this.formCustom.name,
                        title: '亲爱的'+ res.data.user.nickname,
                        desc: '欢迎回来！！！',
                        duration: 3
                      });
                      console.log(res.data)
                      this.Token(res.data.user.access_token)
                      this.UserInfo(res.data.user)
                      this.cancel();
                      if (this.$route.query.redirect){
                        this.$router.push(this.$route.query.redirect)
                      } else{
                        this.$router.push('/blog')
                      }
                    }).catch(err => {
                      this.loading = false
                    })
                    // try {
                    //     let result = await axios.get("http://wx.project-driven.xyz/api/check_login?wechat_flag="+ flag)
                    //     console.log(result.data)
                    //     if(result.data.data.result === 'yes') {
                    //         clearInterval(this.timer);
                    //         this.timer = null;
                    //         this.requestResult = {
                    //             result: 'success',
                    //             message: '登陆成功',
                    //         };

                    //         this.cancel();
                    //         this.$router.push({path:'/blog'})
                    //     }
                    // } catch(e) {
                    //     clearInterval(this.timer);
                    //     this.timer = null;
                    //     this.requestResult = {
                    //         result: 'fail',
                    //         message: '登陆失败',
                    //     };
                    //     this.cancel();
                    // }
                }, 2000);
            },
            cancel() {
                clearInterval(this.timer);
                this.timer = null;
                this.$emit('cancel');
            },
            showTip(type, title, message) {
                this.$store.dispatch("SHOW_TIP", {
                    type,
                    title,
                    message,
                });
            },
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },
        components: {

        },
    }
</script>




<style scoped lang="stylus">
.ivu-checkbox-wrapper
  margin-top 6px
.title
  border-bottom: 1px solid #e8eaec
  padding: 14px 15px
  line-height: 1
  font-size: 14px
  color: #17233d
  font-weight: bold
.regiter-box
  max-width: 370px
  margin: 30px auto
  padding: 15px
  background: #fff
  font-size: 14px
  box-shadow: 1px 1px 5px #cddde2
  .ivu-form
    padding: 15px 15px 0
.or
  margin -15px 0 10px

.black
  background #333
  color #fff
  outline none
  border #333
  i
    font-size 18px
    margin 0 6px 3px 0

.black:hover
  background #222

.weChat-text
    
    
    margin-top 10px
    margin-bottom 10px
    height 30px
    line-height 30px
    text-align center
    color #000000
    font-size 20px
    font-family: fonttype
.weChat-image 
    
    margin-top 10px
    width 100%
    
    text-align center
    #image 
      
      width  350px
      height  350px
        
    
</style>

<style>
@font-face {font-family: "iconfont";
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMkAAsAAAAABwAAAALWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCDIIAATYCJAMICwYABCAFhG0HMBsmBsgOJU3B2IDhkUBEPDyt0d6fnd0T13hRNIvilUQXr3hrEClFvHql75BdNpcNdyNXE9nlcfbguYmMdwWWYBWh6J4y4Jr6K/E8oDlWU3RY4Wg8SqABdlG18AaKG8ZuInAI2wk0G+ePs5+ZXw6MZaBfIG5JxXxgnHPIshVuFKqaqflJjCk1pqfpLeA1/338ExrGJGUBZB3dzBCB5J9BMKpoq9tcpwTefDpYsyiwCsjEWa3hACUDqyjNQUDfNLCv9OBnUF1T7m7/eARRAamtYFTl3hMP8291lwQyKpwB7mm0fMNqkKa7Geb+oMfRUeXBQfnhYUV51d3DiOdeK5zjT1WV29fa9gYetT9meFT8Iqeh63v5Bo+jzit7xAl2rrff8PLL3JnkoxEbufYpsO/3jT29p8X//bzu2o3p8lj/7qWC3hzTsb6U85Bi+v2zTepT3dhF2I/wh2HNzjEq5+GwoeDL7FDn9RKk3/ft3qLeZjp8Q/VB1Ye7ch+XNFPje6lQlRZa2c7J/RVlOe82bzl26vZl7KdOalO23cQUwVvXiAOuRfx3Y+a4VV+XtzJ5j/pJ/ka1ofGejMG/zSkB5P+2ABhT9o25WiQ5Y3jPkubQrAYs3a7GKvteJBIa9b2OqcFYikKjWVKmraLUYg2VRltotiJrdoseGCVyE5Z1Kwid7iBp9w6FTu9ImXaJUr/3qHQGhWYXYbNki/mQ0mkY8QkSQUE9lArVKhapCS3SS5G4WsHHWQGnVyKsk7phSGBwMZyFVAjPMUJXIw4lhIUsVithprIbUijUUIPVMiQkgRJCNLFBQWzdnQKFaiWg7cEQPgIRgQTqQVJCaiosrUzQpe+XQsSqKfDhlqIBZyUE05G2DoUIFNyDlCVV9Sq6l2N0aoiFIggWxMLUlKBMRYcoYEAN0tR3kkGEiECSET6NWEFaKbavNHB9ufLrNkEzoEoB2xWq20haJ1UBAAAA') format('woff2')
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 23px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconweixin:before {
  content: "\e62f";
}
</style>


