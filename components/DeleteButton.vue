<script>
export default {
  emits: ['click'],
}
</script>

<template>
  <button class="delete" @click="$emit('click')">
    <img src="@/assets/icons/delete.svg" alt="delete product" />
  </button>
</template>

<style lang="scss" scoped>
.delete {
  opacity: 0;
  position: absolute;
  right: calc(-1 * var(--8pt));
  top: calc(-1 * var(--8pt));

  display: flex;
  justify-content: center;
  align-items: center;

  height: var(--32pt);
  width: var(--32pt);
  border-radius: var(--10pt);
  background: var(--accent);
  border: 1px solid transparent;

  box-shadow: var(--shadow-button);

  transition: 300ms;
  will-change: transform;

  &:focus {
    opacity: 1;
    outline: none;
  }
  &:focus-visible,
  &:hover {
    box-shadow: var(--shadow-button-focus);
    transform: scale(1.2);
  }
}
</style>