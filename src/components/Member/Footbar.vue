<script>
export default {
  props: {
    isSearchTablePage: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div>
    <template v-if="!isSearchTablePage"> 
      <q-footer elevated v-if="$q.screen.lt.sm">
        <q-toolbar class="flex justify-around">
          <q-btn flat dense padding="sm lg" text-color="white" color="primary">
            <slot name="lf"></slot>
          </q-btn>
          <q-btn flat dense padding="sm lg" text-color="white" color="accent">
            <slot name="rt"></slot>
          </q-btn>
        </q-toolbar>
      </q-footer>
    </template>

    <template v-if="isSearchTablePage">
      <q-footer elevated v-if="$q.screen.lt.sm">
        <q-toolbar class="flex justify-center">
          <q-btn flat dense padding="sm lg" text-color="white" color="primary">
            <slot name="cn"></slot>
          </q-btn>
        </q-toolbar>
      </q-footer>
    </template>
  </div>
</template>
<style lang="scss">
</style>