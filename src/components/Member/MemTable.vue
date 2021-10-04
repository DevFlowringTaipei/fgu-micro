<template>
  <div class="">
    <div class="">
      <q-table
        :flat="false" 
        :bordered="false"
        :square="true"
        :data="tableData"
        :loading="tableLoading"
        :columns="tableColumn"
        :row-key="rowKey"
        :separator="separator"
        :title="tabTitle"
        hide-pagination
      >
        <!-- 頭部 -->
        <!-- <template v-slot:top="props">
        <div class="col-4 q-table__title">{{ tabTitle }}</div>
        <q-space />
        <q-btn
          v-show="operaShow"
          size="sm"
          color="primary"
          :label="`新增${tabTitle}`"
          @click="openDialog('add')"
        />
      </template> -->
        <!-- 頭部右側 -->
        <template v-slot:top-right>
          <!-- 預設是 Button -->
          <slot name="TopRight">
            <q-btn
              v-show="operaShow"
              size="sm"
              color="primary"
              :label="`新增${tabTitle}`"
              @click="openDialog('add')"
            />
          </slot>
        </template>
        <!-- table 表頭 -->
        <q-tr slot="header" slot-scope="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width v-show="operaShow">
            操作
          </q-th>
        </q-tr>
        <!-- body -->
        <template v-slot:body="props">
          <q-tr :props="props" :key="props.row.index" :no-hover="!operaShow">
            <!-- {{props}} -->
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td v-show="operaShow">
              <!-- 預設模式 -->
              <div class="q-pa-md q-gutter-sm">
                <q-btn
                  size="xs"
                  color="amber"
                  label="修改"
                  @click="checkIsMember(props.row)"
                />
                <q-btn
                  size="xs"
                  style="color: white;background: red;"
                  label="刪除"
                />
              </div>
            </q-td>
          </q-tr>
          <!-- <template v-if="tableData.length - 1 === props.rowIndex && separator==='vertical'" class="">
          <q-tr :props="props" style="border-top:1px;">
            <q-td v-for="col in props.cols" :key="col.name" :props="props" style="border-top:1px solid rgba(0, 0, 0, 0.12);">
            {{ idolCalTotal[col.name]}}
            </q-td>
          </q-tr>
        </template> -->
        </template>
        <!-- bottom-row -->
        <template v-slot:bottom-row="props" v-if="separator === 'vertical'">
          <q-tr no-hover :props="props">
            <q-td
              align="center"
              style="border-top:1px solid rgba(0, 0, 0, 0.12);"
            >
              {{ idolCalTotal.normal }}
            </q-td>
            <q-td
              align="center"
              style="border-top:1px solid rgba(0, 0, 0, 0.12);"
            >
              {{ idolCalTotal.special }}
            </q-td>
            <q-td
              align="center"
              style="border-top:1px solid rgba(0, 0, 0, 0.12);border-right:1px solid rgba(0, 0, 0, 0.12);"
            >
              {{ idolCalTotal.guard }}
            </q-td>
            <q-td
              v-for="i in tableColumn.length - 3"
              :key="i"
              style="border:none;border-top:1px solid rgba(0, 0, 0, 0.12);"
            ></q-td>
          </q-tr>
        </template>
        <!-- Pagination -->
        <!-- <template v-slot:pagination>
        <div
          class="col-12 col-sm-6 "
          style="display:flex;min-height:40px;padding:8px 0px 0px 8px;"
          :style="
            $q.screen.lt.sm ? 'flex-direction:column;' : 'flex-direction:row;'
          "
        >
          <span
            class="font-s-size "
            style="margin-right:2px;font-size: 13.2px;width:60px;padding-top:8px;"
          >
            每頁筆數:
          </span>
          <div
            style="display:flex;flex:1;"
            :style="$q.screen.lt.sm ? '' : 'flex-direction:row;'"
          >
            <q-select
              v-model="page.pageSize"
              outlined
              dense
              emit-value
              map-options
              :options="rowOptions"
              option-label="label"
              option-value="value"
              style="flex:1;margin-right:4px;"
              :style="$q.screen.lt.sm ? 'margin-top:6px;margin-right:0px;' : ''"
            >
            </q-select>
          </div>
        </div>
        <com-pagination
          v-model="page.currentPage"
          :page-size="page.pageSize"
          :total-num="page.totalNum"
          @input="changeCurrentPage"
        ></com-pagination>
      </template> -->
      </q-table>
      <!-- Pagination -->
      <div class="row q-mt-xs">
        <div
          class="col-12 col-sm-6"
          style="display:flex;min-height:40px;align-items:center;padding-right:20px;"
          :style="
          $q.screen.lt.sm ? 'justify-content:center;' : 'justify-content:flex-end;'
        "
        >
          <span
            class="font-s-size "
            style="margin-right:2px;font-size: 13.2px;width:60px;"
          >
            每頁筆數:
          </span>
          
            <q-select
              v-model="page.pageSize"
              behavior='menu'
              :outlined="false"
              dense
              emit-value
              map-options
              :options="rowOptions"
              option-label="label"
              option-value="value"
              size="xs"
              style="margin-right:4px;"
            >
            </q-select>
          
        </div>
        <com-pagination
          class="col-12 col-sm-6 "
          style="align-items:center;margin-right:0px;"
          :style="
          $q.screen.lt.sm ? 'justify-content:center;' : 'justify-content:flex-start;'
        "
          v-model="page.currentPage"
          :page-size="page.pageSize"
          :total-num="page.totalNum"
          @input="changeCurrentPage"
        ></com-pagination>
      </div>
    </div>


    <!-- 新增 -->
    <q-dialog v-model="showCheckDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <template v-if="tabTitle === '家族會員'">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ diagleMethod }}家族成員</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section style="padding-bottom:0px;">
            <!-- q-pa-md q-col-gutter-x-md q-col-gutter-y-md -->
            <q-form class=" row q-col-gutter-x-sm q-py-sm">
              <q-input
                class="col-12 col-sm-5"
                type="text"
                outlined
                dense
                v-model="checkMemForm.f_name"
                :label="$q.screen.lt.sm ? '親屬姓名 ' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="font-size: 55%;"
                  >
                    親屬姓名 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-12 col-sm-5"
                type="text"
                outlined
                dense
                v-model="checkMemForm.f_phone"
                :label="$q.screen.lt.sm ? '親屬電話號碼 ' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="font-size: 55%;"
                  >
                    親屬電話號碼 :
                  </label>
                </template>
              </q-input>
              <div class="col-12 col-sm-2" style="padding: 2px 10px;">
                <q-btn
                  color="primary"
                  label="查詢會員"
                  :style="$q.screen.lt.sm ? 'float:right;' : ''"
                  @click="checkIsMember((id = 0))"
                />
              </div>
            </q-form>
          </q-card-section>

          <q-card-section v-show="checkedAns" style="padding-top:0px;">
            <el-divider content-position="center">檢查結果</el-divider>
            <q-form class="row q-col-gutter-x-sm q-col-gutter-y-sm q-py-sm">
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="familyForm.f_name"
                :label="$q.screen.lt.sm ? '親屬姓名' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 55%;"
                  >
                    親屬姓名 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="familyForm.f_phone"
                :label="$q.screen.lt.sm ? '親屬電話號碼' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 55%;"
                  >
                    親屬電話號碼 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="familyForm.f_isin"
                :label="$q.screen.lt.sm ? '是否入信' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 55%;"
                  >
                    是否入信 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="familyForm.f_mcode"
                :label="$q.screen.lt.sm ? '會員編號' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 55%;"
                  >
                    會員編號 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="familyForm.area"
                :label="$q.screen.lt.sm ? '所屬區域' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 55%;"
                  >
                    所屬區域 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="familyForm.f_nickedname"
                :label="$q.screen.lt.sm ? '稱謂' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 55%;"
                  >
                    稱謂 :
                  </label>
                </template>
              </q-input>
              <q-input
                class="col-12 col-sm-12"
                type="text"
                outlined
                dense
                v-model="familyForm.note"
                :label="$q.screen.lt.sm ? '備註' : void 0"
                :style="$q.screen.lt.sm ? 'margin-bottom:10px;' : ''"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width: 60px;font-size: 14px;"
                  >
                    備註 :
                  </label>
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions v-show="checkedAns" horizontal align="center">
            <q-btn
              color="primary"
              label="取消"
              size="small"
              @click="handleCancle"
            />
            <q-btn
              size="small"
              color="primary"
              label="保存"
              @click="handleSave"
            />
          </q-card-actions>
        </template>

        <template v-else-if="tabTitle === '會員學歷'">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ diagleMethod }}會員學歷</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section style="padding-top:0px;">
            <q-form class="row q-col-gutter-x-sm q-col-gutter-y-sm q-py-sm">
              <!-- 學歷 -->
              <q-select
                class="col-6 col-sm-6"
                outlined
                dense
                emit-value
                v-model="eduForm.level"
                :label="$q.screen.lt.sm ? '學歷 ' : void 0"
                :options="eduLevelOptions"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="cboBelongArea"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    學歷:
                  </label>
                </template>
              </q-select>
              <!-- 學校名稱 -->
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                v-model="eduForm.title"
                :label="$q.screen.lt.sm ? '學校名稱 ' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="memberName"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    學校名稱 :
                  </label>
                </template>
              </q-input>
              <!-- 大學會 -->
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                emit-value
                v-model="eduForm.team"
                :label="$q.screen.lt.sm ? '大學會' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="associationTitle"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    大學會:
                  </label>
                </template>
              </q-input>
              <!-- 科系 -->
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                emit-value
                v-model="eduForm.department"
                :label="$q.screen.lt.sm ? '科系' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="associationTitle"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    科系:
                  </label>
                </template>
              </q-input>
              <!-- 年級 -->
              <q-input
                class="col-6 col-sm-6"
                type="text"
                outlined
                dense
                emit-value
                v-model="eduForm.grade"
                :label="$q.screen.lt.sm ? '年級' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="associationTitle"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    年級:
                  </label>
                </template>
              </q-input>
              <!-- 入學日期 -->
              <q-input
                class="col-6 col-sm-6"
                mask="date"
                :rules="['date']"
                outlined
                dense
                v-model="eduForm.started_date"
                :label="$q.screen.lt.sm ? '入學日期' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="associationTitle"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    入學日期:
                  </label>
                </template>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="eduForm.started_date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="確認" color="primary" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- 預計畢業日期 -->
              <q-input
                class="col-6 col-sm-6"
                mask="date"
                :rules="['date']"
                outlined
                dense
                emit-value
                v-model="eduForm.ended_date"
                :label="$q.screen.lt.sm ? '預計畢業日期' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="associationTitle"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    預計畢業日期:
                  </label>
                </template>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="eduForm.ended_date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="確認" color="primary" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- 是否畢業 -->
              <q-select
                class="col-6 col-sm-6"
                outlined
                dense
                :options="isGraOptions"
                option-label="label"
                option-value="value"
                v-model="eduForm.is_graduated"
                :label="$q.screen.lt.sm ? '是否畢業' : void 0"
                @input="handleSelectChange"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    for="associationTitle"
                    class="font-s-size"
                    style="width:60px;"
                  >
                    是否畢業:
                  </label>
                </template>
              </q-select>
              <!-- 備註 -->
              <q-input
                class="col-12 col-sm-12"
                type="textarea"
                outlined
                dense
                rows="2"
                v-model="eduForm.note"
                :label="$q.screen.lt.sm ? '備註' : void 0"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label for="note" class="font-s-size" style="width:60px;">
                    備註:
                  </label>
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions horizontal align="center" style="padding-top:0px;">
            <q-btn
              color="white"
              text-color="black"
              label="取消"
              @click="handleCancle"
            />
            <q-btn color="primary" label="保存" @click="handleSave" />
          </q-card-actions>
        </template>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
const areaArr = [
  { areaId: 1, areaName: "建國組" },
  { areaId: 2, areaName: "忠孝組" },
  { areaId: 3, areaName: "仁愛組" },
  { areaId: 4, areaName: "信義組" },
];
const departmentArr = [
  { departmentId: 1, departmentName: "兒童部" },
  { departmentId: 2, departmentName: "壯年部" },
  { departmentId: 3, departmentName: "男子部" },
  { departmentId: 4, departmentName: "女子部" },
];
const jobTitleArr = [
  { jobId: 1, jobName: "組長" },
  { jobId: 2, jobName: "副組長" },
  { jobId: 3, jobName: "區長" },
  { jobId: 4, jobName: "區專員" },
];
const statusArr = [
  { statusId: 1, statusName: "活跳跳" },
  { statusId: 2, statusName: "歿/死亡" },
  { statusId: 3, statusName: "移民/出國工作" },
];
const rowOptions = [
  { label: "20筆/頁", value: 20 },
  { label: "50筆/頁", value: 50 },
  { label: "100筆/頁", value: 100 },
  { label: "150筆/頁", value: 150 },
  { label: "200筆/頁", value: 200 },
];
export default {
  // 組件參數 接收來自父組件的數據
  name: "memTable",

  props: {
    tableData: {
      //表單資料
      type: Array,
      required: true,
    },
    tableColumn: {
      //表單欄位
      type: Array,
      required: true,
    },
    showMultiSelect: {
      //是否顯示多選
      type: Boolean,
      required: true,
    },
    rowKey: {
      type: String,
      required: true,
    },
    tabTitle: {
      //展開 Table 名稱
      type: String,
      required: true,
    },
    operaShow: {
      //是否顯示操作 與檢視或唯獨有關
      type: Boolean,
      default: true,
    },
    separator: {
      // 直式呈現的方式
      type: String,
      default: "horizontal",
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  // 局部注冊的組件
  components: { ComPagination },
  data() {
    return {
      //
      rowOptions,
      page: {
        pageSize: 20,
        currentPage: 1,
        totalNum: 140,
      },
      //
      eduLevelOptions: ["博士", "碩士", "大學", "高中", "國中"],
      isGraOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      //
      selected: [],
      showCheckDialog: false, // 是否顯示彈窗
      diagleMethod: "",
      checkMemForm: {
        f_name: "",
        f_phone: "",
      },
      familyForm: {
        f_name: "",
        f_phone: "",
        f_isin: "否",
        f_mcode: "",
        area: "",
        f_nickedname: "",
        note: "",
      },
      checkedAns: false,
      // 會員學歷
      eduForm: {
        level: "", //學歷
        title: "", // 學校名稱
        team: "", //大學會
        department: "", //科系
        grade: "", //年級
        started_date: "", //入學日期
        ended_date: "", //預計畢業日期
        is_graduated: "", //是否畢業
        note: "", //備註
      },
    };
  },

  created() {},
  // 計算屬性
  computed: {
    // 御本尊計算
    idolCalTotal() {
      //計算御本尊
      let objval = {
        normal: 0,
        special: 0,
        guard: 0,
      };
      if (this.tableData.length > 0 && this.separator === "vertical") {
        this.tableData.forEach((item) => {
          let normal = item.normal != "" ? 1 : 0;
          let special = item.special != "" ? 1 : 0;
          let guard = item.guard != "" ? 1 : 0;
          objval.normal = objval.normal + normal;
          objval.special = objval.special + special;
          objval.guard = objval.guard + guard;
        });
      }
      return objval;
    },
  },
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    handleSelectChange(val) {
      console.log("select==>", val.value);
    },
    //
    openDialog(type) {
      if (type == "add") {
        this.diagleMethod = "新增";
        this.resetDetail();
        this.showCheckDialog = true;
      }
      if (type == "edit") {
        this.diagleMethod = "修改";
        this.showCheckDialog = true;
      }
    },
    // 確定是否為會員
    checkIsMember(mem) {
      // call api => 是與不是會員
      // getMemCheckApi().then......

      if (!mem) {
        // 新增

        this.setDetail((status = 0), mem); // 不是
      } else {
        // 修改
        this.openDialog("edit");
        this.setDetail((status = mem.f_isin), mem);
      }
    },
    // 之後會開api 去接
    setDetail(status, mem) {
      this.checkedAns = true;
      switch (this.tabTitle) {
        case "家族會員":
          if (mem) {
            this.checkMemForm.f_name = mem.f_name;
            this.checkMemForm.f_phone = mem.f_phone;
          }

          this.familyForm.f_name = mem ? mem.f_name : this.checkMemForm.f_name;
          this.familyForm.f_phone = mem
            ? mem.f_phone
            : this.checkMemForm.f_phone;
          this.familyForm.f_isin = status ? "是" : "否";
          this.familyForm.f_mcode = mem ? mem.f_mcode : "";
          this.familyForm.area = mem ? mem.area : "";
          this.familyForm.f_nickedname = mem ? mem.f_nickedname : "";

        case "會員學歷":
          this.eduForm.level = mem.level;
          this.eduForm.title = mem.title;
          this.eduForm.team = mem.team;
          this.eduForm.department = mem.department;
          this.eduForm.grade = mem.grade;
          this.eduForm.started_date = mem.started_date;
          this.eduForm.ended_date = mem.ended_date;
          this.eduForm.is_graduated = mem.is_graduated;
          this.eduForm.note = mem.note;
      }
    },
    resetDetail() {
      switch (this.tabTitle) {
        case "會員家族":
          this.checkMemForm.f_name = "";
          this.checkMemForm.f_phone = "";
          this.familyForm.f_name = "";
          this.familyForm.f_phone = "";
          this.familyForm.f_isin = "否";
          this.familyForm.f_mcode = "";
          this.familyForm.area = "";
          this.familyForm.f_nickedname = "";
          this.familyForm.note = "";

        case "會員學歷":
          this.eduForm.level = "";
          this.eduForm.title = "";
          this.eduForm.team = "";
          this.eduForm.department = "";
          this.eduForm.grade = "";
          this.eduForm.started_date = "";
          this.eduForm.ended_date = "";
          this.eduForm.is_graduated = "";
          this.eduForm.note = "";
      }
    },
    // 保存
    handleSave() {
      /** call Api */
      console.log("Call Api");
      this.resetDetail();
      this.showCheckDialog = false;
      this.checkedAns = false;
    },
    // 取消
    handleCancle() {
      this.resetDetail();
      this.showCheckDialog = false;
      // this.setDetail((status = 0));
      this.checkedAns = false;
    },
    // Pagination
    changeCurrentPage(e) {
      // 重新call api
      console.log("changeCurrentPage=>", e);
    },
  },
  filters: {
    transformById(val, colName) {
      switch (colName) {
        case "areaArr":
          let areaObj = areaArr.filter((obj) => obj.areaId === val)[0];
          return areaObj.areaName;
        case "departmentArr":
          let departmentObj = departmentArr.filter(
            (obj) => obj.departmentId === val
          )[0];
          return departmentObj.departmentName;
        case "jobTitleArr":
          let jobObj = jobTitleArr.filter((obj) => obj.jobId === val)[0];
          return jobObj.jobName;
        case "statusArr":
          let statusObj = statusArr.filter((obj) => obj.statusId === val)[0];
          return statusObj.statusName;
      }
    },
    noDataFormat(val) {
      return val ? val : "-";
    },
    endDateFormat(val) {
      return val ? val : "-";
    },
  },
};
</script>
<style lang="scss" scoped>
.this {
  border: 1px solid red;
}
label {
  color: #000;
  font-size: 14px;
}
.font-s-size {
  font-size: 55%;
}
</style>
