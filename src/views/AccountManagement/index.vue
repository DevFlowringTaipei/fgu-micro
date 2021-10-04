<template>
  <div class="">
    
   
    <q-tabs
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="SettingAccount" label="個人設定" />
      <q-tab name="MatchList" label="查詢曾經媒合遊程和專才" />
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
      tab:this.$route.name
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
