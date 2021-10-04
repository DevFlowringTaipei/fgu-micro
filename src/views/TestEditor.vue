<script>
import TinyMce from "@/components/TinyMce/TinyMce.vue";
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { TinyMce },
  data() {
    return {
      content: "",
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },
  },
};
</script>

<template>
  <div class="" style="">
    TestEditor !
    <!-- <tiny-mce
      ref="editor"
      v-model="content"
      @onClick="onClick"
      toolbar="undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists table | removeformat | imageUpload"
    /> -->
    <tiny-mce
      ref="editor"
      v-model="content"
      @onClick="onClick"
      
    />
    {{content}}
  </div>
</template>

<style lang="scss" scoped>

</style>
