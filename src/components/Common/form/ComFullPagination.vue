<template>
  <div class="">
    <com-pagination
      v-model="page.currentPage"
      :page-size="page.pageSize"
      :total-num="page.totalNum"
      @input="changeCurrentPage"
    ></com-pagination>
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
export default {
  // 組件參數 接收來自父組件的數據
  props: {
    page: {
      // pageSize currentPage totalNum
      type: Object,
    },
  },
  // 局部注冊的組件
  components: { ComPagination },
  data() {
    return {};
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    // Pagination
    changeCurrentPage(e) {
      // 重新call api
      console.log("changeCurrentPage=>", e);
    },
  },
};
</script>
<style lang="scss" scoped></style>
