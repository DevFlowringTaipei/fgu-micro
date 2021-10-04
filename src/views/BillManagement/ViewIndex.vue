<template>
  <div class="q-pa-md" style="">
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm q-mb-md" style="">
      <!-- input -->
      <div :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-md-4'">
        <q-input outlined v-model="searchForm.keyword" dense />
      </div>
      <!-- 下拉 -->
      <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
        <q-select
          outlined
          v-model="searchForm.type"
          stack-label
          :options="identityOptions"
          dense
          emit-value
          map-options
          :option-label="(item) => (item === '' ? '請選擇' : item.label)"
          hide-bottom-space
          :rules="[(val) => !!val || '此下拉欄位為必選項']"
          :style="!$q.screen.lt.sm ? 'width:150px;' : ''"
        >
        </q-select>
      </div>

      <!-- button -->
      <div :class="$q.screen.lt.sm ? 'col-6 ' : ''">
        <q-btn
          color="primary"
          label="搜尋"
          size="md"
          :style="$q.screen.lt.sm ? 'width:100%;height:40px;' : ''"
          @click="onSubmit"
        ></q-btn>
      </div>
    </div>
    <!-- 內容 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm " style="">
      <div
        class="col-12 q-pa-md"
        style="border-bottom:1px solid rgba(0,0,0,.24)"
      >
        <span style="font-size:30px;">全部{{ identity }}收入分布</span>
      </div>
      <div class="col-6">
        <div ref="myChart" style="width: 100%;height:400px;"></div>
      </div>
      <div class="col-6 relative-position">
        <q-card
          class="bg-secondary text-white absolute-center q-pa-md"
          style="width:60%;"
        >
          <q-card-section>
            <div class="text-h6 q-mb-md">總收入</div>
            <div class="text-h5">{{ getPrice }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { identityOptions } from "@/utils/common/dropdown-list.js";
import * as echarts from "echarts";

export default {
  // 組件參數 接收來自父組件的數據
  props: {},

  components: {},
  data() {
    return {
      identity: "",
      identityOptions,
      searchForm: {
        keyword: "",
        type: "",
      },
      option: {
        legend: {
          data: ["遊程", "專業輔導", "图例三"],
          icon: "rect",
          right: 10,
          bottom: 10,
        },

        series: [
          {
            type: "pie",

            label: {
              show: true,
            },
            data: [
              {
                value: 70,
                name: "遊程",
              },
              {
                value: 30,
                name: "專業輔導",
              },
            ],
          },
        ],
      },
      totalPrice: "11523942",
    };
  },
  created() {},
  // 計算屬性
  computed: {
    getPrice() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "TWD",
        minimumFractionDigits: 0,
      });
      formatter.format(1000);
      return formatter.format(this.totalPrice);
    },
  },
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    onSubmit() {
      this.identity = this.searchForm.type;
    },
    drawPie() {
      // console.log("myChart=>",this.$refs.myChart)  //獲取 dom 元素
      // init echarts
      let myChart = echarts.init(this.$refs.myChart);
      //配置
      myChart.setOption(this.option);
    },
  },
  mounted() {
    this.drawPie();
  },
};
</script>
<style lang="scss" scoped></style>
