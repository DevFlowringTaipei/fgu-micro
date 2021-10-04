<script>
export default {
  name: "MainLayout",

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  filters:{
    transferRouteLebel(path){
      path.indexOf()
    },
  },
  created(){
    console.log('>>>',this.$route);
  }
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <!-- 顯示點選路徑名 -->
        <q-toolbar-title class="">{{$route.meta.title}}</q-toolbar-title>
        <q-space />
        <!-- Header 右上角功能 -->
        <!--  
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
        </div>
        -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
      :width="250"

    >
      <q-list>
        <q-item style="align-items:center;justify-content:center;">
          <div class="" style="display:flex;flex-direction:column;">
            <q-avatar size="120px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
            <span style="margin-top:10px;font-size:16px;">佛光大學育成中心</span>
          </div>
         
        </q-item>

        <q-item
          to="/account"
          active-class="q-item-no-link-highlighting"
          expand-icon-class="text-white"
        >
          <q-item-section avatar
            ><q-icon name="manage_accounts"
          /></q-item-section>
          <q-item-section><q-item-label>帳號管理</q-item-label></q-item-section>
        </q-item>
        <q-item
          to="/talents"
          active-class="q-item-no-link-highlighting"
          expand-icon-class="text-white"
        >
          <q-item-section avatar><q-icon name="people_alt"/></q-item-section>
          <q-item-section><q-item-label>人才管理</q-item-label></q-item-section>
        </q-item>
        <q-item
          to="/service"
          active-class="q-item-no-link-highlighting"
          expand-icon-class="text-white"
        >
          <q-item-section avatar
            ><q-icon name="real_estate_agent"
          /></q-item-section>
          <q-item-section
            ><q-item-label>服務類型管理</q-item-label></q-item-section
          >
        </q-item>
        <q-item
          to="/guidance"
          active-class="q-item-no-link-highlighting"
          expand-icon-class="text-white"
        >
          <q-item-section avatar><q-icon name="school"/></q-item-section>
          <q-item-section
            ><q-item-label>專業輔導管理</q-item-label></q-item-section
          >
        </q-item>
        <q-item
          to="/bill"
          active-class="q-item-no-link-highlighting"
          expand-icon-class="text-white"
        >
          <q-item-section avatar
            ><q-icon name="account_balance_wallet"
          /></q-item-section> 
          <q-item-section><q-item-label>帳務管理</q-item-label></q-item-section>
        </q-item>
        <q-item
          :to="true?'/tour/new-tour':'/tour/pending-review'"
          active-class="q-item-no-link-highlighting"
          expand-icon-class="text-white"
        >
          <q-item-section avatar><q-icon name="book_online"/></q-item-section> 
          <q-item-section><q-item-label>遊程管理</q-item-label></q-item-section>
        </q-item>

        <!-- 有下拉的 -->
        <!-- <q-expansion-item icon="pages" label="(4)報表管理" expand-icon-class="text-white">
          <q-list class="q-pl-lg">
            <q-item to="/頁面" active-class="q-item-no-link-highlighting">
              <q-item-section avatar><q-icon name="" /></q-item-section>
              <q-item-section
                ><q-item-label>報表一</q-item-label></q-item-section
              >
            </q-item>
            <q-item to="/頁面" active-class="q-item-no-link-highlighting">
              <q-item-section avatar><q-icon name="" /></q-item-section>
              <q-item-section
                ><q-item-label>報表二</q-item-label></q-item-section
              >
            </q-item>
          </q-list>
        </q-expansion-item> -->

        <!-- 以下為創價開發用 -->
        
        <!-- <q-item to="/Member" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Member</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/inCard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>入信卡</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/TestEditor" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TestEditor</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/TestZipCode" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TestZipCode</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/TestApi" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TestApi</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/TestInlineEditTable"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TestInlineEditTable</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/activity" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Activity Rule Create</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Member-search" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>會員查詢</q-item-label>
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <q-page-container class="">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
