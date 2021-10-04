<template>
  <div :class="$q.screen.lt.sm? 'q-pa-xs':'q-pa-md'" style="">
    <div
      class="row search-box"
      v-for="(item, index) in data.cardData2"
      :key="index"
    >
      <!-- <div class="col-12 q-mb-sm">
            <span>您共找到{{ data.totalNum }}筆人才</span>
          </div> -->

      <q-card
        class=" q-mb-sm"
        :class="$q.screen.lt.sm ? 'col-12' : 'col-10'"
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
          v-if="$q.screen.lt.sm"
            class="rounded-borders "
            style=""
            :style="$q.screen.lt.sm ? 'max-width:100%' : 'max-width:70%'"
            :src="item.img"
          >
            <div class="text-subtitle2 absolute-bottom text-center">
          審核狀況
        </div>
          </q-img>

          <q-card-section
            class=""
            style="display:flex;flex-direction:column;width:100%;height:100%;align-items:start;justify-content:space-bwtween;"
          >
            <div
              class="q-mt-sm q-mb-xs "
              :class="$q.screen.lt.sm ? 'text-h6' : 'text-h4'"
            >
              {{ item.name }}
            </div>
            <div class="text-caption text-grey ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div class="q-mb-xs" style="flex-direction:row;">
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
            <div class="q-mb-xs" style="flex-direction:row;">
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
              class="q-mb-xs "
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
      <div
        v-if="!$q.screen.lt.sm"
        class="col-2 "
        style="display:flex;justify-content:center;align-items:center;"
      >
        <div class="text-h6 ">
          審核狀態
          <q-chip  color="orange" style="font-size:20px;">
            通過
          </q-chip>
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
        >
        </q-select>
      </div>
      <com-pagination
        class="col-12 col-md-6 "
        style="align-items:center;margin-right:0px;"
        :style="$q.screen.lt.sm ? 'justify-content:center;' : ''"
        v-model="page.currentPage"
        :rows-per-page="page.pageSize"
        :total-num="page.totalNum"
        @input="changeCurrentPage"
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
import { rowOptions } from "@/utils/common/dropdown-list.js";
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: {ComPagination},
  data() {
    return {
      rowOptions,
      page: {
        pageSize: 20,
        currentPage: 1,
        totalNum: 110,
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
    changeCurrentPage(e) {
      // 重新call api
      console.log("changeCurrentPage=>", e);
    },
    onSubmit(){},
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
