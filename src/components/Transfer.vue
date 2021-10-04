<script>
export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `Option ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4]
      };
    }
};
</script>
<template>
  <div>
    <el-transfer v-model="value" :data="data"> </el-transfer>
  </div>
</template>
<style lang="scss">
</style>