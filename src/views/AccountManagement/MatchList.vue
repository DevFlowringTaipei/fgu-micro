<template>
  <div class="q-pa-md" style="">
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm " style="">
      <!-- input -->
      <div :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-md-4'">
        <q-input outlined v-model="searchForm.keyword" dense />
      </div>
      <!-- 下拉 -->
      <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
        <q-select
          outlined
          v-model="searchForm.type"
          stack-label
          :options="typeOptions"
          dense
          emit-value
          map-options
          :option-label="(item) => (item === '' ? '請選擇' : item.label)"
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
    <div
      v-if="data.totalNum && data.type === 1"
      class="row q-col-gutter-x-sm q-col-gutter-y-sm search-box   "
    >
      <div class="col-12">
        <span>您共找到{{ data.totalNum }}位專才 </span>
      </div>
      <div
        class="col-12 col-md-4 q-mb-md "
        v-for="(item, index) in data.cardData1"
        :key="index"
      >
        <div
          class="rounded-borders"
          style="display:flex;border:1px solid rgba(0, 0, 0, 0.12);"
        >
          <q-avatar size="100px" class="image-avatar">
            <img :src="item.img" />
          </q-avatar>
          <div class="info-content " style="">
            <span class="">{{ item.name }}</span>
            <div class="" style="flex-direction:row;">
              <q-chip
                v-for="(service, index) in item.services"
                :key="index"
                dense
                size="sm"
                color="primary"
                text-color="white"
                icon="event"
              >
                {{ service }}
              </q-chip>
            </div>
            <span class="" style="flex-direction:row;">
              <q-chip
                v-for="(time, index) in item.guide_time"
                :key="index"
                outline
                square
                size="sm"
                color="orange"
                text-color="white"
              >
                {{ time }}
              </q-chip>
            </span>
            <span class="">過去媒合:資料未處理中.....................</span>
          </div>
        </div>
      </div>
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
            @input="changePageSize($event)"
          >
          </q-select>
        </div>
        <com-pagination
          class="col-12 col-md-6 "
          style="align-items:center;margin-right:0px;"
          :style="$q.screen.lt.sm ? 'justify-content:center;' : ''"
          v-model="page.page"
          :rows-per-page="page.pageSize"
          :total-num="page.totalNum"
          @input="changeCurrentPage"
        ></com-pagination>
      </div>
    </div>
    <!-- 旅遊 -->
    <div
      v-else-if="data.totalNum && data.type === 2"
      class="row q-col-gutter-x-sm q-col-gutter-y-sm search-box   "
    >
      <div class="col-12">
        <span>您共找到{{ data.totalNum }}個旅遊</span>
      </div>

      <q-card
        class="col-12 q-mb-sm"
        v-for="(item, index) in data.cardData2"
        :key="index"
        style="padding:0px;"
        flat
        bordered
      >
        <q-card-section
          :horizontal="$q.screen.lt.sm ? false : true"
          class=""
          style="height:100%;padding:0px;"
        >
          <q-img
            class="rounded-borders "
            style=""
            :style="$q.screen.lt.sm ? 'max-width:100%' : 'max-width:400px;'"
            :src="item.img"
          />

          <q-card-section
            class=""
            style="display:flex;flex-direction:column;width:100%;height:100%;justify-content:space-bwtween;"
          >
            <div class="text-h4 q-mt-sm q-mb-xs">{{ item.name }}</div>
            <div class="text-caption q-mb-sm text-grey ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div class="q-mb-sm" style="flex-direction:row;">
              <q-chip
                v-for="(service, index) in item.services"
                :key="index"
                dense
                size="sm"
                color="primary"
                text-color="white"
                icon="event"
              >
                {{ service }}
              </q-chip>
            </div>
            <div class="q-mb-md" style="flex-direction:row;">
              <q-chip
                v-for="(time, index) in item.guide_time"
                :key="index"
                outline
                square
                size="sm"
                color="orange"
                text-color="white"
              >
                {{ time }}
              </q-chip>
            </div>
            <div
              class="q-mb-sm"
              style="display:flex;flex-direction:row;justify-content:space-between;width:100%;"
            >
              <div class="text-h6 q-mt-sm q-mb-xs ">{{ item.price }}元起</div>
              <q-btn
                color="primary"
                label="立即參加"
                size="md"
                @click="onSubmit"
              ></q-btn>
            </div>
          </q-card-section>
        </q-card-section>

        <!-- <q-separator /> -->
      </q-card>
      <!-- Pagination -->
      <div class="row col-12 q-mt-xs">
        <div
          class="col-12 col-sm-6"
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
            @input="changePageSize($event)"
          >
          </q-select>
        </div>
        <com-pagination
          class="col-12 col-sm-6 "
          style="align-items:center;margin-right:0px;"
          :style="
            $q.screen.lt.sm
              ? 'justify-content:center;'
              : 'justify-content:flex-start;'
          "
          v-model="page.page"
          :rows-per-page="page.pageSize"
          :total-num="page.totalNum"
          @input="changeCurrentPage"
        ></com-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
const typeOptions = [
  { label: "專才", value: 1 },
  { label: "遊程", value: 2 },
];
const rowOptions = [
  { label: "20筆/頁", value: 20 },
  { label: "50筆/頁", value: 50 },
  { label: "100筆/頁", value: 100 },
  { label: "150筆/頁", value: 150 },
  { label: "200筆/頁", value: 200 },
];
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { ComPagination },
  data() {
    return {
      typeOptions,
      rowOptions,
      globalLoading: false, //全局loading

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
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          },
        ],
        cardData2: [
          {
            img: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是主題(This is title)1",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
            price: 3999,
          },
          {
            img: "https://cdn.quasar.dev/img/parallax2.jpg",
            name: "這是主題(This is title)2",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
            price: 1999,
          },
          {
            img: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是主題(This is title)3",
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
            price: 1599,
          },
          {
            img: "https://cdn.quasar.dev/img/parallax2.jpg",
            name: "這是主題(This is title)4",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
            price: 1799,
          },
          {
            img: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是主題(This is title)5",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
            price: 999,
          },
          {
            img: "https://cdn.quasar.dev/img/parallax2.jpg",
            name: "這是主題(This is title)6",
            services: ["服務類型1", "服務類型2", "服務類型3"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            match: ["過去媒合1", "過去媒合2", "過去媒合3"],
            price: 4999,
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
        this.page.pageSize = 20;
        this.page.totalNum = this.data.totalNum;
        this.$q.loading.hide();
      }, 3000);

      //   this.timer = setTimeout(() => {
      //     this.$q.loading.hide();
      //     this.timer = void 0;
      //   }, 2000);
    },
    changeCurrentPage(e) {
      // 重新call api
      console.log("changeCurrentPage=>", e);
      this.page.page = e;
      this.$q.notify({
        message: `目前是${this.page.page}頁，每頁${this.page.pageSize}筆`,
        type: "success",
        position: "top-right",
      });
    },
    changePageSize(e) {
      console.log("changePageSize=>", e);
      this.page.pageSize = e;
      this.$q.notify({
        message: `目前是${this.page.page}頁，每頁${this.page.pageSize}筆`,
        type: "success",
        position: "top-right",
      });
    },
  },
  filters: {
    transLabel(val, options) {
      let obj = options.find((item) => (item.value = val));
      return obj.label;
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
.info-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
