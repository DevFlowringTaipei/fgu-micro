<template>
  <div :class="$q.screen.lt.sm? 'q-pa-xs':'q-pa-md'" style="">
    <div
      class="row col-12 justify-center"
      style="flex-direction:column;align-items:center"
    >
      <span class="text-center" style="font-size:24px;font-weight:bold;"
        >佛光大學產學與育成中心 體驗遊程上架申請表</span
      >
    </div>
    <!-- 基本資料 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >一.活動流程</span
        >
      </div>
      <div class="col-12 col-md-3" :style="$q.screen.lt.sm ? 'order:1;' : ''">
        <base-image-input
          v-model="dataForm.tour_image"
          class=""
          ref="imageBox"
          style="margin:auto;"
          :style="$q.screen.lt.sm ? 'width:250px;height:200px;' : ''"
        ></base-image-input>
      </div>
      <div class="col-12 col-md-9 " :style="$q.screen.lt.sm ? 'order:2' : ''">
        <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
          <div class="col-6 col-md-4">
            <com-input
              v-model="dataForm.name"
              form-label="活動名稱"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              v-model="dataForm.location"
              form-label="活動地點"
            ></com-input>
          </div>
       
          <div class="col-6 col-md-4">
            <com-select-date
              :range="false"
              :required="false"
              v-model="dataForm.started_date"
              form-label="活動日期"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-select-date>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              v-model="dataForm.leader_num"
              form-label="帶領人需求人數"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              v-model="dataForm.people_num"
              form-label="活動人數"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              v-model="dataForm.min_num"
              form-label="最低開團人數"
            ></com-input>
          </div>
        </div>
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.desc"
          form-label="活動遊程介紹"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.notice"
          form-label="注意事項/安全守則"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.contact_person"
          form-label="聯絡人"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.contact_phone"
          form-label="聯絡人手機"
        ></com-input>
      </div>
      <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.contact_email"
          form-label="聯絡人Email"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.total_hour"
          form-label="活動時程(小時)"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.total_price"
          form-label="活動費用"
        ></com-input>
      </div>
    </div>
    <!-- 服務類型選單 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div v-if="!$q.screen.lt.sm" class="col-8">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
              <th class="`text-center`">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <q-select
                  dense
                  outlined
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  v-model="serviceItem.name"
                  :options="typeOptions"
                  behavior="menu"
                  emit-value
                  map-options
                  :style="!$q.screen.lt.sm ? 'width:200px;' : ''"
                  style="margin:0px auto;"
                >
                </q-select>
              </td>
              <td class="text-center" style="">
                <q-select
                  outlined
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  v-model="serviceItem.picked_time"
                  :options="asistancetimeOptions"
                  dense
                  behavior="menu"
                  emit-value
                  map-options
                  :style="!$q.screen.lt.sm ? 'width:200px;' : ''"
                  style="margin:0px auto;"
                >
                </q-select>
              </td>

              <td class="text-center">
                <q-btn
                  round
                  class="q-mr-xs"
                  size="xs"
                  color="secondary"
                  icon="add_circle"
                  @click="addRow(serviceItem, 'service')"
                />
              </td>
            </tr>
            <tr v-for="(item, index) in dataForm.service_list" :key="index">
              <!-- <td class="text-center">{{ item.id }}</td> -->
              <td class="text-center">{{ item.name | transServiceName }}</td>
              <td class="text-center">
                {{ item.picked_time | transPickedTimeName }}
              </td>

              <td class="text-center">
                <q-btn
                  round
                  size="xs"
                  color="secondary"
                  icon="remove_circle"
                  @click="delRow(index, 'service')"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <div v-if="$q.screen.lt.sm" class="col-12">
        <div class="q-mb-sm ">
          <com-select
            ref="comCheck"
            v-model="serviceItem.name"
            outlined
            behavior="menu"
            :options="typeOptions"
            dense
            emit-value
            map-options
            form-label="服務類型設定"
            :required-valid="false"
          ></com-select>
        </div>
        <div class="q-mb-sm ">
          <com-select
            ref="comCheck"
            v-model="serviceItem.picked_time"
            outlined
            behavior="menu"
            :options="asistancetimeOptions"
            dense
            emit-value
            map-options
            form-label="時間"
            :required-valid="false"
          ></com-select>
        </div>

        <div class="q-mb-sm ">
          <q-btn
            style="font-size:12px;width:100%;"
            class=""
            color="secondary"
            icon="add"
            @click="addRow(serviceItem, 'service')"
          ></q-btn>
        </div>
      </div>
      <div
        v-if="$q.screen.lt.sm && dataForm.service_list.length != 0"
        class="col-12"
      >
        <q-table
          grid
          :data="dataForm.service_list"
          :columns="tableColumns"
          row-key="name"
          hide-pagination
          hide-header
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-card-section>
                  <div
                    class=""
                    style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;"
                  >
                    <span class="" style="font-size:16px;"
                      >移除<span style="font-weight:bold">{{
                        props.row.school
                      }}</span
                      >該項目</span
                    >
                    <q-btn
                      size="sm"
                      color="secondary"
                      icon="remove"
                      @click="delRow(props.rowindex, 'service')"
                    />
                  </div>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label v-if="col.name == 'name'" caption>{{
                        col.value | transServiceName
                      }}</q-item-label>
                      <q-item-label v-else caption>{{
                        col.value | transPickedTimeName
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <!-- 審核 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm q-mt-sm">
      <div
        class="col-12 q-mb-sm"
        style="border-bottom:1px solid rgba(0,0,0,0.21)"
      >
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >審核作業</span
        >
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="dataForm.approval_suggestion"
          form-label="簽核意見"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-select
          ref="comCheck"
          v-model="dataForm.approval_ststus"
          outlined
          behavior="menu"
          :options="approvalOptions"
          dense
          emit-value
          map-options
          form-label="下個流程"
          :required-valid="false"
        ></com-select>
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableApprovalColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableApprovalData" :key="item.id">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.type }}</td>
              <td class="text-center">
                <div class="" style="display:flex;flex-direction:column;">
                  <span
                    class=""
                    v-for="(item, index) in item.applicant_info.split(',')"
                    :key="item"
                    >{{ item }}</span
                  >
                </div>
              </td>
              <td class="text-center">{{ item.applied_date }}</td>
              <td class="text-center">{{ item.approval_result }}</td>
              <td class="text-center">{{ item.approval_suggestion }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
    <!--  -->
    <div
      class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md "
      :class="$q.screen.lt.sm?'justify-center':'justify-end'"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          type="reset"
          size="sm"
          color="white"
          text-color="black"
          label="取消"
          v-close-popup
        />
        <q-btn
          type="submit"
          size="sm"
          color="white"
          text-color="black"
          label="套用"
          @click="usedTemplate()"
        />
        <q-btn
          type="submit"
          size="sm"
          color="white"
          text-color="black"
          label="保存"
          @click="onSave()"
        />
        <q-btn
          type="submit"
          size="sm"
          color="primary"
          label="送審"
          @click="onSubmit()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BaseImageInput from "@/components/Common/BaseImageInput";
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import { asistancetimeOptions } from "@/utils/common/dropdown-list.js";
const approvalOptions = [
  { label: "流程一", value: 1 },
  { label: "流程二", value: 2 },
  { label: "流程三", value: 3 },
  { label: "流程四", value: 4 },
];
const typeOptions = [
  { label: "服務類型1", value: 1 },
  { label: "服務類型2", value: 2 },
  { label: "服務類型3", value: 3 },
  { label: "服務類型4", value: 4 },
];
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { ComInput, ComSelect, BaseImageInput, ComSelectDate },
  data() {
    return {
      typeOptions,
      asistancetimeOptions,
      approvalOptions,
      dataForm: {
        tour_image: "", // 活動圖片
        name: "", // 活動名稱
        location: "", // 活動地點
        started_date: "", // 活動日期
        leader_num: "", // 帶領人需求數
        people_num: "", // 活動人數
        min_num: "", // 開團最低人數
        desc: "", // 遊程介紹
        notice: "", // 注意事項
        contact_person: "", // 聯絡人
        contact_phone: "", // 聯絡人手機
        contact_email: "", // 聯絡人email
        total_hour: "", //
        total_price: "", //
        service_list: [
          // 服務類型設定
          // {name:1,picked_time:3}  //example
        ],
        approval_suggestion: "", // 簽核意見
        approval_ststus: "", // 下個簽核流程
      },
      // 服務類型表格
      tableColumns: [
        {
          name: "name",
          label: "服務類型設定",
          field: "name",
          align: "center",
        },
        {
          name: "picked_time",
          label: "時間",
          field: "picked_time",
          align: "center",
        },
      ],
      serviceItem: {
        name: "", // 服務類型名(以id 表示)
        picked_time: "", // 時間段(以id 表示)
      },

      tableApprovalColumns: [
        // 審核流程表格 =>要對應db
        {
          name: "id",
          label: "序號",
          field: "id",
          align: "center",
        },
        {
          name: "type",
          label: "種類",
          field: "type",
          align: "center",
        },
        {
          name: "applicant_info", // 申請人資訊
          label: "姓名/職務/部門",
          field: "name",
          align: "center",
        },
        {
          name: "applied_date", // 對應 db 申請時間
          label: "處理時間",
          field: "applied_date",
          align: "center",
        },
        {
          name: "approval_result",
          label: "審核結果",
          field: "approval_result",
          align: "center",
        },
        {
          name: "approval_suggestion",
          label: "審核意見",
          field: "approval_suggestion",
          align: "center",
        },
      ],
      tableApprovalData: [
        {
          id: "1",
          type: "遊程上架申請",
          applicant_info: "白晶晶,財政局支付科_承辦人,財政局支付科",
          applied_date: "2019-12-25",
          approval_result: "退回",
          approval_suggestion: "資訊不完全",
        },
        {
          id: "2",
          type: "遊程上架申請",
          applicant_info: "林泰山,財政局秘書室_承辦人,財政局秘書室",
          applied_date: "2021-02-25",
          approval_result: "通過",
          approval_suggestion: "",
        },
      ],
    };
  },
  filters: {
    transServiceName(val) {
      return typeOptions.find((item) => item.value == val).label;
    },
    transPickedTimeName(val) {
      return asistancetimeOptions.find((item) => item.value == val).label;
    },
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    reset(type) {
      switch (type) {
        case "service":
          this.serviceItem = {
            name: "", // 服務類型名
            picked_time: "", // 時間段
          };
          break;
        case "all":
          this.dataForm = {
            tour_image: "", // 活動圖片
            name: "", // 活動名稱
            location: "", // 活動地點
            started_date: "", // 活動日期
            leader_num: "", // 帶領人需求數
            people_num: "", // 活動人數
            min_num: "", // 開團最低人數
            desc: "", // 遊程介紹
            notice: "", // 注意事項
            contact_person: "", // 聯絡人
            contact_phone: "", // 聯絡人手機
            contact_email: "", // 聯絡人email
            total_hour: "", //
            total_price: "", //
            service_list: [
              // 服務類型設定
              // { service_id: "", asistancetime_id: "" },
            ],
            approval_suggestion: "", // 簽核意見
            approval_ststus: "", // 下個簽核流程
          };
          break;
      }
    },
    addRow(item, type) {
      if (type === "service") {
        if (this.serviceItem.name == "" || this.serviceItem.picked_time == "") {
          // 驗證
          return this.$q.notify({
            message: `服務類型資訊未填寫完整!`,
            timeout: 1500,
            type: "warning",
            position: "top-right",
          });
        }
        this.dataForm.service_list.push(item);
        this.reset((type = "service"));
      }
    },
    delRow(idx, type) {
      if (type === "service") {
        this.dataForm.service_list.splice(idx, 1);
      }
    },
    onSubmit() {
      // 送審
    },
    onSave() {
      //保存
    },
    usedTemplate() {
      //套用
    },
  },
};
</script>
<style lang="scss" scoped></style>
