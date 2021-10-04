<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <q-form
    ref="comform"
    v-bind="$attrs"
    v-on="$listeners"
    :class="computedClass"
  >
    <slot />
  </q-form>
</template>

<script>
import FormMixin from "./form-mixin.js";

export default {
  name: 'ComForm',
  inheritAttrs: false,
  mixins: [FormMixin],
  props: {
  },
  data () {
    return {
    }
  },

  methods: {
    validate (shouldFocus) {
      
      return this.$refs.comform.validate(shouldFocus)
    },
    submit (evt) {
      this.$refs.comform.submit(evt)
    },
    reset (evt) {
        console.log("child>>",evt)
      this.$refs.comform.reset(evt)
    },
    getValidationComponents () {
      return this.$refs.comform.getValidationComponents()
    },
    resetValidation () {
      this.$refs.comform.resetValidation()
    },
    focus () {
      this.$refs.comform.focus()
    }
  }
}
</script>
