export default {
  methods: {
    needLabelMorewidth(word) {
      //判對字長限制 四個字=>width:80px為分水嶺
      return word.length > 4 ? true : false;
    },
  },
};
