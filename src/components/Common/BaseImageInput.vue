<template>
  
    <div
      class="base-image-input "
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <span v-if="!imageData" class="placeholder">
        上傳圖片
      </span>
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
      />
      <span class="imgName" >{{imageName}}</span>
    </div>
    
  
</template>
<script>
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: {},
  data() {
    return {
      // imageData: "https://fakeimg.pl/200x200/?text=click",
      imageData: null,
      imageName: "",
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {
    'imageData': {
      handler(newName, oldName) {
        console.log("inCardForm.area_v1 changed", newName);
        if (newName !== null) {
          document.getElementsByClassName("base-image-input")[0].style.border="none"
        };
        
      },
      immediate: true,
      // deep: true
    },
  },
  // 組件方法
  methods: {
    chooseImage() {
      //show the file picker.
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // console.log("e=>",e.target.result)
          this.imageData = e.target.result;
        };
        this.imageName = files[0].name;

        // console.log("files=>",  Object.keys(files))
        console.log("files=>", files[0]);
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    clearErrorStyle(){
      this.imageData= null,
      this.imageName="",
      document.getElementsByClassName("base-image-input")[0].style.border="none"
    },
  },
};
</script>
<style lang="scss" scoped>
.base-image-input {
  display: flex;
  width: 180px;
  height: 180px;
  //     width:70%;
  //   height: 100%;
  background-color: #f0f0f0;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
.imgName{
  position: absolute;
  transform: translateX(-50%);
  left:50%;
  bottom:0%;
  color:#e0e0e0;
  width:100%;
  text-align: center;
  background-color: #333;
}
</style>
