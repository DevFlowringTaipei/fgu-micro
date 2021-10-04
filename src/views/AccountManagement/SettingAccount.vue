<template>
  <div class="q-pa-md" style="">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="editPersonal" label="修改個人資料" />
        <q-tab name="editPwd" label="修改密碼" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="editPersonal">
          <!-- 設定 -->
          <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12 col-md-3 q-mb-sm">
              <base-image-input
                style="margin:auto;"
                :style="$q.screen.lt.sm ? 'width:250px;height:200px;' : ''"
              ></base-image-input>
            </div>
            <div class="col-12 col-md-2 q-mb-sm"></div>
            <div class="col-12 col-md-4">
              <com-input
                v-model="settingForm.account"
                form-label="帳號"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.name"
                form-label="姓名"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.email"
                form-label="Email"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.phone"
                form-label="電話號碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
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

        <q-tab-panel name="editPwd">
          <!-- 修改密碼 -->
          <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12 col-md-4 q-mb-sm">
              <com-input
                v-model="editPwdForm.old_pwd"
                form-label="舊密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
            </div>
            <div class="col-12 col-md-4 q-mb-sm">
              <com-input
                v-model="editPwdForm.new_pwd"
                form-label="新密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
            </div>
            <div class="col-12 col-md-4 q-mb-sm">
              <com-input
                v-model="editPwdForm.new_again_pwd"
                form-label="請再輸入一次新密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
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
    </q-card>
  </div>
</template>
<script>
import BaseImageInput from "@/components/Common/BaseImageInput";
import ComInput from "@/components/Common/form/ComInput";
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { BaseImageInput, ComInput },
  data() {
    return {
      tab: "editPersonal",
      settingForm: {
        account: "",
        name: "",
        email: "",
        phone: "",
      },
      editPwdForm: {
        old_pwd: "",
        new_pwd: "",
        new_again_pwd: "",
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
    onSubmit() {},
  },
};
</script>
<style lang="scss" scoped></style>
