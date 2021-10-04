<template>
  <div class="q-pa-md" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="true"
      rowKey="name"
      tab-title="服務類型"
      :show-pagination="false"
      :pagination="page"
    >
      <template v-slot:top="props">
        <q-input
          outlined
          v-model="searchForm.keyword"
          dense
          style="width:200px;"
        />
        <q-btn
          size="md"
          class="q-ml-sm"
          color="primary"
          :style="$q.screen.lt.sm ? 'flex:1;' : ''"
          label="搜尋"
        />
        <q-space v-if="!$q.screen.lt.sm" class="" />
        <q-btn
          size="md"
          color="primary"
          label="新增服務類型"
          :style="$q.screen.lt.sm ? 'width:100%;margin-top:8px;' : ''"
          @click="openDialog({ id: 0 })"
        />
      </template>

      <template v-slot:body-opera="{ rowData, rowIndex }">
        <q-btn
          size="xs"
          class="q-mr-sm"
          color="amber"
          label="修改"
          @click="openDialog(rowData)"
        />
        <q-btn
          size="xs"
          color="red"
          label="刪除"
          @click="delRowData(rowData.id, rowIndex)"
        />
      </template>

      <template v-slot:dialog-content>
        <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-pa-md">
          <div class="col-12 col-md-6">
            <com-input
              ref="comCheck"
              v-model="dialogForm.name"
              form-label="服務類型"
              :required-valid="true"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
            ></com-input>
          </div>
          <div
            class="col-12 col-md-6 "
            style="display:flex;flex-direction:column;"
            :style="
              $q.screen.lt.sm
                ? 'flex-direction:row;border:1px solid rgba(0,0,0,0.24);padding-top:0px;margin-left:8px;padding-left:4px;width:inherit;flex:1;margin-top:8px;border-radius:4px;'
                : ''
            "
          >
            <span class="" :style="$q.screen.lt.sm ? 'padding-top:10px;' : ''"
              >狀態</span
            >

            <q-option-group
              style="margin-left:-12px;"
              v-model="dialogForm.status"
              :options="statusOptions"
              inline
              type="radio"
              class=""
            />
            <!-- <q-toggle
                v-model="dialogForm.status"
                class="this"
                style="padding-left:0px;"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                :false-value="0"
                :true-value="1"
                size="lg"
              /> -->
          </div>
          <div class="col-12 ">
            <com-input
              v-model="dialogForm.note"
              form-label="備註"
              type="textarea"
            ></com-input>
          </div>
        </div>
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
              v-close-popup
            />
            <q-btn
              type="submit"
              size="sm"
              color="primary"
              label="保存"
              @click="onSubmit()"
            />
          </div>
        </div>
      </template>
    </table-dialog>
    <div class="row justify-center q-mt-md ">
      <com-pagination
        class="col-12 justify-center"
        style="align-items:center;margin-right:0px;"
        v-model="page.page"
        :rows-per-page="page.rowsPerPage"
        :total-num="page.totalNum"
        @input="changeCurrentPage"
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComForm from "@/components/Common/form/ComForm.vue";
import ComInput from "@/components/Common/form/ComInput.vue";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComPagination from "@/components/Common/form/ComPagination";
import { statusOptions } from "@/utils/common/dropdown-list.js";
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { TableDialog, ComForm, ComInput, ComPagination },
  data() {
    return {
      statusOptions,
      searchForm: {
        keyword: "",
        type: "",
      },

      page: {
        rowsPerPage: 2,
        page: 1,
        totalNum: 0,
      },

      tableColumns: [
        {
          name: "name",
          label: "服務類型",
          field: "name",
          align: "center",
        },
        {
          name: "status",
          label: "狀態",
          field: "status",
          align: "center",
          format: (val) => val==1?'啟用':'禁用',
        },
        {
          name: "note",
          label: "備註",
          field: "note",
          align: "center",
        },
      ],
      tableData: [
        {
          id: 1,
          name: "拉坏",
          status: 1,
          note: "這是備註",
        },
        {
          id: 2,
          name: "書法",
          status: 0,
          note: "這是備註",
        },
        { id: 3, name: "插花", status: 1, note: "這是備註" },
        {
          id: 4,
          name: "烹飪",
          status: 0,
          note: "這是備註",
        },
        { id: 5, name: "課程5", status: 1, note: "這是備註" },
        { id: 6, name: "課程6", status: 1, note: "這是備註" },
        { id: 7, name: "課程7", status: 1, note: "這是備註" },
      ],
      dialogForm: {
        id: "",
        name: "",
        status: 0,
        note: "",
      },
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法myTable
  methods: {
    resetForm() {
      this.dialogForm = {
        id: "",
        name: "",
        status: 0,
        note: "",
      };
    },
    changeCurrentPage(e) {
      
      console.log("changeCurrentPage=>", e);
    },
    openDialog(rowData) {
      this.resetForm();
      if (rowData.id != 0) {
        this.$refs.myTable.openDialog("edit");
        this.dialogForm.id = rowData.id;
        this.dialogForm.name = rowData.name;
        this.dialogForm.status = rowData.status;
        this.dialogForm.note = rowData.note;
        return;
      } else {
        this.$refs.myTable.openDialog("add");
      }
    },
    delRowData(id, rowIndex) {
      this.tableData.splice(rowIndex, 1);
      this.page.totalNum = this.tableData.length;
    },
    onSubmit() {
      if (this.$refs.comCheck.$children[0].hasError) {
        this.$q.notify({
          message: "驗證未過",
          type: "error",
          position: "top-right",
        });
        this.$refs.myTable.showCheckDialog = true;
        return;
      }

      //
      let target = this.tableData.find(
        (item) => item.id === this.dialogForm.id
      );
      target.name = this.dialogForm.name;
      target.status = this.dialogForm.status;
      target.note = this.dialogForm.note;
      //
      this.$q.notify({
        message: "人才新建成功",
        type: "warning",
        position: "top-right",
      });
      this.$refs.myTable.showCheckDialog = false;
    },
  },
  created() {
    this.page.totalNum = this.tableData.length;
  },
};
</script>
<style lang="scss" scoped></style>
