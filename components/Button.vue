<script>
export default {
  props: ['label', 'submit', 'disabled'],
  emits: ['click'],
}
</script>

<template>
  <button v-if="!submit" class="button" :disabled="disabled" @click="click">
    {{ label }}
  </button>
  <input
    v-else
    class="button"
    type="submit"
    :value="label"
    :disabled="disabled"
  />
</template>

<style lang="scss" scoped>
.button {
  height: var(--36pt);
  border: none;
  font-size: var(--12pt);
  font-weight: 500;
  border-radius: var(--10pt);

  transition: 300ms;

  background: var(--green);
  color: white;
  box-shadow: var(--shadow-button);

  will-change: transform;

  &:disabled {
    background: var(--bg-button-disabled);
    color: var(--text-gray);
  }

  &:focus,
  &:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: var(--shadow-input-hover);
  }
  &:active {
    transform: scale(0.99);
  }
}
</style>
