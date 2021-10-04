<template>
  <div class="" style="display:flex;flex-direction:column;">
    <div style="display:flex;align-items:center;">
      <h4 style="font-size:14px;width:120px;">地址</h4>
      <twzipcode-county
        v-model="myCounty"
        style="height:40px;width:100px;margin-right:10px;"
      ></twzipcode-county>
      <!--  text-template=":zipcode :county / :city" -->
      <twzipcode-zipcode
        v-model="myZipcode"
        text-template=":city"
        :filter-by-county="myCounty"
        style="height:40px;width:150px;margin-right:10px;"
      ></twzipcode-zipcode>
      <el-input
        placeholder="輸入地址"
        v-model="address"
        style="width:400px;margin-right:10px;"
      >
      </el-input>
      <el-button type="primary" @click="searchAddress" style=""
        >查詢郵遞區號</el-button
      >
    </div>
    <!-- 輸入其餘地址 call 3+2 Api -->
    3+2 結果:{{ testAdrData.zipcode }} -- {{ testAdrData.new_adrs }}

    <!-- 試寫蘋果規則 -->
    <q-card>
      <q-form class="q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md">
        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          emit-value
          map-options
          :options="calOptions"
          option-label="label"
          option-value="value"
          v-model="activityForm.cal"
          :label="$q.screen.lt.sm ? '計算週期 ' : void 0"
        >
          <template v-slot:before v-if="$q.screen.gt.xs">
            <label for="cboBelongArea" class="font-s-size">
              計算週期:
            </label>
          </template>
        </q-select>
        <!-- 起訖日期 => oneDate -->
        <q-field
          class="col-12 col-sm-6"
          outlined
          bottom-slots
          :label="$q.screen.lt.sm ? '起訖日期' : void 0"
          stack-label
          dense
        >
          <template v-slot:before v-if="$q.screen.gt.xs">
            <label for="associationTitle" class="font-s-size">
              起訖日期:
            </label>
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ activityForm.date.from }}~{{ activityForm.date.to }}
            </div>
          </template>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  type="date"
                  v-model="activityForm.date"
                  :range="range"
                  :subtitle="computedSubtitle"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-field>

        <!-- 起訖日期 => 單一日期range -->
        <q-field
          class="col-12 col-sm-6"
          outlined
          bottom-slots
          :label="$q.screen.lt.sm ? '起訖日期2' : void 0"
          stack-label
          dense
        >
          <template v-slot:before v-if="$q.screen.gt.xs">
            <label for="associationTitle" class="font-s-size">
              起訖日期2:
            </label>
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              <span v-if="!testToDate">{{ testFromDate }}</span>
              <span v-else>{{ testFromDate }}~{{ testToDate }}</span>
            </div>
          </template>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date type="date" v-model="testFromDate" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="確認"
                      color="primary"
                      @click="addOptionDate"
                    /></div
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-field>

        <q-select
          class="col-12 col-sm-6"
          outlined
          dense
          emit-value
          map-options
          :options="planOptions"
          option-label="label"
          option-value="value"
          v-model="activityForm.plan"
          :label="$q.screen.lt.sm ? '統計方案' : void 0"
        >
          <template v-slot:before v-if="$q.screen.gt.xs">
            <label for="cboBelongArea" class="font-s-size">
              統計方案:
            </label>
          </template>
        </q-select>
        <q-option-group
          class="col-12 col-sm-6"
          :options="typeOptions"
          type="radio"
          v-model="activityForm.type"
          inline
        />
      </q-form>
      {{ activityForm.cal }} - {{ activityForm.plan }}

      <!-- 測試封裝 q-date -->
      <q-field
        class="col-12 col-sm-6"
        outlined
        bottom-slots
        :label="$q.screen.lt.sm ? '起訖日期(封裝測試)' : void 0"
        stack-label
        dense
      >
        <template v-slot:before v-if="$q.screen.gt.xs">
          <label for="associationTitle" class="font-s-size">
            起訖日期(封裝測試):
          </label>
        </template>
        <!-- 內容呈現 -->
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ date.from }}{{ date.from && date.to ? rangeTestSeparator : "" }}
            {{ date.to }}
          </div>
        </template>
        <!-- 主要元件=>封裝 -->
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <com-date
                v-model="date"
                :mask="dateMask"
                :multiple="false"
                :range="true"
                :disable="false"
                :readonly="false"
                :range-separator="rangeTestSeparator"
              >
              </com-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-field>

      <!--  -->
      <com-field form-label="起訖日期All"></com-field>
      <!-- test  -->
      <div class="row">
        <com-select-date
          class="col-12 col-sm-6"
          form-label="起訖日期222"
        ></com-select-date>
        <com-select-date
          range
          class="col-12 col-sm-6"
          rangeSeparator="~~"
          form-label="起訖日期222"
        ></com-select-date>
      </div>
      <!-- test  -->
      <div class="row">
        <com-select-date
          class="col-12 col-sm-6"
          form-label="自動計算起訖"
          auto-calculate-btn
          :cal-date-val="activityForm.cal"
        >
        </com-select-date>
        <com-select-date
          class="col-12 col-sm-6"
          form-label="DateRange4"
          :default-time="['00:00:00', '23:59:59']"
          edit-time
          with-seconds
          v-model="dialogForm.date4"
          range
          :rules="[(val) => !!val || 'Field is required']"
        >
        </com-select-date>
      </div>
    </q-card>

    <!-- 手機板按鈕畫面 -->
    <div class="">
      <!-- 按鈕面板 -->
      <!-- <div
        v-for="(item, index) in mobileLayout"
        :key="index"
        class="row q-pa-xs"
      >
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
      </div> -->
      <!-- 查詢表 -->
      <div class="row q-pa-xs">
        <div v-if="dynamicQuestions.includes('basic1')" v-model="mobileForm.basic1" class="col-12">會員姓名-綁定Mode的Key。bkey:</div>
        <div v-if="dynamicQuestions.includes('basic2')" v-model="mobileForm.basic2" class="col-12">會員電話-綁定Mode的Key。bkey:</div>
        <div v-if="dynamicQuestions.includes('basic3')" v-model="mobileForm.basic3" class="col-12">所屬區域-綁定Mode的Key。bkey:</div>
        <div v-if="dynamicQuestions.includes('basic4')" v-model="mobileForm.basic4" class="col-12">組織職務-綁定Mode的Key。bkey:</div>
        <div v-if="dynamicQuestions.includes('basic5')" v-model="mobileForm.basic5" class="col-12">人才單位-綁定Mode的Key。bkey:</div>
        <div v-if="dynamicQuestions.includes('basic6')" v-model="mobileForm.basic6" class="col-12">人才單位-職務綁定Mode的Key。bkey:</div>
      </div>
    </div>
    <!--  -->
    <mobile-btns-search :mobile-layout="mobileLayout" :choose-btns='chooseBtns' @addCondition="addCondition"></mobile-btns-search>

    


  </div>
</template>
<script>
import { Zipcode, County } from "twzipcode-vue";
import ComDate from "@/components/Common/form/ComDate";
import ComField from "@/components/Common/form/ComField";
import ComSelectDate from "@/components/Common/form/ComSelectDate";

import MobileBtnsSearch from '@/components/Common/mobile/MobileBtnsSearch.vue'

Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
Date.prototype.addMonths = function(months) {
  const date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};
export default {
  // 局部注冊的組件
  components: {
    ComDate,
    ComField,
    TwzipcodeCounty: County, // 縣市
    TwzipcodeZipcode: Zipcode, // 郵遞區號
    ComSelectDate,
    MobileBtnsSearch,
    // TwzipcodeZipcodeGroupby: ZipcodeGroupby,// 依縣市分組的郵遞區號
  },
  data() {
    return {
      // ========== Moblie Buttons Layout ================
      mobileForm:{
        basic1:"",
        basic2:"",
        basic3:"",
        basic4:"",
        basic5:"",
        basic6:"",
      },
      mobileLayout: [
        {
          name: "基本設定",
          btns: [
            {
              bname: "會員姓名",
              bkey: "basic1",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "會員電話",
              bkey: "basic2",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "所屬區域",
              bkey: "basic3",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "組織職務",
              bkey: "basic4",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "人才單位",
              bkey: "basic5",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "人才單位職務",
              bkey: "basic6",
              ischeck: false,
              colVal: 6,
            },
          ],
        },
        {
          name: "資格&紀錄",
          btns: [
            {
              bname: "層級",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "教學資格",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "御本尊",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "認證資格",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "研修紀錄",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "受獎紀錄",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
          ],
        },
        {
          name: "個人資料",
          btns: [
            {
              bname: "電話",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "Email",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "專長",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "地址",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "年紀From",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "年紀To",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "生日From",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "生日To",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
          ],
        },
        {
          name: "學生",
          btns: [
            {
              bname: "學生部別",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "目前就讀學校",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "在學狀態",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "最高學歷",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "年級",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
          ],
        },
        {
          name: "進階搜尋",
          btns: [
            {
              bname: "信心背景",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "活動程度",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "遷移狀態",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "不列入活動",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "不列入會員",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "區域代碼",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "建立人員",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "維護人員",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "電子幹部卡號",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "維護人員編號",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "月份壽星",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "新增日期(From~To)",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "結束日期(From~To)",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "最新更新日期(From~To)",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "入信日期(From~To)",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
          ],
        },
      ],
    
      chooseBtns: [],
      // ========== End of Moblie Buttons Layout =========
      // ==========================
      dialogForm: {},
      // ==========================
      dateMask: "YYYY-MM-DD",
      rangeTestSeparator: "至",
      times: [],
      date: "",
      modified: false,
      // ==========================
      myCounty: "新北市",
      myZipcode: "",
      myZipcode2: "",
      testAdrData: {},
      address: "",
      // ====活動部分=====
      testFromDate: "",
      testToDate: null,
      range: true,
      rangeSeparator: "~",
      calOptions: [
        { label: "1個月", value: 1 },
        { label: "2個月", value: 2 },
        { label: "3個月", value: 3 },
        { label: "4個月", value: 4 },
        { label: "5個月", value: 5 },
        { label: "6個月", value: 6 },
        { label: "7個月", value: 7 },
        { label: "8個月", value: 8 },
        { label: "9個月", value: 9 },
        { label: "10個月", value: 10 },
        { label: "11個月", value: 11 },
        { label: "12個月", value: 12 },
      ],
      planOptions: [
        { label: "紅蘋果", value: 1 },
        { label: "青蘋果", value: 2 },
        { label: "白蘋果", value: 3 },
      ],
      typeOptions: [
        { label: "不分活動", value: 0 },
        { label: "依照活動", value: 1 },
      ],
      activityForm: {
        cal: "",
        date: { from: "", to: "" },
        plan: "",
        type: "",
      },
    };
  },
  // 計算屬性
  computed: {
    // ========== Moblie Buttons Layout ================
    dynamicQuestions() {
      return this.chooseBtns.map((item) => item.bkey);
    },
    // ========== End of Moblie Buttons Layout =========
    // =================================================
    computedSubtitle() {
      // if (this.subtitle) {
      //   return this.subtitle;
      // }
      // const v = this.$attrs.value
      console.log("v=>", this.activityForm);
      const v = this.activityForm.date;
      if (!v) {
        return "";
      }
      if (this.range) {
        return v.from + this.rangeSeparator + v.to;
        // if (this.multiple) {
        //   return "";
        // } else if (!v.from) {
        //   return v;
        // } else {
        //   return v.from + this.rangeSeparator + v.to;
        // }
      } else if (this.multiple) {
        return "";
      } else {
        const date_ = new Date(v);
        const days = date.getDayOfWeek(date_);
        return (
          date_.getUTCFullYear() +
          " " +
          (days === 7 ? this.cnLocale.days[0] : this.cnLocale.days[days])
        );
      }
    },
    // =================================================
    dateModel() {
      // 測試封裝
      if (this.range && this.date) {
        console.log("range=>", this.range, "|| date=>", this.date);
        if (this.date.from === this.date.to) {
          return this.date.from;
        } else {
          return this.date;
        }
      } else {
        return this.date;
      }
    },
  },
 
  // 組件方法
  methods: {
    addOptionDate() {
      // console.log("addOptionDate=>",this.testFromDate)
      const fromDate = new Date(this.testFromDate);
      console.log(
        "add 10 days=>",
        fromDate
          .addDays(10)
          .toISOString()
          .substring(0, 10)
      );
      // 設定天數
      // this.testToDate = fromDate
      //   .addDays(10)
      //   .toISOString()
      //   .substring(0, 10);
      //
      this.testToDate = fromDate
        .addMonths(this.activityForm.cal)
        .toISOString()
        .substring(0, 10);
    },
    searchAddress() {
      let cityStr = "";
      let areaStr = "";
      let citySelect = document.getElementById("twzipcode__county");
      let cityIndex = citySelect.selectedIndex;
      cityStr = citySelect.options[cityIndex].text;

      let areaSelect = document.getElementById("twzipcode__zipcode");
      let areaIndex = areaSelect.selectedIndex;
      areaStr = areaSelect.options[areaIndex].text;
      this.fetData(cityStr + areaStr + this.address);
    },

    fetData(adr) {
      this.$axios
        .get(`http://zip5.5432.tw/zip5json.py?adrs=${adr}`)
        .then((res) => {
          console.log(res.data);
          this.testAdrData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // ========== Moblie Buttons Layout ================
    addCondition(obj) {
      // 判斷是否已存在Arr
      if (!this.mobileLayout[obj.index].btns[obj.bI].ischeck) {
        //未被選中
        // 加入選中清單
        this.chooseBtns.push(obj);
        // 更改選取狀態
        this.mobileLayout[obj.index].btns[obj.bI].ischeck = !this.mobileLayout[
          obj.index
        ].btns[obj.bI].ischeck;
      } else {
        //移除選中
        let chooseIndex = this.chooseBtns.findIndex(
          (item) => item.bname === obj.bname
        );
        this.mobileLayout[obj.index].btns[obj.bI].ischeck = !this.mobileLayout[
          obj.index
        ].btns[obj.bI].ischeck;
        this.chooseBtns.splice(chooseIndex, 1);
      }
    },
 
    // ========== End of Moblie Buttons Layout =========
  },
  created() {},
};
</script>
<style lang="scss">
label {
  color: #000;
  font-size: 14px;
}
.font-s-size {
  font-size: 55%;
}
.this {
  border: 1px solid red;
}
.q-field__label.no-pointer-events.absolute.ellipsis {
  transform: translateY(-30%) scale(0.75);
}
</style>
