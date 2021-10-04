<template>
  <div
    class="show-box"
  >
    <div class="box-item" >
      <span class="item-key" >會員姓名:</span>
      <span
        class="item-value"
        >{{ memName }}</span
      >
    </div>
    <div class="box-item" >
      <span class="item-key">會員編號:</span>
      <span
        class="item-value"
        >{{ memPhone }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  // 組件參數 接收來自父組件的數據
  props: {
    memName: {
      type: String,
      require: true,
    },
    memPhone: {
      type: String,
      require: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.show-box {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.box-item {
  display: flex;
}
.item-key{
    margin-right:4px;
}
.item-value{
    width:80px;border:1px solid rgba(0, 0, 0, 0.12);text-align:center;background-color:#eee;
}
</style>
