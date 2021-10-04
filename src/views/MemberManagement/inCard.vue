<template>
  <div class="q-pa-md" style="">
    <div
      class="row col-12 justify-center"
      style="flex-direction:column;align-items:center"
    >
      <span class="text-center" style="font-size:24px;font-weight:bold;"
        >入信卡申請</span
      >
      <q-option-group
        style=""
        v-model="inCardForm.checks"
        :options="checkOptions"
        inline
        size="sm"
        type="checkbox"
        class=""
      />
    </div>
    <!-- 基本資料 -->
    <!-- :rules="[val => !!val || '此欄位為必填項']" => 此法會造成輸入框下面預留空格。 -->

    <q-form @reset="onReset">
      <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
        <div class="col-12 col-md-8 " :style="$q.screen.lt.sm ? 'order:2' : ''">
          <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-6 col-md-6">
              <q-input
                v-model="inCardForm.name"
                type="text"
                outlined
                dense
                :label="$q.screen.lt.sm ? testLabelLength : void 0"
                ref="isRequiredname"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
              >
                <template v-slot:before v-if="!$q.screen.lt.sm">
                  <label
                    style="text-align:right;"
                    :style="
                      !needLabelMorewidth(testLabelLength)
                        ? 'width:80px;'
                        : 'width:100px;'
                    "
                  >
                    <span class="required">＊</span>{{ testLabelLength }}:
                  </label>
                </template>
              </q-input>
            </div>
            <div class="col-6 col-md-6">
              <q-input
                type="text"
                outlined
                dense
                v-model="inCardForm.mCode"
                :label="$q.screen.lt.sm ? '會員編號' : void 0"
                ref="isRequiredmCode"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
              >
                <template v-slot:before v-if="$q.screen.gt.xs">
                  <label
                    :style="
                      !$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''
                    "
                  >
                    <span class="required">＊</span>會員編號:
                  </label>
                </template>
              </q-input>
            </div>
            <div class="col-6 col-md-6">
              <com-select-date
                :range="false"
                form-label="出生日期"
                v-model="inCardForm.birthDate"
                :required="true"
                ref="isRequiredbirthDate"
                hide-bottom-space
                :rules="[(val) => !!val || '此欄位為必填項']"
              ></com-select-date>
            </div>
            <div class="col-6 col-md-6">
              <com-select-date
                :range="false"
                form-label="入信日期"
                v-model="inCardForm.incardDate"
                :required="true"
                ref="isRequiredincardDate"
                :auto-today="true"
                hide-bottom-space
                :rules="[(val) => !!val || '此欄位為必填項']"
              ></com-select-date>
            </div>

            <!--  -->
            <div
              class="col-12 col-sm-6 "
              style="display:flex;min-height:40px;padding:8px 0px 0px 8px;"
              :style="
                $q.screen.lt.sm ? 'flex-direction:row;' : 'flex-direction:row;'
              "
            >
              <span
                class="font-s-size "
                style="margin-right:2px;font-size: 13.2px;width:100px;padding-top:10px;text-align:right;"
                >信心背景:
              </span>
              <div
                class=""
                style="display:flex;flex:1;"
                :style="$q.screen.lt.sm ? '' : 'flex-direction:row;'"
              >
                <q-option-group
                  style="margin-left:-12px;"
                  v-model="inCardForm.confidence"
                  :options="confidenceOptions"
                  inline
                  type="radio"
                  class=""
                />
              </div>
            </div>

            <div
              class="col-12 col-sm-6 "
              style="display:flex;min-height:40px;padding:8px 0px 0px 8px;"
              :style="
                $q.screen.lt.sm ? 'flex-direction:row;' : 'flex-direction:row;'
              "
            >
              <span
                class="font-s-size "
                style="margin-right:2px;font-size: 13.2px;width:100px;padding-top:10px;text-align:right;"
              >
                御本尊:
              </span>
              <div
                class=""
                style="display:flex;flex:1;"
                :style="$q.screen.lt.sm ? '' : 'flex-direction:row;'"
              >
                <q-option-group
                  style="margin-left:-12px;"
                  v-model="inCardForm.special"
                  :options="specialOptions"
                  inline
                  type="checkbox"
                  class=""
                />
              </div>
            </div>
          </div>
          <!--  -->
          <div
            style="display:flex;min-height:40px;padding:8px 0px 0px 8px;"
            :style="
              $q.screen.lt.sm ? 'flex-direction:column;' : 'flex-direction:row;'
            "
          >
            <span
              class="font-s-size "
              style="margin-right:2px;font-size: 13.2px;width:100px;padding-top:8px;text-align:right;"
            >
              <span class="required">＊</span>活動區:
            </span>
            <div
              class=""
              style="display:flex;flex:1;"
              :style="
                $q.screen.lt.sm
                  ? 'flex-direction:column;'
                  : 'flex-direction:row;'
              "
            >
              <q-select
                v-model="inCardForm.area_v1"
                outlined
                :options="first"
                dense
                @input="changeFirst"
                ref="isRequiredarea_v1"
                style="flex:1;margin-right:4px;"
                :style="
                  $q.screen.lt.sm ? 'margin-top:6px;margin-right:0px;' : ''
                "
                hide-bottom-space
                :rules="[(val) => !!val || '此欄位為必選項']"
              >
              </q-select>
              <q-select
                v-model="inCardForm.area_v2"
                outlined
                :options="dropdownSecond"
                dense
                @input="changeSecond"
                ref="isRequiredarea_v2"
                style="flex:1;margin-right:4px;"
                :style="
                  $q.screen.lt.sm ? 'margin-top:6px;margin-right:0px;' : ''
                "
                hide-bottom-space
                :rules="[(val) => !!val || '此欄位為必選項']"
              >
              </q-select>
              <q-select
                v-model="inCardForm.area_v3"
                outlined
                :options="dropdownThird"
                dense
                @input="changeThird"
                ref="isRequiredarea_v3"
                style="flex:1;"
                :style="$q.screen.lt.sm ? 'margin-top:6px;' : ''"
                hide-bottom-space
                :rules="[(val) => !!val || '此欄位為必選項']"
              >
              </q-select>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:1;' : ''">
          <base-image-input
            v-model="inCardForm.avatar"
            class=""
            ref="imageBox"
            style="margin:auto;"
            :style="$q.screen.lt.sm ? 'width:250px;height:200px;' : ''"
            >></base-image-input
          >
        </div>
      </div>
      <!-- 手機地址 -->
      <div class="row q-mb-sm q-col-gutter-x-sm q-col-gutter-y-sm">
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.homePhone"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '住家電話' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                住家電話:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.mobilePhone"
            type="text"
            outlined
            ref="isRequiredmobilePhone"
            dense
            :label="$q.screen.lt.sm ? '行動電話' : void 0"
            hide-bottom-space
            :rules="[(val) => !!val || '此欄位為必填項']"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                <span class="required">＊</span>行動電話:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.companyPhone"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '公司電話' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                公司電話:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.email"
            type="text"
            outlined
            dense
            ref="isRequiredemail"
            :label="$q.screen.lt.sm ? 'E-Mail' : void 0"
            hide-bottom-space
            :rules="[(val) => !!val || '此欄位為必填項']"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                <span class="required">＊</span>E-Mail:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            ref="addressInput"
            v-model="inCardForm.address"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '通訊地址' : void 0"
            hide-bottom-space
            :rules="[(val) => !!val || '此欄位為必填項']"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                <span class="required">＊</span>通訊地址:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-select
            v-model="inCardForm.addressBlock"
            outlined
            :options="addressBlockOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            :label="$q.screen.lt.sm ? '居住地所屬區' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                居住地所屬區:
              </label>
            </template>
          </q-select>
        </div>
      </div>
      <!-- 介紹人 -->
      <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.introducer"
            type="text"
            outlined
            dense
            ref="isRequiredintroducer"
            :label="$q.screen.lt.sm ? '介紹人' : void 0"
            hide-bottom-space
            :rules="[(val) => !!val || '此欄位為必填項']"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                <span class="required">＊</span>介紹人:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.introducerPhone"
            type="text"
            outlined
            dense
            ref="isRequiredintroducerPhone"
            :label="$q.screen.lt.sm ? '介紹人電話' : void 0"
            hide-bottom-space
            :rules="[(val) => !!val || '此欄位為必填項']"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                <span class="required">＊</span>介紹人電話:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-2">
          <q-btn
            class="bg-primary"
            style="width:100%;margin:0px auto;"
            label="檢視會員"
          ></q-btn>
        </div>
        <div class="col-6 col-md-2">
          <q-input
            v-model="inCardForm.introducerDepart"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '部別' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                <span class="required">＊</span>部別:
              </label>
            </template>
          </q-input>
        </div>
        <!-- <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.introducerJob"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '所屬地區/職務' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                所屬地區/職務:
              </label>
            </template>
          </q-input>
        </div> -->
      </div>
      <!-- 以下學生部分 -->
      <!--  -->
      <div
        class="row col-12 col-sm-6 "
        style="display:flex;min-height:40px;padding:8px 0px 0px 8px;"
        :style="$q.screen.lt.sm ? 'flex-direction:row;' : 'flex-direction:row;'"
      >
        <span
          class="font-s-size "
          style="margin-right:2px;font-size: 13.2px;width:100px;padding-top:8px;text-align:right;"
        >
          身分:
        </span>
        <div
          class=""
          style="display:flex;flex:1;"
          :style="$q.screen.lt.sm ? '' : 'flex-direction:row;'"
        >
          <q-option-group
            style="margin-left:-12px;"
            v-model="inCardForm.identity"
            :options="identityOptions"
            inline
            type="radio"
            class=""
          />
        </div>
      </div>
      <div
        class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mb-md"
        v-if="inCardForm.identity === 2"
      >
        <div class="col-6 col-md-8">
          <q-input
            v-model="inCardForm.addressOri"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '戶籍地址' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                戶籍地址:
              </label>
            </template>
          </q-input>
        </div>
        <!-- <q-checkbox v-model="val" /> -->
        <div class="col-2 col-md-1">
          <q-checkbox v-model="isSame" label="同上" @input="getSameAddress" />
        </div>
        <div class="col-4 col-md-3">
          <q-select
            v-model="inCardForm.addressOriBlock"
            outlined
            :options="addressBlockOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            :label="$q.screen.lt.sm ? '戶籍地所屬區' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                戶籍地所屬區:
              </label>
            </template>
          </q-select>
        </div>
        <!-- Father -->
        <div class="col-6 col-md-3">
          <q-input
            v-model="inCardForm.father"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '父親姓名' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                父親姓名:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-2">
          <q-select
            v-model="inCardForm.fatherIsIn"
            outlined
            :options="isinOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            :label="$q.screen.lt.sm ? '入信' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:80px;text-align:right;' : ''"
              >
                入信:
              </label>
            </template>
          </q-select>
        </div>
        <div class="col-6 col-md-3">
          <q-input
            v-model="inCardForm.fatherPhone"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '父親電話' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                父親電話:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.fatherEmail"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '父親Mail' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                父親Mail:
              </label>
            </template>
          </q-input>
        </div>
        <!-- Mother -->
        <div class="col-6 col-md-3">
          <q-input
            v-model="inCardForm.mother"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '母親姓名' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                母親姓名:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-2">
          <q-select
            v-model="inCardForm.motherIsIn"
            outlined
            :options="isinOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            :label="$q.screen.lt.sm ? '入信' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="
                  !$q.screen.lt.sm
                    ? 'width:80px;text-align:right;text-align:right;'
                    : ''
                "
              >
                入信:
              </label>
            </template>
          </q-select>
        </div>
        <div class="col-6 col-md-3">
          <q-input
            v-model="inCardForm.motherPhone"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '母親電話' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                母親電話:
              </label>
            </template>
          </q-input>
        </div>
        <div class="col-6 col-md-4">
          <q-input
            v-model="inCardForm.motherEmail"
            type="text"
            outlined
            dense
            :label="$q.screen.lt.sm ? '母親Mail' : void 0"
          >
            <template v-slot:before v-if="$q.screen.gt.xs">
              <label
                :style="!$q.screen.lt.sm ? 'width:100px;text-align:right;' : ''"
              >
                母親Mail:
              </label>
            </template>
          </q-input>
        </div>
        <!-- table PC-->
        <q-table
          v-if="!$q.screen.lt.sm"
          class="col-12 q-mt-md no-box-shadow"
          style="border:1px solid rgba(0, 0, 0, 0.12);"
          :data="inCardForm.data"
          :columns="tableColumn"
          row-key="name"
          hide-pagination
        >
          <template v-slot:header="props">
            <span><span class="required">*</span>就學資料</span>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props" :no-hover="true">
              <q-td key="study" :props="props">
                {{ props.row.study }}
              </q-td>
              <q-td key="school" :props="props">
                <q-input
                  v-model="props.row[props.cols[1].name]"
                  type="text"
                  outlined
                  dense
                ></q-input>
              </q-td>
              <q-td key="grade" :props="props">
                <q-option-group
                  v-model="props.row[props.cols[2].name]"
                  v-if="props.row.study === '國小'"
                  :options="gradeOptions1"
                  color="primary"
                  type="radio"
                  size="xs"
                  inline
                />
                <q-option-group
                  v-model="props.row[props.cols[2].name]"
                  v-else-if="props.row.study === '國中'"
                  :options="gradeOptions2"
                  color="primary"
                  type="radio"
                  size="xs"
                  inline
                />
                <q-option-group
                  v-model="props.row[props.cols[2].name]"
                  v-else-if="props.row.study === '高中'"
                  :options="gradeOptions3"
                  color="primary"
                  type="radio"
                  size="xs"
                  inline
                />
              </q-td>
              <q-td key="department" :props="props">
                <q-input
                  v-model="props.row[props.cols[3].name]"
                  v-if="props.row.study === '高中'"
                  type="text"
                  outlined
                  dense
                ></q-input>
                <span v-else class="">-</span>
              </q-td>
              <q-td key="startedDate" :props="props">
                <q-input
                  v-model="props.row[props.cols[4].name]"
                  type="date"
                  outlined
                  dense
                ></q-input>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div v-else class="col-12">
          <q-list
            v-for="data in inCardForm.data"
            :key="data.name"
            class=" q-mt-sm q-py-xs"
            style="border:1px solid ;border-color: rgba(0, 0, 0, 0.12);"
          >
            <q-item
              v-for="col in tableColumn"
              :key="col.name"
              style="padding-bottom:0px;"
            >
              <q-item-section>
                <template v-if="col.colType === 'str'">
                  <div class="" style="display:flex;">
                    <span class=""
                      ><span class="required">*</span>{{ col.label }}:<span
                        style="font-weight:bold;"
                        >{{ data[col.name] }}</span
                      ></span
                    >
                  </div>
                  <!-- <q-item-label>{{ col.label }}</q-item-label>
                <q-item-label caption>{{ data[col.name] }}</q-item-label> -->
                </template>
                <template v-if="col.colType === 'input'">
                  <!-- <q-input
                  
                  type="text"
                  outlined
                  dense
                  :label="$q.screen.lt.sm ? `${col.label}` : void 0"
                >
                  <template v-slot:before v-if="$q.screen.gt.xs">
                    <label :style="!$q.screen.lt.sm ? 'width:100px;' : ''">
                      {{col.label}}:
                    </label>
                  </template>
                </q-input> -->
                  <q-item-label>{{ col.label }}</q-item-label>

                  <q-input
                    v-if="data.study === '高中' || col.name != 'department'"
                    v-model="data[col.name]"
                    type="text"
                    outlined
                    dense
                    style="height:40px;"
                  ></q-input>
                  <span v-else>-</span>
                </template>
                <template v-if="col.colType === 'radio'">
                  <q-item-label>{{ col.label }}</q-item-label>
                  <q-option-group
                    v-model="data[col.name]"
                    v-if="data.study === '國小'"
                    :options="gradeOptions1"
                    color="primary"
                    type="radio"
                    size="xs"
                    inline
                  />
                  <q-option-group
                    v-model="data[col.name]"
                    v-else-if="data.study === '國中'"
                    :options="gradeOptions2"
                    color="primary"
                    type="radio"
                    size="xs"
                    inline
                  />
                  <q-option-group
                    v-model="data[col.name]"
                    v-else-if="data.study === '高中'"
                    :options="gradeOptions3"
                    color="primary"
                    type="radio"
                    size="xs"
                    inline
                  />
                </template>
                <template v-if="col.colType === 'inputDate'">
                  <q-item-label style="margin-bottom:4px;">{{
                    col.label
                  }}</q-item-label>
                  <q-input
                    v-model="data[col.name]"
                    type="date"
                    outlined
                    dense
                  ></q-input>
                </template>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div
        class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm justify-center"
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
    </q-form>

    <!--  -->

    <table-dialog
      :tableColumn="tableColumn"
      :tableData="familyData"
      :opera-show="true"
      rowKey="name"
      tab-title="就學資料"
    >
      <template v-slot:body-opera>
        123
      </template>
      <template v-slot:dialog-content>
        <com-form class="q-pa-md" ref="comform">
          <com-input
            ref="comCheck"
            v-model="dialogForm.name"
            label="學校名稱"
            :required-valid="true"
            hide-bottom-space
            :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
          ></com-input>
          <!-- <com-select
            ref="comCheck"
            v-model="dialogForm.is_graduated"
            outlined
            :options="isinOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            label="是否畢業"
            :required-valid="true"
            hide-bottom-space
            :rules="[(val) => !!val || '此下拉1欄位為必填項']"
          ></com-select> -->
        </com-form>
      </template>
    </table-dialog>

    <!-- <q-dialog v-model="confirmDialog" persistent>
      <q-card style="width:50%;">
        <q-toolbar>
          <q-avatar>
            <q-icon name="warning" class="text-red" style="font-size: 2rem;" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">提示</span></q-toolbar-title
          >

        </q-toolbar>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >確認申請入{{
              inCardForm.identity === 1 ? "一般" : "學生"
            }}信卡。</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn
            flat
            label="確定"
            color="primary"
            v-close-popup
            @click="handleSaveComfirm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </div>
</template>
<script>
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComForm from "@/components/Common/form/ComForm";
import BaseImageInput from "@/components/Common/BaseImageInput";
import TableDialog from "@/components/Common/table/TableDialog";
import Mixin from "@/utils/mixin";

// ====================================================
const checkOptions = [
  { label: "壯", value: 1 },
  { label: "婦", value: 2 },
  { label: "男", value: 3 },
  { label: "女", value: 4 },
  { label: "國小中高", value: 5 },
  { label: "大學生", value: 6 },
  { label: "碩士生", value: 7 },
  { label: "博士生", value: 8 },
];
const confidenceOptions = [
  { label: "個人信仰", value: 1 },
  { label: "家庭信仰", value: 2 },
];
const specialOptions = [
  { label: "一般", value: 1 },
  { label: "守護", value: 2 },
  { label: "特別", value: 3 },
];
const areaOptions = [
  {
    name: "AAA區",
    child: [
      {
        name: "a1-地區",
        child: [
          {
            name: "Aa1第一組",
          },
          {
            name: "Aa1第二組",
          },
        ],
      },
      {
        name: "a2-地區",
        child: [
          {
            name: "Aa2第一組",
          },
          {
            name: "Aa2第二組",
          },
        ],
      },
      {
        name: "a3-地區",
        child: [
          {
            name: "Aa3第一組",
          },
          {
            name: "Aa3第二組",
          },
        ],
      },
    ],
  },
  {
    name: "BBB區",
    child: [
      {
        name: "b1-地區",
        child: [
          {
            name: "Bb1第一組",
          },
          {
            name: "Bb1第二組",
          },
        ],
      },
      {
        name: "b2-地區",
        child: [
          {
            name: "Bb2第一組",
          },
          {
            name: "Bb2第二組",
          },
        ],
      },
      {
        name: "b3-地區",
        child: [
          {
            name: "Bb3第一組",
          },
          {
            name: "Bb3第二組",
          },
        ],
      },
    ],
  },
  {
    name: "CCC區",
    child: [
      {
        name: "c1-地區",
        child: [
          {
            name: "Cc1第一組",
          },
          {
            name: "Cc1第二組",
          },
        ],
      },
      {
        name: "c2-地區",
        child: [
          {
            name: "Cc2第一組",
          },
          {
            name: "Cc2第二組",
          },
        ],
      },
    ],
  },
];
const addressBlockOptions = [
  { label: "居住地所屬區1", value: 1 },
  { label: "居住地所屬區2", value: 2 },
  { label: "居住地所屬區3", value: 3 },
];
const identityOptions = [
  { label: "一般", value: 1 },
  { label: "學生", value: 2 },
];
const isinOptions = [
  { label: "是", value: 1 },
  { label: "否", value: 0 },
];
const gradeOptions1 = [
  { label: "一", value: 1 },
  { label: "二", value: 2 },
  { label: "三", value: 3 },
  { label: "四", value: 4 },
  { label: "五", value: 5 },
  { label: "六", value: 6 },
];
const gradeOptions2 = [
  { label: "一", value: 1 },
  { label: "二", value: 2 },
  { label: "三", value: 3 },
];
const gradeOptions3 = [
  { label: "一", value: 1 },
  { label: "二", value: 2 },
  { label: "三", value: 3 },
];
export default {
  // mixins:[Mixin],

  props: {},
  // 局部注冊的組件
  components: {
    ComSelectDate,
    BaseImageInput,
    TableDialog,
    ComInput,
    ComSelect,
    ComForm,
  },
  data() {
    return {
      checkOptions,
      confidenceOptions,
      specialOptions,
      areaOptions,
      addressBlockOptions,
      identityOptions,
      isinOptions,
      gradeOptions1,
      gradeOptions2,
      gradeOptions3,
      dropdownSecond: [],
      dropdownThird: [],
      // ======
      testLabelLength: "我是測試測試測試",
      tableColumn: [
        {
          name: "study",
          label: "就學",
          field: "study",
          align: "center",
          colType: "str",
        },
        {
          name: "school",
          label: "學校名稱",
          field: "school",
          align: "center",
          colType: "input",
        },
        {
          name: "grade",
          label: "年級",
          field: "grade",
          align: "center",
          colType: "radio",
        },
        {
          name: "department",
          label: "就讀科系",
          field: "department",
          align: "center",
          colType: "input",
        },
        {
          name: "startedDate",
          label: "入學日期",
          field: "startDate",
          align: "center",
          colType: "inputDate",
        },
      ],
      isSame: false, //是否同上 
      inCardForm: {
        checks: [],
        name: "", //* 姓名
        mCode: "", //* 會員編號
        birthDate: "", //* 出生Date
        incardDate: "", //* 入信Date
        teachQuali: "", //教學資格
        confidence: "", //信心背景
        special: [], //御本尊
        avatar: null, // 照片
        area_v1: null, //所屬活動區
        area_v2: null, //
        area_v3: null, //
        homePhone: "", // 住家Phone
        mobilePhone: "", // 行動Phone
        companyPhone: "", // 公司Phone
        email: "", // Email
        address: "", // 通訊地
        addressBlock: "", // 居住地所屬區
        introducer: "", //介紹人
        introducerDepart: "", //介紹人部別
        introducerJob: "", //介紹人職務
        introducerPhone: "", //介紹人Phone
        identity: 1, // 身分 1 一般 | 2 學生
        addressOri: this.isSame ? this.inCardForm.address : "", // 戶籍地(學)
        addressOriBlock: "", // 戶籍地所屬區(學)
        father: "", // (學)
        fatherIsIn: "", // (學)
        fatherPhone: "", // (學)
        fatherEmail: "", // (學)
        mother: "", // (學)
        motherIsIn: "", // (學)
        motherPhone: "", // (學)
        motherEmail: "", // (學)
        data: [
          {
            study: "國小",
            school: "",
            grade: "",
            department: "",
            startedDate: "",
          },
          {
            study: "國中",
            school: "",
            grade: "",
            department: "",
            startedDate: "",
          },
          {
            study: "高中",
            school: "",
            grade: "",
            department: "",
            startedDate: "",
          },
        ],
      },
      confirmDialog: false,
      dialogForm:{
        education:"", //就學 
        name:"", // 學校名稱
        grade:"", // 年級
        major_in:"",//就讀科系
        is_graduated:1,//是否畢業
        started_date:"", //入學日期
      },
      // ======= table ========
      tableColumns: [
        {
          name: "education",
          label: "就學",
          field: "education",
          align: "center",
        },
        {
          name: "name",
          label: "學校名稱",
          field: "name",
          align: "center",
        },
        {
          name: "grade",
          label: "年級",
          field: "grade",
          align: "center",
        },
        {
          name: "major_in",
          label: "就讀科系",
          field: "major_in",
          align: "center",
        },
        {
          name: "is_graduated",
          label: "是否畢業",
          field: "is_graduated",
          align: "center",
        },
        {
          name: "started_date",
          label: "入學日期",
          field: "started_date",
          align: "center",
        },
      ],
      tableData: [],
    };
  },
  created() {},
  // 計算屬性
  computed: {
    first() {
      //下拉第一層
      return this.areaOptions.map((element) => element.name);
    },
  },
  // 偵聽器
  watch: {
    "inCardForm.area_v1": {
      handler(newName, oldName) {
        console.log("inCardForm.area_v1 changed", newName);
        if (newName === null) return [];
        if (newName !== oldName) {
          this.inCardForm.area_v2 = null;
          this.inCardForm.area_v3 = null;
        }
        let index = this.first.findIndex((name) => name === newName);
        this.dropdownSecond = this.areaOptions[index].child.map(
          (element) => element.name
        );
      },
      immediate: true,
      // deep: true
    },
    "inCardForm.area_v2": {
      handler(newName, oldName) {
        console.log("inCardForm.area_v2 changed", newName);
        if (newName === null) return [];
        if (newName !== oldName) {
          this.inCardForm.area_v3 = null;
        }
        let index1 = this.first.findIndex(
          (name) => name === this.inCardForm.area_v1
        );
        let index2 = this.dropdownSecond.findIndex(
          (name) => name === this.inCardForm.area_v2
        );
        this.dropdownThird = this.areaOptions[index1].child[index2].child.map(
          (element) => element.name
        );
      },
      immediate: true,
      // deep: true
    },
    "inCardForm.area_v3": {
      handler(newName, oldName) {
        console.log("inCardForm.area_v3 changed", newName);
      },
      immediate: true,
      // deep: true
    },
  },
  // 組件方法
  methods: {
    changeFirst(e) {
      console.log("==== first ====");
    },
    changeSecond(e) {
      console.log("==== Second ====");
    },
    changeThird(e) {
      console.log("==== Third ====");
    },
    handleSave() {
      this.confirmDialog = true;
    },
    checkRequired() {
      let errorRecord = 0;
      if (this.inCardForm.name === "") {
        // console.log("isRequiredname>>>", this.$refs.isRequiredname);
        this.$refs.isRequiredname.innerError = true; //成功

        this.$refs.isRequiredname.innerErrorMessage = this.$refs.isRequiredname.rules[0](); //成功
        errorRecord += 1;
      }
      if (this.inCardForm.mCode === "") {
        this.$refs.isRequiredmCode.innerError = true;
        this.$refs.isRequiredmCode.innerErrorMessage = this.$refs.isRequiredmCode.rules[0](); //成功
        errorRecord += 1;
      }
      if (this.inCardForm.birthDate === "") {
        // console.log("isRequiredbirthDate>>>", this.$refs.isRequiredbirthDate);
        this.$refs.isRequiredbirthDate.$children[0].$children[0].innerError = true;
        this.$refs.isRequiredbirthDate.$children[0].$children[0].innerErrorMessage = this.$refs.isRequiredbirthDate.$children[0].$children[0].rules[0]();
        errorRecord += 1;
      }
      if (this.inCardForm.incardDate === "") {
        this.$refs.isRequiredincardDate.$children[0].$children[0].innerError = true;
        this.$refs.isRequiredincardDate.$children[0].$children[0].innerErrorMessage = this.$refs.isRequiredincardDate.$children[0].$children[0].rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.area_v1 === null) {
        this.$refs.isRequiredarea_v1.innerError = true;
        this.$refs.isRequiredarea_v1.innerErrorMessage = this.$refs.isRequiredarea_v1.rules[0](); //成功
        errorRecord += 1;
      }
      if (this.inCardForm.area_v2 === null) {
        this.$refs.isRequiredarea_v2.innerError = true; //成功
        this.$refs.isRequiredarea_v2.innerErrorMessage = this.$refs.isRequiredarea_v2.rules[0]();
        errorRecord += 1;
      }
      if (this.inCardForm.area_v3 === null) {
        this.$refs.isRequiredarea_v3.innerError = true;
        this.$refs.isRequiredarea_v3.innerErrorMessage = this.$refs.isRequiredarea_v3.rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.mobilePhone === "") {
        this.$refs.isRequiredmobilePhone.innerError = true;
        this.$refs.isRequiredmobilePhone.innerErrorMessage = this.$refs.isRequiredmobilePhone.rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.address === "") {
        this.$refs.addressInput.innerError = true;
        this.$refs.addressInput.innerErrorMessage = this.$refs.addressInput.rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.email === "") {
        this.$refs.isRequiredemail.innerError = true;
        this.$refs.isRequiredemail.innerErrorMessage = this.$refs.isRequiredemail.rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.introducer === "") {
        this.$refs.isRequiredintroducer.innerError = true;
        this.$refs.isRequiredintroducer.innerErrorMessage = this.$refs.isRequiredintroducer.rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.introducerPhone === "") {
        this.$refs.isRequiredintroducerPhone.innerError = true;
        this.$refs.isRequiredintroducerPhone.innerErrorMessage = this.$refs.isRequiredintroducerPhone.rules[0]();
        errorRecord += 1;
      }

      if (this.inCardForm.avatar === null) {
        console.log("imageBox>>>>", this.$refs.imageBox);
        this.$refs.imageBox.$el.style.border = "1px solid red";

        errorRecord += 1;
      } else {
        this.$refs.imageBox.$el.style.border = "0px";
      }

      if (errorRecord > 0) {
        return { errorNum: errorRecord, errorStatus: false };
      } else {
        return { errorNum: 0, errorStatus: true };
      }
    },
    handleSaveComfirm() {
      this.checkRequired();
      alert("take it");
    },
    onSubmit() {
      let checkObj = this.checkRequired();

      if (checkObj.errorStatus) {
        return this.$q.notify({
          type: "positive",
          message: `成功送出`,
          position: "top",
          timeout: 1500,
        });
      } else {
        this.scrollToTop();
        return this.$q.notify({
          type: "warning",
          message: `尚有${checkObj.errorNum}個必填欄位未填寫`,
          position: "top",
          timeout: 1500,
        });
      }
    },
    onReset() {
      // console.log("==onReset==")
      this.inCardForm.avatar = null;
      this.$refs.imageBox.clearErrorStyle();
      // this.$refs.imageBox.imageData=null
      // this.$refs.imageBox.imageName=""
    },
    scrollToTop() {
      this.$el.scrollTop = 0;
    },

    getSameAddress(e) {
      //地址同上
      console.log("getSameAddress=>", e);
      if (this.inCardForm.address === "") {
        this.$refs.addressInput.focus();
        this.isSame = false;
        return this.$q.notify({
          type: "warning",
          message: `通訊地址尚未填寫!!`,
          position: "top",
          timeout: 1500,
        });
      }
      if (e) {
        return (this.inCardForm.addressOri = this.inCardForm.address);
      } else {
        this.inCardForm.addressOri = "";
      }
    },
    needLabelMorewidth(word) {
      return word.length > 4 ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  color: #000;
  font-size: 14px;
}
.required {
  color: red;
}
</style>
