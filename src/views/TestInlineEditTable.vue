<template>
  <div class="" style="">
    <div class="q-pa-md">
      <q-table title="" :data="data" :columns="columns" row-key="name">
        <!-- 頭部右側 -->
        <template v-slot:top-right>
          <!-- 預設是 Button -->
          <slot name="TopRight">
            <q-btn size="sm" color="primary" :label="`新增`" />
          </slot>
        </template>
        <!-- table 表頭 -->
        <q-tr slot="header" slot-scope="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width>
            操作
          </q-th>
        </q-tr>
        <!-- body content -->
        <!-- <q-tr slot="body" slot-scope="props" :props="props"  class="cursor-pointer">
          
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            # {{ col.value }} #
            <q-input dense outlined v-model="props.row.name" label="" />
          </q-td>
        </q-tr> -->

        <template v-slot:body="props">
          <q-tr :props="props" @click.native="rowClick(props.row)">
            <q-td :props="props" v-for="col in props.cols" :key="col.name">
              <!-- {{col.value}}--{{col.colType}}---{{col}} -->
              <div class="" v-if="usedType === 'view'">
                <span class="">{{ col.value }}---{{ props.rowIndex }}</span>
              </div>
              <div v-else>
                <template v-if="col.colType === 'input'">
                  <q-input dense outlined v-model="props.row[col.name]" />
                </template>
                <template v-if="col.colType === 'selectValue'">
                  <q-select
                    outlined
                    v-model="props.row[col.name]"
                    :options="selectObjArr"
                    dense
                    emit-value
                    map-options
                    option-label="label"
                    option-value="value"
                  >
                  </q-select>
                </template>
                <template v-if="col.colType === 'selectText'">
                  <q-select
                    outlined
                    v-model="props.row[col.name]"
                    :options="selectArr"
                    dense
                    emit-value
                  >
                  </q-select>
                </template>
                <template v-if="col.colType === 'radio'">
                  <q-option-group
                    v-model="props.row[col.name]"
                    :options="radioOptions"
                    color="primary"
                    inline
                  />
                </template>
                <template v-if="col.colType === 'checkboxText'">
                  <div class="q-gutter-">
                    <q-checkbox
                      v-model="props.row[col.name]"
                      v-for="(cbox, index) in checkboxArr"
                      :key="index"
                      :val="cbox"
                      :label="cbox"
                    />
                  </div>
                </template>
                <template v-if="col.colType === 'checkboxValue'">
                  <q-option-group
                    :options="checkboxObjArr"
                    type="checkbox"
                    inline
                    v-model="props.row[col.name]"
                  />
                </template>
              </div>
            </q-td>
            <q-td>
              <q-btn
                size="xs"
                style="color: white;background: royalblue;"
                :label="usedType === 'view' ? '編輯' : '保存'"
                @click.native.stop="btnStatusChange(props.row, props.rowIndex)"
              />
            </q-td>
          </q-tr>
        </template>
        <!-- <template v-slot:body-cell-name="props">
          <q-tr :props="props" :key="props.row.index" :no-hover="false">
            
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td>
              操作區域
            </q-td>
          </q-tr>
          
        </template> -->
      </q-table>
      <!-- {{ data }} -->
    </div>

    <div class="q-pa-md">
      <q-table title="" :data="data" :columns="columns" row-key="name">
        <!-- 頭部右側 -->
        <template v-slot:top-right>
          <!-- 預設是 Button -->
          <slot name="TopRight">
            <q-btn size="sm" color="primary" :label="`新增`" />
          </slot>
        </template>
        <!-- table 表頭 -->
        <q-tr slot="header" slot-scope="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width>
            操作
          </q-th>
        </q-tr>
        <!-- body content -->
        <!-- <q-tr slot="body" slot-scope="props" :props="props"  class="cursor-pointer">
          
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            # {{ col.value }} #
            <q-input dense outlined v-model="props.row.name" label="" />
          </q-td>
        </q-tr> -->

        <template v-slot:body="props">
          <q-tr :props="props" :key="props.row.index" :no-hover="true">
            <q-td :props="props" v-for="col in props.cols" :key="col.name">
              <!-- {{col.value}}--{{col.colType}}---{{col}} -->

              <div v-if="selectedRow === props.rowIndex && usedType === 'edit'">
                <template v-if="col.colType === 'input'">
                  <q-input dense outlined v-model="props.row[col.name]" />
                </template>
                <template v-if="col.colType === 'selectValue'">
                  <q-select
                    outlined
                    v-model="props.row[col.name]"
                    :options="selectObjArr"
                    dense
                    emit-value
                    map-options
                    option-label="label"
                    option-value="value"
                  >
                  </q-select>
                </template>
                <template v-if="col.colType === 'selectText'">
                  <q-select
                    outlined
                    v-model="props.row[col.name]"
                    :options="selectArr"
                    dense
                    emit-value
                  >
                  </q-select>
                </template>
                <template v-if="col.colType === 'radio'">
                  <q-option-group
                    v-model="props.row[col.name]"
                    :options="radioOptions"
                    color="primary"
                    inline
                  />
                </template>
                <template v-if="col.colType === 'checkboxText'">
                  <div class="q-gutter-">
                    <q-checkbox
                      v-model="props.row[col.name]"
                      v-for="(cbox, index) in checkboxArr"
                      :key="index"
                      :val="cbox"
                      :label="cbox"
                    />
                  </div>
                </template>
                <template v-if="col.colType === 'checkboxValue'">
                  <q-option-group
                    :options="checkboxObjArr"
                    type="checkbox"
                    inline
                    v-model="props.row[col.name]"
                  />
                </template>
              </div>
              <div v-else>
                <span class="">{{ col.value }}</span>
              </div>
            </q-td>
            <q-td>
              <q-btn
                size="xs"
                style="color: white;background: royalblue;"
                :label="usedType === 'view' ? '編輯' : '保存'"
                @click.native.stop="btnStatusChange(props.row, props.rowIndex)"
              />
            </q-td>
          </q-tr>
        </template>
        <!-- <template v-slot:body-cell-name="props">
          <q-tr :props="props" :key="props.row.index" :no-hover="false">
            
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td>
              操作區域
            </q-td>
          </q-tr>
          
        </template> -->
      </q-table>
      <!-- {{ data }} -->
    </div>
    <com-form class="q-pa-md" ref="comform">
      <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
        <div class="col-6">
          <com-input
            ref="comCheck"
            v-model="form.account"
            label=""
            :required-valid="true"
            hide-bottom-space
            :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
          ></com-input>
        </div>
        <div class="col-6">
          <com-input
            ref="comCheck"
            v-model="form.pwd"
            label="密碼"
            :required-valid="true"
            hide-bottom-space
            :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
          ></com-input>
        </div>
        <div class="col-6">
          <com-select
            ref="comCheck"
            v-model="form.select1"
            outlined
            :options="identityOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            label="下拉1"
            :required-valid="true"
            hide-bottom-space
            :rules="[(val) => !!val || '此下拉1欄位為必填項']"
          ></com-select>
        </div>
        <div class="col-6">
          <com-select
            ref="comCheck"
            v-model="form.select2"
            outlined
            :options="isinOptions"
            dense
            emit-value
            map-options
            option-label="label"
            option-value="value"
            label="下拉2"
            :required-valid="true"
            hide-bottom-space
            :rules="[(val) => !!val || '此下拉2欄位為必填項']"
          ></com-select>
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
            @click="onReset"
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
    </com-form>
  </div>
</template>
<script>
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComForm from "@/components/Common/form/ComForm";

// ========
const identityOptions = [
  { label: "一般", value: 1 },
  { label: "學生", value: 2 },
];
const isinOptions = [
  { label: "是", value: 1 },
  { label: "否", value: 0 },
];

export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { ComInput, ComForm, ComSelect },
  data() {
    return {
      //=========================
      form: {
        account: "",
        pwd: "",
        select1: "",
        select2: "",
      },
      identityOptions,
      isinOptions,
      //=========================
      selectedRow: undefined,
      usedType: "view",
      selectArr: ["Select 1", "Select 2", "Select 3", "Select 4"],
      selectObjArr: [
        { label: "Select-Option 1", value: 1 },
        { label: "Select-Option 2", value: 2 },
        { label: "Select-Option 3", value: 3 },
      ],
      radioOptions: [
        {
          label: "Radio-Option 1",
          value: 1,
        },
        {
          label: "Radio-Option 2",
          value: 2,
        },
        {
          label: "Radio-Option 3",
          value: 3,
        },
      ],
      checkboxArr: ["checkbox-1", "checkbox-2", "checkbox-3", "checkbox-4"],
      checkboxObjArr: [
        {
          label: "Checkbox-Option 1",
          value: 1,
        },
        {
          label: "Checkbox-Option 2",
          value: 2,
        },
        {
          label: "Checkbox-Option 3",
          value: 3,
        },
        {
          label: "Checkbox-Option 4",
          value: 4,
        },
      ],
      columns: [
        {
          name: "name",
          required: true,
          label: "Input 欄位",
          align: "center",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
          colType: "input",
        },
        {
          name: "radioVal", //識別column名
          align: "center",
          label: "Radio 欄位(單選)", // 欄位名稱
          field: "radioVal",
          sortable: true,
          format: (val) =>
            this.radioOptions.find((radio) => radio.value === val).label,
          colType: "radio",
        },
        {
          name: "checkboxText",
          label: "Checkbox傳文字設計(多選)",
          field: "checkboxText",
          align: "center",
          format: (val) => val.join(","),
          colType: "checkboxText",
        },
        {
          name: "checkboxValue",
          label: "Checkbox傳數字再對應設計(多選)", //checkboxObjArr
          field: "checkboxValue",
          align: "center",
          format: (val) =>
            val
              .map((v) => {
                return this.checkboxObjArr.find((obj) => obj.value === v).label;
              })
              .join(","),
          colType: "checkboxValue",
        },
        {
          name: "protein",
          label: "Protein (g)",
          field: "protein",
          colType: "",
          align: "center",
        },
        {
          name: "selectText",
          label: "Select 下拉選單傳文字設計設計",
          field: "selectText",
          colType: "selectText",
          align: "center",
        },
        {
          name: "selectVal",
          label: "Select 下拉選單傳數字再對應設計",
          field: "selectVal",
          align: "center",
          format: (val) => this.selectObjArr.find((s) => s.value === val).label,
          colType: "selectValue",
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          align: "center",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
          colType: "checkbox",
        },
      ],
      data: [
        {
          id: 1,
          name: "Frozen Yogurt",
          details:
            "A frozen dessert made with yogurt and sometimes other dairy products including non-dairy products",
          radioVal: 1,
          checkboxText: ["checkbox-1", "checkbox-4"],
          checkboxValue: [1, 2, 3, 4],
          protein: 4.0,
          selectText: "Select 1",
          selectVal: 2,
          iron: "1%",
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          details:
            "A frozen dessert consisting of ice cream between two skins, crusts, or other similar biscuit",
          radioVal: 2,
          checkboxText: ["checkbox-1", "checkbox-2", "checkbox-4"],
          checkboxValue: [1, 2],
          protein: 4.3,
          selectText: "Select 2",
          selectVal: 1,
          iron: "1%",
        },
        {
          id: 3,
          name: "Eclair",
          details:
            "An oblong pastry made with choux dough filled with a cream and topped with chocolate icing",
          radioVal: 3,
          checkboxText: [
            "checkbox-1",
            "checkbox-2",
            "checkbox-3",
            "checkbox-4",
          ],
          checkboxValue: [1, 2, 4],
          protein: 6.0,
          selectText: "Select 3",
          selectVal: 3,
          iron: "7%",
        },
        {
          id: 4,
          name: "Cupcake",
          details:
            "A small cake designed to serve one person, which may be baked in a small thin paper or aluminum cup",
          radioVal: 3,
          checkboxText: ["checkbox-3", "checkbox-4"],
          checkboxValue: [2, 3, 4],
          protein: 4.3,
          selectText: "Select 4",
          selectVal: 2,
          iron: "8%",
        },
        {
          id: 5,
          name: "Gingerbread",
          details:
            "A broad category of baked goods, typically flavored with ginger, cloves, nutmeg or cinnamon and sweetened with honey, sugar or molasses",
          radioVal: 1,
          checkboxText: ["checkbox-1"],
          checkboxValue: [1, 4],
          protein: 3.9,
          selectText: "Select 4",
          selectVal: 1,
          iron: "16%",
        },
        {
          id: 6,
          name: "Jelly bean",
          details:
            "Small bean-shaped sugar candies with soft candy shells and thick gel interiors",
          radioVal: 2,
          checkboxText: ["checkbox-4"],
          checkboxValue: [2],
          protein: 0.0,
          selectText: "Select 1",
          selectVal: 3,
          iron: "0%",
        },
        {
          id: 7,
          name: "Lollipop",
          details:
            "A type of sugar candy usually consisting of hard candy mounted on a stick and intended for sucking or licking",
          radioVal: 2,
          checkboxText: ["checkbox-1", "checkbox-3", "checkbox-4"],
          checkboxValue: [1],
          protein: 0,
          selectText: "Select 3",
          selectVal: 2,
          iron: "2%",
        },
        {
          id: 8,
          name: "Honeycomb",
          details:
            "A mass of hexagonal prismatic wax cells built by honey bees in their nests to contain their larvae and stores of honey and pollen",
          radioVal: 1,
          checkboxText: ["checkbox-2", "checkbox-3"],
          checkboxValue: [2, 3, 4],
          protein: 6.5,
          selectText: "Select 2",
          selectVal: 1,
          iron: "45%",
        },
        {
          id: 9,
          name: "Donut",
          details: "A type of fried dough confection or dessert food",
          radioVal: 3,
          checkboxText: ["checkbox-2", "checkbox-4"],
          checkboxValue: [1, 4],
          protein: 4.9,
          selectText: "Select 1",
          selectVal: 1,
          iron: "22%",
        },
        {
          id: 10,
          name: "KitKat",
          details: `A chocolate-covered wafer bar confection created by Rowntree's of York, United Kingdom, and is now produced globally by Nestlé`,
          radioVal: 2,
          checkboxText: ["checkbox-1", "checkbox-3", "checkbox-4"],
          checkboxValue: [1, 2, 3],
          protein: 7,
          selectText: "Select 4",
          selectVal: 3,
          iron: "6%",
        },
        {
          id: 11,
          name: "Lollipop",
          details:
            "A type of sugar candy usually consisting of hard candy mounted on a stick and intended for sucking or licking",
          calories: 2,
          checkboxText: ["checkbox-2", "checkbox-3"],
          checkboxValue: [1],
          protein: 0,
          selectText: "Select 2",
          selectVal: 2,
          iron: "2%",
        },
        {
          id: 12,
          name: "Honeycomb",
          details:
            "A mass of hexagonal prismatic wax cells built by honey bees in their nests to contain their larvae and stores of honey and pollen",
          radioVal: 1,
          checkboxText: ["checkbox-2", "checkbox-3", "checkbox-4"],
          checkboxValue: [2],
          protein: 6.5,
          selectText: "Select 1",
          selectVal: 3,
          iron: "45%",
        },
        {
          id: 13,
          name: "Donut",
          details: "A type of fried dough confection or dessert food",
          radioVal: 2,
          checkboxText: [
            "checkbox-1",
            "checkbox-2",
            "checkbox-3",
            "checkbox-4",
          ],
          checkboxValue: [2],
          protein: 4.9,
          selectText: "Select 3",
          selectVal: 1,
          iron: "22%",
        },
      ],
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  mounted(){
    console.log("get here")
  },
  // 組件方法
  methods: {
    rowClick(row) {
      console.log(row);
    },
    btnStatusChange(row, rowIndex) {
      this.usedType = this.usedType === "view" ? "edit" : "view";
      this.selectedRow = rowIndex;
      console.log(this.usedType, "===", row);
      //  console.log(this.usedType,"===",id.rowIndex)
    },
    // =====================================
    onSubmit() {
      let errorCount =0
      console.log(">>>", this.$refs.comform.$refs.comform.$children);
      let checkedArr = this.$refs.comform.$refs.comform.$children.filter(
        (item) => item.$refs.childcheck || item.$refs.childSelectCheck
      );

      checkedArr.forEach((element) => {
         console.log("element>>>>",element,'=========',element.$children[0].value );
        // 
        if (element.$children[0].value == "") {
          errorCount+=1
          element.$children[0].innerError = true;
          element.$children[0].innerErrorMessage = element.$children[0].rules[0]();
        } else {
          element.$children[0].innerError = false;
          element.$children[0].innerErrorMessage = ""
          console.log("這個正確");
        }
      });
      !errorCount? console.log(`全驗證過=${errorCount}=`):console.log(`驗證未過=${errorCount}=`);


    },
    onReset() {
      this.form = {
        account: "",
        pwd: "",
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
