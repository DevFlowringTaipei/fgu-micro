<template>
  <div class="" style="">
    <!-- 新增規則表單 -->
    <q-form
      class="row q-col-gutter-x-sm q-col-gutter-y-sm q-py-sm"
      style="padding:20px;"
    >
      <q-select
        class="col-12 col-sm-6 "
        outlined
        dense
        emit-value
        
        :options="calOptions"
        map-options
        option-label="label"
        option-value="value"
        v-model="activityForm.cal"
        :label="$q.screen.lt.sm ? '計算週期 ' : void 0"
      >
        <template v-slot:before v-if="$q.screen.gt.xs">
          <label
            for="cboBelongArea"
            class="font-s-size"
            style="font-size: 55%;"
          >
            計算週期:
          </label>
        </template>
      </q-select>
      <com-select-date
        class="col-12 col-sm-6 "
        form-label="起訖時間"
        auto-calculate-btn
        :cal-date-val="activityForm.cal"
      >
      </com-select-date>
      <q-select
        class="col-12 col-sm-6"
        outlined
        dense
        emit-value
        map-options
        :options="planOptions"
        option-label="label"
        option-value="type"
        v-model="activityForm.plan"
        :label="$q.screen.lt.sm ? '統計程度' : void 0"
      >
        <template v-slot:before v-if="$q.screen.gt.xs">
          <label class="font-s-size" style="font-size: 55%;">
            統計程度:
          </label>
        </template>
      </q-select>
      <q-option-group
        class="col-12 col-sm-6"
        :options="typeOptions"
        option-value="label"
        type="radio"
        v-model="activityForm.type"
        inline
      />
      <!--  -->
      <div
        v-show="activityForm.type === 1 || activityForm.type === 2"
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
          活動挑選:
        </span>
        <div
          style="display:flex;flex:1;"
          :style="
            $q.screen.lt.sm ? 'flex-direction:column;' : 'flex-direction:row;'
          "
        >
          <q-select
            v-model="activityForm.activity_level_1"
            outlined
            :options="first"
            dense
            style="flex:1;margin-right:4px;"
            :style="$q.screen.lt.sm ? 'margin-top:6px;margin-right:0px;' : ''"
          >
          </q-select>
          <q-select
            v-model="activityForm.activity_level_2"
            outlined
            :options="second"
            dense
            style="flex:1;margin-right:4px;"
            :style="$q.screen.lt.sm ? 'margin-top:6px;margin-right:0px;' : ''"
          >
          </q-select>
          <q-select
            v-model="activityForm.activity_level_3"
            outlined
            :options="third"
            dense
            style="flex:1;"
            :style="$q.screen.lt.sm ? 'margin-top:6px;' : ''"
          >
          </q-select>
        </div>
      </div>

      <!--  -->
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
          活動次數:
        </span>
        <div
          style="display:flex;flex:1;"
          :style="$q.screen.lt.sm ? '' : 'flex-direction:row;'"
        >
          <q-input
            v-model="activityForm.activity_count.from"
            dense
            outlined
            style="flex:1;"
          />
          <div style="margin-right:2px;font-size: 13.2px;padding-top:8px;">
            ~
          </div>
          <q-input
            v-model="activityForm.activity_count.to"
            dense
            outlined
            style="flex:1;"
          />
        </div>
      </div>
      <div class="col-12" style="padding:0px;">
        <q-btn
          label="新增規則"
          color="primary"
          size="small"
          style="display:flex;float:right;"
          @click="addRule"
        />
      </div>
    </q-form>
    <!-- 卡片部分 -->
    <div class="q-pa-md">
      <q-card class="card" v-for="(data, index) in cardInfo" :key="index">
        <!-- <q-table
          title="活動程度條件設置"
          color="primary"
          :columns="tableColumns"
          :data="data.data"
          row-key="name"
        >
          
          <template v-slot:top-right>
            <div class="text-subtitle2 float-right q-table__title">
              目前設置:{{ planOptionsFormat(data.plan) }}/{{
                typeOptionsFormat(data.type)
              }}
            </div>
          </template>
          
          <q-tr slot="header" slot-scope="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width>
              操作
            </q-th>
          </q-tr>
          
          <template v-slot:body="props">
            <q-tr :props="props" :key="props.row.index" no-hover>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td>
                <div class="">
                  <q-btn
                    size="xs"
                    style="color: white;background: red;"
                    label="刪除"
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table> -->

        <mem-table
          :tableColumn="tableColumns"
          :tableData="data.data"
          :showMultiSelect="false"
          :operaShow="true"
          rowKey="name"
          tabTitle="活動程度條件設置"
          :pageSettings="pageSettings"
          
        >
          <template v-slot:TopRight>
              <div class="text-subtitle2 float-right q-table__title">
                目前設置:{{ planOptionsFormat(data.plan) }}/{{
                  typeOptionsFormat(data.type)
                }}
              </div>
            </template>
        </mem-table>

        
      </q-card>
    </div>
    <div
      class="row q-col-gutter-x-sm q-col-gutter-y-sm q-py-sm"
      style="padding:20px;"
    >
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
          說明:
        </span>
        <div class="" style="border:1px solid #bbb; padding:10px;flex:1;">
          <div v-for="(item, index) in cardInfo" :key="index">
            {{ planOptionsFormat(item.plan) }}:
            <span v-for="(data, dI) in item.data" :key="dI">
              {{ data.activityLevel }} {{ data.activityCountFrom }} ~
              {{ data.activityCountTo }}次
              {{
                item.data.length > 1 && dI + 1 != item.data.length ? "，" : "。"
              }}
            </span>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>
<script>
import ComField from "@/components/Common/form/ComField";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import MemTable from "@/components/Member/MemTable";

export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { ComSelectDate, ComField, MemTable },
  data() {
    return {
      pageSettings:{
        pageSize:20, 
        currentPage:1, 
        totalNum:147,
      },
      
      //
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      calOptions: [
        { label: "1個月", value: 1 },
        { label: "2個月", value: 2 },
        { label: "3個月", value: 3 },
        { label: "4個月", value: 4 },
        { label: "5個月", value: 5 },
        { label: "6個月", value: 6 },
        { label: "7個月", value: 7 },
        { label: "8個月", value: 8 },
        { label: "9個月", value: 9 },
        { label: "10個月", value: 10 },
        { label: "11個月", value: 11 },
        { label: "12個月", value: 12 },
      ],
      planOptions: [
        { label: "紅蘋果(3級)", value: 1, type: "red" },
        { label: "青蘋果(2級)", value: 2, type: "green" },
        { label: "白蘋果(1級)", value: 3, type: "white" },
      ],
      typeOptions: [
        { label: "不分活動", value: 1 },
        { label: "活動挑選(個別)", value: 2 },
        { label: "活動挑選(合計)", value: 3 },
      ],
      activityOptions: [
        {
          name: "AAA大類活動",
          child: [
            {
              name: "a1-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
            {
              name: "a2-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
            {
              name: "a3-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
          ],
        },
        {
          name: "BBB大類活動",
          child: [
            {
              name: "b1-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
            {
              name: "b2-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
            {
              name: "b3-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
          ],
        },
        {
          name: "CCC大類活動",
          child: [
            {
              name: "c1-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
            {
              name: "c2-中類活動",
              child: [
                {
                  name: "座談會",
                },
                {
                  name: "區會",
                },
              ],
            },
          ],
        },
      ],
      activityForm: {
        cal: "",
        date: { from: "", to: "" },
        plan: "", // 蘋果
        type: "",
        activity_level_1: "",
        activity_level_2: "",
        activity_level_3: "",
        activity_count: {
          from: null,
          to: null,
        },
      },
      tableColumns: [
        {
          name: "planLevel",
          align: "center",
          label: "活動程度",
          field: "planLevel",
          format: (val) =>
            this.planOptions.find((item) => item.type === val).label,
        },
        {
          name: "activityLevel",
          align: "center",
          label: "活動種類",
          field: "activityLevel",
        },
        {
          name: "activityCountFrom",
          align: "center",
          label: "活動次數(>=)",
          field: "activityCountFrom",
        },
        {
          name: "activityCountTo",
          align: "center",
          label: "活動次數(<=)",
          field: "activityCountTo",
        },
      ],
      cardInfo: [
        {
          plan: "red",
          type: 1, // 活動挑選=> 不分活動 1 | 依照活動  2 | 活動挑選 3
          data: [
            {
              planLevel: "red", // 紅,青,白蘋果
              activityLevel: "座談會", // 座談會 |　區會
              activityCountFrom: 2,
              activityCountTo: 3,
            },
            {
              planLevel: "red", // 紅,青,白蘋果
              activityLevel: "區會", // 座談會 |　區會
              activityCountFrom: 1,
              activityCountTo: 2,
            },
          ],
        },
        {
          plan: "green",
          type: 2, // 活動挑選=> 不分活動(合計) 1 | 依照活動(個別)  2 | 活動挑選(合計) 3
          data: [
            {
              planLevel: "green", // 紅,青,白蘋果
              activityLevel: "座談會", // 座談會 |　區會
              activityCountFrom: 2,
              activityCountTo: 3,
            },
          ],
        },
      ],
    };
  },

  created() {},

  computed: {
    
    first() {
      //下拉第一層
      return this.activityOptions.map((element) => element.name);
    },
    second() {
      //下拉第二層
      if (this.activityForm.activity_level_1 == "") return [];
      let index = this.first.findIndex(
        (name) => name === this.activityForm.activity_level_1
      );
      return this.activityOptions[index].child.map((element) => element.name);
    },
    third() {
      // 下拉第三層
      if (this.activityForm.activity_level_2 == "") return;

      let index1 = this.first.findIndex(
        (name) => name === this.activityForm.activity_level_1
      );
      let index2 = this.first.findIndex(
        (name) => name === this.activityForm.activity_level_1
      );
      return this.activityOptions[index1].child[index2].child.map(
        (element) => element.name
      );
    },
    planOptionsFormat() {
      return function(val) {
        return this.planOptions.find((item) => item.type === val).label;
      };
    },
    typeOptionsFormat() {
      return function(val) {
        return this.typeOptions.find((item) => item.value === val).label;
      };
    },
  },

  methods: {
    addRule() {
      let findPlans = this.cardInfo.filter((item) => {
        return (
          item.plan === this.activityForm.plan &&
          item.type === this.activityForm.type
        );
      });
      let findIndex = this.cardInfo.findIndex((item) => {
        return (
          item.plan === this.activityForm.plan &&
          item.type === this.activityForm.type
        );
      });

      // 判斷是否存在

      if (findPlans.length > 0) {
        //存在 =>推data
        let newObj = {
          planLevel: this.activityForm.plan, // 紅,青,白蘋果
          activityLevel:
            this.activityForm.activity_level_3 === ""
              ? "座談會或區會"
              : this.activityForm.activity_level_3, // 座談會 |　區會
          activityCountFrom: this.activityForm.activity_count.from,
          activityCountTo: this.activityForm.activity_count.to,
        };

        this.$set(this.cardInfo[findIndex].data, 1, newObj);
      } else {
        // 不存在
        let obj = {
          plan: this.activityForm.plan,
          type: this.activityForm.type, // 活動挑選=> 不分活動 0 | 依照活動  1 | 活動挑選 2
          data: [
            {
              planLevel: this.activityForm.plan, // 紅,青,白蘋果
              activityLevel:
                this.activityForm.activity_level_3 === ""
                  ? "座談會或區會"
                  : this.activityForm.activity_level_3, // 座談會 |　區會
              activityCountFrom: this.activityForm.activity_count.from,
              activityCountTo: this.activityForm.activity_count.to,
            },
          ],
        };

        this.cardInfo.push(obj);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  color: #000;
  font-size: 14px;
}
.font-s-size {
  font-size: 55%;
}
.card {
  margin-bottom: 10px;
}
</style>
