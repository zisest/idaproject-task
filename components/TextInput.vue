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
  props: [
    'value',
    'required',
    'label',
    'placeholder',
    'name',
    'maskType',
    'textarea',
  ],
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
  <div class="container">
    <label class="label-el">
      <span :class="['label-text', { required }]">{{ label }}</span>
      <input
        :class="['input', { invalid: !isValid && isDirty }]"
        v-if="!textarea"
        type="text"
        :value="value"
        @input="handleInput"
        v-maska="mask"
        :name="name"
        :required="required"
        :placeholder="placeholder"
      />
      <textarea
        :class="['textarea', { invalid: !isValid && isDirty }]"
        v-else
        :value="value"
        @input="handleInput"
        v-maska="mask"
        :name="name"
        :required="required"
        :placeholder="placeholder"
      ></textarea>
    </label>
    <div class="error-message">
      <output v-show="!isValid && isDirty">Поле является обязательным</output>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--4pt);
}

.label-el {
  display: flex;
  flex-direction: column;
  gap: var(--4pt);
}

.label-text {
  height: var(--12pt);
  line-height: var(--12pt);

  font-size: var(--10pt);
  color: var(--text-dark-blue);
  width: max-content;
  position: relative;

  &.required::after {
    content: '';
    background: var(--accent);
    width: var(--4pt);
    height: var(--4pt);
    border-radius: 50%;

    position: absolute;
    top: 0;
    right: -var(--4pt);
  }
}

@mixin input-styles {
  border: 1px solid transparent;
  border-radius: var(--4pt);
  padding: var(--10pt) var(--16pt);
  font-size: var(--12pt);

  box-shadow: var(--shadow-input);
  background: var(--bg-primary);
  color: var(--text-gray);

  transition: 300ms;

  &:hover {
    box-shadow: var(--shadow-input-hover);
  }
  &:focus {
    box-shadow: var(--shadow-input-focus);
    border-color: var(--green);
  }
  &.invalid {
    box-shadow: var(--shadow-input-error);
    border-color: var(--accent);
    &:focus, &:hover {
      box-shadow: var(--shadow-input-error-focus);
    }
  }
}

.input {
  @include input-styles;

  height: var(--36pt);
}

.textarea {
  @include input-styles;

  height: var(--108pt);
  resize: none;
}

.error-message {
  color: var(--accent);
  font-size: var(--8pt);
  line-height: var(--10pt);
  height: var(--10pt);
  padding-bottom: var(--2pt);
}
</style>
