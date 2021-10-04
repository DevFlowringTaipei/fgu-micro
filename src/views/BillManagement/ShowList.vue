<template>
  <div class="q-pa-md" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="data.tableData"
      :opera-show="false"
      rowKey="name"
      tab-title="專業輔導"
      :show-pagination="false"
      :pagination="page"
    >
      <template v-slot:top="props">
        <q-input
          outlined
          v-model="searchForm.keyword"
          dense
          style="width:200px;"
          class="q-mr-sm"
        />
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
        <q-btn
          size="md"
          class="q-ml-sm"
          color="primary"
          :style="$q.screen.lt.sm ? 'flex:1;' : ''"
          label="搜尋"
          @click="handleSearch"
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
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComPagination from "@/components/Common/form/ComPagination";
import { identityOptions } from "@/utils/common/dropdown-list.js";
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { TableDialog, ComPagination },
  data() {
    return {
      identityOptions,
      searchForm: {
        keyword: "",
        type: "",
      },

      page: {
        rowsPerPage: 5,
        page: 1,
        totalNum: 0,
      },

      tableColumns: [
        {
          name: "name",
          label: "姓名",
          field: "name",
          align: "center",
        },
        {
          name: "departure_date",
          label: "遊程日期",
          field: "departure_date",
          align: "center",
        },
        {
          name: "tour_name",
          label: "遊程名稱",
          field: "tour_name",
          align: "center",
        },
        {
          name: "status",
          label: "報名狀況",
          field: "status",
          align: "center",
          format: (val) => (val == 1 ? "已報名" : "未報名"),
        },
        {
          name: "isPaid",
          label: "繳費狀況",
          field: "isPaid",
          align: "center",
          format: (val) => (val == 1 ? "已繳費" : "未繳費"),
        },
        {
          name: "total_pay",
          label: "繳費金額",
          field: "total_pay",
          align: "center",
        },
        {
          name: "note",
          label: "備註",
          field: "note",
          align: "center",
        },
      ],
      data: {
        type: "",
        totalNum: "",
        tableData: [
          {
            id: 1,
            name: "用戶1",
            departure_date: "2021-04-25",
            tour_name: "遊程1",
            status: 1,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 2,
            name: "用戶2",
            departure_date: "2021-11-14",
            tour_name: "遊程5",
            status: 1,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 3,
            name: "用戶3",
            departure_date: "2020-12-25",
            tour_name: "遊程3",
            status: 0,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 4,
            name: "用戶4",
            departure_date: "2021-12-14",
            tour_name: "遊程4",
            status: 1,
            isPaid: 1,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 5,
            name: "用戶5",
            departure_date: "2020-12-25",
            tour_name: "遊程3",
            status: 1,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 6,
            name: "用戶6",
            departure_date: "2021-12-30",
            tour_name: "遊程2",
            status: 0,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 7,
            name: "用戶7",
            departure_date: "2021-11-14",
            tour_name: "遊程5",
            status: 1,
            isPaid: 1,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 8,
            name: "用戶8",
            departure_date: "2021-04-25",
            tour_name: "遊程1",
            status: 1,
            isPaid: 1,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 9,
            name: "用戶9",
            departure_date: "2021-04-25",
            tour_name: "遊程1",
            status: 1,
            isPaid: 1,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 10,
            name: "用戶10",
            departure_date: "2020-12-25",
            tour_name: "遊程3",
            status: 1,
            isPaid: 1,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 11,
            name: "用戶1",
            departure_date: "2021-04-25",
            tour_name: "遊程1",
            status: 0,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 12,
            name: "用戶12",
            departure_date: "2021-12-14",
            tour_name: "遊程4",
            status: 1,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 13,
            name: "用戶13",
            departure_date: "2021-11-14",
            tour_name: "遊程5",
            status: 1,
            isPaid: 1,
            total_pay: "1234",
            note: "這是備註",
          },
          {
            id: 14,
            name: "用戶14",
            departure_date: "2020-12-25",
            tour_name: "遊程3",
            status: 1,
            isPaid: 0,
            total_pay: "1234",
            note: "這是備註",
          },
        ],
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
    showLoading() {
      this.$q.loading.show();
      setTimeout(() => {
        this.data.type = this.searchForm.type;
        this.data.totalNum = this.data.tableData.length;
    this.page.totalNum =this.data.tableData.length;
        this.$q.loading.hide();
      }, 3000);

      //   this.timer = setTimeout(() => {
      //     this.$q.loading.hide();
      //     this.timer = void 0;
      //   }, 2000);
    },
    handleSearch() {this.showLoading()},
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
    // openDialog(rowData) {
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
    // },
    // delRowData(id, rowIndex) {
    //   this.tableData.splice(rowIndex, 1);
    //   this.page.totalNum = this.tableData.length;
    // },
    // onSubmit() {
    //   if (this.$refs.comCheck.$children[0].hasError) {
    //     this.$q.notify({
    //       message: "驗證未過",
    //       type: "error",
    //       position: "top-right",
    //     });
    //     this.$refs.myTable.showCheckDialog = true;
    //     return;
    //   }

    //   //
    //   let target = this.tableData.find(
    //     (item) => item.id === this.dialogForm.id
    //   );
    //   target.name = this.dialogForm.name;
    //   target.status = this.dialogForm.status;
    //   target.note = this.dialogForm.note;
    //   //
    //   this.$q.notify({
    //     message: "人才新建成功",
    //     type: "warning",
    //     position: "top-right",
    //   });
    //   this.$refs.myTable.showCheckDialog = false;
    // },
  },
  created() {
    this.page.totalNum = this.tableData.length;
  },
};
</script>
<style lang="scss" scoped></style>
