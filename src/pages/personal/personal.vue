
<template>
  <div class="page">
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="placeholder">
          <img src="/static/images/user1.png">
        </div>
      </div>
    </div>
    <div class="page__bd">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <i class="iconfont icon-qianbao"></i>
          <div class="weui-cell__bd">我的钱包</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <i class="iconfont icon-lishihangcheng"></i>
          <div class="weui-cell__bd">我的行程</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <i class="iconfont icon-shangcheng"></i>
          <div class="weui-cell__bd">膜拜商城</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <i class="iconfont icon-hongbao"></i>
          <div class="weui-cell__bd">发红包赚奖金</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: {
  },
  methods: {
   
  },
  created () {
  },
  mounted() {
  },
}
</script>

<style scoped>
  .weui-flex {
    min-height:10em;
  }
  .weui-flex__item{
    display: flex;
    justify-content: center;
    align-self:center;
  }
  .placeholder img{
    height: 6em;
    width: 6em;
  }
  .icon {
      width: 1em; height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
  .weui-cell{
    font-size: 0.8em
  }
  .weui-cell i{
    margin-right: 1em;
    height: 19px;
  }
</style>
