<!--
  增加插槽：
  增加属性：
    multiple-max 多選最多可以遠多少個
    range-separator
  返回值：
    range=false, multiple=false："2019/02/10"
    range=false, multiple=true ：["2019/02/10", "2019/02/12", "2019/02/13",]
    range=true, multiple=false： { "from": "2020/07/08", "to": "2020/07/15" }
    range=true, multiple=true ：  [{"from": "2020/07/08", "to": "2020/07/15"}, {"from": "2020/07/08", "to": "2020/07/15"}]
-->
<template>
  <q-date
    ref="date"
    type="date"
    v-bind="$attrs"
    v-on="listeners"
    :mask="mask"
    :locale="cnLocale"
    :multiple="multiple"
    :range="range"
    :subtitle="computedSubtitle"
    :title="computedTitle"
    :today-btn="todayBtn"
  >
    
    <slot name="AutoCalculateBtn" />
    <slot name="default" />
  </q-date>
</template>
<script>
import { date } from 'quasar'
export default {
  inheritAttrs: false,
  // 組件參數 接收來自父組件的數據
  props: {
    mask: {
      type: String,
      default: "YYYY-MM-DD",
    },
    locale: Object,
    subtitle: String,
    title: String,
    todayBtn: Boolean,
    multiple: Boolean,
    multipleMax: Number,
    range: Boolean,
    rangeSeparator: {
      type: String,
      default: "~",
    },

  },
  // 局部注冊的組件
  components: {},
  data() {
    return {
       cnLocale: {
        /* starting with Sunday */
        days: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        daysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        firstDayOfWeek: 1
      }
    };
  },
  created() {
    if (this.locale) {
      this.cnLocale = this.locale
    }
  },
  // 計算屬性
  computed: {
    computedSubtitle () {  //年 周一
      if (this.subtitle) {
        console.log("== 1 ==")
        return this.subtitle
      }
      const v = this.$attrs.value
      console.log("Subtitle =>",v)
      if (!v) {
        return ''
      }
      if (this.range) {
        
        if (this.multiple) {
          
          return ''
        } else if (!v.from) {
          
          return v
        } else {
          
          return v.from + this.rangeSeparator + v.to
        }
      } else if (this.multiple) {
        
        return ''
      } else {
        
        const date_ = new Date(v)
        const days = date.getDayOfWeek(date_)
        return date_.getUTCFullYear() + ' ' + (days === 7 ? this.cnLocale.days[0] : this.cnLocale.days[days])
      }
    },
    computedTitle () {
      // console.log("computedTitle>>>>>", this.title)
      if (this.title) {
        console.log("== 1 ==")
        return this.title
      }
      console.log("第一次進入")
      
      const v = this.$attrs.value
      // console.log("Title =>", v)
      if (!v) {

        return ''
      }
      if (this.range){  // date range
        // console.log("== 3 ==")
        if (this.multiple) {
          return (v.length?v.length:'1')+'個時間段'
        }else{
          if(typeof v=== 'string') return '一天'
          return date.getDateDiff(v.to,v.from,'days')+1+'天'
        }
      }else if(this.multiple){
        // console.log("== 4 ==")
        return v.length + '天'
      }else{
        // console.log("== 5 ==")
       
        return v.toString()
      }
    },
    listeners: function () {
      const vm = this
      return Object.assign({},
        // 從父級添加所有的監聽器
        vm.$listeners,
        // 添加自定義監聽器，或複寫一些監聽器的行為
        {
          input: function (value, reason, details) {
            if (!vm.disable) {
              // 提示：Quasar在range狀態下，如果只開始和結束是同一天，則Quasar返回的只有這一天的日期，這裡修正一些
              if (vm.range === true && typeof value === 'string') {
                vm.$emit('input', { from: value, to: value }, reason, details)
              } else {
                vm.$emit('input', value, reason, details)
              }
            }
          }
        }
      )
    },
  },
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    setToday () {
      this.$refs.date.setToday()
    },
    setView (view) {
      this.$refs.date.setView(view)
    },
    offsetCalendar (type, descending) {
      this.$refs.date.offsetCalendar(type, descending)
    },
    setCalendarTo (year, month) {
      this.$refs.date.setCalendarTo(year, month)
    },
    setEditingRange (from, to) {
      this.$refs.date.setEditingRange(from, to)
    }
  },
};
</script>
<style lang="scss" scoped></style>
