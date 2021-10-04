<template>
  <div class="" style="">
    <q-tabs
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
    >
      <q-tab name="search" label="找尋人才" />
      <q-tab name="add" label="建立人才" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <!-- 搜尋表 -->
      <q-tab-panel name="search" class="">
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm q-mb-sm" style="">
          <!-- input -->
          <div :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-md-4'">
            <q-input outlined v-model="searchForm.keyword" dense />
          </div>
          <!-- 下拉 -->
          <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
            <q-select
              outlined
              :option-label="(item) => (item === '' ? '請選擇' : item.label)"
              v-model="searchForm.type"
              :options="typeOptions"
              dense
              emit-value
              map-options
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
        <div v-if="data.totalNum" class="row search-box">
          <div class="col-12 q-mb-sm">
            <span>您共找到{{ data.totalNum }}筆人才</span>
          </div>
          <q-item
            class="rounded-borders col- col-sm-4 col-md-4  q-mb-sm"
            style="border:1px solid rgba(0, 0, 0, 0.12);padding-right:8px;"
            v-for="(item, index) in data.cardData1"
            :key="index"
          >
            <q-item-section avatar top>
              <q-avatar size="100px" class="image-avatar">
                <img :src="item.img" />
              </q-avatar>
            </q-item-section>

            <q-item-section top>
              <q-item-label
                lines="1"
                style="display:flex;justify-content:space-between;"
              >
                <span class="" style="margin:auto 4px;">{{ item.name }}</span>
                <div class="">
                  <q-btn size="12px" flat dense round icon="more_vert" />
                  <q-btn size="12px" flat dense round icon="delete" />
                </div>
              </q-item-label>
              <q-item-label caption lines="4" class="">
                {{ item.desc }}
              </q-item-label>
              <q-item-label caption lines="4" class="">
                @rstoenescu in #1: > The build system @rstoenescu in #1: > The
                build system @rstoenescu in #1: > The build system @rstoenescu
                in #1: > The build system
              </q-item-label>
            </q-item-section>
          </q-item>
          <!-- Pagination -->
          <div class="row col-12 q-mt-xs">
            <div
              class="col-12 col-md-6"
              style="display:flex;min-height:40px;align-items:center;padding-right:20px;"
              :style="
                $q.screen.lt.sm
                  ? 'justify-content:center;'
                  : 'justify-content:flex-end;'
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
                behavior="menu"
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
              class="col-12 col-md-6 "
              style="align-items:center;margin-right:0px;"
              :style="$q.screen.lt.sm ? 'justify-content:center;' : ''"
              v-model="page.currentPage"
              :page-size="page.pageSize"
              :total-num="page.totalNum"
              @input="changeCurrentPage"
            ></com-pagination>
          </div>
        </div>
      </q-tab-panel>
      <!-- 建立人才 -->
      <q-tab-panel name="add">
        <div
          class="row col-12 justify-center"
          style="flex-direction:column;align-items:center"
        >
          <span class="text-center" style="font-size:24px;font-weight:bold;"
            >佛光大學產學與育成中心 輔導顧問個人基本資料表</span
          >
        </div>
        <!-- 基本資料 -->
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
          <div class="col-12 q-mb-sm">
            <span class="text-center" style="font-size:16px;font-weight:bold;"
              >一.基本資料</span
            >
          </div>
          <div
            class="col-12 col-md-9 "
            :style="$q.screen.lt.sm ? 'order:2' : ''"
          >
            <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
              <div class="col-6 col-md-3">
                <com-input v-model="addForm.name" form-label="姓名"></com-input>
              </div>
              <div class="col-6 col-md-3">
                <com-select
                  ref="comCheck"
                  v-model="addForm.gender"
                  outlined
                  :options="genderOptions"
                  dense
                  emit-value
                  map-options
                  form-label="性別"
                  :required-valid="false"
                ></com-select>
              </div>
              <div class="col-6 col-md-3">
                <com-select-date
                  :range="false"
                  :required="false"
                  v-model="addForm.birthday"
                  form-label="生日"
                  :style="$q.screen.lt.sm ? 'width:100%;' : ''"
                ></com-select-date>
              </div>
              <div class="col-6 col-md-3">
                <com-input
                  v-model="addForm.country"
                  form-label="國籍"
                  :style="$q.screen.lt.sm ? 'width:100%;' : ''"
                ></com-input>
              </div>
              <div class="col-6 col-md-3">
                <com-input
                  v-model="addForm.phone"
                  form-label="行動電話"
                ></com-input>
              </div>
              <div class="col-6 col-md-6">
                <com-input
                  v-model="addForm.email"
                  form-label="Email"
                ></com-input>
              </div>
              <div class="col-6 col-md-3">
                <com-input
                  v-model="addForm.identity_number"
                  form-label="身分證號碼"
                ></com-input>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-3"
            :style="$q.screen.lt.sm ? 'order:1;' : ''"
          >
            <base-image-input
              class=""
              ref="imageBox"
              style="margin:auto;"
              :style="$q.screen.lt.sm ? 'width:250px;height:200px;' : ''"
              >></base-image-input
            >
          </div>
        </div>
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
          <div class="col-6 col-md-6">
            <com-input
              v-model="addForm.address"
              form-label="住宅地址"
            ></com-input>
          </div>
          <div class="col-6 col-md-6">
            <com-input
              v-model="addForm.company_address"
              form-label="服務機關地址"
            ></com-input>
          </div>
        </div>
        <!-- 學歷 -->
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
          <div class="col-12 q-mb-sm">
            <span class="text-center" style="font-size:16px;font-weight:bold;"
              >二.主要學歷</span
            >
            <!-- {{ addForm.education_list }} -->
          </div>
          <div v-if="!$q.screen.lt.sm" class="col-12">
            <q-markup-table>
              <thead>
                <tr>
                  <th
                    class="`text-${col.align}`"
                    v-for="(col, index) in tableEduColumns"
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
                    <q-input
                      v-model="eduItem.school"
                      type="text"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="eduItem.school_country"
                      type="text"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="eduItem.major_in"
                      type="text"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-select
                      v-model="eduItem.degree"
                      behavior="menu"
                      outlined
                      dense
                      emit-value
                      map-options
                      :options="educationOptions"
                      option-label="label"
                      option-value="value"
                      size="xs"
                      style="min-width:100px;"
                    >
                    </q-select>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="eduItem.started_date"
                      type="date"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="eduItem.ended_date"
                      type="date"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-btn
                      round
                      class="q-mr-xs"
                      size="xs"
                      color="secondary"
                      icon="add_circle"
                      @click="addRow(eduItem, 'edu')"
                    />
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in addForm.education_list"
                  :key="index"
                >
                  <td class="text-center">{{ item.school }}</td>
                  <td class="text-center">{{ item.school_country }}</td>
                  <td class="text-center">{{ item.major_in }}</td>
                  <td class="text-center">{{ item.degree }}</td>
                  <td class="text-center">{{ item.started_date }}</td>
                  <td class="text-center">{{ item.ended_date }}</td>

                  <td class="text-center">
                    <q-btn
                      round
                      size="xs"
                      color="secondary"
                      icon="remove_circle"
                      @click="delRow(index, 'edu')"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>

          <div v-if="$q.screen.lt.sm" class="col-12">
            <div class="q-mb-sm ">
              <com-input
                v-model="eduItem.school"
                form-label="學校名稱"
              ></com-input>
            </div>
            <div class="q-mb-sm ">
              <com-input
                v-model="eduItem.school_country"
                form-label="國別"
              ></com-input>
            </div>
            <div class="q-mb-sm ">
              <com-input
                v-model="eduItem.major_in"
                form-label="主修"
              ></com-input>
            </div>
            <div class="q-mb-sm">
              <com-select
                ref="comCheck"
                v-model="eduItem.degree"
                behavior="menu"
                outlined
                :options="educationOptions"
                dense
                emit-value
                map-options
                form-label="學位"
                :required-valid="true"
              ></com-select>
            </div>
            <div class="q-mb-sm " style="display:flex;flex-direction:row;">
              <com-input
                v-model="eduItem.started_date"
                form-label="開始日期"
                type="date"
                stack-label
                style="width:50%;"
              ></com-input>
              <com-input
                v-model="eduItem.ended_date"
                form-label="畢業日期"
                type="date"
                stack-label
                style="width:50%;"
              ></com-input>
            </div>
            <div class="q-mb-sm ">
              <q-btn
                style="font-size:12px;width:100%;"
                class=""
                color="secondary"
                icon="add"
                @click="addRow(eduItem, 'edu')"
              ></q-btn>
            </div>
          </div>
          <div
            v-if="$q.screen.lt.sm && addForm.education_list.length != 0"
            class="col-12"
          >
            <q-table
              grid
              :data="addForm.education_list"
              :columns="tableEduColumns"
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
                          @click="delRow(props.rowindex, 'edu')"
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
                          <q-item-label caption>{{ col.value }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>
          </div>
        </div>
        <!-- 現職 -->
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
          <div class="col-12 q-mb-sm">
            <span class="text-center" style="font-size:16px;font-weight:bold;"
              >三.現職相關經歷</span
            >
          </div>
          <div v-if="!$q.screen.lt.sm" class="col-12">
            <q-markup-table>
              <thead>
                <tr>
                  <th
                    class="`text-${col.align}`"
                    v-for="(col, index) in tableExpColumns"
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
                    <q-input
                      v-model="experienceItem.company"
                      type="text"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="experienceItem.department"
                      type="text"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="experienceItem.position"
                      type="text"
                      outlined
                      dense
                    ></q-input>
                  </td>

                  <td class="text-center">
                    <q-input
                      v-model="experienceItem.started_date"
                      type="date"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-input
                      v-model="experienceItem.ended_date"
                      type="date"
                      outlined
                      dense
                    ></q-input>
                  </td>
                  <td class="text-center">
                    <q-btn
                      round
                      class="q-mr-xs"
                      size="xs"
                      color="secondary"
                      icon="add_circle"
                      @click="addRow(experienceItem, 'experience')"
                    />
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in addForm.experience_list"
                  :key="index"
                >
                  <td class="text-center">{{ item.company }}</td>
                  <td class="text-center">{{ item.department }}</td>
                  <td class="text-center">{{ item.position }}</td>
                  <td class="text-center">{{ item.started_date }}</td>
                  <td class="text-center">{{ item.ended_date }}</td>

                  <td class="text-center">
                    <q-btn
                      round
                      size="xs"
                      color="secondary"
                      icon="remove_circle"
                      @click="delRow(index, 'experience')"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>

          <div v-if="$q.screen.lt.sm" class="col-12">
            <div class="q-mb-sm ">
              <com-input
                v-model="experienceItem.company"
                form-label="公司名稱"
              ></com-input>
            </div>
            <div class="q-mb-sm ">
              <com-input
                v-model="experienceItem.department"
                form-label="服務部別"
              ></com-input>
            </div>
            <div class="q-mb-sm ">
              <com-input
                v-model="experienceItem.position"
                form-label="職稱"
              ></com-input>
            </div>

            <div class="q-mb-sm " style="display:flex;flex-direction:row;">
              <com-input
                v-model="experienceItem.started_date"
                form-label="開始日期"
                type="date"
                stack-label
                style="width:50%;"
              ></com-input>
              <com-input
                v-model="experienceItem.ended_date"
                form-label="結束日期"
                type="date"
                stack-label
                style="width:50%;"
              ></com-input>
            </div>
            <div class="q-mb-sm ">
              <q-btn
                style="font-size:12px;width:100%;"
                class=""
                color="secondary"
                icon="add"
                @click="addRow(experienceItem, 'experience')"
              ></q-btn>
            </div>
          </div>
          <div
            v-if="$q.screen.lt.sm && addForm.experience_list.length != 0"
            class="col-12"
          >
            <q-table
              grid
              :data="addForm.experience_list"
              :columns="tableExpColumns"
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
                          @click="delRow(props.rowindex, 'experience')"
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
                          <q-item-label caption>{{ col.value }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>
          </div>
        </div>
        <!-- 輔導專長項目 -->
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
          <div class="col-12 q-mb-sm">
            <span class="text-center" style="font-size:16px;font-weight:bold;"
              >四.輔導專長項目</span
            >
          </div>
          <div class="col-12">
            <q-option-group
              style="margin-left:-12px;"
              v-model="addForm.specialty"
              :options="specialOptions"
              inline
              type="checkbox"
              class=""
            />
          </div>
        </div>
        <!-- 能協助輔導的時間 -->
        <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
          <div class="col-12 q-mb-sm">
            <span class="text-center" style="font-size:16px;font-weight:bold;"
              >五.能協助輔導的時間</span
            >
          </div>
          <div class="col-12 q-mb-sm">
            <q-option-group
              style="margin-left:-12px;"
              v-model="addForm.assistance_time"
              :options="asistancetimeOptions"
              inline
              type="checkbox"
              class=""
            />
          </div>
        </div>
        <!-- 送出鍵 -->
        <div
          class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md justify-end"
        >
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              type="reset"
              size="sm"
              color="white"
              text-color="black"
              label="取消"
            />
            <q-btn
              type="submit"
              size="sm"
              color="primary"
              label="保存"
              @click="onSubmit"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import BaseImageInput from "@/components/Common/BaseImageInput";
import ComPagination from "@/components/Common/form/ComPagination";
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import {
  genderOptions,
  rowOptions,
  specialOptions,
  asistancetimeOptions,
  educationOptions,
} from "@/utils/common/dropdown-list.js";
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
  components: {
    ComPagination,
    ComSelect,
    ComInput,
    BaseImageInput,
    ComSelectDate,
  },
  data() {
    return {
      genderOptions,
      specialOptions,
      educationOptions,
      asistancetimeOptions,
      typeOptions,
      rowOptions,
      tab: "search",
      searchForm: {
        keyword: "",
        type: "",
      },
      page: {
        pageSize: 20,
        currentPage: 1,
        totalNum: 0,
      },
      data: {
        type: null,
        totalNum: null, //總筆數
        cardData1: [
          {
            img: "https://cdn.quasar.dev/img/avatar1.jpg",
            name: "老師1",
            desc:
              "這是老師1的描述，內容依照老師自述內容呈現，太多字會出現...，帶表以下省略。",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
          {
            img: "https://cdn.quasar.dev/img/avatar2.jpg",
            name: "老師2",
            desc:
              "這是老師2的描述，內容依照老師自述內容呈現，太多字會出現...，帶表以下省略。",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
          {
            img: "https://cdn.quasar.dev/img/avatar3.jpg",
            name: "老師3",
            desc:
              "這是老師3的描述，內容依照老師自述內容呈現，太多字會出現...，帶表以下省略。",
            services: [
              "服務類型1",
              "服務類型2",
              "服務類型3",
              "服務類型5",
              "服務類型6",
            ],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
          {
            img: "https://cdn.quasar.dev/img/avatar4.jpg",
            name: "老師4",
            desc:
              "這是老師4的描述，內容依照老師自述內容呈現，太多字會出現...，帶表以下省略。",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
          {
            img: "https://cdn.quasar.dev/img/avatar5.jpg",
            name: "老師5",
            desc:
              "這是老師5的描述，內容依照老師自述內容呈現，太多字會出現...，帶表以下省略。",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
          {
            img: "https://cdn.quasar.dev/img/avatar6.jpg",
            name: "老師6",
            desc:
              "這是老師6的描述，內容依照老師自述內容呈現，太多字會出現...，帶表以下省略。",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
        ],
      },
      addForm: {
        name: "", // 姓名
        gender: "", // 性別
        birthday: "", // 生日
        country: "", // 國籍
        avatar: "", // 照片
        phone: "", // 行動電話
        email: "", // Email
        identity_number: "", // 身分證碼
        address: "", // 住宅地址
        company_address: "", // 服務機關地址
        education_list: [
          // 主要學歷
        ],

        experience_list: [
          // 現職相關經歷
        ],
        specialty: [], // 輔導專長項目

        assistance_time: [],
      },
      tableEduColumns: [
        {
          name: "school",
          label: "學校名稱",
          field: "school",
          align: "center",
        },
        {
          name: "school_country",
          label: "國別",
          field: "school_country",
          align: "center",
        },
        {
          name: "major_in",
          label: "主修",
          field: "major_in",
          align: "center",
        },

        {
          name: "degree",
          label: "學位",
          field: "degree",
          align: "center",
        },
        {
          name: "started_date",
          label: "入學日期",
          field: "started_date",
          align: "center",
        },
        {
          name: "ended_date",
          label: "畢業日期",
          field: "ended_date",
          align: "center",
        },
      ],
      eduItem: {
        school: "", //畢業學校
        school_country: "", // 學校國別
        major_in: "", // 主修
        degree: "", // 學位
        started_date: "", // 開始日期
        ended_date: "", // 畢業日期
      },
      tableExpColumns: [
        {
          name: "company",
          label: "公司名稱",
          field: "company",
          align: "center",
        },
        {
          name: "department",
          label: "服務部別", 
          field: "department",
          align: "center",
        },
        {
          name: "position",
          label: "職稱",
          field: "position",
          align: "center",
        },

        {
          name: "started_date",
          label: "入學日期",
          field: "started_date",
          align: "center",
        },
        {
          name: "ended_date",
          label: "結束日期",
          field: "ended_date",
          align: "center",
        },
      ],
      experienceItem: {
        company: "", // 公司名
        department: "", // 服務部別
        position: "", // 職稱
        started_date: "", // 開始日期
        ended_date: "", // 結束日期
      },
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    onSubmit() {
      this.showLoading();
    },
    showLoading() {
      this.$q.loading.show();
      setTimeout(() => {
        this.data.type = this.searchForm.type;
        this.data.totalNum = Math.ceil(
          Math.random() * 200 + Math.random() * 10
        );
        this.page.totalNum = this.data.totalNum;
        this.$q.loading.hide();
      }, 3000);
    },
    changeCurrentPage(e) {
      // 重新call api
      console.log("changeCurrentPage=>", e);
    },
    reset(type) {
      switch (type) {
        case "edu":
          this.eduItem = {
            school: "", //畢業學校
            school_country: "", // 學校國別
            major_in: "", // 主修
            degree: "", // 學位
            started_date: "", // 開始日期
            ended_date: "", // 畢業日期
          };
          break;
        case "experience":
          this.experienceItem = {
            company: "", // 公司名
            department: "", // 服務部別
            position: "", // 職稱
            started_date: "", // 開始日期
            ended_date: "", // 畢業日期
          };
          break;
      }
    },

    addRow(item, type) {
      if (type === "edu") {
        this.addForm.education_list.push(item);
      this.reset((type = "edu"));

      } else if (type === "experience") {
        this.addForm.experience_list.push(item);
      this.reset((type = "experience"));

      }

    },
    delRow(idx, type) {
      if (type === "edu") {
        this.addForm.education_list.splice(idx, 1);
      } else if (type === "experience") {
        this.addForm.experience_list.splice(idx, 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.image-avatar {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 8px;
}
// .info-content {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// }
</style>
