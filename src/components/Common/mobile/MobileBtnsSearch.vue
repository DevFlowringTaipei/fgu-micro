<template>
  <!-- 按鈕面板 -->
  <div class="">
    <div v-for="(item, index) in mobileLayout" :key="index" class="row q-pa-xs">
      <div class="col-12 text-center q-pa-sm shadow-1 bg-lale-comple-orange">
        {{ item.name }}
      </div>
      <div
        v-for="(btn, bI) in item.btns"
        :key="bI"
        class="text-center q-pa-sm shadow-1"
        :class="[`col-${btn.colVal}`, { 'bg-secondary': btn.ischeck }]"
        @click="addCondition({ bkey: btn.bkey, index, bI, bname: btn.bname })"
      >
        {{ btn.bname }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 組件參數 接收來自父組件的數據
  props: {
    mobileLayout: {
      type: Array,
      require: true,
    },
    chooseBtns: {
      type: Array,
      require: true,
    },
  },
  // 局部注冊的組件

  data() {
    return {
     
    };
  },

  computed: {
    // dynamicQuestions(){
    //     return this.chooseBtns.map((item) => item.bkey);
         
    // },
  },

  // 組件方法
  methods: {
    addCondition(obj) {
      // obj=>{ bkey: btn.bkey, index, bI, bname: btn.bname }
      // bkey: model 值 | index: 所屬標題索引 | bI: 所屬標題下按鈕索引 | bname: 所屬標題下按鈕名
      this.$emit('addCondition',obj)
      
    },
  },
};
</script>
<style lang="scss" scoped></style>
