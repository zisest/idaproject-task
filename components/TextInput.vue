<script>
import { maska } from 'maska'

const MASKS = {
  SPACE_SEPARATED_NUMBER: {
    mask: [
      'N',
      'N##',
      'N ###',
      'N# ###',
      'N## ###',
      'N ### ###',
      'N# ### ###',
      'N## ### ###',
    ],
    tokens: { N: { pattern: /[1-9]/ } },
  },
}

export default {
  props: ['value', 'required', 'label', 'placeholder', 'name', 'maskType'],
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
    mask() {
      return MASKS[this.maskType]
    },
  },
  methods: {
    handleInput(e) {
      this.isDirty = true
      this.$emit('update:value', e.target.value)
    },
  },
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
      @input="handleInput"
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
