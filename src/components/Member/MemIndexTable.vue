<template>
  <div class="q-pa-md">
    <q-table
      title="會員總攬"
      :data="tableData"
      :columns="tableColumn"
      :selection="showMultiSelect ? 'multiple' : ''"
      :row-key="rowKey"
      :selected.sync="selected"
      @update:selected="updateSelected"
    >
      <!-- 頭部 -->
      <template v-slot:top>
        <!-- <q-btn
          color="primary"
          label="新增會員"
          @click="showCheckDiagle = true"
        /> -->
      </template>
      <!-- table 表頭 -->
      <q-tr slot="header" slot-scope="props">
        <q-th auto-width v-if="showMultiSelect">
          操作
        </q-th>
        <q-th auto-width v-if="showMultiSelect">
          <q-checkbox
            v-model="props.selected"
            indeterminate-value="some"
          />
        </q-th>


        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
      <!-- <template v-slot:body="props">
        <q-tr :props="props">
          <q-td  :props="props">
            {{ props.row }}
          </q-td>
        </q-tr>
      </template> -->

      <!-- table row (body) 客製 => all會員比較別 代處理 -->

      <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td>
            <div class="q-pa-md q-gutter-sm">
              <q-btn size="small" color="secondary" label="檢視" @click="goTo(type='view',props.row)"/>
              <q-btn size="small" color="amber" label="修改" @click="goTo(type='edit',props.row)"/>
              <q-btn
                size="small"
                style="color: white;background: red;"
                label="刪除"
              />
            </div>
          </q-td>
          <q-td >
            <!-- {{props.row}} -->
            <q-checkbox v-model="props.selected" color="primary" />
          </q-td>
          <q-td key="memberCode" :props="props">
            {{ props.row.memberCode }}
          </q-td>
          <q-td key="memberName" :props="props">
            {{ props.row.memberName }}
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area | transformById("areaArr") }}
          </q-td>
          <q-td key="mobile" :props="props">
            {{ props.row.mobile }}
          </q-td>
          <q-td key="address" :props="props">
            {{ props.row.address }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="birthday" :props="props">
            {{ props.row.birthday }}
          </q-td>
          <q-td key="department" :props="props">
            {{ props.row.department | transformById("departmentArr") }}
          </q-td>
          <q-td key="orgJobTitle" :props="props">
            {{ props.row.orgJobTitle | transformById("jobTitleArr") }}
          </q-td>
          <q-td key="departmentStu" :props="props">
            {{ props.row.departmentStu | noDataFormat }}
          </q-td>
          <q-td key="grade" :props="props">
            {{ props.row.grade | noDataFormat }}
          </q-td>
          <q-td key="schoolNow" :props="props">
            {{ props.row.schoolNow | noDataFormat }}
          </q-td>
          <q-td key="unitTitle" :props="props">
            {{ props.row.unitTitle | noDataFormat }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status | transformById("statusArr") }}
          </q-td>
          <q-td key="endDate" :props="props">
            {{ props.row.endDate | endDateFormat }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    {{selected}}
    <!-- 新增 -->
    <q-dialog v-model="showCheckDiagle">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">新增家族成員</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
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
export default {
  // 組件參數 接收來自父組件的數據
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    tableColumn: {
      type: Array,
      required: true,
    },
    showMultiSelect: {
      type: Boolean,
      required: true,
    },
    rowKey: {
      type: String,
      required: true,
    },
  },
  // 局部注冊的組件
  components: {},
  data() {
    return {
      //
      selected: [],
      showCheckDiagle: false, // 是否顯示彈窗
      form: {
        memberName: "",
        area: "",
        mobile: "",
        address: "",
        email: "",
        birthday: "",
        department: "",
        orgJobTitle: "",
        departmentStu: "",
        grade: "",
        schoolNow: "",
        unitTitle: "",
        status: "",
        endDate: "",
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
      updateSelected(e){
        console.log(e)
      }, 
      goTo(type,row){
        this.$router.push({
          name:"Member",
          params: { 
            userId: '',
            userName:row.memberName,
            mCode:row.memberCode,
            type 
          }
        })
        // switch(type){
        //   case 'view':
        //     this.$router.push({
        //       name:"Member",
        //       params: { userId: '',userName:row.memberName,mCode:row.memberCode,type }
        //     })
        //     break;
        //   case 'edit':
        //     this.$router.push({
        //       name:"Member",
        //       params: { userId: '',userName:row.memberName,mCode:row.memberCode,type }
        //     })
        //     break;
        // }
        
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
input[readonly] {
  background-color: (可根据需要改颜色);
}
.this {
  border: 1px solid red;
}
</style>
