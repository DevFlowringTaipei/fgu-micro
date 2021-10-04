<template>
  <div class="tinymce-editor">
    <Editor
      :id="tinymceId"
      :init="init"
      :disabled="disabled"
      v-model="myValue"
      @onClick="onClick"
    ></Editor>
  </div>
</template>

<script>
import axios from "axios";
import tinymce from "tinymce/tinymce"; //tinymce默認hidden，不引入不顯示
import Editor from "@tinymce/tinymce-vue"; //编辑器引入
import "tinymce/themes/silver/theme"; //編輯器主題
import "tinymce/icons/default"; //引入編輯器圖標icon，不引入則不顯示對應圖標
// 引入編輯器插件（基本免費插件都在這了）
import "tinymce/plugins/advlist"; //高級列表
import "tinymce/plugins/autolink"; //自動鏈接
import "tinymce/plugins/link"; //超鏈接
import "tinymce/plugins/image"; // 插入編輯圖片
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/charmap"; // 特殊字符
import "tinymce/plugins/media"; // 插入編輯媒體
import "tinymce/plugins/wordcount"; // 字數統計
//   import Cookies from "js-cookie";
let imageFilePicker = function(callback, value, meta) {
  tinymce.activeEditor.windowManager.open(
    {
      title: "Image Picker",
      url: "/images/getimages",
      width: 650,
      height: 550,
      buttons: [
        {
          text: "Insert",
          onclick: function() {
            //.. do some work
            tinymce.activeEditor.windowManager.close();
          },
        },
        {
          text: "Close",
          onclick: "close",
        },
      ],
    },
    {
      oninsert: function(url) {
        callback(url);
        console.log("derp");
      },
    }
  );
};
const fonts = [
  "宋体=宋体",
  "微软雅黑=微软雅黑",
  "新宋体=新宋体",
  "黑体=黑体",
  "楷体=楷体",
  "隶书=隶书",
  "Courier New=courier new,courier",
  "AkrutiKndPadmini=Akpdmi-n",
  "Andale Mono=andale mono,times",
  "Arial=arial,helvetica,sans-serif",
  "Arial Black=arial black,avant garde",
  "Book Antiqua=book antiqua,palatino",
  "Comic Sans MS=comic sans ms,sans-serif",
  "Courier New=courier new,courier",
  "Georgia=georgia,palatino",
  "Helvetica=helvetica",
  "Impact=impact,chicago",
  "Symbol=symbol",
  "Tahoma=tahoma,arial,helvetica,sans-serif",
  "Terminal=terminal,monaco",
  "Times New Roman=times new roman,times",
  "Trebuchet MS=trebuchet ms,geneva",
  "Verdana=verdana,geneva",
  "Webdings=webdings",
  "Wingdings=wingdings,zapf dingbats",
];
export default {
  components: {
    Editor,
  },
  props: {
    //内容
    value: {
      type: String,
      default: "",
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //插件
    plugins: {
      type: [String, Array],
      default: "advlist autolink link image lists charmap  media wordcount",
    },
    //工具欄
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists  table",
    },
  },
  data() {
    return {
      //初始化配置
      tinymceId: "tinymce",
      myValue: this.value,
      init: {
        selector: "#tinymce",
        language_url: "/tinymce/langs/zh_TW.js",
        language: "zh_TW",
        skin_url: "/tinymce/skins/ui/oxide", //皮膚
        plugins: this.plugins, //插件
        //工具欄
        toolbar: this.toolbar,
        toolbar_location: "/",
        fontsize_formats:
          "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字體大小
        font_formats: fonts.join(";"),

        height: 500, //高度
        placeholder: "請開始編輯",

        branding: false, //隱藏右下角技術支持
        // 原本版本圖片上傳
        //   images_upload_handler: function (blobInfo, success, failure) {
        //     // 文件上傳的formData傳遞
        //     const isAccord = blobInfo.blob().type === 'image/jpeg' || blobInfo.blob().type === 'image/png' || blobInfo.blob().type === 'image/GIF' || blobInfo.blob().type === 'image/jpg' || blobInfo.blob().type === 'image/BMP';
        //     if (blobInfo.blob().size/1024/1024>2) {
        //       failure("上傳失敗，圖片大小請控制在 2M 以內")
        //     } else if (blobInfo.blob().type == isAccord) {
        //       failure('圖片格式錯誤')
        //     } else {
        //       let formData = new FormData()
        //       // 服務端接收文件的参数名，文件數據，文件名
        //       formData.append('file', blobInfo.blob(), blobInfo.filename())
        //       axios({
        //         method: 'POST',
        //         headers: {
        //           Authorization: 'bearer ' + Cookies.get('access_token')
        //         },
        //         // 你的上傳地址
        //         url:  window.SITE_CONFIG['apiURL'] + '/oss/file/upload',
        //         data: formData,
        //       }).then((res) => {
        //         console.log(res)
        //         // 返回的是你圖片的地址
        //         success(res.data.data.url)
        //       }).catch(() => {
        //         failure('上傳失敗')
        //       })
        //     }
        //   },
        images_upload_handler: function(blobInfo, success, failure) {
          console.log(blobInfo, success, failure);
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          console.log(img);
          success(img);
        },
        // file_picker_callback: function(callback, value, meta) {
        //   imageFilePicker(callback, value, meta);
        // },
      },
    };
  },
  watch: {
    //監聽內容變化
    value(newValue) {
      this.myValue = newValue == null ? "" : newValue;
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit("change", newValue);
      } else {
        this.$emit("input", newValue);
      }
    },
  },
  mounted() {
    tinymce.init({});
    // console.log(this.toolbar,'======')
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    //可以添加一些自己的自定義事件，如清空内容
    clear() {
      this.myValue = "";
    },
  },
};
</script>
