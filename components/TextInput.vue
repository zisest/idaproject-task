<script>
import { maska } from 'maska'

export default {
  props: ['value', 'required', 'label', 'placeholder', 'name', 'mask'],
  directives: {
    maska,
  },
  data() {
    return {
      isDirty: false,
    }
  },
  computed: {
    isValid() {
      const newValue = this.required ? !!this.value : true
      this.$emit('validityChange', this.name, newValue)
      return newValue
    },
  },
  methods: {},
  emits: ['validityChange', 'update:value', 'input'],
}
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <span>{{ value }}</span>

    <input
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      v-maska="mask"
      :name="name"
      :required="required"
      :placeholder="placeholder"
    />
  </label>
  {{ { required } }} {{ { isDirty } }} {{ { isValid } }}
</template>

<style lang="scss" scoped>
label {
  display: flex;
  flex-direction: column;
}
</style>
