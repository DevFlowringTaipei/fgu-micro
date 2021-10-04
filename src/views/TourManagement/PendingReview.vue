<template>
  <div :class="$q.screen.lt.sm? 'q-pa-xs':'q-pa-md'" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="true"
      rowKey="name"
  
      :show-pagination="false"
      :pagination="page"
    >
      

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
        <!-- <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-pa-md">
          <div class="col-12 col-md-6">
            <com-input
              ref="comCheck"
              v-model="dialogForm.name"
              form-label="專業輔導"
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
        </div> -->
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
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: {ComPagination, TableDialog,ComInput,ComForm},
  data() {
    return {
      page: {
        rowsPerPage: 5,
        page: 1,
        totalNum: 0,
      },

      tableColumns: [
        {
          name: "cid",
          label: "序號",
          field: "cid",
          align: "center",
        },
        {
          name: "name",
          label: "遊程名稱",
          field: "name",
          align: "center",
         
        },
        {
          name: "applicant",
          label: "申請人",
          field: "applicant",
          align: "center",
        },
        {
          name: "applied_date",
          label: "申請時間",
          field: "applied_date",
          align: "center",
        },
      ],
      tableData: [
        {
          id: 1,
          cid: 1,
          name: "花蓮一日遊",
          applicant: "王大寶",
          applied_date:"2021-09-12"
        },
        {
          id: 2,
          cid: 2,
          name: "高雄一日遊",
          applicant: "林阿美",
           applied_date:"2021-09-16",
        },
        { id: 3, cid: 3, name: "基隆美食之旅", applicant: "朱曉明", applied_date:"2021-09-30" },
      ],
    };
  },
  created() {this.page.totalNum = this.tableData.length;},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
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
    //   this.resetForm();
    //   if (rowData.id != 0) {
    //     this.$refs.myTable.openDialog("edit");
    //     this.dialogForm.id = rowData.id;
    //     this.dialogForm.name = rowData.name;
    //     this.dialogForm.status = rowData.status;
    //     this.dialogForm.note = rowData.note;
    //     return;
    //   } else {
    //     this.$refs.myTable.openDialog("add");
    //   }
    },
    delRowData(id, rowIndex) {
    //   this.tableData.splice(rowIndex, 1);
    //   this.page.totalNum = this.tableData.length;
    },
  },
};
</script>
<style lang="scss" scoped></style>
