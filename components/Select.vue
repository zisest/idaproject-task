<script>
export default {
  props: ['options', 'selectedLabel', 'selected'],
  emits: ['update:selected'],
}
</script>

<template>
  <label class="label-el">
    <select
      class="select"
      @input="$emit('update:selected', $event.target.value)"
    >
      <option
        class="option"
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.displayName }}
      </option>
    </select>
    <span class="select-container">
      {{ selectedLabel }}
      <img src="@/assets/icons/arrow.svg" alt="arrow" />
    </span>
  </label>
</template>

<style lang="scss" scoped>
.label-el {
  position: relative;
  width: max-content;
  height: var(--36pt);
}
.select-container {
  display: flex;
  align-items: center;

  padding: var(--10pt) var(--10pt) var(--10pt) var(--16pt);

  background: var(--bg-primary);
  border-radius: var(--4pt);
  border: 1px solid transparent;
  box-shadow: var(--shadow-input);

  transition: 300ms;

  font-size: var(--12pt);
  color: var(--text-gray);
  line-height: var(--16pt);

 

  img {
    width: var(--16pt);
    height: var(--16pt);
  }
}
.select {
  opacity: 0;
  position: absolute;
  inset: 0;
  width: 100%;

  &:focus + .select-container {
    box-shadow: var(--shadow-input-focus);
    border-color: var(--green);
  }

  &:hover + .select-container {
    box-shadow: var(--shadow-input-hover);
  }
}
// .option {
// width: 100%;
// }
</style>