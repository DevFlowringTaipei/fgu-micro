<script>
import { getAllMember } from "@/api/member.js";
import MemIndexTable from "@/components/Member/MemIndexTable";
import MobileBtnsSearch from "@/components/Common/mobile/MobileBtnsSearch.vue";
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
export default {
  components: {
    MemIndexTable,
    MobileBtnsSearch,
  },
  name: "Member-search",
  data() {
    return {
      //form
      level: "層級",
      levelWay: "且",
      TwsgiMail: false,
      ageNum: 20,
      ageNum2: 30,
      telNumber: "0911111111",
      email: "",
      testDate: "",
      endDate: "",
      pStartDate: {
        from: "2020/07/08",
        to: "2020/07/17",
      },
      teachQual: "",
      options: stringOptions,
      isClickSearchBtn: false,
      isSearchListPage: false,
      isSearchPage: true,

      //最高學歷
      ele: true,
      ele_select: ["1"],
      ele_options: [
        {
          label: "一",
          value: "1",
        },
        {
          label: "二",
          value: "2",
        },
        {
          label: "三",
          value: "3",
        },
        {
          label: "四",
          value: "4",
        },
        {
          label: "五",
          value: "5",
        },
        {
          label: "六",
          value: "6",
        },
      ],
      junior: false,
      junior_select: ["1", "3"],
      junior_options: [
        {
          label: "一",
          value: "1",
        },
        {
          label: "二",
          value: "2",
        },
        {
          label: "三+",
          value: "3+",
        },
      ],
      senior: false,
      senior_select: ["1", "3"],
      senior_options: [
        {
          label: "一",
          value: "1",
        },
        {
          label: "二",
          value: "2",
        },
        {
          label: "三+",
          value: "3+",
        },
      ],
      college: false,
      college_select: ["1", "3"],
      college_options: [
        {
          label: "一",
          value: "1",
        },
        {
          label: "二",
          value: "2",
        },
        {
          label: "三+",
          value: "3+",
        },
      ],
      master: false,
      master_select: ["1", "3"],
      master_options: [
        {
          label: "一",
          value: "1",
        },
        {
          label: "二+",
          value: "2+",
        },
      ],
      dr: false,
      dr_select: ["3"],
      dr_options: [
        {
          label: "一",
          value: "1",
        },
        {
          label: "二+",
          value: "2+",
        },
      ],
      //在學狀態
      studyStatus_select: ["2"],
      studyStatus_options: [
        {
          label: "在學中",
          value: "1",
        },
        {
          label: "畢業",
          value: "2",
        },
        {
          label: "肄業",
          value: "3",
        },
      ],
      //日期起訖
      startDate: "2021/09/09~2021/09/10",
      // ========== Member Table ================
      fullMemColumns: [
        {
          name: "memberCode",
          align: "center",
          label: "會員編號",
          field: "memberCode",
          sortable: true,
        },
        {
          name: "memberName",
          label: "姓名",
          align: "center",
          field: "memberName",
          style: "width: 10px",
        },
        {
          name: "area",
          label: "所屬區域",
          align: "center",
          field: "area",
          format: (val, row) =>
            areaArr.filter((obj) => obj.areaId === val)[0].areaName,
        },
        { name: "mobile", label: "電話", field: "mobile", align: "center" },
        { name: "address", label: "地址", field: "address", align: "center" },
        {
          name: "email",
          label: "E-mail",
          field: "email",
          align: "center",
        },
        {
          name: "birthday",
          label: "生日",
          field: "birthday",
          align: "center",
        },
        {
          name: "department",
          label: "部別",
          align: "center",
          field: "department",
          format: (val, row) =>
            departmentArr.filter((obj) => obj.departmentId === val)[0]
              .departmentName,
        },
        {
          name: "orgJobTitle",
          label: "組織職務",
          align: "center",
          field: "orgJobTitle",
          format: (val, row) =>
            jobTitleArr.filter((obj) => obj.jobId === val)[0].jobName,
        },
        {
          name: "departmentStu",
          label: "學生部別",
          align: "center",
          field: "departmentStu",
        },
        {
          name: "grade",
          label: "年級",
          align: "center",
          field: "grade",
        },
        {
          name: "schoolNow",
          label: "目前就讀學校",
          align: "center",
          field: "schoolNow",
        },
        {
          name: "unitTitle",
          label: "人才單位職務",
          align: "center",
          field: "unitTitle",
        },
        {
          name: "status",
          label: "狀態",
          field: "status",
          align: "center",
        },
        {
          name: "endDate",
          label: "結束日期",
          align: "center",
          field: "endDate",
        },
      ],
      fullMemData: [],
      fullMemDataLoading: false,
      // ========== End of Member Table =========
      // ========== Moblie Buttons Layout ================
      mobileLayout: [
        {
          name: "基本設定",
          btns: [
            {
              bname: "會員姓名",
              bkey: "", //填入v-model
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "會員電話",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "所屬區域",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "組織職務",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "人才單位",
              bkey: "",
              ischeck: false,
              colVal: 6,
            },
            {
              bname: "人才單位職務",
              bkey: "",
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
    };
  },
  watch: {
    startDate: {
      handler(newVal) {
        const splitVal = newVal.split("~");
        this.updateDate(splitVal[0], splitVal[1]);
      },
    },
  },
  methods: {
    //表單送出
    onSubmit() {
      console.log("submit");
    },
    //表格資料
    async fetchData() {
      if (this.fullMemData.length > 0) return;
      try {
        // 尚未取得資料
        this.fullMemDataLoading = true;
        let res = await getAllMember();

        return new Promise((resolve) => {
          if (res.data.length > 0) {
            this.fullMemData = res.data;
            this.fullMemDataLoading = false;
            resolve(res);
          } else {
            this.fullMemDataLoading = false;
            resolve(res);
          }
        });
      } catch (err) {
        alert("服務器出错");
        console.log(err);
      }
    },
    //select filtering
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    inputDate(val) {
      const context = `${val.from}~${val.to}`;
      this.startDate = context;
    },
    updateDate(date1, date2) {
      this.pStartDate.from = date1;
      this.pStartDate.to = date2;
    },
    scrollToBottom() {
      this.isClickSearchBtn = true;
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    },
    // ========== Moblie Buttons Layout ================
    addCondition(obj) {
      if (!this.mobileLayout[obj.index].btns[obj.bI].ischeck) {
        this.chooseBtns.push(obj);

        this.mobileLayout[obj.index].btns[obj.bI].ischeck =
          !this.mobileLayout[obj.index].btns[obj.bI].ischeck;
      } else {
        let chooseIndex = this.chooseBtns.findIndex(
          (item) => item.bname === obj.bname
        );
        this.mobileLayout[obj.index].btns[obj.bI].ischeck =
          !this.mobileLayout[obj.index].btns[obj.bI].ischeck;
        this.chooseBtns.splice(chooseIndex, 1);
      }
    },
    openSearchListPage() {
      this.isSearchListPage = true;
      this.isSearchPage = false;
    },
    backSearchPage() {
      this.isSearchPage = true;
      this.isSearchListPage = false;
    },
    // ========== End of Moblie Buttons Layout =========
  },
  computed: {
    // ========== Moblie Buttons Layout ================
    dynamicQuestions() {
      return this.chooseBtns.map((item) => item.bkey);
    },
    // ========== End of Moblie Buttons Layout =========
  },
  created() {},
};
</script>
<template>
  <div class="q-pa-md">
    <template v-if="isSearchPage">
      <div>查詢</div>
      <q-form @submit="onSubmit">
        <div class="row justify-start items-center q-col-gutter-md q-py-md">
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '會員姓名' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 會員姓名: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-input
              id=""
              type=""
              outlined
              dense
              :label="$q.screen.lt.sm ? '會員編號' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for=""> 會員編號: </label>
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              :label="$q.screen.lt.sm ? '所屬區域' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 所屬區域: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              :label="$q.screen.lt.sm ? '組織職務' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 組織職務: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '人才單位' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 人才單位: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              :label="$q.screen.lt.sm ? '人才單位職務' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 人才單位職務: </label>
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-4">
            <div class="flex items-center">
              <q-select
                id="level"
                class="flex-1 q-mr-sm q-mr-md-md"
                outlined
                dense
                emit-value
                v-model="level"
                :label="$q.screen.lt.sm ? '層級' : void 0"
                :options="options"
                use-input
                input-debounce="0"
                @filter="filterFn"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label for="level"> 層級: </label>
                </template>
              </q-select>
              <q-select
                id="levelWay"
                class="flex-1 q-ml-sm q-ml-md-none"
                outlined
                dense
                emit-value
                v-model="levelWay"
                :label="$q.screen.lt.sm ? '層級方式' : void 0"
              >
              </q-select>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="flex items-center">
              <q-select
                id="level"
                class="flex-1 q-mr-sm q-mr-md-md"
                outlined
                dense
                emit-value
                v-model="level"
                :label="$q.screen.lt.sm ? '教學資格' : void 0"
                :options="options"
                use-input
                input-debounce="0"
                @filter="filterFn"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label for="level"> 教學資格: </label>
                </template>
              </q-select>
              <q-select
                id="levelWay"
                class="flex-1 q-ml-sm q-ml-md-none"
                outlined
                dense
                emit-value
                v-model="levelWay"
                :label="$q.screen.lt.sm ? '教學資格方式' : void 0"
              >
              </q-select>
            </div>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '御本尊' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 御本尊: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '認證資格' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 認證資格: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '研修紀錄' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 研修紀錄: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '授獎記錄' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 授獎記錄: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-input
              id="introducerTel"
              type="tel"
              outlined
              dense
              :label="$q.screen.lt.sm ? '電話' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="introducerTel" class=""> 電話: </label>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-4">
            <div class="flex items-center">
              <q-input
                style="flex: 1 0 auto"
                id="email"
                type="email"
                outlined
                dense
                v-model="email"
                :label="$q.screen.lt.sm ? 'Email' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label for="email"> Email: </label>
                </template>
              </q-input>
              <q-checkbox v-model="TwsgiMail" label="TWSGI 信箱" size="xs" />
            </div>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              :label="$q.screen.lt.sm ? '專長' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 專長: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '部別' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 部別: </label>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-4">
            <q-select
              id="cboConfidenceBg"
              outlined
              dense
              emit-value
              :label="$q.screen.lt.sm ? '會員類型' : void 0"
            >
              <template v-slot:before v-if="$q.screen.gt.xs">
                <label for="cboConfidenceBg" class=""> 會員類型: </label>
              </template>
            </q-select>
          </div>
          <div class="col-12 q-gutter-y-md">
            <div class="flex items-center q-gutter-x-md">
              <span
                v-if="$q.screen.lt.sm"
                :class="$q.screen.lt.sm ? 'q-mb-md' : ''"
                >(</span
              >
              <q-input
                id=""
                :class="$q.screen.lt.sm ? 'q-mb-md' : ''"
                type="text"
                outlined
                dense
                :label="$q.screen.lt.sm ? '地址' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label for=""> 地址: ( </label>
                </template>
              </q-input>
              <q-select
                id=""
                class=""
                :class="$q.screen.lt.sm ? 'q-mb-md' : ''"
                outlined
                dense
                emit-value
                v-model="levelWay"
              >
              </q-select>
              <q-input
                id=""
                type="text"
                outlined
                dense
                :label="$q.screen.lt.sm ? '地址' : void 0"
              >
              </q-input>
              <span>)</span>
              <q-select id="" outlined dense emit-value v-model="levelWay">
              </q-select>
            </div>
            <div class="flex items-center q-gutter-x-md">
              <span
                v-if="$q.screen.lt.sm"
                :class="$q.screen.lt.sm ? 'q-mb-md' : ''"
                >(</span
              >
              <q-input
                id=""
                :class="$q.screen.lt.sm ? 'q-mb-md' : ''"
                type="text"
                outlined
                dense
                :label="$q.screen.lt.sm ? '地址' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label for=""> <span class="invisible">地址:</span> ( </label>
                </template>
              </q-input>
              <q-select
                id=""
                :class="$q.screen.lt.sm ? 'q-mb-md' : ''"
                outlined
                dense
                emit-value
                v-model="levelWay"
              >
              </q-select>
              <q-input
                id=""
                type="text"
                outlined
                dense
                :label="$q.screen.lt.sm ? '地址' : void 0"
              >
              </q-input>
              <span>)</span>
            </div>
          </div>
        </div>
        <div class="row justify-start items-center q-col-gutter-md q-py-md">
          <div class="col-12 col-md-6">
            <div class="row items-center q-col-gutter-md">
              <div class="col-6 col-md-4">
                <q-input
                  v-model.number="ageNum"
                  type="number"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '年紀' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for=""> 年紀: </label>
                  </template>
                </q-input>
              </div>
              <span class="q-mx-xs" v-if="$q.screen.gt.xs">~</span>
              <div class="col-6 col-md-4">
                <q-input
                  v-model.number="ageNum2"
                  type="number"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '年紀' : void 0"
                >
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row justify-start items-center q-col-gutter-md q-py-md q-mb-md"
        >
          <div class="col-12 col-md-6">
            <div class="row items-center q-col-gutter-md">
              <div class="col-6 col-md-4">
                <q-input
                  id=""
                  class=""
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '生日' : void 0"
                  v-model="testDate"
                  mask="date"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="testDate" class=""> 生日: </label>
                  </template>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="testDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="確認" color="primary" />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <span class="q-mx-xs" v-if="$q.screen.gt.xs">~</span>
              <div class="col-6 col-md-4">
                <q-input
                  id=""
                  class=""
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '生日' : void 0"
                  v-model="endDate"
                  mask="date"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="endDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="確認" color="primary" />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end q-my-md">
          <q-btn label="查詢" color="primary" @click="scrollToBottom" />
        </div>
        <q-list class="q-mb-md">
          <q-expansion-item
            dense-toggle
            expand-icon-class="text-white"
            expand-separator
            label="學校類型 & 年級"
            header-class="text-white"
            :header-style="{ backgroundColor: '#418163' }"
          >
            <div class="row justify-start items-center q-col-gutter-md q-py-md">
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  emit-value
                  :label="$q.screen.lt.sm ? '學生部別' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 學生部別: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '目前就讀學校' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class="">
                      目前就讀學校:
                    </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '最高學歷' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 最高學歷: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '年級' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 年級: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-12 col-md-8">
                <label for="">在學狀態(附帶條件):</label>
                <div class="flex">
                  <div class="q-mr-md">
                    <q-checkbox
                      v-for="item in studyStatus_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="studyStatus_select"
                    />
                  </div>
                  <q-btn label="名單查詢" color="primary" />
                </div>
              </div>
              <div class="col-12 col-md-12">
                <label for="">學校類型(最高學歷):</label>
                <div class="flex">
                  <q-checkbox v-model="ele" label="國小" />
                  <div>
                    <q-checkbox
                      v-for="item in ele_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="ele_select"
                    />
                  </div>
                </div>
                <div class="flex">
                  <q-checkbox v-model="junior" label="國中" />
                  <div>
                    <q-checkbox
                      v-for="item in junior_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="junior_select"
                    />
                  </div>
                </div>
                <div class="flex">
                  <q-checkbox v-model="senior" label="高中" />
                  <div>
                    <q-checkbox
                      v-for="item in senior_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="senior_select"
                    />
                  </div>
                </div>
                <div class="flex">
                  <q-checkbox v-model="college" label="大學" />
                  <div>
                    <q-checkbox
                      v-for="item in college_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="college_select"
                    />
                  </div>
                </div>
                <div class="flex">
                  <q-checkbox v-model="master" label="碩士" />
                  <div>
                    <q-checkbox
                      v-for="item in master_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="master_select"
                    />
                  </div>
                </div>
                <div class="flex">
                  <q-checkbox v-model="dr" label="博士" />
                  <div>
                    <q-checkbox
                      v-for="item in dr_options"
                      :key="item.value"
                      :val="item.value"
                      :label="item.label"
                      v-model="dr_select"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end q-my-md">
              <q-btn label="查詢" color="primary" />
            </div>
          </q-expansion-item>
        </q-list>
        <q-list>
          <q-expansion-item
            dense-toggle
            expand-icon-class="text-white"
            expand-separator
            label="進階搜尋"
            header-class="text-white"
            :header-style="{ backgroundColor: '#418163' }"
          >
            <div class="row justify-start items-center q-col-gutter-md q-py-md">
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '信心背景' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 信心背景: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '活動程度' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 活動程度: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '遷移狀況' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 遷移狀況: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '不列入活動原因' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class="">
                      不列入活動原因:
                    </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '不列入會員原因' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class="">
                      不列入會員原因:
                    </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '區域代碼' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 區域代碼: </label>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-4">
                <q-input
                  id=""
                  type="text"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '建立人員' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for=""> 建立人員: </label>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <div class="flex">
                  <q-input
                    id=""
                    type="text"
                    outlined
                    dense
                    :label="$q.screen.lt.sm ? '維護人員' : void 0"
                  >
                    <template v-slot:before v-if="$q.screen.gt.xs">
                      <label for=""> 維護人員: </label>
                    </template>
                  </q-input>
                  <q-checkbox
                    v-model="TwsgiMail"
                    label="會員自行更新"
                    size="xs"
                  />
                </div>
              </div>
              <div class="col-6 col-md-4">
                <q-input
                  id=""
                  type="text"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '電子幹部卡號(進)' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for=""> 電子幹部卡號(進): </label>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-4">
                <q-input
                  id=""
                  type="text"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? '維護人員編號' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for=""> 維護人員編號: </label>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-4">
                <q-select
                  id="cboConfidenceBg"
                  outlined
                  dense
                  emit-value
                  :label="$q.screen.lt.sm ? '月份壽星' : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label for="cboConfidenceBg" class=""> 月份壽星: </label>
                  </template>
                </q-select>
              </div>
              <div
                class="row justify-start items-center q-col-gutter-md q-py-md"
              >
                <div class="col-12 col-md-6">
                  <div class="row items-center q-col-gutter-md">
                    <div class="col-6 col-md-5">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '新增日期' : void 0"
                        v-model="testDate"
                        mask="date"
                      >
                        <template v-slot:before v-if="$q.screen.gt.xs">
                          <label for="testDate" class=""> 新增日期: </label>
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="testDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <span class="q-mx-xs" v-if="$q.screen.gt.xs">~</span>
                    <div class="col-6 col-md-6">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '新增日期' : void 0"
                        v-model="endDate"
                        mask="date"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="endDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="row items-center q-col-gutter-md">
                    <div class="col-6 col-md-5">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '結束日期' : void 0"
                        v-model="testDate"
                        mask="date"
                      >
                        <template v-slot:before v-if="$q.screen.gt.xs">
                          <label for="testDate" class=""> 結束日期: </label>
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="testDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <span class="q-mx-xs" v-if="$q.screen.gt.xs">~</span>
                    <div class="col-6 col-md-6">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '結束日期' : void 0"
                        v-model="endDate"
                        mask="date"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="endDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="row items-center q-col-gutter-md">
                    <div class="col-6 col-md-5">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '最新更新日期' : void 0"
                        v-model="testDate"
                        mask="date"
                      >
                        <template v-slot:before v-if="$q.screen.gt.xs">
                          <label for="testDate" class=""> 最新更新日期: </label>
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="testDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <span class="q-mx-xs" v-if="$q.screen.gt.xs">~</span>
                    <div class="col-6 col-md-6">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '最新更新日期' : void 0"
                        v-model="endDate"
                        mask="date"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="endDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="row items-center q-col-gutter-md">
                    <div class="col-6 col-md-5">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '入信日期' : void 0"
                        v-model="testDate"
                        mask="date"
                      >
                        <template v-slot:before v-if="$q.screen.gt.xs">
                          <label for="testDate" class=""> 入信日期: </label>
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="testDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <span class="q-mx-xs" v-if="$q.screen.gt.xs">~</span>
                    <div class="col-6 col-md-6">
                      <q-input
                        id=""
                        class=""
                        outlined
                        dense
                        :label="$q.screen.lt.sm ? '入信日期' : void 0"
                        v-model="endDate"
                        mask="date"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="endDate">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="確認"
                                    color="primary"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end q-my-md">
              <q-btn label="查詢" color="primary" />
            </div>
          </q-expansion-item>
        </q-list>
      </q-form>
      <mem-index-table
        :tableColumn="fullMemColumns"
        :tableData="fullMemData"
        :showMultiSelect="true"
        :table-loading="fullMemDataLoading"
        rowKey="id"
        tabTitle="所有會員"
      ></mem-index-table>
      <div class="flex justify-center" v-if="$q.screen.gt.xs">
        <q-btn
          class="q-mr-md q-mb-md"
          color="primary"
          text-color="white"
          label="各項異動"
        />
        <q-btn
          class="q-mr-md q-mb-md"
          color="primary"
          text-color="white"
          label="匯出"
        />
        <q-btn
          class="q-mr-md q-mb-md"
          color="amber"
          text-color="white"
          label="部別變更"
        />
        <q-btn
          class="q-mr-md q-mb-md"
          color="amber"
          text-color="white"
          label="批次學生部別異動"
        />
      </div>
      <q-footer elevated v-if="$q.screen.lt.sm" class="q-pa-md">
        <div class="flex justify-end">
          <q-fab
            color="amber"
            padding="xs"
            icon="keyboard_arrow_up"
            direction="up"
            vertical-actions-align="right"
          >
            <q-fab-action
              square
              padding="xs"
              color="primary"
              label="匯出"
              class="fab-action-offset"
            />
            <q-fab-action
              square
              padding="xs"
              color="primary"
              label="各項異動"
              class="fab-action-offset"
            />
            <q-fab-action
              square
              padding="xs"
              color="primary"
              label="會員查詢"
              class="fab-action-offset"
            />
            <q-fab-action
              square
              padding="xs"
              color="amber"
              label="部別變更"
              class="fab-action-offset"
            />
            <q-fab-action
              square
              padding="xs"
              color="amber"
              label="批次學生部別異動"
              class="fab-action-offset"
            />
          </q-fab>
        </div>

        <!-- <div class="flex justify-center">
          <q-btn
            class="q-mr-md q-mb-md"
            color="primary"
            text-color="white"
            label="各項異動"
          />
          <q-btn
            class="q-mr-md q-mb-md"
            color="primary"
            text-color="white"
            label="匯出"
          />
          <q-btn
            class="q-mr-md q-mb-md"
            color="primary"
            text-color="white"
            label="會員查詢"
          />
        </div>
        <div class="flex justify-center">
          <q-btn
            class="q-mr-md"
            color="amber"
            text-color="white"
            label="部別變更"
          />
          <q-btn
            class="q-mr-md"
            color="amber"
            text-color="white"
            label="批次學生部別異動"
          />
        </div> -->

        <!-- <q-btn
            flat
            dense
            padding="sm lg"
            text-color="white"
            color="primary"
            label="條件設置"
            @click="openSearchListPage"
          >
          </q-btn>
          <q-btn
            flat
            dense
            padding="sm lg"
            text-color="white"
            color="accent"
            label="取消"
          >
          </q-btn> -->
      </q-footer>
    </template>
    <!-- mobile -Search List -->
    <template v-if="$q.screen.lt.sm && isSearchListPage">
      <mobile-btns-search
        :mobile-layout="mobileLayout"
        :choose-btns="chooseBtns"
        @addCondition="addCondition"
      ></mobile-btns-search>
      <q-footer elevated>
        <q-toolbar class="flex justify-around">
          <q-btn
            flat
            dense
            padding="sm lg"
            text-color="white"
            color="primary"
            label="確認"
            @click="backSearchPage"
          >
          </q-btn>
          <q-btn
            flat
            dense
            padding="sm lg"
            text-color="white"
            color="accent"
            label="取消"
          >
          </q-btn>
        </q-toolbar>
      </q-footer>
    </template>

    <!--
      @之後每一個問題的樣貌綁model@
    <div
      v-if="dynamicQuestions.includes('basic1')"
      v-model="mobileForm.basic1"
      class="col-12"
    >
      會員姓名-綁定Mode的Key。bkey:
    </div>
    -->

    <!-- mobile -Search List -->
  </div>
</template>
<style lang="scss" scoped>
.flex-1 {
  flex: 1 0 auto;
}

label {
  color: #000;
  font-size: 14px;
}

.fab-action-offset {
  right: -10px;
}
</style>
