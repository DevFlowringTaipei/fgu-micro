export default {
  props: {
    formLabel: String,
    labelWidth: {
      type: String,
      validator: (v) =>
        [
          "fit-content",
          "xsmall",
          "small",
          "medium",
          "large",
          "xlarge",
          "xxlarge",
        ].includes(v),
    },
    labelTop: Boolean,
    labelAlign: {
      type: String,
      validator: (v) => ["auto", "left", "right", "center"].includes(v),
    },
    formLabelStyle: String,
    dense: {
      type: Boolean,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    contentClass: String,
    contentStyle: String,
    noEllipsis: Boolean, // form 表單過長情況
    noErrorIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedClass() {
      let cls = "";
      if (this.labelTop) {
        cls += " label-top";
      }
      if (
        this.labelAlign === "left" ||
        this.labelAlign === "center" ||
        this.labelAlign === "right"
      ) {
        cls += " label-" + this.labelAlign;
      }
      if (this.labelWidth) {
        cls += " label-" + this.labelWidth;
      }
      return cls;
    },
    computedLabelStyle() {
      /* 直接在組件上設置 */
      let style = this.formLabelStyle;
      if (!style) {
        style = this.$parent.formLabelStyle;
      }
      /* 在 com-form 上設置 */
      if (!style) {
        style = this.$parent.$parent.formLabelStyle;
      }
      /* com-date-select 等包裹 com-input 的情况 */
      if (!style) {
        style = this.$parent.$parent.$parent.formLabelStyle;
      }
      return style;
    },
  },
  methods: {
    needLabelMorewidth(word) {
      return word.length > 4 ? true : false;
    },
  },
  filters: {
    
  },
};
