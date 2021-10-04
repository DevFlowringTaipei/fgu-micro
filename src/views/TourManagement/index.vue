<template>
  <div class="">
    <q-tabs
      v-if="true"
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="NewTour" label="新增遊程" />
      <q-tab name="TourStatus" label="遊程審核狀況" />
      <q-tab name="TourDraft" label="草稿" />
    </q-tabs>
    <q-tabs
      v-else
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="ShowList" label="待審核遊程" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel :name="tab">
        <router-view></router-view>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tab: this.$route.name,
    };
  },
  
  methods: {
    changeTab(e) {
      this.$router.push({
        name: e,
      });
    },
  },
};
</script>

<style></style>
