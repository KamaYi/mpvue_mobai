<template>
  <div class="page">
    <div class="page__bd_spacing weui-flex">
      <div class="weui-cells placeholder">
          <div class=" weui-cell">
            <input class="weui-input" placeholder="扫描二维码或输入编码" maxlength="20" v-model="scancode"><i class="iconfont icon-saoma" @click="scanCode()"></i>
          </div>
      </div>
    </div>  
    <div class="page__hd">
      <div class="page__desc page__hd">请选择损坏部位</div>
    </div>
     <div class="page__bd">
        <div class="weui-grids">
            <block v-for="(item,index) in grids" :key="index">
                <div class="weui-grid" hover-class="weui-grid_active"  :id="'question_'+item.id"  @click="selectQuestion(item.id)">
                    <image class="weui-grid__icon" :class="{changeColor:changeId == item.id}" :src="item.image"/>
                    <div class="weui-grid__label">{{item.name}}</div>
                </div>
            </block>
        </div>
    </div>
    <div v-if="showInfo">
      <div class="page">
        <div class="page__bd">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <div class="weui-uploader__title">图片上传</div>
                    <!-- <div class="weui-uploader__info">{{files.length}}/2</div> -->
                  </div>
                  <div class="weui-uploader__bd"  style="display:flex;flex-direction: row">
                    <div class="weui-uploader__files" id="uploaderFiles" style="display:flex;flex-direction: row">
                      <div v-for="(item ,index) in files" :key="index">
                        <div class="weui-uploader__file">
                          <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
                          <div class="delete-icon" @click="deleteImg" :id="item"></div>
                        </div>
                      </div>
                    </div>
                    <div class="weui-uploader__input-box" v-show="isShow">
                      <div class="weui-uploader__input" @click="chooseImage"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page__bd_spacing weui-flex weui-flex__item">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd page__bd" style="display:flex;flex-direction:cloumn;">
            <textarea v-model="textarea"  rows="1" placeholder="请描述具体故障" maxlength="140"/>
          </div>
        </div>
        <div class="weui-textarea-counter">{{textarea.length}}/140</div>
      </div> 
    </div>
    <div class="weui-footer">
      <div class="page__bd page__bd_spacing">
        <button class="weui-btn sumbit_button" @click="submit()">提交</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: {
    grids:[
      {'id':'1','name':'锁','url':'','image':'/static/images/SUO.png'},
      {'id':'2','name':'刹车','url':'','image':'/static/images/SHACHE.png'},
      {'id':'3','name':'链条','url':'','image':'/static/images/liantiao.png'},
      {'id':'4','name':'脚踏','url':'','image':'/static/images/jiaota.png'},
      {'id':'5','name':'二维码','url':'','image':'/static/images/erweima.png'},
      {'id':'6','name':'车把','url':'','image':'/static/images/CHEBA.png'},
      {'id':'7','name':'车轮','url':'','image':'/static/images/LUNZI.png'},
      {'id':'8','name':'其他','url':'','image':'/static/images/MORE.png'},
    ],
    showInfo:false,
    image:[],
    textarea:'',
    scancode:'',
    questionId:[],
    files: [],
    isShow:true,
    changeId:''
  },
  methods: {
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
    selectQuestion:function(id,event){
      this.changeId = id
      if(this.questionId.indexOf(id) < 0 ){
        this.questionId.splice(this.questionId.indexOf(id),0,id)
        this.showInfo = true;
      }else{
        this.questionId.splice(this.questionId.indexOf(id),1);
        if(this.questionId.length === 0)
        this.showInfo = false;
      }
    },
     chooseImage(e) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log('成功上传：' + res.tempFilePaths);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths);
          if(_this.files.length == 3){
            _this.isShow = false;
          }
        },
        fail: function() {
          console.log('fail');
        },
        complete: function() {
          console.log('commplete');
        }
      });
    },
    predivImage(e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    },
    deleteImg(e) {
      Array.prototype.indexOf = function(val) { // eslint-disable-line
        for (let i = 0; i < this.length; i++) {
          if (this[i] === val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) { // eslint-disable-line
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.files.remove(e.currentTarget.id);
      this.isShow = true;
    },
    submit(){
      if(!this.scancode){
        wx.showToast({
          title: '请输入编号',
          icon: 'none',
          duration: 1000
        })
        return;
      }else if(this.questionId.length === 0){
        wx.showToast({
          title: '请选择损坏部位',
          icon: 'none',
          duration: 1000
        })
        return;
      }else if(this.files.length === 0){
        wx.showToast({
          title: '请上传图片',
          icon: 'none',
          duration: 1000
        })
        return;
      }else if(!this.textarea){
        wx.showToast({
          title: '请填写原因',
          icon: 'none',
          duration: 1000
        })
        return;
      }else{
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1000
        })
        setTimeout(function(){
          wx.navigateTo({url: '/pages/map/main'})
        },2000)
      }
    }
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: '车辆故障'
    })
  }
}
</script>

<style scoped lang=scss>

$red_color:red;
$block_color:#000;

.changeColor{
  border:1px solid $red_color !important;
}

.placeholder {
  margin: 5px;
  text-align: center;
  background-color: #eee;
  height: 2.3em;
  line-height: 2.3em;
  color: #b0b1b5;
  font-size: 0.8em;
  min-height: 3.5em;
}

.weui-cells{
  display:flex;
  width: 100%;
}

.weui-cell{
  width: 100%;
}

.weui-cell__bd{
  display: flex;
  justify-content: space-between;
}

.weui-cell__bd i {
  font-size: 2em
}

.page__desc{
  color:black;
}

.weui-flex__item{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.weui-flex__item img{
  width: 2em;
  height: 2em;
}
.weui-flex__item span{
  font-size: 0.8em;
  margin-top: 0.7em;
}

.border_img{
  padding:0.5em;
  border-radius:50%;
  border:1px solid #bbb;
  width: 100%;
}

.sumbit_button{
  background-color: #c2c5ca;
  color: #fff;
  font-size: 1.1em
}

.weui-input{
  text-align: left;
  width:100%;
  flex-wrap: nowrap;
  color:$block_color;
}

.weui-grid {
  float:left;
  padding:20rpx 20rpx;
  width:25%;
  box-sizing:border-box;
  border-right:unset;
  border-bottom:unset;
}

.weui-grid__icon{
  border:1px solid #bbb;
  padding:1em;
  border-radius:50%;
}


.weui-grids {
  border:unset;
}

.camera{
  border: 1px dashed #bbb;
  height: 4em;
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.4em
}

.camera i {
  font-size: 1.5em
}

textarea{
  background-color: #eee;
  width: 100%;
  padding: 0.8em 0em 0em 0.8em;
}

.page__bd img{
  width:100%;
  height:100%;
}

.icon-wrong{
  position:relative;
  left:3.5em;
  width:20px;
  z-index:222;
  top:-0.5em;
  color: $red_color;
}

.weui-uploader__file {
  position: relative;
}
.weui-uploader__bd {
  overflow: visible;
}
.delete-icon {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  background: #f43530;
  right: 0;
  top: -20rpx;
  border-radius: 40rpx;
  z-index: 5;
}
.delete-icon::before {
  content: '';
  width: 26rpx;
  height: 4rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}

textarea{
  height: 100px;
}

.weui-textarea-counter{
  position:absolute;
  right:35rpx;
  bottom:-30rpx;
}
</style>
