<template>
  <div class="row" style="">
    <!-- select -->

    <!-- pagiantion -->
    <q-pagination
      v-model="page"
      :max="maxPage"
      :max-pages="maxPages"
      :ellipses="false"
      direction-links
      boundary-links
      :boundary-numbers="false"
      @input="handleChange"
    />
  </div>
</template>
<script>
export default {
  model: {
    prop: "pageValue",
    event: "modelPaginationVal", // 自定义方法，用来更新 model
  },
  // 組件參數 接收來自父組件的數據
  props: {
    rowsPerPage: {
      //每頁筆數
      type: Number,
      default: 20,
    },
    pageValue: {
      //目前頁碼
      type: Number,
      default: 1,
    },
    totalNum: {
      //總資料筆數
      type: Number,
    },
    maxPages: {
      //每次顯示最大頁數目
      type: Number,
      default: 5,
    },
  },

  components: {},
  data() {
    return {
      page: this.pageValue,
    };
  },
  created() {},
  // 計算屬性
  computed: {
    maxPage() {
      return Math.ceil(this.totalNum / this.rowsPerPage);
    },
  },
  // 偵聽器
  watch: {
    pageValue(val) {
      this.page = val;
    },
  },
  // 組件方法
  methods: {
    handleChange(val) {
      console.log("成功call emit");
      this.$emit("modelPaginationVal", val); // 更新 model
      this.$emit("input", val); // 事件傳值
    },
  },
};
</script>
<style lang="scss" scoped></style>
