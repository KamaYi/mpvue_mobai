<template>
  <div style="height:1400rpx">
      <map style="height:1400rpx" id="myMap" :latitude="latitude" :longitude="longitude" :includePoints="covers" @regionchange="translateMarker()" @start="translateMarker()" @end="translateMarker()" show-location :markers="markers" :covers="covers">
        <cover-view class='phone' @click="toPhone()">
              <cover-image src='/static/images/phone.png' class='ten_l'></cover-image>
        </cover-view>
        <cover-view class='banshou' @click="toGuZhang()">
              <cover-image src='/static/images/banshou.png' class='ten_l'></cover-image>
        </cover-view>
        <cover-view class='diandian' @click="moveToLocation()">
            <cover-image src='/static/images/diandian.png' class='ten_l'></cover-image>
        </cover-view>

        <cover-view class='user' @click="toPersonalCenter()">
              <cover-image src='/static/images/user.png' class='ten_l'></cover-image>
        </cover-view>

        <cover-view class='weui-footer__links' @click="scanCode()">
            <cover-view class='text'>立即扫码</cover-view>
        </cover-view>
        <!-- <div>
          <img src="/static/images/logo.png">
          <span><span class="red">骑行打卡</span>赢三星好礼</span>
          <i class="iconfont icon-iconfontyoujiantou"></i>
        </div> -->
      </map>
  </div>
</template>

<script>

export default {
  data: {
    latitude:'',
    longitude:'',
    markers: [{
      id: 1,
      latitude: '',
      longitude: '',
      name: '我现在的位置',
      iconPath:'/static/images/shuzhe.png',
      width: 20,
      height: 35,
    }],
    covers:[],
  },
  components: {},
  methods: {
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    getCenterLocation: function () {
      let _this = this;
      this.mapCtx.getCenterLocation({
        success: function(res){
          // _this.markers[0].latitude = res.latitude;
          // _this.markers[0].longitude = res.longitude;
        }
        curLatitude = res.latitude;
        curLongitude = res.longitude;
      })
    },
    translateMarker(e){
      let _this = this;
      console.log('3242347237482347823789')
      console.log(e)
      this.mapCtx.translateMarker({
          markerId: 1,
          autoRotate: true,
          duration: 1000,
          destination: {
              latitude:_this.center_latitude,
              longitude:_this.center_longitude,
          },
          autoRotate:false,
          animationEnd(e) {
            console.log(e)
            // if(e.type == 'end'){
              _this.getCenterLocation();
              _this.getNewsData();
            // }
            // _this.getNewsData();
            // console.log('animation end')
            // _this.covers = [];
            // console.log(_this.covers)
          }
      })
    },
    getLocation:function(){
      let _this = this;
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          _this.latitude = res.latitude
          _this.longitude = res.longitude
        }
      })
    },
    scanCode:function(){
      wx.scanCode({
        success: (res) => {
          console.log("结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path)
        },
        fail: (res) => {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    getNewsData: function (type) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      // this.$flyio.post('https://mwx.mobike.com/mobike-api/rent/nearbyBikesInfo.do', {
      //   type: type,
      //   key: 'fc35d7872c25744ab4669c7d9dbcf15e',
      //   data:{
      //     'latitude':this.latitude,
      //     'longitude':this.longitude,
      //     'citycode':'233'
      //   }
      // }).then(res => {
      //   wx.hideLoading()
      //   console.log(res)
      //   this.contentNewsList = res.data.result.data;
      // })
      let _this = this;
      wx.request({
        url: 'https://mwx.mobike.com/mobike-api/rent/nearbyBikesInfo.do', 
        data: {
          'latitude':this.latitude,
          'longitude':this.longitude,
          'citycode':'233'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          wx.hideLoading()
          res.data.object.forEach(element => {
              _this.covers.push({'latitude':element.distY,'longitude':element.distX,'iconPath':'/static/images/diandian2.png'})
          });
        }
      })
    },
    toPhone(){
      wx.navigateTo({
        url: '/pages/bluetooth/main'
      })
    },
    toGuZhang(){
      wx.navigateTo({
        url: '/pages/vehicleFailure/main'
      })
    },
    toPersonalCenter(){
      wx.navigateTo({
        url: '/pages/personal/main'
      })
    },
  },
  created () {
    this.getLocation();
  },
  mounted() {
    this.mapCtx = wx.createMapContext('myMap');
    this.moveToLocation();
    this.getNewsData();
    this.getCenterLocation();
  },
}
</script>

<style scoped>
  map{
    width: 100%;
    height:1250rpx;
  }
  .personal{
    position: flex;
    bottom: 0px;
  }
  .weui-footer_fixed-bottom {
    background-color:#000;
    color:#fff;
    min-height:3.5em;
    bottom:0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .weui-footer__links{
    color:#fff;
    font-size: unset;
    background-color:#000;
    color:#fff;
    min-height:3.5em;
    bottom:0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width:100%;
  }

  .personal{
    display:flex;
    justify-content:flex-end;
    position:fixed;
    bottom:7em;
    left:0;
    right:0;
  }

  .tool{
    display:flex;
    justify-content:flex-end;
    position:fixed;
    bottom:5em;
    left:0;
    right:0;
    width: 2em;
  }
  .personal img{
    height:2.5em;
    width:3.5em;
    position:absolute;
    right:0px;
  }

  .tool{
    display: flex;
    flex-direction: column;
    left: 0.8em;
  }

  .tool div{
    margin-top:1.5em;
    width: 2em;
    height: 2em;
  }

  .tool img{
    width: 3em;
    height: 3em;
    position:absolute;
    left:0px;
  }

  .banner{
    position: fixed;
    top:1em;
    justify-content: center;
    align-content: center;
    width:95%;
  }
  .banner img{
    width: 3.5em;
    height: 3.5em;
  }
  .banner div{
    width: 100%;
    min-height: 3.5em;
    background-color: #fff;
    right: 0px;
    left: 2.5%;
    position: relative;
    display: flex;
    justify-content:space-around;
    align-items: center;
  }

  .red{
    color: red;
  }
  .phone{
    width: 100rpx;
    position: fixed;
    bottom:380rpx;
    left:0rpx;
  }
  .banshou{
    width: 100rpx;
    position: fixed;
    bottom:260rpx;
    left:0rpx;
  }
  .diandian{
    width: 100rpx;
    position:fixed;
    bottom:140rpx;
    left:0rpx;
  }
  .user{
    width: 130rpx;
    position:fixed;
    bottom:140rpx;
    right: 0rpx;
  }

  .map_tool{
    margin-top: 10rpx;
  }

</style>
