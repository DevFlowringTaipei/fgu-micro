<template>
  <div class="" style="">
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
      :pagination.sync="pagination"

      :hide-pagination="!showPagination"
    >
      
      <!-- 頭部 -->
      <!-- <template v-slot:top="props">
        <slot name="TitleTop"></slot>
      </template> -->
      <!-- 頭部右側 -->
      <!-- <template v-slot:top-right>
        
        <slot name="TitleTopRight">
          <q-btn
            v-show="operaShow"
            size="sm"
            color="primary"
            :label="`新增${tabTitle}`"
            @click="openDialog('add')"
          />
        </slot>
      </template> -->
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
      <template v-slot:body="props" >
        <q-tr :props="props" :key="props.row.index" :no-hover="!operaShow">

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td v-show="operaShow" >
            
            <slot name="body-opera" :rowData="props.row" :rowIndex="props.rowIndex"></slot>
          </q-td>
        </q-tr>
        
      </template>
      <!-- bottom-row -->
      <!-- <template v-slot:bottom-row="props" v-if="separator === 'vertical'">
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
      </template> -->


      <!-- 預設 -->
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName" />
      </template>
      <template
        v-for="slotName in Object.keys($scopedSlots)"
        v-slot:[slotName]="prop"
      >
        <slot :name="slotName" v-bind="prop" />
      </template>
    </q-table>
    <!-- Pagination -->

    <!-- dialog -->
    <q-dialog v-model="showCheckDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title
            ><span class="text-weight-bold">{{ dialogMethod }}</span>
            {{ tabTitle }}</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <slot name="dialog-content"> </slot>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "TableDialog",
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
      required: false,
    },
    showPagination:{
      //是否顯示分頁
      type: Boolean,
      required: false,
      default:true,
    },
    pagination:{
      type: Object,
      required: false,
    },
    rowKey: {
      type: String,
      required: true,
    },
    tabTitle: {
      //展開 Table 名稱
      type: String,
      required: false,
      default: "",
    },
    operaShow: {
      //是否顯示操作 與檢視或唯獨有關
      type: Boolean,
      default: false,
    },
    operaShowList: {
      //操作項功能扭
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
  components: {},
  data() {
    return {
      selected: [],
      dialogMethod: "",
      showCheckDialog: false, // 是否顯示彈窗
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    openDialog(type) {
      if (type === "add") {
        this.dialogMethod = "新增";

        this.showCheckDialog = true;
      } else if (type === "edit") {
        this.dialogMethod = "修改";
        this.showCheckDialog = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
